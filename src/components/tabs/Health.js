import { FormControl, FormGroup, FormLabel, Grid, InputLabel, NativeSelect, Typography, Link, Alert } from "@mui/material";
import { useForm, useWatch } from "react-hook-form";
import AudioPlayer from "@/components/atomic/AudioPlayer";
import ControlledCheck from "@/components/atomic/ControlledCheck";
import ControlledRadioGroup from "@/components/atomic/ControlledRadioGroup";
import SaveResetNext from "@/components/atomic/SaveResetNext";
import PriceTable from "@/components/atomic/PriceTable";
import TabTitle from "@/components/atomic/TabTitle";
import { useEffect, useState } from "react";
import Dependant from "@/components/atomic/Dependant";
import DependantsTable from "@/components/atomic/DependantsTable";
import axios from "axios";
import { HealthConfirm, BuyUpPdf, BasePlanPdf, Api_Health, EmployeeCoverageSelection, Dental, DependentObjectArray, EmployeeBenefits, Medical, MedicalPlan, Vision, HealthAudioSrc } from "../../constants";
import LoadingIndicator from "../atomic/LoadingIndicator";
import { EncodeCoverage, DecodeCoverage } from "../../helpers";

export default function HealthBenefitEnrollment({ nextTab }) {
    const [tableLoading, setTableLoading] = useState(true);
    const [loading, setLoading] = useState(true);
    const [dependants, setDependants] = useState([]);
    const [showPlan, setShowPlan] = useState(true);
    const [showCheckError, setShowCheckError] = useState(false);
    const { register, getValues, control, watch, handleSubmit, setValue, reset, formState: { errors } } = useForm(
        {
            defaultValues: async () => { return await setInitialValues() }
        }
    );

    async function setInitialValues() {
        const result = await axios.get(Api_Health);
        const defaultValues = result.data.data;
        //console.log(defaultValues);
        const arr = DecodeCoverage(defaultValues[EmployeeBenefits]);
        setDependants(result.data.data[DependentObjectArray])
        defaultValues[Medical] = arr[Medical]
        defaultValues[Vision] = arr[Vision]
        defaultValues[Dental] = arr[Dental]
        if (defaultValues[EmployeeCoverageSelection] == 5)
            setShowPlan(false);
        else if (defaultValues[EmployeeCoverageSelection] === undefined)
            defaultValues[EmployeeCoverageSelection] = 1;
        setLoading(false);
        //console.log(defaultValues)
        return defaultValues;
    }

    const coverageType = useWatch({ control, name: EmployeeCoverageSelection })

    const onSubmit = async (data) => {
        if (data[HealthConfirm]) {
            setLoading(true);
            setTableLoading(true);
            data[DependentObjectArray] = dependants;
            data[EmployeeBenefits] = EncodeCoverage(
                data[Medical],
                data[Vision],
                data[Dental]
            )
            await axios.post(Api_Health, data).then(() => {
                nextTab();
            })
        }
        else {
            setShowCheckError(true);
        }
    }

    const handleCoverageChange = async (value) => {
        setTableLoading(true);
        setDependants([])
        setValue(EmployeeCoverageSelection, value)
        setTableLoading(false);
        if (value == 5) {
            setValue(MedicalPlan, '');
            setShowPlan(false);
        } else {
            setShowPlan(true);
        }
    }

    useEffect(() => {
        setTableLoading(true);
        setTableLoading(false);
    }, []);

    return (
        <>
            {loading ? <LoadingIndicator /> :
                <>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={2}>

                            <TabTitle title={'Health Benefit Enrollment'} />
                            <Grid item xs={12}>

                                <Typography variant={'h5'}>

                                </Typography>

                                <ControlledRadioGroup
                                    required={showPlan}
                                    disabled={!showPlan}
                                    title={'Medical Plan'}
                                    name={MedicalPlan}
                                    options={[
                                        { value: "Base Plan", label: 'Base Plan', disabled: !showPlan },
                                        { value: "Buy Up Plan", label: 'Buy Up Plan', disabled: !showPlan },
                                    ]}
                                    defaultValue={getValues(MedicalPlan)}
                                    control={control}
                                    row={true}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormLabel>{'Employee Selection'}</FormLabel>
                                <FormGroup row={true}>
                                    <ControlledCheck
                                        register={register}
                                        name={Medical}
                                        label={'Medical'}
                                        defaultChecked={getValues(Medical)}
                                        required={false}
                                    />
                                    <ControlledCheck
                                        register={register}
                                        name={Vision}
                                        label={'Vision'}
                                        defaultChecked={getValues(Vision)}
                                        required={false}
                                    />
                                    <ControlledCheck
                                        register={register}
                                        name={Dental}
                                        label={'Dental'}
                                        defaultChecked={getValues(Dental)}
                                        required={false}
                                    />
                                </FormGroup>
                            </Grid>
                            {
                                watch(MedicalPlan) === 'Buy Up Plan' ?
                                    <PriceTable /> : <></>
                            }
                            <Grid item xs={8}>
                                <FormControl fullWidth>
                                    <InputLabel variant="standard" htmlFor="coverage-dropdown">
                                        Coverage Elected
                                    </InputLabel>
                                    <NativeSelect
                                        disabled={tableLoading}
                                        defaultValue={getValues(EmployeeCoverageSelection)}
                                        inputProps={{
                                            name: EmployeeCoverageSelection,
                                            id: 'coverage-dropdown',
                                        }}
                                        //{...register(Coverage, {})}
                                        onChange={(e) => handleCoverageChange(e.target.value)}
                                    >
                                        <option value={1}>{'👷🏼‍♂️ - Employee Only'}</option>
                                        <option value={2}>{'👷🏼‍♂️🧍🏼‍♀️ - Employee + Child(ren)'}</option>
                                        <option value={3}>{'👷🏼‍♂️👱🏼‍♀️ - Employee + Spouse'}</option>
                                        <option value={4}>{'👷🏼‍♂️👱🏼‍♀️ 👫🏼 Family'}</option>
                                        <option value={5}>{'🚫 Waive Coverage'}</option>
                                    </NativeSelect>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <input id='hidden-submit' type='submit' hidden />
                            </Grid>
                        </Grid>
                    </form>
                </>
            }
            <Grid container spacing={2}>
                <Dependant
                    setDependants={setDependants}
                    dependants={dependants}
                    coverageType={coverageType}
                    tableLoading={tableLoading}
                    setTableLoading={setTableLoading}
                />
                <DependantsTable
                    dependants={dependants}
                    setDependants={setDependants}
                    tableLoading={tableLoading}
                    setTableLoading={setTableLoading}
                    coverageType={coverageType}
                />
                {loading ? <></> :
                    <>
                        <Grid item xs={12}>
                            <AudioPlayer src={HealthAudioSrc} />
                        </Grid>
                        {
                            
                            <Grid item xs={12}>

                            </Grid>
                        }

                        <Grid item xs={12}>
                            {showCheckError &&
                            <Alert severity="error">
                                        Please check the box below before continuing.
                                    </Alert>
                            }
                            <ControlledCheck
                                register={register}
                                name={HealthConfirm}
                                label={'I have completed entering my health benefits enrollment information.'}
                                defaultChecked={getValues(HealthConfirm)}
                            />
                        </Grid>
                        <SaveResetNext submitOnClick={() => {
                            document.getElementById("hidden-submit").click();
                        }} />
                    </>
                }
            </Grid>


        </>

    )
}