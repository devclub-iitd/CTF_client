import React, { useEffect, useState } from 'react'
import {
  Container, Grid, Typography, Fab
} from '@material-ui/core'
import NavigationIcon from '@material-ui/icons/Navigation'
import classes from './home.module.css'
import CompTable from '../../components/Table/CompTable/CompTable'
import UserTable from '../../components/Table/UserTable/UserTable'
import Axios from 'axios'

const Home = () => {
  const [event, setEvent] = useState(null)
  useEffect(() => {
    const getEvents = async (url) => {
      const response = await Axios.get(url)
      setEvent(response.data)
    }
    const url = 'http://localhost:3000/api/event/ongoing-events'
    getEvents(url)
  }, [])
  let eventList = []
  if (event) {
    eventList = [...event]
  }
  return (
    <div>
      <Container>
        <div className={classes.mainCont}>
          <div className={classes.section}>
            <div className={classes.splitSection}>
              <div className={classes.splitSectionLeft}>
                <div className={classes.sectionTitle}>Most Wanted</div>
                <div className={classes.miniLine} />
                <div className={classes.splitSectionLeftDesc}>
                Cyber security is a high priority of companies, small and big, as cyber attacks
                have been on the rise
                in recent years. In response to these attacks, security professionals and
                college students have been
                through rigorous training as how hackers are able to get into the companies and
                how to defend against
                them. One way of cyber security training is through a cyber security capture
                the flag (CTF) event.
                A cyber security CTF is a competition between security professionals
                and/or students learning about
                cyber security. This competition is used as a learning tool for everyone
                that is interested in cyber
                security and it can help sharpen the tools they have learned
                during their training.
                </div>
                <br />
                <br />
                <div className={classes.splitSectionLeftHighlight}>
                If you are new to CTF, we recommend you going through our
                walkthrough portal given here.
                </div>
                <br />
                <br />
                <div className={classes.center}>
                  <Fab variant="extended" color="primary" aria-label="Add">
                    <NavigationIcon className={classes.extendedIcon} />
                  Walkthrough
                  </Fab>
                </div>
              </div>
              <div className={classes.splitSectionRight}>
                <CompTable eventList = {eventList} />
              </div>
            </div>
          </div>
          {/* <div className={classes.section2}>
            <div className={classes.sectionTitleSmall}>User Rank</div>
            <div className={classes.miniLine} style={{ marginLeft: 'auto', marginRight: 'auto' }}/>
            <div className={classes.userTableCont}>
              <UserTable />
            </div>
          </div> */}
        </div>
      </Container>
    </div>
  )
}

export default Home
