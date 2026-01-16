import { AfricanAmerican, Asian, Hawaiian, HispanicLatino, IndianNative, White } from "../../constants";
import { GenericHandler } from "../../data/genericEndpointHandler";

export default async function handler(req, res) {
    await GenericHandler(req, res, mapData)
}

const mapData = (data) => {
    return {
        [HispanicLatino]: data[HispanicLatino],
        [IndianNative]: data[IndianNative],
        [Hawaiian]: data[Hawaiian],
        [White]: data[White],
        [AfricanAmerican]: data[AfricanAmerican],
        [Asian]: data[Asian],
    }
}
