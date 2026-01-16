import { InsuranceChoice, AccountType, DateSigned, DrivingRecordConfirm, DrugCheck, EligibilityConfirm, EmergencyContactName, HealthConfirm, LegalConfirm, VideosCompleted, Witholding_Confirm } from '../../constants.mjs'
import { GenericHandler } from '../../data/genericEndpointHandler'

export default async function handler(req, res) {
    await GenericHandler(req, res, mapData)
}

const mapData = (data) => {
    return {
        [DateSigned]: data[DateSigned],
        [DrugCheck]: data[DrugCheck],
        [HealthConfirm]: data[HealthConfirm],
        [InsuranceChoice]: data[InsuranceChoice],
        [AccountType]: data[AccountType],
        [EmergencyContactName]: data[EmergencyContactName],
        [EligibilityConfirm]: data[EligibilityConfirm],
        [DrivingRecordConfirm]: data[DrivingRecordConfirm],
        [Witholding_Confirm]: data[Witholding_Confirm],
        [VideosCompleted]: data[VideosCompleted],
        [LegalConfirm]: data[LegalConfirm]
    }
}
