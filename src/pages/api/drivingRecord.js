
import { GenericHandler } from '../../data/genericEndpointHandler'
import { Birthday, DriversLicenseNo, DrivingRecordConfirm, VolunteerCheck } from '../../constants'

export default async function handler(req, res) {
    GenericHandler(req, res, mapData)
}

const mapData = (data) => {
    return {
        [Birthday]: data[Birthday],
        [DriversLicenseNo]: data[DriversLicenseNo],
        [DrivingRecordConfirm] : data[DrivingRecordConfirm],
        [VolunteerCheck]: data[VolunteerCheck]
    }
}
