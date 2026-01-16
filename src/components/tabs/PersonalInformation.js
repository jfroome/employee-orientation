import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import ReactSignatureCanvas from 'react-signature-canvas'
import { useForm } from 'react-hook-form'
import InputText from '@/components/atomic/InputText'
import FormDivider from '@/components/atomic/FormDivider'
import { FormControl, FormControlLabel, Grid, Button, Typography, Switch, FormGroup, Checkbox, Box, Alert } from '@mui/material'


import LoadingIndicator from '@/components/atomic/LoadingIndicator'
import SaveResetNext from '@/components/atomic/SaveResetNext'
import ControlledRadioGroup from '@/components/atomic/ControlledRadioGroup'
import { Birthday, CellPhone, DriversLicenseNo, FirstName, HomePhone, LastName, PhysAddress, MailingAddress, MiddleName, Sex, SocialSecurity, MailingSameAsPhys, Email, CorrectInfo, MailingCityStateZip, PhysCityStateZip, DriversLicenseState, Api_PersonalInfo, Signature, Api_File_Signature, Api_Files_Signature, SignatureFileName, DriversLicenseFileName, BirthCertificateFileName, Api_Files_BirthCertificate, Api_Files_DriversLicence } from '../../constants'
import FileUpload from '../atomic/FileUpload'
import ReadonlyData from '../atomic/ReadonlyData'
import { DateSigned } from '../../constants.mjs'
const crypto = require('crypto');

