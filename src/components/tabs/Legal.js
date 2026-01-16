import { Grid, Link, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import TabTitle from "@/components/atomic/TabTitle";
import SaveResetNext from "../atomic/SaveResetNext";
import ControlledCheck from "../atomic/ControlledCheck";
import React from 'react';
import axios from 'axios';
import { LegalConfirm, FirstName, LastName, Api_Legal } from "../../constants";
import LoadingIndicator from "../atomic/LoadingIndicator";



export default function Legal({ nextTab }) {

    const [loading, setLoading] = React.useState(true);

    const { handleSubmit, getValues, register, setValue, control } = useForm({
        defaultValues: async () => {
            const defaultValues = await axios(Api_Legal);
            setLoading(false);
            return defaultValues.data.data;
        }
    });

    const onSubmit = async data => {
        await axios.post(Api_Legal, data).then(() => {
            nextTab();
        });
    }

    return (
        loading ? <LoadingIndicator /> :
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TabTitle title={'Legal Agreements'} />
                    </Grid>
                    <Grid item xs={12}>
                        <TabTitle title={'Certificate of Receipt'} variant={'h5'}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant={'body1'}>
                            I certify that I have received written educational materials that explain the requirements of the
                            Loss Prevention Policy/Safety & Health Orientation, Spill Response Plan, Fleet Operations &
                            Driver Guidelines, Hazard Assessment Program, Lock-out/Tag-out Program, and Hazard
                            Communication Program.<br /><br />
                            I have also received a company employee handbook, educational materials that explain the
                            requirements of the Department of Transportation Drug and Alcohol Rules and Regulations as
                            well as the company's Drug and Alcohol Policy and Procedures with respect to meeting those
                            requirements.<br /><br />
                            I understand the Company reserves all rights necessary to the efficient and orderly
                            management of their business. The Handbook is intended to be a guideline to its practices, not
                            a contract. It may become necessary for the Company to change this Handbook and its policies
                            from time to time.<br /><br />
                            I have carefully read and understand the policies and rules outlined in this Handbook. I
                            recognize my employment and compensation can be terminated with or without notices, at any
                            time, at the discretion of either the Company or myself.<br /><br />
                            I also understand that no one other than an Officer of the Company has any authority to enter
                            into any agreement for employment for any specified period of time, to assure me of any future
                            position, benefits, or terms or conditions of employments, or to make any promises contrary or
                            in addition to this Handbook. Any past or future promises contrary or in any way different from
                            this Handbook, including my right and the right of the Company to terminate our relationship at
                            our individual discretion must be in writing, signed and dated by an Officer of the Company an
                            me.<br /><br />
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TabTitle title={'Request and Agreement to Waive Meal Periods'} variant={'h5'}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant={'body1'}>
                            This agreement is made between {getValues(FirstName)} {getValues(LastName)} and the Company.<br /><br />
                            The Company understands that there are some employees that would rather work through their
                            meal periods and not stop for lunch. Although we encourage employees to take all their
                            breaks, we allow employees to request to waive their meal break when permissible by law.<br /><br />
                            This agreement serves as the employee’s written request to waive meal periods as set forth,
                            and the employee certifies the following:<br /><br />
                            I am entitled to receive an unpaid meal period of not less than 30 minutes
                            during which I am relieved of all duties for each work period longer than 5 hours.<br /><br />
                            In addition, I understand that I am entitled to receive a paid rest period of not less than ten
                            minutes for every four hours worked in one work period;<br /><br />
                            I am at least 18 years of age;<br /><br />
                            I request to waive meal periods to which I am entitled under the law;<br /><br />
                            I make this request voluntarily and have not been required or coerced by any person to waive
                            the meal periods to which I am entitled;<br /><br />
                            I understand that by waiving my meal period I will not be relieved of all duty;<br /><br />
                            I understand that I may not waive the ten-minute rest periods to which I am entitled by law;<br /><br />
                            I understand that this waiver will remain in force until I issue a written statement to cancel.
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <TabTitle title={'AUTHORIZATIONS AND RELEASE OF INFORMATION'} variant={'h5'}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant={'body1'}>
                            Health information is protected by federal law and disclosure of personal medical information is strictly regulated.<br />
                            CAS - COASTAL ADMINISTRATIVE SERVICES considers the protection of your confidential information our highest priority.
                            As required by the United States Department of Health and Human Services, we must inform you of the following information:
                            <ol>
                                <li>
                                    Protected information may be used and disclosed to carry out treatment, payment, or health care operations.
                                </li>
                                <li>This Employee Benefit Welfare Plan, in order to disclose protected health information to the Plan Sponsor, must ensure that
                                    the plan documents restrict use and disclosure of such information by the Plan Administrator consistent with the law.</li>
                                <li>CAS may disclose summary health information to the Plan Sponsor, if the Plan Sponsor requests the summary health
                                    information for the purpose of:
                                    (a) Obtaining premium bids form health plans for providing health insurance coverage under the group health plan; or
                                    (b) Modifying, amending, or terminating the group health plan.</li>
                                <li>You have the right to request that CAS restrict how protected health information is used or disclosed to carry out treatment,
                                    payment, or health care operations.
                                    (a) CAS is not required to agree to requested restrictions; and
                                    (b) if CAS agrees to the requested restriction, the restriction is binding.</li>
                                <li>As permitted by law, this Employee Benefit Welfare Plan requires consent from all Subscribers as a condition of coverage,
                                    for the use and disclosure of personal medical information in order to carry out treatment, payment or health care operations.</li>
                                <li>The Subscriber has the right to revoke this consent in writing except to the extent that CAS has taken action in reliance on
                                    this consent. A written revocation must be signed by the Subscriber and dated.</li>
                                <li>A more complete description of such uses and disclosure titled MEDICAL INFORMATION PRIVACY NOTICE is available.
                                    Subscribers have a right to review the document prior signing this consent.</li>
                                <li>CAS reserves the right to change its privacy practices and the MEDICAL INFORMATION PRIVACY NOTICE in accordance
                                    with the law. Revised notices are available from: CAS - COASTAL ADMINISTRATIVE SERVICES, P.O. Box 3070,
                                    Bellingham, WA 98227</li>
                            </ol>
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TabTitle title={'Payroll Deduction Authorization'} variant={'h5'}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant={'body1'}>
                            I, {getValues(FirstName)} {getValues(LastName)}, have authorized my employer to deduct any of
                            the following payroll deductions that I have signed up for or that pertain to me:
                            <ul>
                                <li>401(k) Deferral Contribution</li>
                                <li>Health Insurance (employee portion)</li>
                                <li>Insurance</li>
                                <li>Child Support Garnishment</li>

                                <li>Court Ordered Wage Deductions</li>
                            </ul>
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <ControlledCheck
                            register={register}
                            name={LegalConfirm}
                            label={'I have read, understand and agree to the above statements'}
                            defaultChecked={getValues(LegalConfirm)}
                        />
                    </Grid>
                    <SaveResetNext nextTab={nextTab} />
                </Grid>
            </form>
    );
}