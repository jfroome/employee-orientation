// Internal Apis
export const Api_Login = './api/auth/login'
export const Api_Insurance = './api/insurance'
export const Api_Deductions = './api/deductions'
export const Api_DrivingRecord = './api/drivingRecord'
export const Api_DirectDeposit = './api/directDeposit'
export const Api_DrugTest = './api/drugTest'
export const Api_EmergencyContact = './api/emergencyContactInfo'
export const Api_EmploymentEligibility = './api/employmentEligibility'
export const Api_Ethnicity = './api/ethnicity'
export const Api_Health = './api/health'
export const Api_Logout = './api/logout'
export const Api_Witholding = './api/witholding'
export const Api_Videos = './api/videos'
export const Api_Legal = './api/legal'
export const Api_PersonalInfo = './api/personalInfo'
export const Api_Dependents = './api/dependents'
export const Api_Finalize = './api/finalize'
export const Api_Completion = './api/completion'

// Files 
export const Api_Files_Signature = './api/files/signature'
export const Api_Files_Check = './api/files/check'
export const Api_Files_BirthCertificateSsn = './api/files/birthCertificateSsn'
export const Api_Files_License = './api/files/license'
export const Api_Files_BirthCertificate = './api/files/birthCertificate'
export const Api_Files_DriversLicence = './api/files/driversLicence'

// Ninox Apis
export const Ninox_Database_URL = 'http://localhost:3001/api/ninox'
export const Ninox_Onboarding_Records = '/Onboarding/records'
export const Ninox_Onboarding_Record = '/Onboarding/record'
export const Ninox_Email_Field_Id = 'U'
export const Ninox_Dependents_Field_Id = 'O1'
export const Ninox_Dependents = '/Dependent/records'

// Pages
export const Page_Login = '/login'
export const Page_Form = '/form'

// Tabs
// -- Personal Info
export const FirstName = 'FIRST NAME'
export const LastName = 'LAST NAME'
export const MiddleName = 'MIDDLE NAME'
export const Birthday = 'BirthDay'
export const MailingAddress = 'MailingAddress'
export const MailingCityStateZip = 'MailingCityStateZip'
export const PhysAddress = "PHYSICAL_ADDRESS"
export const PhysCityStateZip = "PHYSICAL CITY STATE, ZIP CODE"
export const HomePhone = 'HOME PHONE'
export const CellPhone = 'CELL_PHONE'
export const DriversLicenseNo = "DRIVERS LICENSE NO"
export const DriversLicenseState = "STATE ISSUED BY"
export const SocialSecurity = "SOCIAL SECURITY NUMBER"
export const Location = "LOCATION"
export const MailingSameAsPhys = "Is the Mailing the Same as the Physical Address"
export const CorrectInfo = "IS THE INFORMATION CORRECT"
export const Sex = "SEX"
export const Email = 'Email'
export const Signature = 'Signature'
export const SignatureFileName = 'Signature.png'
export const BirthCertificateFileName = 'BirthCertificateOrSSN.png'
export const DriversLicenseFileName = 'DriversLicense.png'
export const DateSigned = 'DATE SIGNED'

// -- Videos
export const VideosCompleted = 'VIDEOS_COMPLETED'

// -- Drug Test
export const Id = 'id'
export const OrientationDate = 'ORIENTATION_DATE'
export const StartTime = 'START_TIME'
export const EndTime = 'END_TIME'
export const DrugCheck = "DrugTestConfirmation"
export const DrugDateTime = "DrugTestDateTime"
export const DrugDOT = 'DOT'
export const DrugAudioSrc = './audio/DrugTest.mp3'

