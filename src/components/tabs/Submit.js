import { Alert, Button, Checkbox, FormControlLabel, Grid, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import TabTitle from "@/components/atomic/TabTitle";
import FormDivider from "../atomic/FormDivider";
import LoadingIndicator from "@/components/atomic/LoadingIndicator";
import { AccountType, DateSigned, HealthConfirm, InsuranceChoice, CheckOrDirectDeposit, DrivingRecordConfirm, DrugCheck, EligibilityConfirm, EmergencyContactName, LegalConfirm, VideosCompleted, Witholding_Confirm, Api_Completion } from "../../constants.mjs";
import { useState } from 'react'
import axios from 'axios';

export default function Submit({ logout }) {


    // [CorrectInfo]: data[CorrectInfo],
    // [DrugCheck]: data[DrugCheck],
    // [HealthConfirm]: data[HealthConfirm],
    // [InsuranceChoice]: data[InsuranceChoice],
    // [CheckOrDirectDeposit]: data[CheckOrDirectDeposit],
    // [EmergencyContactName]: data[EmergencyContactName],
    // [HispanicLatino]: data[HispanicLatino],
    // [EligibilityConfirm]: data[EligibilityConfirm],
    // [DrivingRecordConfirm]: data[DrivingRecordConfirm],
    // [Witholding_Confirm]: data[Witholding_Confirm],
    // [VideosCompleted]: data[VideosCompleted],
    // [LegalConfirm]: data[LegalConfirm]

    const [loading, setLoading] = useState(true);
    const [submittable, setSubmittable] = useState(false);

    const { handleSubmit, getValues } = useForm({
        defaultValues: async () => {
            const defaultValues = await axios(Api_Completion);
            setLoading(false);
            setSubmittable(tabsAreCompleted(defaultValues.data.data))
            //defaultValues.data.data[CheckOrDirectDeposit] = await axios(Api_Files_Check);
            //console.log(defaultValues.data.data)
            return defaultValues.data.data;
        }
    });

    const tabsAreCompleted = (data) => {
        return (
            nullEmptyUndefinedCheck(data[DateSigned]) &&
            nullEmptyUndefinedCheck(data[DrugCheck]) &&
            nullEmptyUndefinedCheck(data[HealthConfirm]) &&
            nullEmptyUndefinedCheck(data[InsuranceChoice]) &&
            nullEmptyUndefinedCheck(data[AccountType]) &&
            nullEmptyUndefinedCheck(data[EmergencyContactName]) &&
            nullEmptyUndefinedCheck(data[EligibilityConfirm]) &&
            nullEmptyUndefinedCheck(data[DrivingRecordConfirm]) &&
            nullEmptyUndefinedCheck(data[Witholding_Confirm]) &&
            nullEmptyUndefinedCheck(data[VideosCompleted]) &&
            nullEmptyUndefinedCheck(data[LegalConfirm])
        );
    }

    const onSubmit = () => {
        if (tabsAreCompleted)
            logout(true);
    }

    const nullEmptyUndefinedCheck = (value) => {
        return !(value === undefined || value === null || value === "");
    }

    return (
        loading ? <LoadingIndicator /> :
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TabTitle title={'Submit'} />
                    </Grid>
                    <FormDivider title={'Completed Tabs'} />
                    { submittable ?<Alert severity={'success'}>All tabs have been filled and you are now able to finalize your onboarding.</Alert> : <Alert severity={'warning'}>You must complete all tabs before finalizing your onboarding.</Alert>}
                    <Grid item xs={6}>
                        <FormControlLabel
                            control={<Checkbox defaultChecked={nullEmptyUndefinedCheck(getValues(DateSigned))} required={true} />}
                            label='Personal Info'
                            disabled={true}
                        />
                        <br />
                        <FormControlLabel
                            control={<Checkbox defaultChecked={nullEmptyUndefinedCheck(getValues(DrugCheck))} required={true} />}
                            label='Drug Test'
                            disabled={true}
                        />
                        <br />
                        <FormControlLabel
                            control={<Checkbox defaultChecked={nullEmptyUndefinedCheck(getValues(HealthConfirm))} required={true} />}
                            label='Health Benefit Enrollment'
                            disabled={true}
                        />
                        <br />
                        <FormControlLabel
                            control={<Checkbox defaultChecked={nullEmptyUndefinedCheck(getValues(InsuranceChoice))} required={true} />}
                            label='Insurance'
                            disabled={true}
                        />
                        <br />
                        <FormControlLabel
                            control={<Checkbox defaultChecked={nullEmptyUndefinedCheck(getValues(AccountType))} required={true} />}
                            label='Direct Deposit'
                            disabled={true}
                        />
                        <br />
                        <FormControlLabel
                            control={<Checkbox defaultChecked={nullEmptyUndefinedCheck(getValues(EmergencyContactName))} required={true} />}
                            label='Emergency Contact Info'
                            disabled={true}
                        />
                        <br />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControlLabel
                            control={<Checkbox defaultChecked={nullEmptyUndefinedCheck(getValues(EligibilityConfirm))} required={true} />}
                            label='Employee Eligibility'
                            disabled={true}
                        />
                        <br />
                        <FormControlLabel
                            control={<Checkbox defaultChecked={nullEmptyUndefinedCheck(getValues(DrivingRecordConfirm))} required={true} />}
                            label='Driving Record'
                            disabled={true}
                        />
                        <br />
                        <FormControlLabel
                            control={<Checkbox defaultChecked={nullEmptyUndefinedCheck(getValues(Witholding_Confirm))} required={true} />}
                            label='Witholding'
                            disabled={true}
                        />
                        <br />
                        <FormControlLabel
                            control={<Checkbox defaultChecked={nullEmptyUndefinedCheck(getValues(VideosCompleted))} required={true} />}
                            label='Videos'
                            disabled={true}
                        />
                        <br />
                        <FormControlLabel
                            control={<Checkbox defaultChecked={nullEmptyUndefinedCheck(getValues(LegalConfirm))} required={true} />}
                            label='Legal'
                            disabled={true}
                        />
                    </Grid>
                    <FormDivider />
                    <Grid item xs={12}>
                        <Typography variant={'body1'}>
                            <strong>Caution</strong>:
                            After clicking finalize below
                            you will not be able to login and change your onboarding details. <br />
                            Please be sure that you are ready to submit.
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControlLabel
                            disabled={!submittable}
                            control={<Checkbox defaultChecked={false} required={true} />}
                            label='I have confirmed that all information provided is correct.'
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button disabled={!submittable} type="submit" variant='contained'>Finalize & Logout</Button>
                    </Grid>
                </Grid>
            </form>

    );
}