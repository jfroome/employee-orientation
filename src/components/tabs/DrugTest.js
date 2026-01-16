import {
  Grid, FormControlLabel,
  Checkbox,
  Typography
} from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import AudioPlayer from '@/components/atomic/AudioPlayer'
import InputText from '@/components/atomic/InputText'
import LoadingIndicator from '@/components/atomic/LoadingIndicator'
import SaveResetNext from '@/components/atomic/SaveResetNext'
import { DrugAudioSrc, DrugCheck, DrugDOT, DrugDateTime, OrientationDate, StartTime, EndTime, Api_DrugTest } from '../../constants'
import { handleNinoxDateTimeBS } from '../../helpers'

export default function DrugTest({ nextTab }) {
  const [loading, setLoading] = React.useState(true);
  const drugTimeOffset = 420; // for some reason Ninox handles these datetimes differently.
  const startEndOffset = 720; // for example, start_time comes in at 00:30 for 8:30 AM and end_time comes in at 3:30 for 11:30 AM

  const {
    register,
    handleSubmit,
    getValues
  } = useForm({
    defaultValues: async () => {
      const defaultValues = await axios(Api_DrugTest)
      const data = defaultValues.data.data

      if(data[StartTime] !== undefined){
        data[StartTime] = handleNinoxDateTimeBS(data[StartTime],"in", startEndOffset)
      }else{
        data[StartTime] = "08:00:00";
      }

      if(data[EndTime] !== undefined){
        data[EndTime] = handleNinoxDateTimeBS(data[EndTime], "in", startEndOffset)
      }else{
        data[EndTime] = "11:00:00";
      }

      if (data[DrugDateTime] !== undefined) {
        data["drugDate"] = data[DrugDateTime].split('T')[0]
        data["drugTime"] = handleNinoxDateTimeBS(data[DrugDateTime].split('T')[1], "in", drugTimeOffset)
      }else{
        const date = new Date();
        date.setDate(date.getDate() + 1) // default to tomorrow
        data["drugDate"] = date.toISOString().split('T')[0]
        data["drugTime"] = "09:00:00" // default to 9am
      }
      setLoading(false);
      return data
    }
  })




  const onSubmit = async data => {
    const drugDate = `${data.drugDate}T${handleNinoxDateTimeBS(data.drugTime, "out", drugTimeOffset)}`;
    data[DrugDateTime] = drugDate;
    await axios.post(Api_DrugTest, data).then(() => {
      nextTab();
    })
  }

  const onReset = () => { }
  return (
    <>
      {loading ?
        <LoadingIndicator />
        :
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='h3'>Drug Test</Typography>
            </Grid>
            <Grid item xs={12}>
              <h4>Controlled Substance Test Notification </h4>
              Pre-employment drug testing is an essential component of the hiring process, ensuring a safe and productive work environment. Candidates are required to undergo a drug screening as part of their orientation process. The drug test will be administered on the date of your orientation. This notice serves as notification pursuant to Part 382 of the Federal Motor Carrier Safety Administration (FMCSA) regulations regarding controlled substances and alcohol testing.  <p> </p>
             
              Reason for the Test: <p><h4>Pre - Employment </h4></p>
              DOT or Non-DOT: <p><h4>
                {
                  getValues(DrugDOT) ? 'DOT' : 'Non-DOT'
                }
              </h4></p><p> Type of Test </p><p><h4>CONTROLLED SUBSTANCE </h4></p>
              By checking the box below, I understand that the above test is required as a condition of employment.<br />
            </Grid>

            <AudioPlayer src={DrugAudioSrc} />
            <Grid item xs={12}>
              {/* <FormControlLabel
                control={<Checkbox {...register(DrugCheck, {
                  validate: (value) => value === true
                })} required={true} />}
                label={DrugCheck}
              /> */}
              <FormControlLabel
                control={
                  <Checkbox
                    {...register(DrugCheck, {
                      required: true
                    })}
                    required={true}
                    defaultChecked={getValues(DrugCheck)}
                  />
                }
                label={'I understand that testing is required as a condition of my employment.'}
              />
            </Grid>
            <SaveResetNext onReset={onReset} />
          </Grid>
        </form>
      }
    </>
  )
}
