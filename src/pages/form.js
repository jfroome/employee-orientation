import * as React from 'react'

//mui
import { Alert, AppBar, Button, Container, Snackbar, Toolbar } from '@mui/material'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Image from 'next/image'

//networking
import { useRouter } from 'next/router'

//custom
import TabPanel from '@/components/atomic/TabPanel'

//tabs
import HealthBenefitEnrollment from '@/components/tabs/Health'
import EmergencyContactInfo from '@/components/tabs/EmergencyContactInfo'
import Submit from '@/components/tabs/Submit'
import PersonalInformation from '@/components/tabs/PersonalInformation'
import Videos from '@/components/tabs/Videos'
import DirectDeposit from '@/components/tabs/DirectDeposit'
import Insurance from '@/components/tabs/Insurance'
import DrugTest from '@/components/tabs/DrugTest'
import EmploymentEligibility from '@/components/tabs/EmploymentEligibility'
import DrivingRecord from '@/components/tabs/DrivingRecord'
import Witholding from '@/components/tabs/Witholding'
import { signOut, useSession } from "next-auth/react"
import { Api_Finalize, HasFinalized, Page_Login } from '../constants'
import LoadingIndicator from '../components/atomic/LoadingIndicator'
import Legal from '../components/tabs/Legal'
import axios from 'axios'

function tabAccessibilityProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

export default function Form({ }) {
  const [logoutToast, setLogoutToast] = React.useState(false);
  const { data: session, status } = useSession()
  const router = useRouter();
  const [logoutBlackout, setlogoutBlackout] = React.useState(false);

  const [tabItem, setTabItem] = React.useState(-1) // set it to a value that is not a tab so there isn't an instant reload

  React.useEffect(() => {
    setTabItem(0)
  }, []) // update after the page is rendered to a valid tab

  const handleChange = (event, newTabItem) => {
    setTabItem(newTabItem)
  }

  const logout = async (finalized) => {
    setlogoutBlackout(true);
    setLogoutToast(true);
    await axios.post(Api_Finalize, { [HasFinalized]: finalized });
    await signOut();
    await router.push(Page_Login);
  }

  if (status === "loading" || logoutBlackout) {
    return <>
      <Grid
        container>
        <LoadingIndicator />
        <Snackbar open={logoutToast} autoHideDuration={1000} >
          <Alert severity="warning" sx={{ width: '100%' }}>
            Logging out...
          </Alert>
        </Snackbar>
      </Grid>
    </>
  }
  else if (status === "authenticated") {
    return (
      <>
        <AppBar color='secondary' position='static'>
          <Container maxWidth='false'>
            <Toolbar>
              <Grid
                container
                spacing={0}
                direction='row'
                alignItems='center'
                justifyContent='left'
                flexDirection={'row'}
              >
                <Grid item md={1}>
                  <Image
                    src='/images/jfLogo.svg'
                    alt='JF Logo'
                    width={75}
                    height={75}
                  />
                </Grid>
                <Grid item md={10}>
                  <Typography variant='h5'>EMPLOYEE ORIENTATION</Typography>
                </Grid>
                <Grid item md={1}>
                  <Button type='button'
                    variant='contained'
                    onClick={() => logout(false)}>Logout</Button>
                </Grid>
              </Grid>
            </Toolbar>
          </Container>
        </AppBar>
        <AppBar color='primary' position='relative'>
          <Container maxWidth='xl'>
            <Tabs
              textColor='inherit'
              indicatorColor='secondary'
              value={tabItem}
              allowScrollButtonsMobile={true}
              scrollButtons={'auto'}
              onChange={handleChange}
              TabIndicatorProps={{
                style: { background: 'white', height: '3px' }
              }}
              variant='scrollable'
            >
              <Tab label='Personal Info' {...tabAccessibilityProps(0)} />
              <Tab label='Drug Test' {...tabAccessibilityProps(1)} />
              <Tab label='Health Benefit Enrollment' {...tabAccessibilityProps(2)} />
              <Tab label='Insurance' {...tabAccessibilityProps(3)} />
              <Tab label='Direct Deposit' {...tabAccessibilityProps(4)} />
              <Tab label='Emergency Contact Info' {...tabAccessibilityProps(5)}></Tab>
              <Tab label='Employee Eligibility' {...tabAccessibilityProps(6)}></Tab>
              <Tab label='Driving Record' {...tabAccessibilityProps(7)}></Tab>
              <Tab label='Witholding' {...tabAccessibilityProps(8)}></Tab>
              <Tab label='Videos' {...tabAccessibilityProps(9)} />
              <Tab label='Legal' {...tabAccessibilityProps(10)}></Tab>
              <Tab label='Submit' {...tabAccessibilityProps(11)}></Tab>
            </Tabs>
          </Container>
        </AppBar>
        <Container maxWidth='md'>
          <TabPanel value={tabItem} index={0} >
            <PersonalInformation nextTab={() => setTabItem(1)} />
          </TabPanel>
          <TabPanel value={tabItem} index={1}>
            <DrugTest nextTab={() => setTabItem(2)} />
          </TabPanel>
          <TabPanel value={tabItem} index={2}>
            <HealthBenefitEnrollment nextTab={() => setTabItem(3)} />
          </TabPanel>
          <TabPanel value={tabItem} index={3}>
            <Insurance nextTab={() => setTabItem(4)} />
          </TabPanel>
          <TabPanel value={tabItem} index={4}>
            <DirectDeposit nextTab={() => setTabItem(5)} />
          </TabPanel>
          <TabPanel value={tabItem} index={5}>
            <EmergencyContactInfo nextTab={() => setTabItem(6)} />
          </TabPanel>
          <TabPanel value={tabItem} index={6}>
            <EmploymentEligibility nextTab={() => setTabItem(7)} />
          </TabPanel>
          <TabPanel value={tabItem} index={7}>
            <DrivingRecord nextTab={() => setTabItem(8)} />
          </TabPanel>
          <TabPanel value={tabItem} index={8}>
            <Witholding nextTab={() => setTabItem(9)} />
          </TabPanel>
          <TabPanel value={tabItem} index={9}>
            <Videos nextTab={() => setTabItem(10)} />
          </TabPanel>
          <TabPanel value={tabItem} index={10}>
            <Legal nextTab={() => setTabItem(11)} />
          </TabPanel>
          <TabPanel value={tabItem} index={11}>
            <Submit logout={logout} />
          </TabPanel>
        </Container>
      </>
    )
  }
  else {
    router.push(Page_Login)
  }
}
