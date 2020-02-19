import React from 'react';
import { Container } from '@material-ui/core';
import classes from './contact.module.css';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';

const contactUs = () => (
  <Container>
    <div className={classes.mainCont}>
      <div className={classes.contactDetCont}>
        <div className={classes.contactDetTitle}>Contact Us</div>
        <div className={classes.miniLine} />
        <div className={classes.contactDetDesc}>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            <br />
            <br />
            Some more contact information - Contact line 2
          </div>
          <div className={classes.miniLine} />
          <div className={classes.iconCont}>
            <a href="https://www.facebook.com/tech.iitd/" target="_blank">
              <div className={classes.icon}>
                <AccessAlarmIcon />
              </div>
            </a>
            <div className={classes.icon}>
              <AccessAlarmIcon />
            </div>
            <div className={classes.icon}>
              <AccessAlarmIcon />
            </div>
          </div>
          <p className={classes.extra}>
            {' '}
            We <b>@ DevClub</b> are constantly looking for ways to make our products better.
            {' '}
            <a href="https://forms.gle/k1uQa8eDFd7tA1ia8" target="_blank">Click here  </a>
            , If you have any feedback you want to share with us.
            {' '}
          </p>
        </div>
      </div>
    </div>

  </Container>

);

export default contactUs;
