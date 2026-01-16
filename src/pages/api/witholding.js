import { FirstName, LastName, MiddleName, PhysAddress, PhysCityStateZip, SocialSecurity, Witholding_Confirm, Witholding_Deductions, Witholding_Dependents_Children, Witholding_Dependents_Other, Witholding_Dependents_Total, Witholding_Extra, Witholding_2_JOBS, Witholding_OtherIncome, Witholding_Residency } from "../../constants";
import { GenericHandler } from "../../data/genericEndpointHandler";

export default async function handler(req, res) {
    await GenericHandler(req, res, mapData)
}

const mapData = (data) => {
    return {
        [FirstName]: data[FirstName],
        [MiddleName]: data[MiddleName],
        [LastName]: data[LastName],
        [PhysAddress]: data[PhysAddress],
        [PhysCityStateZip]: data[PhysCityStateZip],
        [SocialSecurity]: data[SocialSecurity],
        [Witholding_Confirm]: data[Witholding_Confirm],
        [Witholding_Deductions]: data[Witholding_Deductions],
        [Witholding_Dependents_Children]: data[Witholding_Dependents_Children],
        [Witholding_Dependents_Other]: data[Witholding_Dependents_Other],
        [Witholding_OtherIncome]: data[Witholding_OtherIncome],
        [Witholding_Dependents_Total]: data[Witholding_Dependents_Total],
        [Witholding_Extra]: data[Witholding_Extra],
        [Witholding_2_JOBS]: data[Witholding_2_JOBS],
        [Witholding_Residency]: data[Witholding_Residency]
    }
}
