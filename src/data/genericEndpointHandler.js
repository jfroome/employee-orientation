import { NinoxDependentCreate, NinoxDependentDelete, NinoxDependentsGet, NinoxOnboardingFilesGet, NinoxOnboardingFilesPut, NinoxOnboardingGet, NinoxOnboardingPut } from './repository';
import { getToken } from 'next-auth/jwt';
import { CoverageSelected, Dental, DependentObjectArray, Dependents, Dependents_Benefits, Email, Id, Medical, Vision } from '../constants';
import { DecodeCoverage } from "../helpers";
import { DrugDateTime, EndTime, OrientationDate, StartTime } from '../constants.mjs';

export async function GenericHandler(req, res, mapData) {
  const session = await ValidateToken(req, res)
  if (req.method === 'GET') {
    const result = await NinoxOnboardingGet(session.user.user[Email]);
    res.json({
      id: result.id,
      data: mapData(result.data)
    });
  }
  else if (req.method === 'POST') {
    // don't send non-dynamic time values to the server
    let data = mapData(req.body)
    data = removeTimeFields(data)
    const result = await NinoxOnboardingPut(data, session.user.user[Id])
    //console.log(result);
    res.status(result).send()
  }
  else { // Method Not Allowed
    res.status(405).send();
  }
}

export async function GenericFileHandler(req, res, fileName) {
  const session = await ValidateToken(req, res)
  if (req.method === 'GET') {
    try {
      const data = await NinoxOnboardingFilesGet(fileName, session.user.user.id)
      const buffer = new Buffer.from(data, 'binary', data.length)
      const imageData = 'data:image/png;base64,' + buffer.toString('base64')
      res.json({ [fileName]: imageData })
    } catch {
      res.json({ [fileName]: '' })
    }
  }
  else if (req.method === 'POST') {
    const imageData = Buffer.from(req.body[fileName].split(",")[1], 'base64')
    await NinoxOnboardingFilesPut(fileName, session.user.user.id, imageData)
    res.status(200)
    res.send()
    res.end()
  }
  else {
    // Method Not Allowed
    res.status(405).send();
  }
}


export async function HealthHandler(req, res, mapData) {
  const session = await ValidateToken(req, res)
  if (req.method === 'GET') {
    const result = await NinoxOnboardingGet(session.user.user[Email]);
    let dependents = [];
    if (result.data[Dependents] !== null && result.data[Dependents] !== undefined) {
      dependents = await GetDependentsHandler([...result.data[Dependents]])
    }
    const data = mapData(result.data);
    data[DependentObjectArray] = dependents;
    res.json({
      id: result.id,
      data: data
    });
  }
  else if (req.method === 'POST') {
    const result = await NinoxOnboardingPut(mapData(req.body), session.user.user[Id])
    await DependentsHandler(req, res)
  }
  else { // Method Not Allowed
    res.status(405).send();
  }
}

// Private functions
async function GetDependentsHandler(dependents) {
  return Promise.all(await dependents.map(async (dependentId) => {
    const dependent = await NinoxDependentsGet(dependentId)
    const arr = DecodeCoverage(dependent[Dependents_Benefits]);
    dependent[Id] = dependentId
    dependent[Dental] = arr[Dental]
    dependent[Vision] = arr[Vision]
    dependent[Medical] = arr[Medical]
    return dependent;
  }));
}

async function DependentsHandler(req, res) {
  const session = await ValidateToken(req, res)
  await DeleteAllDependents(session.user.user[Email], session);

  const newDependentIds = []

  await Promise.all(req.body[DependentObjectArray].map(async (dependent) => {
    const newDependentId = await NinoxDependentCreate(dependent, session.user.user[Id])
    newDependentIds.push(newDependentId)
  }));

  await NinoxOnboardingPut({ [Dependents]: newDependentIds }, session.user.user[Id])
  res.status(200).send();
}

async function DeleteAllDependents(session) {
  const onboardingGetResult = await NinoxOnboardingGet(session);
  const idArray = onboardingGetResult.data[Dependents];
  if (idArray !== null && idArray !== undefined) {
    idArray.map(async (id) => {
      await NinoxDependentDelete(id)
    })
  }
}


async function ValidateToken(req, res) {
  const session = await getToken({ req })
  if (!session) { // Unauthorized
    res.status(401)
    res.send()
    res.end()
  }
  else return session;
}

function removeTimeFields(data) {
  delete data[StartTime]
  delete data[EndTime]
  delete data[OrientationDate]
  return data
}