export default function PersonalInformation({ nextTab }) {
  let sigPad = useRef(<ReactSignatureCanvas />)
  let clear = () => {
    sigPad.clear()
  }
  const [loading, setLoading] = useState(true);
  const [signatureError, setSignatureError] = useState(false);
  const [licenceFile, setLicenceFile] = useState('');
  const [licenceFileHash, setLicenceFileHash] = useState('');
  const [birthCertFile, setBirthCertFile] = useState('');
  const [birthCertFileHash, setBirthCertFileHash] = useState('');


  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    control,
    reset
  } = useForm({
    defaultValues: async () => {
      const response = await axios(Api_PersonalInfo)
      const sigFileResponse = await axios.get(Api_Files_Signature)
      const bcFileResponse = await axios.get(Api_Files_BirthCertificate)
      const lcFileResponse = await axios.get(Api_Files_DriversLicence)
      response.data.data[Signature] = sigFileResponse.data[SignatureFileName]
      setLicenceFile(lcFileResponse.data[DriversLicenseFileName])
      setLicenceFileHash(createFileHash(lcFileResponse.data[DriversLicenseFileName]))
      setBirthCertFile(bcFileResponse.data[BirthCertificateFileName])
      setBirthCertFileHash(createFileHash(bcFileResponse.data[BirthCertificateFileName]))
      setLoading(false);
      return response.data.data
    }
  });

  const onSubmit = async data => {
    if (sigPad.isEmpty() && getValues(Signature) === '') {
      setSignatureError(true)
    }
    else if (birthCertFile === '' || licenceFile === '') {
      return;
    } else {
      setLoading(true);
      if (!sigPad.isEmpty()) {
        await axios.post(Api_Files_Signature, { [SignatureFileName]: sigPad.toDataURL('image/png') });
      }
      const newLicenceFileHash = createFileHash(licenceFile)
      if (newLicenceFileHash !== licenceFileHash) {
        await axios.post(Api_Files_DriversLicence, { [DriversLicenseFileName]: licenceFile });
      }
      const newBirthCertFileHash = createFileHash(birthCertFile)
      if (newBirthCertFileHash !== birthCertFileHash) {
        await axios.post(Api_Files_BirthCertificate, { [BirthCertificateFileName]: birthCertFile });
      }
      data[DateSigned] = new Date().toLocaleDateString().split('T')[0]
      await axios.post(Api_PersonalInfo, data)
      nextTab()
    }
  }

  const createFileHash = (file) => {
    const secret = '1234567890';
    const hash = crypto.createHmac('sha1', secret)
      .update(file)
      .digest('hex');
    return hash;
  }

  const onReset = () => {
    sigPad.clear()
    reset();
  }

  return (
    <>
      {loading ?
        <LoadingIndicator /> :
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <FormDivider title='Personal Info' />
            <InputText fieldSize='4'
              name={FirstName}
              label={'First Name'}
              register={register}
            />
            <InputText
              fieldSize='4'
              name={MiddleName}
              label={'Middle Name'}
              register={register}
              required={false}
            />
            <InputText
              fieldSize='4'
              name={LastName}
              label={'Last Name'}
              register={register}
            />
            <Grid item md={4}>
              <ControlledRadioGroup
                title={'Sex'}
                name={Sex}
                options={[
                  { value: "MALE", label: 'Male' },
                  { value: "FEMALE", label: 'Female' },
                ]}
                defaultValue={getValues(Sex)}
                control={control}
                row={true}
              />
            </Grid>
            <InputText
              fieldSize='4'
              label={'Birth Date'}
              name={Birthday}
              type='date'
              register={register}
            />
            <InputText
              fieldSize='4'
              label='Social Security Number'
              name={SocialSecurity}
              register={register}
            />
            <InputText
              fieldSize='4'
              label='Drivers License No'
              name={DriversLicenseNo}
              register={register}
            />
            <InputText fieldSize='4' name={DriversLicenseState} label='State Issued By' register={register} />
            <FormDivider title='Physical Address' />
            <InputText
              fieldSize={12}
              label='Physical Address'
              name={PhysAddress}
              register={register}
            />
            <InputText
              fieldSize={4}
              label={'Physical City, State, Zip'}
              name={PhysCityStateZip}
              register={register}
            />
            <FormDivider title='Mailing Address' />

            <Grid item md={12}>
              <FormControlLabel
                control={
                  <Switch
                    defaultChecked={getValues(MailingSameAsPhys)}
                    {...register(MailingSameAsPhys, {})}
                    onClick={(e) => {
                      if (e.target.checked) {
                        setValue(MailingAddress, getValues(PhysAddress))
                        setValue(MailingCityStateZip, getValues(PhysCityStateZip))
                      }
                    }
                    }
                  />
                }
                label={'Is the mailing address the same as the physical Address?'}
              />
            </Grid>

            <InputText
              fieldSize={12}
              name={MailingAddress}
              label={'Mailing Address'}
              register={register}
              disabled={watch(MailingSameAsPhys)}
            />
            <InputText
              fieldSize={4}
              label={'Mailing City, State, Zip'}
              name={MailingCityStateZip}
              register={register}
              disabled={watch(MailingSameAsPhys)}
            />
            <FormDivider title='Contact Info' />
            <InputText
              fieldSize={4}
              type='email'
              label={Email}
              register={register}
            />
            <InputText
              fieldSize={4}
              type='tel'
              label={'Cell Phone'}
              name={CellPhone}
              register={register}
            />
            <InputText
              fieldSize={4}
              type='tel'
              label={'Home Phone'}
              name={HomePhone}
              register={register}
              required={false}
            />
            <FormDivider title='Signature' />
            <Grid item xs={6}
            >
              {
                getValues(Signature) !== '' &&
                <Box
                  component={'img'}
                  alt={'Signature'}
                  src={getValues(Signature)}
                  sx={{
                    border: '2px dotted grey'
                  }}
                />
              }

            </Grid>
            <ReadonlyData fieldSize={6} title={'Date Signed'} value={getValues(DateSigned)}/>
            <Grid item
              xs={12}
              md={6}
            >
              <Box
                style={{
                  border: '2px dashed grey',
                  borderRadius: '10px'
                }}
              >
                <ReactSignatureCanvas
                  ref={ref => sigPad = ref}
                  penColor='black'
                  canvasProps={{
                    width: '350',
                    height: '150',
                    className: 'sigCanvas',

                    style: {
                      width: '100%',
                      height: '100%'
                    }
                  }}
                  backgroundColor='rgba(0,0,0,0)'
                  onEnd={() => { setSignatureError(false) }}
                />
              </Box>
              <Button
                type='button'
                onClick={() => {
                  clear()
                }}
                variant='outlined'
                fullWidth
              >
                Clear Signature
              </Button>
            </Grid>
            <Grid item xs={12} sx={{ marginTop: 5 }}>
              <Typography variant='subtitle1' sx={{ color: 'red' }}>
                {signatureError && <Alert severity="error">Please provide your signature in the box above.</Alert>}
              </Typography>
            </Grid>
            <FormDivider title='Documents' />
            <Grid item xs={12}>{(birthCertFile === '' || licenceFile === '') && <Alert severity="error">Please provide an image of your Driver&lsquo;s License and Birth Certificate or SSN in order to proceed</Alert>}</Grid>
            <Grid item xs={12}>
              <FileUpload file={licenceFile} setFile={setLicenceFile} title={'Upload Driver\'s License'} onClick={() => { }} />
            </Grid>
            <Grid item xs={12}>
              <FileUpload file={birthCertFile} setFile={setBirthCertFile} title={'Upload Birth Certificate or Social Security Card'} onClick={() => { }} />
            </Grid>
            <FormDivider title='Confirmation' />
            <Grid item xs={12}>
              <FormControl>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...register(CorrectInfo, {
                          required: 'Please review the form and check this box to continue',
                          validate: value => value === true
                        })}
                        required={true}
                      />
                    }
                    label={'Is the information provided correct?'}
                  />
                </FormGroup>
              </FormControl>
            </Grid>
            <SaveResetNext onReset={onReset} />
          </Grid>
        </form >
      }
    </>
  )
}
