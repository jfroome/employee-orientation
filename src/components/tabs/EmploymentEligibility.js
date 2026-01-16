import { Grid, Typography } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import ControlledRadioGroup from '@/components/atomic/ControlledRadioGroup'
import LoadingIndicator from '@/components/atomic/LoadingIndicator'
import SaveResetNext from '@/components/atomic/SaveResetNext'
import TabTitle from '@/components/atomic/TabTitle'
import ControlledCheck from '../atomic/ControlledCheck'
import { AlienRegNumber, Api_EmploymentEligibility, CountryOfIssuance, EligibilityConfirm, ForeignPassportNumber, I94AdmissionNumber, Residency } from '../../constants'
import InputText from '../atomic/InputText'

export default function EmploymentEligibility({ nextTab }) {
    const [loading, setLoading] = React.useState(true);
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        control,
        reset,
        watch
    } = useForm({
        defaultValues: async () => {
            const defaultValues = await axios.get(Api_EmploymentEligibility)
            setLoading(false);
            return defaultValues.data.data;
        }
    })

    const onSubmit = async data => {
        await axios.post(Api_EmploymentEligibility, data).then(() => {
            nextTab();
        })
    }
    const onReset = () => { reset(); }
    return (
        loading ? <LoadingIndicator /> :
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <TabTitle title={'Employee Eligibility'} />
                    <Grid item xs={12}>
                        <Typography variant={'body1'}>
                            Read instructions carefully before completing this form. The instructions must be available, either in paper or electronically,
                            during completion of this form. Employers are liable for errors in the completion of this form.<br /><br />
                            <strong>ANTI-DISCRIMINATION NOTICE:</strong><br />

                            It is illegal to discriminate against work-authorized individuals. Employers CANNOT specify which document(s) an
                            employee may present to establish employment authorization and identity. The refusal to hire or continue to employ an individual because the
                            documentation presented has a future expiration date may also constitute illegal discrimination.<br />

                            Section 1. Employee Information and Attestation (Employees must complete and sign Section 1 of Form I-9 no later
                            than the first day of employment, but not before accepting a job offer.)<br /><br />
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant={'body1'}>
                            I am aware that federal law provides for imprisonment and/or fines for false statements or use of false documents in
                            connection with the completion of this form.
                            I attest, under penalty of perjury, that I am (check one of the following boxes):
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <ControlledRadioGroup
                            title={'Residency'}
                            name={Residency}
                            options={[
                                { value: "Citizen", label: 'A citizen of the United States' },
                                { value: "Noncitizen", label: 'A noncitizen national of the United States (See instructions)' },
                                { value: "LawfulPermResident", label: 'A lawful permanent resident (Alien Registration Number/USCIS Number):' }, // show alien registration/uscis number
                                { value: "AuthorizedAlien", label: 'An alien authorized to work until (See instructions)(expiration date, if applicable, mm/dd/yyyy):' }, // show expiry date field, or NA
                            ]}
                            defaultValue={getValues(Residency)}
                            control={control}
                            required={true}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant={'body1'}>
                            Aliens authorized to work must provide only one of the following document numbers to complete Form I-9:<br />
                            An Alien Registration Number/USCIS Number OR Form I-94 Admission Number OR Foreign Passport Number.<br />
                        </Typography>
                    </Grid>
                    {watch(Residency) !== "LawfulPermResident" ? <></> :

                        <InputText
                            label={'Alien Registration Number/USCIS Number'}
                            type='text'
                            register={register}
                            required={false}
                            name={AlienRegNumber}
                            fieldSize={6}
                            hidden={watch(Residency) === "4"}
                        />
                    }
                    {watch(Residency) !== "AuthorizedAlien" ? <></> :
                        <>
                            <InputText
                                label={'Alien Registration Number/USCIS Number'}
                                type='text'
                                register={register}
                                required={false}
                                name={AlienRegNumber}
                                fieldSize={6}
                                hidden={watch(Residency) === "4"}
                            />
                            <Grid item xs={12}>
                                <Typography variant={'body1'}>
                                    OR<br />
                                </Typography></Grid>
                            <InputText
                                label={'Form I-94 Admission Number'}
                                type='text'
                                register={register}
                                required={false}
                                name={I94AdmissionNumber}
                                fieldSize={6}
                                hidden={watch(Residency) === "4"}
                            />
                            <Grid item xs={12}>
                                <Typography variant={'body1'}>
                                    OR<br />
                                </Typography></Grid>
                            <InputText
                                label={'Foreign Passport Number'}
                                type='text'
                                register={register}
                                required={false}
                                name={ForeignPassportNumber}
                                fieldSize={6}
                                hidden={watch(Residency) === "4"}
                            />
                            <InputText
                                label={'Country of Issuance'}
                                type='text'
                                register={register}
                                required={false}
                                name={CountryOfIssuance}
                                fieldSize={6}
                                hidden={watch(Residency) === "4"}
                            />
                        </>
                    }
                    <Grid item xs={12}>
                        <ControlledCheck
                            register={register}
                            name={EligibilityConfirm}
                            label={'I agree that all data above is true and by checking this box I am applying my signature to the Form I-9'}
                            defaultChecked={getValues(EligibilityConfirm)}
                        />
                    </Grid>
                    <SaveResetNext onReset={onReset} />
                </Grid>
            </form >
    )
}
