import { Grid, Link, Typography, Alert } from "@mui/material";
import { useForm } from "react-hook-form";
import TabTitle from "@/components/atomic/TabTitle";
import SaveResetNext from "../atomic/SaveResetNext";
import ControlledCheck from "../atomic/ControlledCheck";
import React from 'react';
import axios from 'axios';
import ControlledRadioGroup from '@/components/atomic/ControlledRadioGroup';
import InputText from '../atomic/InputText';
import FormDivider from "../atomic/FormDivider";
import { Api_Witholding, FirstName, LastName, MiddleName, PhysAddress, PhysCityStateZip, SocialSecurity, Witholding_Confirm, Witholding_Deductions, Witholding_Dependents_Children, Witholding_Dependents_Other, Witholding_Dependents_Total, Witholding_Extra, Witholding_2_JOBS, Witholding_OtherIncome, Witholding_Residency } from "../../constants";
import LoadingIndicator from "../atomic/LoadingIndicator";
import ReadonlyData from "../atomic/ReadonlyData";



export default function Witholding({ nextTab }) {
    const [loading, setLoading] = React.useState(true);
    const [residencyError, setResidencyError] = React. useState(false);
    const { register, handleSubmit, getValues, control} = useForm({
        defaultValues: async () => {
            const defaultValues = await axios(Api_Witholding);
            setLoading(false);
            return defaultValues.data.data;
        }
    });

    const onSubmit = async data => {
        if ( data[Witholding_Residency] === undefined || data[Witholding_Residency] === "undefined") {
            setResidencyError(true);
            window.scrollTo(0, 0);
            return;
        }

        setResidencyError(false);
        await axios.post(Api_Witholding, data).then(() => {
            nextTab();
        })
    }

    return (
        loading ? <LoadingIndicator /> :
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TabTitle title={'Employee’s Withholding Certificate (Form W-4)'} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant={'body1'}>
                            Complete Form W-4 so that your employer can withhold the correct federal income tax from your pay.
                            Give Form W-4 to your employer.
                            Your withholding is subject to review by the IRS.
                        </Typography>
                    </Grid>
                    <FormDivider title={'Step 1: Personal Information'} />
                    <ReadonlyData
                        title={'First Name'}
                        value={getValues(FirstName)}
                        fieldSize={4}
                    />
                    <ReadonlyData
                        title={'Middle Name'}
                        value={getValues(MiddleName)}
                        fieldSize={4}
                    />
                    <ReadonlyData
                        title={'Last Name'}
                        value={getValues(LastName)}
                        fieldSize={4}
                    />
                    <ReadonlyData
                        title={'U.S. Social Security Number'}
                        value={getValues(SocialSecurity)}
                        fieldSize={4}
                    />
                    <ReadonlyData
                        title={'Address'}
                        value={getValues(PhysAddress)}
                        fieldSize={4}
                    />
                    <ReadonlyData
                        title={'City/Town, State, ZIP Code'}
                        value={getValues(PhysCityStateZip)}
                        fieldSize={4}
                    />

                    <Grid item xs={12} sx={residencyError && { border: 1, borderColor: "red", borderRadius: 5, padding: 5 }}>
                        {residencyError && <Alert onLoad={() => this.setFocus()} severity="error">Please select a residency option in order to proceed.</Alert>}
                        <ControlledRadioGroup
                            title={'Residency'}
                            name={Witholding_Residency}
                            control={control}
                            required={false}
                            options={[
                                { value: "Single", label: 'Single or Married filing Separately' },
                                { value: "Married", label: 'Married filing jointly or Qualifying surviving spouse' },
                                { value: "HeadOfHousehold", label: 'Head of household (Check only if you’re unmarried and pay more than half the costs of keeping up a home for yourself and a qualifying individual.)' }
                            ]}
                        />

                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant={'body1'}>
                            Complete Steps 2–4 ONLY if they apply to you; otherwise, skip to Step 5. See page 2 for more information on each step, who can
                            claim exemption from withholding, other details, and privacy.
                        </Typography>
                    </Grid>
                    <FormDivider title={'Step 2: Multiple Jobs or Spouse Works'} />
                    <Grid item xs={12}>
                        <Typography variant={'body1'}>
                            Complete this step if you (1) hold more than one job at a time, or (2) are married filing jointly and your spouse
                            also works. The correct amount of withholding depends on income earned from all of these jobs.
                            Do only one of the following.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant={'body1'}>
                            (a) Reserved for future use.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant={'body1'}>
                            (b) Use the Multiple Jobs Worksheet on page 3 (see <Link href='https://www.irs.gov/pub/irs-pdf/fw4.pdf' underline="hover" target="_blank" rel="noreferrer" sx={{ fontWeight: 'bold' }}>W4 Form on IRS.gov</Link> for the full form) and enter the result in Step 4(c) below; or<br />
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant={'body1'}>
                            (c) If there are only two jobs total, you may check this box. Do the same on Form W-4 for the other job. This
                            option is generally more accurate than (b) if pay at the lower paying job is more than half of the pay at the
                            higher paying job. Otherwise, (b) is more accurate.
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <ControlledCheck
                            register={register}
                            name={Witholding_2_JOBS}
                            label={'Check if there are only two jobs total (2c)'}
                            required={false}
                            defaultChecked={getValues(Witholding_2_JOBS)}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant={'body1'}>
                            Complete Steps 3–4 on Form W-4 for only ONE of these jobs. Leave those steps blank for the other jobs. (Your withholding will
                            be most accurate if you complete Steps 3–4 on the Form W-4 for the highest paying job.)
                        </Typography>
                    </Grid>
                    <FormDivider title={'Step 3: Claim Dependent and Other Credits'} />
                    <Grid item xs={6}>
                        <Typography variant={'body1'}>
                            If your total income will be $200,000 or less ($400,000 or less if married filing jointly):
                            Multiply the number of qualifying children under age 17 by $2,000:
                        </Typography>
                    </Grid>
                    <InputText
                        label={'Dependents: Children ($2000 per child)'}
                        name={Witholding_Dependents_Children}
                        register={register}
                        fieldSize={6}
                        adornment={'$'}
                        required={false}
                    />
                    <Grid item xs={6}>
                        <Typography variant={'body1'}>
                            Multiply the number of other dependents by $500:
                        </Typography>
                    </Grid>
                    <InputText
                        label={'Dependents: Other ($500 per Other)'}
                        name={Witholding_Dependents_Other}
                        register={register}
                        fieldSize={6}
                        adornment={'$'}
                        required={false}
                    />
                    <Grid item xs={6}>
                        <Typography variant={'body1'}>
                            Add the amounts above for qualifying children and other dependents. You may add to
                            this the amount of any other credits. Enter the total here:
                        </Typography>
                    </Grid>
                    <InputText
                        label={'Dependents: Total'}
                        name={Witholding_Dependents_Total}
                        register={register}
                        fieldSize={6}
                        adornment={'$'}
                        required={false}
                    />
                    <FormDivider title={'Step 4: (optional): Other Adjusments '} />
                    <Grid item xs={6}>
                        <Typography variant={'body1'}>
                            (a) Other income (not from jobs). If you want tax withheld for other income you
                            expect this year that won’t have withholding, enter the amount of other income here.
                            This may include interest, dividends, and retirement income.
                        </Typography>
                    </Grid>
                    <InputText
                        label={'4a - Other Income'}
                        name={Witholding_OtherIncome}
                        register={register}
                        fieldSize={6}
                        adornment={'$'}
                        required={false}
                        defaultValues={0}
                    />
                    <Grid item xs={6}>
                        <Typography variant={'body1'}>
                            (b) Deductions. If you expect to claim deductions other than the standard deduction and
                            want to reduce your withholding, use the Deductions Worksheet on page 3 and enter
                            the result here.
                        </Typography>
                    </Grid>
                    <InputText
                        label={'4b - Deductions'}
                        name={Witholding_Deductions}
                        register={register}
                        fieldSize={6}
                        adornment={'$'}
                        required={false}
                    />
                    <Grid item xs={6}>
                        <Typography variant={'body1'}>
                            (c) Extra withholding. Enter any additional tax you want withheld each pay period.
                        </Typography>
                    </Grid>
                    <InputText
                        label={'4c - Extra Witholding'}
                        name={Witholding_Extra}
                        register={register}
                        fieldSize={6}
                        adornment={'$'}
                        required={false}
                    />
                    <FormDivider title={'Step 5: Sign here by checking the box below.'} />
                    <Grid item xs={12}>
                        <ControlledCheck
                            register={register}
                            name={Witholding_Confirm}
                            label={'I have read, understand and can confirm that the above details are correct'}
                            defaultChecked={getValues(Witholding_Confirm)}
                        />
                    </Grid>
                    <SaveResetNext nextTab={nextTab} />
                </Grid>
            </form>
    );
}