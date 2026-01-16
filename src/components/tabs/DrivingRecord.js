import { Card, CardContent, Grid, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import TabTitle from "@/components/atomic/TabTitle";
import SaveResetNext from "../atomic/SaveResetNext";
import ControlledCheck from "../atomic/ControlledCheck";
import React from 'react';
import axios from 'axios';
import ReadonlyData from "@/components/atomic/ReadonlyData";
import { Api_DrivingRecord, Birthday, DriversLicenseNo, DrivingRecordConfirm, VolunteerCheck } from "../../constants";
import ReadonlyCheck from "../atomic/ReadonlyCheck";
import LoadingIndicator from "../atomic/LoadingIndicator";



export default function DrivingRecord({ nextTab }) {

    const [loading, setLoading] = React.useState(true);

    const { register, handleSubmit, setValue, getValues, control, reset } = useForm({
        defaultValues: async () => {
            const defaultValues = await axios(Api_DrivingRecord);
            setLoading(false);
            return defaultValues.data.data;
        }
    });

    const onSubmit = async data => {
        await axios.post(Api_DrivingRecord, data).then(() => {
            nextTab();
        })
    }

    return (
        loading ? <LoadingIndicator /> :
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TabTitle title={'Driving Record - Release of Interest'} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant={'body1'}>
                            Employers, prospective employers, volunteer organizations, or their agent can get driving records for an employee,
                            prospective employee, or volunteer when authorized. Use this form to get their authorization.<br />
                            <ul>
                                <li>Complete the Company section.</li>
                                <li>Give this form to your employee, prospective employee, or volunteer to complete their section.</li>
                                <li>For audit purposes, keep this completed form in your files for at least two years. Do not mail it to the Department of Licensing.</li>
                            </ul>
                            Sealed juvenile records. Information contained in a driving record related to a sealed juvenile record may not be used for
                            any purpose unless required by federal law. The employee or prospective employee may furnish a copy of the court order
                            sealing the juvenile record to the employer, prospective employer, or their agent.
                        </Typography>
                    </Grid>

                    <Card>
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography variant={'h5'}>
                                        <strong>Company Section</strong>
                                    </Typography>
                                </Grid>
                                <ReadonlyData
                                    title={'Company Name'}
                                    value={'Company Name'}
                                    fieldSize={3}
                                />
                                <ReadonlyData
                                    title={'Company Address'}
                                    value={'Enter company address'}
                                    fieldSize={3}
                                />
                                <ReadonlyData
                                    title={'Authorized Representative Name'}
                                    value={'Enter representative name'}
                                    fieldSize={3}
                                />
                                <ReadonlyData
                                    title={'Title'}
                                    value={'Enter title'}
                                    fieldSize={3}
                                />
                                <ReadonlyData
                                    title={'Is this company an employer, prospective employer, or volunteer organization of the individual whose driving record is being requested?'}
                                    value={'Yes'}
                                    fieldSize={12}
                                />
                                <ReadonlyData
                                    title={'Is the record you are requesting necessary for employment purposes related to driving by the employee or prospective employee as a condtion of employment or related to driving by the volunteer at the direction of the volunteer organization?'}
                                    value={'Yes'}
                                    fieldSize={12}
                                />
                                <ReadonlyData
                                    title={'Do you agree to use the information contained in the record exclusively for this purpose and not divulge it to a third party?'}
                                    value={'Yes'}
                                    fieldSize={12}
                                />
                                <ReadonlyData
                                    title={'Do you agree to hold harmless the Department of Licensing for all matters relating to the release of the requested driving record?'}
                                    value={'Yes'}
                                    fieldSize={12}
                                />
                            </Grid>
                        </CardContent>
                    </Card>
                    <Grid item xs={12}>
                        <Typography variant={'h5'}>
                            <strong>Employee Section</strong>
                        </Typography>
                    </Grid>
                    <ReadonlyData
                        title={'Date of Birth'}
                        value={getValues(Birthday)}
                        fieldSize={4}
                    />
                    <ReadonlyData
                        title={'Driver\'s License Number'}
                        value={getValues(DriversLicenseNo)}
                        fieldSize={4}
                    />
                    <Grid item xs={12}>
                        <ReadonlyCheck
                            label={'Employee – for release of my driving record for employment purposes, at my employer’s discretion for the full term of my employment'}
                            defaultChecked={true}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <ReadonlyCheck
                            label={'Prospective employee – for release of my driving record for employment purposes, not to exceed 30 days from date signed'}
                            defaultChecked={true}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <ControlledCheck
                            register={register}
                            name={VolunteerCheck}
                            label={'Volunteer – for release of my driving record for a position applied for that requires me driving at the direction of the volunteer organization'}
                            defaultChecked={getValues(VolunteerCheck)}
                            required={false}
                        />
                    </Grid>
                    <ReadonlyData
                        title={'Company Name'}
                        value={'Company Name'}
                        fieldSize={12}
                        row={true}
                    />
                    <Grid item xs={12}>
                        <ControlledCheck
                            register={register}
                            name={DrivingRecordConfirm}
                            label={'I am an employee, prospective employee, or volunteer of the company named above and I request that a copy of my driving record be sent to them/their agent.'}
                            defaultChecked={getValues(DrivingRecordConfirm)}
                        />
                    </Grid>
                    <SaveResetNext nextTab={nextTab} />
                </Grid>
            </form>
    );
}