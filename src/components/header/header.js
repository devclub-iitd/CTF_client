/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

function TabContainer(props) {
  const { children } = props;
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.dark,
  },
}));

const NavTabs = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }
  const {
    home, about, practice, competitions, contact,
  } = props;
  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <div><h1 style={{ textAlign: 'center' }}>Capture The Flag</h1></div>

        <Tabs variant="fullWidth" value={value} onChange={handleChange}>
          <LinkTab label="Home" href="/home" />
          <LinkTab label="About" href="/about" />
          <LinkTab label="Practice" href="/practice" />
          <LinkTab label="Competitions" href="/competitions" />
          <LinkTab label="Contact us" href="/contact_us" />
        </Tabs>
      </AppBar>
      {value === 0 && (
      <TabContainer>
        <div>
          <br />

          <br />
          {' '}
          <br />
          {' '}
          <br />


        </div>
        <Container>{home}</Container>

      </TabContainer>
      )}
      {value === 1 && (
      <TabContainer>
        <div>
          <br />
          {' '}
          <br />
          {' '}
          <br />
          {' '}
          <br />

        </div>
        <Container>{about}</Container>

      </TabContainer>
      )}
      {value === 2 && (
      // <TabContainer>
        <div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />


          {practice}
        </div>


      // </TabContainer>
      )}
      {value === 3 && (
      <TabContainer>
        <div>
          <br />
          {' '}
          <br />
          {' '}
          <br />
          {' '}
          <br />


        </div>
        <Container>{competitions}</Container>

      </TabContainer>
      )}
      {value === 4 && (
      <TabContainer>
        <div>
          <br />
          {' '}
          <br />
          {' '}
          <br />
          {' '}
          <br />

        </div>
        <Container>{contact}</Container>

      </TabContainer>
      )}

    </div>
  );
};

export default NavTabs;
