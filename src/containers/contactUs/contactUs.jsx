import React from "react";
import { Container } from "@material-ui/core";
import AccessAlarmIcon from "@material-ui/icons/AccessAlarm";
import classes from "./contact.module.css";

const contactUs = () => (
  <Container>
    <div className={classes.mainCont}>
      <div className={classes.contactDetCont}>
        <div className={classes.contactDetTitle}>Contact Us</div>
        <div className={classes.miniLine} />
        <div className={classes.contactDetDesc}>
          <div>
            DevClub is one of the most friendly and open clubs that is there in
            the Institute and all of its members are easily accessible.You can
            go through our official website and feel free to send us any mail or
            message over facebook.
            <br />
            <br />
            Some more contact information below
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
            {" "}
            We <b>@ DevClub</b> are constantly looking for ways to make our
            products better.{" "}
            <a href="https://forms.gle/k1uQa8eDFd7tA1ia8" target="_blank">
              Click here{" "}
            </a>
            , If you have any feedback you want to share with us.{" "}
          </p>
        </div>
      </div>
    </div>
  </Container>
);

export default contactUs;
