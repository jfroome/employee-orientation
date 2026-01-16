import { Email, Birthday, CellPhone, DriversLicenseNo, DriversLicenseState, FirstName, HomePhone, LastName, MailingAddress, MailingCityStateZip, MailingSameAsPhys, MiddleName, PhysAddress, PhysCityStateZip, Sex, Signature, SocialSecurity } from '../../constants';
import { DateSigned } from '../../constants.mjs';
import { GenericHandler } from '../../data/genericEndpointHandler';

export default async function handler(req, res){
  await GenericHandler(req, res, mapData)
}

const mapData = (data) => {
  return {
    [FirstName]: data[FirstName],
    [MiddleName]: data[MiddleName],
    [LastName]: data[LastName],
    [DriversLicenseNo]: data[DriversLicenseNo],
    [DriversLicenseState]: data[DriversLicenseState],
    [PhysAddress]: data[PhysAddress],
    [PhysCityStateZip]: data[PhysCityStateZip],
    [MailingAddress]: data[MailingAddress],
    [MailingCityStateZip]: data[MailingCityStateZip],
    [Birthday]: data[Birthday],
    [MailingSameAsPhys]: data[MailingSameAsPhys],
    [SocialSecurity]: data[SocialSecurity],
    [Email]: data[Email],
    [CellPhone]: data[CellPhone],
    [HomePhone]: data[HomePhone],
    [Sex]: data[Sex],
    [DateSigned]: data[DateSigned]
  }
}
