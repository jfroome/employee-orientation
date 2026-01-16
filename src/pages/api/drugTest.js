import { DrugCheck, DrugDOT, DrugDateTime, OrientationDate, StartTime, EndTime } from "../../constants";
import { GenericHandler } from "../../data/genericEndpointHandler";

export default async function handler(req, res) {
  await GenericHandler(req, res, mapData)
}


const mapData = (data) => {
  return {
    [OrientationDate]: data[OrientationDate],
    [StartTime]: data[StartTime],
    [EndTime]: data[EndTime],
    [DrugCheck]: data[DrugCheck],
    [DrugDOT]: data[DrugDOT],
    [DrugDateTime]: data[DrugDateTime]
  }
}
