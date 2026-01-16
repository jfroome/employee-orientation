import { InsuranceChoice } from "../../constants";
import { GenericHandler } from "../../data/genericEndpointHandler";

export default async function handler(req, res) {
    await GenericHandler(req, res, mapData)
}

const mapData = (data) => {
    return {
        [InsuranceChoice]: data[InsuranceChoice]
    }
}
