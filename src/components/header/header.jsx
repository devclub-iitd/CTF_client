import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { Link, withRouter } from 'react-router-dom';


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
      // onClick={event => {
      //   event.preventDefault();
      // }}
      {...props}
    />
  );
}


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.dark,
  },
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));

const NavTabs = ({ location }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }
  const current = () => {
    let currentPath = location.pathname.substr(1);
    const breakPoint = currentPath.indexOf('/');
    currentPath = currentPath.substr(0, breakPoint);

    switch (currentPath) {
      case 'home': return 0;
      case 'about': return 1;
      case 'practice': return 2;
      case 'competitions': return 3;
      case 'competition': return 3;
      case 'contactUs': return 4;
      case 'signUp': return 5;
      case 'profile': return 5;

      default: return 0;
    }
  };

  return (
    <div className={classes.root}>


      <AppBar position="fixed">
        <h1 style={{ textAlign: 'center' }}>Capture The Flag</h1>
        <Tabs variant="fullWidth" value={current() || value} onChange={handleChange}>
          <LinkTab label="Home" component={Link} to="/" />
          <LinkTab label="About" component={Link} to="/about/" />
          <LinkTab label="Practice" component={Link} to="/practice/problems" />
          <LinkTab label="Competitions" component={Link} to="/competitions/" />
          <LinkTab label="Contact us" component={Link} to="/contactUs/" />
          <LinkTab label="Login/Signup" component={Link} to="/signUp/" />
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
          <br />


        </div>


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

      </TabContainer>
      )}
      {value === 2 && (
      <TabContainer>
        <div>
          <br />
          <br />
          <br />
          <br />


        </div>


      </TabContainer>
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


      </TabContainer>
      )}
      {value === 5 && (
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


      </TabContainer>
      )}

    </div>
  );
};
NavTabs.propTypes = {
  location: PropTypes.objectOf(PropTypes.string).isRequired,
};


export default withRouter(NavTabs);
