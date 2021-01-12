import React from "react";
import { Container } from "@material-ui/core";
import classes from "./about.module.css";

const about = () => (
  <Container>
    <div className={classes.mainCont}>
      <div className={classes.topbox}>
        <h1 className={classes.whyctf}> Why CTF? </h1>
        <div className={[classes.miniLine, classes.miniLineCenter].join(" ")} />
        <p className={classes.whyDesc}>
          {" "}
          CTF gives you a platform to learn and show your talent as hackers{" "}
        </p>
      </div>
      <div className={classes.subText}>
        <div className={classes.aboutTitle}> About </div>
        <div className={classes.miniLine} />
        <div className={classes.aboutText}>
          CTF stands for Capture The Flag. A flag is associated with every
          challenge.
          <br />
          <br />
          Once you have solved a particular challenge you would get the hidden
          flag which you need to submit back to us for getting points.
        </div>
      </div>
    </div>
  </Container>
);

export default about;