// -- Health
export const MedicalPlan = 'Medical Plan'
export const BasePlanPdf = ''
export const BuyUpPdf = ''
export const EmployeeCoverageSelection = 'CoverageSelected'
export const EmployeeBenefits = "MedDentalVisionEmployee"
export const AppOnly_EmployeeCoverageMedical = 'EmployeeMed'
export const AppOnly_EmployeeCoverageDental = 'EmployeeDen'
export const AppOnly_EmployeeCoverageVision = 'EmployeeVis'
export const SpouseEntered = 'Spouse Entered'
export const Dependents = 'DEPENDENT'
export const Dependent = 'Dependent'
export const Dependents_Name = 'NAME'
export const Dependents_BirthDay = 'DOB'
export const Dependents_Sex = 'SEX'
export const Dependents_Relation = 'RELATION'
export const Dependents_SSN = 'SocialSecurity'
export const Dependents_Benefits = 'BENEFITS'
export const Medical = 'Medical'
export const Dental = 'Dental'
export const Vision = 'Vision'
export const DependentObjectArray = 'DepObjArray'
export const HealthAudioSrc = './audio/Health.mp3'
export const HealthConfirm = 'HealthConfirmCheckbox'

// -- Insurance
export const InsuranceChoice = "InsuranceChoice"
export const InsuranceAudioSrc = './audio/Insurance.mp3'

// -- Direct Deposit
export const AccountType = 'Type of Account'
export const CheckOrDirectDeposit = 'CHECK OR DIRECT DEPOSIT'
export const CheckFileName = 'Check.png'

// -- Emergency Contact Info
export const EmergencyContactName = 'EMCONTACTNAME'
export const EmergencyContactRelationship = 'EmmRelationship'
export const EmergencyHomePhone = 'EMERGENCY_HOME_PHONE'
export const EmergencyCellPhone = 'EMERGENCY_CELL_PHONE'
export const EmergencyAddress = 'EMERGENCY_PHYSICAL_ADDRESS'
export const EmergencyCityStateZip = 'EMERGENCY_CITYSTATEZIP'

// -- Release of Info
export const ReleaseOfInfoConfirm = 'RELEASE_OF_INFO'

// -- Ethnicity
export const HispanicLatino = 'HISPANIC_LATINO'
export const Asian = 'ASIAN'
export const AfricanAmerican = 'AFRICAN_AMERICAN'
export const Hawaiian = 'HAWAIIAN_PACIFIC'
export const White = 'WHITE'
export const IndianNative = 'INDIAN_NATIVE'

// -- Employee Eligibility
export const Residency = 'RESIDENCY'
export const AlienRegNumber = 'ALIEN_REG_NUMBER'
export const I94AdmissionNumber = 'I94_ADMISSION_NUMBER'
export const ForeignPassportNumber = 'FOREIGN_PASSPORT_NUMBER'
export const CountryOfIssuance = 'COUNTRY_OF_ISSUANCE'
export const EligibilityConfirm = 'ELIGIBILITY_CONFIRM'

// -- Driving Record
export const VolunteerCheck = 'DRIVING_RECORD_VOLUNTEER_CHECK'
export const DrivingRecordConfirm = 'DRIVING_RECORD_CONFIRM'

// -- Witholding
export const Witholding_Residency = 'WITHOLDING_RESIDENCY'
export const Witholding_OtherIncome = 'WITHOLDING_4A_OTHER_INCOME'
export const Witholding_Deductions = 'WITHOLDING_4B_DEDUCTIONS'
export const Witholding_Extra = 'WITHOLDING_4C_EXTRA'
export const Witholding_2_JOBS = 'WITHOLDING_2_JOBS_CHECK'
export const Witholding_Dependents_Children = 'WITHOLDING_DEPENDENTS_CHILDREN'
export const Witholding_Dependents_Other = 'WITHOLDING_DEPENDENTS_OTHER'
export const Witholding_Dependents_Total = 'WITHOLDING_DEPENDENTS_TOTAL'
export const Witholding_Confirm = 'WITHOLDING_CONFIRM'

// -- Legal
export const LegalConfirm = 'LEGAL_CONFIRM'
export const HandbookUrl = ''
export const SafetyManualUrl = ''

// -- Submit

export const HasFinalized = 'HAS_FINALIZED_ONBOARDING_VIA_APP'
