import { Grid, Alert } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import ControlledRadioGroup from '@/components/atomic/ControlledRadioGroup'
import axios from 'axios'
import LoadingIndicator from '@/components/atomic/LoadingIndicator'
import SaveResetNext from '@/components/atomic/SaveResetNext'
import TabTitle from '@/components/atomic/TabTitle'
import { AccountType, Api_DirectDeposit, Api_Files_Check, CheckFileName } from '../../constants'
import FileUpload from '../atomic/FileUpload'
const crypto = require('crypto');

export default function DirectDeposit({ nextTab }) {
  const [checkFile, setCheckFile] = useState('');
  const [loading, setLoading] = useState(true)
  const [checkFileHash, setCheckFileHash] = useState('');


  const { register, handleSubmit, setValue, getValues, control, reset } = useForm({
    defaultValues: async () => {
      const defaultValues = await axios(Api_DirectDeposit)
      const fileResponse = await axios(Api_Files_Check)
      if (fileResponse.data[CheckFileName]) {
        setCheckFile(fileResponse.data[CheckFileName]);
        setCheckFileHash(createFileHash(fileResponse.data[CheckFileName]));
      }
      setLoading(false);
      return defaultValues.data.data;
    }
  });

  const [showError, setShowError] = useState(false);

  const onSubmit = async (data) => {
    if (checkFile === '') {
      setShowError(true);
      return;
    }
    else {
      setLoading(true);
      // send to api
      await axios.post(Api_DirectDeposit, { [AccountType]: data[AccountType] });
      const newCheckFileHash = createFileHash(checkFile)
      if (newCheckFileHash !== checkFileHash) {
        await axios.post(Api_Files_Check, { [CheckFileName]: checkFile });
      }
      nextTab();
    }
  }


  const createFileHash = (file) => {
    const secret = '1234567890'; // not to be used for anything important
    const hash = crypto.createHmac('sha1', secret)
      .update(file)
      .digest('hex');
    return hash;
  }

  const onReset = () => { reset(); }

  return (
    <>
      {loading ?
        <LoadingIndicator /> :
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <TabTitle title={'Authorization Agreement Automatic Deposits'} />
            <Grid item xs={12}>
              <p>I (we) hereby authorize the Company to initiate credit entries to my (our) account indicated below and the financial institution named below, hereinafter called Financial Institution, to credit the same to such account. I (we) acknowledge that the origination of ACH transaction to my (our) account must comply with the provisions of U.S. law.</p>

              <p>I understand an ACH transaction can take up to 72 hours to complete.</p>

              This authority is to remain in full force effective until Company has received written notification
              from me (or either of us) of its termination in such a manner as to afford Company and Financial
              Institution a reasonable opportunity to act on it.
            </Grid>
            <Grid item xs={12}>{showError && <Alert severity="error">Please upload a Void Check or Direct Deposit Slip</Alert>}</Grid>
            <Grid item xs={12}>
              <FileUpload title={'Upload Void Check or Direct Deposit Slip'} file={checkFile} setFile={setCheckFile} onClick={() => { setShowError(false) }} />
            </Grid>
            <Grid item xs={12}>
              <ControlledRadioGroup
                title={'Type of Account'}
                name={AccountType}
                options={[
                  { value: "CHECKING", label: 'Checking' },
                  { value: "SAVINGS", label: 'Savings' },
                ]}
                defaultValue={getValues(AccountType)}
                control={control}
              />
            </Grid>
            <SaveResetNext onReset={onReset} />
          </Grid>
        </form>
      }
    </>
  )
}
