import React from 'react';
import { Container } from '@material-ui/core';
import classes from './about.module.css';

const about = () => (
  <Container>
    <div>
      <div className={classes.topbox}>
        <h1 className={classes.whyctf}> Why CTF? </h1>
        <p className="DottedBox_content"> CTF gives you a platform to learn and show your talent as hackers </p>
      </div>
      <div className="subtext">
        <h3> About </h3>

        <p> CTF stands for Capture The Flag. A flag is associated with every challenge. </p>

        <p>
          {' '}
Once you have solved a particular challenge you would get the hidden
          flag which you need to submit back to us for getting points.
        </p>
      </div>
    </div>

  </Container>


);

export default about;
