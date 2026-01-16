import { FormLabel, Grid, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import TabTitle from "@/components/atomic/TabTitle";
import SaveResetNext from "../atomic/SaveResetNext";
import ControlledCheck from "../atomic/ControlledCheck";
import React from 'react';
import axios from 'axios';
import ControlledRadioGroup from '@/components/atomic/ControlledRadioGroup';
import { AfricanAmerican, Api_Ethnicity, Asian, Hawaiian, HispanicLatino, IndianNative, White } from "../../constants";
import LoadingIndicator from "../atomic/LoadingIndicator";


export default function Ethnicity({ nextTab }) {

    const [loading, setLoading] = React.useState(true);

    const { register, handleSubmit, setValue, getValues, control, reset } = useForm({
        defaultValues: async () => {
            const defaultValues = await axios.get(Api_Ethnicity);
            setLoading(false);
            return defaultValues.data.data;
        }
    });

    const onSubmit = async data => {
        await axios.post(Api_Ethnicity, data).then(() => {
            nextTab();
        })

    }

    return (
        loading ?  <LoadingIndicator />: 
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TabTitle title={'ETHNICITY AND RACE IDENTIFICATION'} />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant={'body1'}>
                        <strong>Privacy Act Statement</strong><br />
                        Ethnicity and race information is requested under the authority of 42 U.S.C. Section 2000e-16 and in compliance
                        with the Office of Management and Budget&apos;s 1997 Revisions to the Standards for the Classification of Federal
                        Data on Race and Ethnicity. Providing this information is voluntary and has no impact on your employment
                        status, but in the instance of missing information, your employing agency will attempt to identify your race and
                        ethnicity by visual observation.<br /><br />
                        This information is used as necessary to plan for equal employment opportunity throughout the Federal
                        government. It is also used by the U.S. Office of Personnel Management or employing agency maintaining the
                        records to locate individuals for personnel research or survey response and in the production of summary
                        descriptive statistics and analytical studies in support of the function for which the records are collected and
                        maintained, or for related workforce studies.<br /><br />
                        Social Security Number (SSN) is requested under the authority of Executive Order 9397, which requires SSN be
                        used for the purpose of uniform, orderly administration of personnel records. Providing this information is
                        voluntary and failure to do so will have no effect on your employment status. If SSN is not provided, however,
                        other agency sources may be used to obtain it.<br /><br />
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <ControlledRadioGroup
                        title={'Are You Hispanic or Latino?  (A person of Cuban, Mexican, Puerto Rican, South or Central American, or other Spanish culture or origin, regardless of race.)'}
                        name={HispanicLatino}
                        options={[
                            { value: true, label: 'Yes' },
                            { value: false, label: 'No' }
                        ]}
                        control={control}
                        required={true}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormLabel>
                        Please select the racial category or categories with which you most closely identify by checking the appropriate
                        box. Check as many as apply:
                    </FormLabel>
                </Grid>
                <Grid item xs={12}>
                    <ControlledCheck
                        register={register}
                        name={IndianNative}
                        label={'American Indian or Alaska Native'}
                        defaultChecked={getValues(IndianNative)}
                        required={false}
                    />
                </Grid>
                <Grid item xs={12}>
                    <ControlledCheck
                        register={register}
                        name={Asian}
                        label={'Asian'}
                        defaultChecked={getValues(Asian)}
                        required={false}
                    />
                </Grid>
                <Grid item xs={12}>
                    <ControlledCheck
                        register={register}
                        name={AfricanAmerican}
                        label={'Black or African American'}
                        defaultChecked={getValues(AfricanAmerican)}
                        required={false}
                    />
                </Grid>
                <Grid item xs={12}>
                    <ControlledCheck
                        register={register}
                        name={Hawaiian}
                        label={'Native Hawaiian or Other Pacific Islander'}
                        defaultChecked={getValues(Hawaiian)}
                        required={false}
                    />
                </Grid>
                <Grid item xs={12}>
                    <ControlledCheck
                        register={register}
                        name={White}
                        label={'White'}
                        defaultChecked={getValues(White)}
                        required={false}
                    />
                </Grid>
                <SaveResetNext nextTab={nextTab} />
            </Grid>
        </form>
    );
}