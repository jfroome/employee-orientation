
import { AccountType } from '../../constants'
import { GenericHandler } from '../../data/genericEndpointHandler'

export default async function handler(req, res) {
    await GenericHandler(req, res, mapData)
}

const mapData = (data) => {
    return {
        [AccountType]: data[AccountType]
    }
}
