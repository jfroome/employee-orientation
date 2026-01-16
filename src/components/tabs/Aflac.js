import { Grid } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { Box } from '@mui/system'
import AudioPlayer from '../atomic/AudioPlayer'
import ControlledRadioGroup from '../atomic/ControlledRadioGroup'
import LoadingIndicator from '../atomic/LoadingIndicator'
import SaveResetNext from '../atomic/SaveResetNext'
import TabTitle from '../atomic/TabTitle'
import { InsuranceAudioSrc, InsuranceChoice, Api_Insurance } from '../../constants'


export default function Insurance({ nextTab }) {
  const [loading, setLoading] = React.useState(true);
  const {
    handleSubmit,
    getValues,
    control,
    reset
  } = useForm({
    defaultValues: async () => {
      const defaultValues = await axios.get(Api_Insurance)
      setLoading(false);
      return defaultValues.data.data;
    }
  })

  const onSubmit = async data => {
    await axios.post(Api_Insurance, data).then(() => {
      nextTab();
    })
  }
  const onReset = () => { reset(); }
  return (
    <>
      {loading ?
        <LoadingIndicator /> :
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <TabTitle title={'Insurance'} />
            <Grid item xs={12}>
              {/*client specified html*/}
              <center>
                <Box
                  component="img"
                  sx={{
                    maxHeight: { xs: 200, md: 200 }
                  }}
                  alt="Insurance logo"
                  src={'/images/insurance.png'}
                />
                <p><strong><span style={{ color: 'DodgerBlue', fontSize: '24px' }}>Insurance</span></strong> provides <span style={{ color: 'red' }}>CASH BENEFITS </span>directly to you when you need them most!!<br />
                  Listed below are some of the benefits Insurance provides.
                  If you're interested in Insurance, <br />our friendly agent Don Clay will contact you to discuss your options in detail.</p>

                <p><b>ACCIDENT</b> – Pays a minimum $120 for Accident Visit – most frequently used policy – GREAT for kids! </p>
                <p><b>DISABILITY</b> – Pays if you can’t work due to injury, sickness or maternity (Very important in WA & OR)  </p>
                <p><b>CANCER PLAN</b> – Children are covered for free & annual wellness benefits – most important !!  </p>
                <p><b>HEART ATTACK/ STROKE / COMA</b> – $5,000 First Occurrence & daily hospitalization   </p>
                <p><b>HOSPITAL PLAN</b> – Pays Daily, Surgical & Maternity Benefits – Great for deductibles  </p>
                <p><b>DENTAL</b> – Pays toward cleaning, X-rays, fillings, root canals & crowns </p>
                <p><b>VISION</b> – Supplement or Primary, helps with exams & materials</p>
                <p><b>LIFE INSURANCE </b>- $5,000 to $250,000 * 10, 20 & 30 year term options</p>
              </center>
              {/*end of client specified html*/}
            </Grid>
            <Grid item xs={12}>
              <ControlledRadioGroup
                title={'Agreement'}
                name={InsuranceChoice}
                options={[
                  { value: 'I am interested in learning more, please contact me.', label: 'I am interested in learning more, please contact me.' },
                  { value: ' I am not interested in adding any voluntary benefit programs at this time.', label: 'I am not interested in adding any voluntary benefit programs at this time' },
                ]}
                defaultValue={getValues(InsuranceChoice)}
                control={control}
              />
            </Grid>
            <Grid item xs={12}>
              <AudioPlayer src={InsuranceAudioSrc} />
            </Grid>
            <SaveResetNext onReset={onReset} />
          </Grid>
        </form>}
    </>
  )
}
