import axios from "axios";
import { Ninox_Database_URL, Ninox_Onboarding_Records, Ninox_Onboarding_Record, Ninox_Email_Field_Id, Ninox_Dependents, Dependents_Relation, Dependents_BirthDay, Dependents_Name, Dependents_Sex, Dependents_SSN, Medical, Dental, Vision, Dependents_Benefits } from "../constants";
import FormData from "form-data";
import { DecodeCoverage } from "../helpers";


export async function NinoxOnboardingGet(email) {
    // Mock data for test user
    if (email === "test@example.com") {
        return {
            id: "test-id",
            data: {
                "FIRST NAME": "Test",
                "MIDDLE NAME": "",
                "LAST NAME": "User",
                "SOCIAL SECURITY NUMBER": "123456789",
                "Email": "test@example.com",
                "BirthDay": "1990-01-01",
                "PHYSICAL_ADDRESS": "123 Test St",
                "PHYSICAL CITY STATE, ZIP CODE": "Test City, TS 12345",
                "MailingAddress": "123 Test St",
                "MailingCityStateZip": "Test City, TS 12345",
                "MailingSameAsPhys": true,
                "CellPhone": "555-123-4567",
                "HomePhone": "555-123-4567",
                "Sex": "Male",
                "DriversLicenseNo": "D1234567",
                "DriversLicenseState": "TS",
                "HAS_FINALIZED_ONBOARDING_VIA_APP": false,
                "Dependents": [], // Empty array for no dependents
                "Medical Plan": "Plan A",
                "CoverageSelected": "Employee Only",
                "MedDentalVisionEmployee": "Yes",
                "HealthConfirmCheckbox": false,
                // Add other fields as needed
            }
        };
    }

    const data = {
        "filters": {
            [Ninox_Email_Field_Id]: email
        }
    }
    const url = `${Ninox_Database_URL}${Ninox_Onboarding_Record}`;
    const response = await axios.post(url, data, {
        headers: {
            'Authorization': `Bearer ${process.env.NINOX_KEY}`,
            'Content-Type': 'application/json'
        }
    })
    var result = {
        id: response.data.id,
        data: response.data.fields
    };
    return result;
}

export async function NinoxOnboardingPut(formData, id) {
    // Mock for test user
    if (id === "test-id") {
        return 200;
    }

    const url = `${Ninox_Database_URL}${Ninox_Onboarding_Records}/`;
   
    const data = {
        "id": id,
        "fields": formData
    }
    //console.log(data)
    try {
        const response = await axios.post(url, data, {
            headers: {
                'Authorization': `Bearer ${process.env.NINOX_KEY}`,
                'Content-Type': 'application/json'
            }
        })
        //console.log(response)
        return response.status

    } catch (e) {
        return 500
    }
}

export async function NinoxOnboardingFilesGet(fileName, id) {
    // Mock for test user
    if (id === "test-id") {
        return Buffer.alloc(0); // Empty buffer
    }

    const url = `${Ninox_Database_URL}${Ninox_Onboarding_Records}/${id}/files/${fileName}`;
    const response = await axios.get(url, {
        responseType: 'arraybuffer',
        timeout: 30000,
        //validateStatus: true, // if no file exists it will 404 and cause error, we don't want that
        headers: {
            'Authorization': `Bearer ${process.env.NINOX_KEY}`
        }
    })
    return response.data;
}
export async function NinoxOnboardingFilesPut(fileName, id, data) {
    // Mock for test user
    if (id === "test-id") {
        return;
    }

    const url = `${Ninox_Database_URL}${Ninox_Onboarding_Records}/${id}/files/`
    const formData = new FormData()
    formData.append(
        'file', data, fileName
    )
    const response = await axios.post(url,
        formData,
        {
            headers: {
                'Authorization': `Bearer ${process.env.NINOX_KEY}`,
                'Content-Type': 'multipart/form-data'
            }
        })
    return response.data;
}

export async function NinoxDependentsGet(dependentId) {
    const url = `${Ninox_Database_URL}${Ninox_Dependents}/${dependentId}`;
    const response = await axios.get(url, {
        headers: {
            'Authorization': `Bearer ${process.env.NINOX_KEY}`,
            'Content-Type': 'application/json'
        }
    })
    const dependent = response.data.fields;
    const medDenVis = DecodeCoverage(dependent[Dependents_Benefits])
    dependent[Medical] = medDenVis[Medical]
    dependent[Dental] = medDenVis[Dental]
    dependent[Vision] = medDenVis[Vision]
    return dependent;
}


export async function NinoxDependentDelete(dependentId) {
    const url = `${Ninox_Database_URL}${Ninox_Dependents}/${dependentId}`;
    const response = await axios.delete(url, {
        headers: {
            'Authorization': `Bearer ${process.env.NINOX_KEY}`,
            'Content-Type': 'application/json'
        }
    })

    return response.status;
}

export async function NinoxDependentCreate(dependent, id) {
    const data = {
        "fields": {
            [Dependents_Relation]: dependent[Dependents_Relation],
            [Dependents_BirthDay]: dependent[Dependents_BirthDay],
            [Dependents_Name]: dependent[Dependents_Name],
            [Dependents_Sex]: dependent[Dependents_Sex],
            [Dependents_SSN]: dependent[Dependents_SSN],
            [Dependents_Benefits]: dependent[Dependents_Benefits],
            [Medical]: dependent[Medical],
            [Dental]: dependent[Dental],
            [Vision]: dependent[Vision],
            "Onboarding": id
        }
    }
    const url = `${Ninox_Database_URL}${Ninox_Dependents}`;
    const response = await axios.post(url, data, {
        headers: {
            'Authorization': `Bearer ${process.env.NINOX_KEY}`,
            'Content-Type': 'application/json'
        }
    })
    return response.data.id;
}
