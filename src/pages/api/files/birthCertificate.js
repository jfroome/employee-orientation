import { BirthCertificateFileName } from "../../../constants"
import { GenericFileHandler } from "../../../data/genericEndpointHandler"


export const config = {
    api: {
      bodyParser: {
        sizeLimit: '50mb',
      },
    },
  };

export default async function handler(req, res) {
    await GenericFileHandler(req, res, BirthCertificateFileName)
}