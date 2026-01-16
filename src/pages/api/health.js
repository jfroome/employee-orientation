import { HealthConfirm, MedicalPlan, EmployeeCoverageSelection, EmployeeBenefits } from "../../constants";
import { HealthHandler } from "../../data/genericEndpointHandler";

export default async function handler(req, res) {
   await HealthHandler(req, res, mapData) // true to set 'isHealth'
}


const mapData = (data) => {
    return {
        [MedicalPlan]: data[MedicalPlan],
        [EmployeeCoverageSelection]: data[EmployeeCoverageSelection],
        [EmployeeBenefits]: data[EmployeeBenefits],
        [HealthConfirm]: data[HealthConfirm]
    }
}

