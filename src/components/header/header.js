import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
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
      onClick={event => {
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

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
      <div><h1 style ={{textAlign : 'center'}}>Capture The Flag</h1></div>
      
        <Tabs variant="fullWidth" value={value} onChange={handleChange}>
          <LinkTab label="Home" href="/" />
          <LinkTab label="About" href="/" />
          <LinkTab label="Practice" href="/" />
          <LinkTab label="Competitions" href="/" />
          <LinkTab label="Contact us" href="/" />
        </Tabs>
      </AppBar>
      {value === 0 && <TabContainer><div>
        <br />  <br /> <br /> <br />
       
        
      </div><Container>{props.home}</Container></TabContainer>}
      {value === 1 && <TabContainer><div>
        <br /> <br /> <br /> <br />
       
      </div><Container>{props.about}</Container></TabContainer>}
      {value === 2 && <TabContainer><div>
        <br /> <br /> <br /> <br />
       
        
      </div><Container>{props.practice}</Container></TabContainer>}
      {value === 3 && <TabContainer><div>
        <br /> <br /> <br /> <br />
       
        
      </div><Container>{props.competitions}</Container></TabContainer>}
      {value === 4 && <TabContainer><div>
        <br /> <br /> <br /> <br />
      
      </div><Container>{props.contact}</Container></TabContainer>}
      
    </div>
  );
}

export default NavTabs;
