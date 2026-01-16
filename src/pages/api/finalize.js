import { HasFinalized } from "../../constants";
import { GenericHandler } from "../../data/genericEndpointHandler";

export default async function handler(req, res) {
    await GenericHandler(req, res, mapData)
}

const mapData = (data) => {
    return {
        [HasFinalized]: data[HasFinalized] // if they call this api it should always set it to true
    }
}
