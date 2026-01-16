import { Residency, AlienRegNumber, I94AdmissionNumber, ForeignPassportNumber, CountryOfIssuance, EligibilityConfirm } from '../../constants';
import { GenericHandler } from '../../data/genericEndpointHandler';


export default async function handler(req, res){
  await GenericHandler(req, res, mapData)
}

const mapData = (data) => {
  return {
    [Residency] : data[Residency],
    [AlienRegNumber] : data[AlienRegNumber],
    [I94AdmissionNumber] : data[I94AdmissionNumber],
    [ForeignPassportNumber] : data[ForeignPassportNumber],
    [CountryOfIssuance] : data[CountryOfIssuance],
    [EligibilityConfirm] : data[EligibilityConfirm]
  }
}
