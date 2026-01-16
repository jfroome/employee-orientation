import { Button, Card, CardContent, FormLabel, Grid, Typography } from "@mui/material";
import { useMemo, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import ControlledCheck from "./ControlledCheck";
import InputText from "./InputText";
import NonRegisteredRadio from "./NonRegisteredRadio";
import { Dental, Dependents_Benefits, Dependents_BirthDay, Dependents_Name, Dependents_Relation, Dependents_SSN, Dependents_Sex, Medical, Vision } from "../../constants";
import { EncodeCoverage } from "../../helpers";


export default function Dependant({ dependants, setDependants, coverageType, tableLoading, setTableLoading }) {

    const { register, setValue, handleSubmit, reset } = useForm({});
    const [sex, setSex] = useState('');
    const [relation, setRelation] = useState('');

    useEffect(() => {
        setDependants([])
        setRelation('')
        setSex('')
        reset()
        // this actually works, but eslint is flagging it because it doesn't know coverageType will change over time
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    // https://codesandbox.io/s/react-hook-form-nested-portal-bw8m75?file=/src/App.tsx:2262-2517
    // Prevent submit button click bubbling up to parent...
    const add = async (dependent) => {
        setTableLoading(true);
        //dependants.push(dependent);
        dependent[Dependents_Relation] = relation;
        dependent[Dependents_Sex] = sex;
        dependent[Dependents_Benefits] = EncodeCoverage(
            dependent[Medical], dependent[Dental], dependent[Vision]
        )
        const newArray = [...dependants];
        newArray.push(dependent);
        setDependants(newArray);
        reset();
        setTableLoading(false);
    };

    const spouseExists = function () {
        var spouseExists = false;
        dependants.map((dep) => { if (dep[Dependents_Relation] === 'Spouse') spouseExists = true; })
        return spouseExists;
    }(); // immediately invoked on every render

    
    useEffect(()=> { 
        if(spouseExists) setRelation('Child');
    },[spouseExists])

    const handleSubmitWithoutPropagation = (e) => {
        e.preventDefault();
        e.stopPropagation();
        handleSubmit(add)(e);
    };


    const [showDependent, setShowDependent] = useState(false)

    useEffect(()=>{
        setShowDependent(coverageType > 1 && coverageType < 5);
    }, [coverageType])

    return (
        !showDependent || tableLoading ? <></> : 
        <Grid item xs={12}>
            {spouseExists && coverageType.toString() === '3' ? <></> :
                <Card>
                    <CardContent>
                        <form onSubmit={handleSubmitWithoutPropagation}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography variant={'h5'}>Dependant Information</Typography>
                                </Grid>

                                <NonRegisteredRadio
                                    label={'Relation'}
                                    spouseExists 
                                    options={[
                                        {
                                            'value': 'Spouse',
                                            'label': 'Spouse', 
                                            'disabled': spouseExists || coverageType.toString() === '2'
                                        },
                                        {
                                            'value': 'Child',
                                            'label': 'Child',
                                            'disabled': coverageType.toString() === '3'
                                        }]
                                        }
                                    row={true}
                                    value={relation}
                                    setValue={setRelation}
                                    setFormValue={setValue}
                                    fieldSize={12}
                                    required={true}
                                    disabled={tableLoading}
                                />

                                <NonRegisteredRadio
                                    label={'Sex'}
                                    options={[{ 'value': 'Female', 'label': 'Female' }, { 'value': 'Male', 'label': 'Male' }]}
                                    row={true}
                                    value={sex}
                                    setValue={setSex}
                                    setFormValue={setValue}
                                    required={true}
                                    fieldSize={12}
                                    disabled={tableLoading}
                                />

                                <InputText
                                    type='text'
                                    name={Dependents_Name}
                                    label='Name'
                                    required={true}
                                    register={register}
                                    fieldSize={12}
                                    disabled={tableLoading}
                                />
                                <InputText
                                    type='date'
                                    name={Dependents_BirthDay}
                                    label='Birthdate'
                                    required={true}
                                    register={register}
                                    fieldSize={12}
                                    disabled={tableLoading}
                                />

                                <InputText
                                    type='text'
                                    name={Dependents_SSN}
                                    label='Social Security Number'
                                    required={false}
                                    register={register}
                                    fieldSize={12}
                                    disabled={tableLoading}
                                />
                                <Grid item xs={12} spacing={0}>
                                    <FormLabel>Dependant Coverage</FormLabel>
                                </Grid>
                                <Grid item xs={12} spacing={0}>
                                    <ControlledCheck
                                        label={'Medical'}
                                        name={Medical}
                                        defaultChecked={true}
                                        register={register}
                                        disabled={tableLoading}
                                        required={false}
                                    />
                                    <ControlledCheck
                                        label={'Vision'}
                                        name={Vision}
                                        defaultChecked={true}
                                        register={register}
                                        disabled={tableLoading}
                                        required={false}
                                    />
                                    <ControlledCheck
                                        label={'Dental'}
                                        name={Dental}
                                        defaultChecked={true}
                                        register={register}
                                        disabled={tableLoading}
                                        required={false}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button type='submit' variant={'outlined'} disabled={tableLoading}>Add Dependant</Button>
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                </Card>
            }
        </Grid>
    )
}