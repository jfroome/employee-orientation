import {
  Grid,
  Typography
} from '@mui/material';
import LoadingIndicator from '@/components/atomic/LoadingIndicator';
import React from 'react';
import SaveResetNext from '@/components/atomic/SaveResetNext';
import { useForm } from 'react-hook-form';
import { Api_Videos, VideosCompleted } from '../../constants';
import ControlledCheck from '../atomic/ControlledCheck';
import axios from 'axios';

export default function Videos({ nextTab }) {
  const [loading, setLoading] = React.useState(true);

  const { handleSubmit, reset, register, getValues } = useForm({
    defaultValues: async () => {
      const defaultValues = await axios(Api_Videos);
      setLoading(false);
      return defaultValues.data.data;
    }
  });

  const onSubmit = async (data) => {
    await axios.post(Api_Videos, data).then(() => {
      nextTab();
    })
  }
  const onReset = () => { reset(); }
  return (
    loading ? <LoadingIndicator /> :
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant='h4'>Videos</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='body1'>
              Please watch the required orientation videos provided by your company. 
              Once you have completed all videos, check the box below to confirm.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <ControlledCheck
              register={register}
              name={VideosCompleted}
              label={'I have completed all of the required educational videos'}
              defaultChecked={getValues(VideosCompleted)}
            />
          </Grid>
          <SaveResetNext onReset={onReset} />
        </Grid>
      </form>
  )
}
