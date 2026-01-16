
import { AccountType, EmergencyAddress, EmergencyCellPhone, EmergencyCityStateZip, EmergencyContactName, EmergencyContactRelationship, EmergencyHomePhone } from '../../constants'
import { GenericHandler } from '../../data/genericEndpointHandler'

export default async function handler(req, res) {
    await GenericHandler(req, res, mapData)
}

const mapData = (data) => {
    return {
        [EmergencyContactName]: data[EmergencyContactName],
        [EmergencyContactRelationship]: data[EmergencyContactRelationship],
        [EmergencyHomePhone]: data[EmergencyHomePhone],
        [EmergencyCellPhone]: data[EmergencyCellPhone],
        [EmergencyAddress]: data[EmergencyAddress],
        [EmergencyCityStateZip]: data[EmergencyCityStateZip]
    }
}
