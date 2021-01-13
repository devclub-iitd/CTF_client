import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { Link, withRouter, Redirect } from 'react-router-dom';

function TabContainer(props) {
    const { children } = props;
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired
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

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.dark
    },
    button: {
        margin: theme.spacing(1)
    },
    input: {
        display: 'none'
    },
    logOut: {
        '& > *': {
            // margin: theme.spacing(1)
        }
    },
    headerTitleBox: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerLogoutBtn: {
        marginLeft: 'auto',
        marginRight: '100px'
    },
    headerTitle: {
        marginLeft: '100px',
        marginRight: '100px'
        // backgroundColor: 'red'
    }
}));

const NavTabs = ({ location, isAuthenticated }) => {
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
            case 'home':
                return 0;
            case 'about':
                return 1;
            case 'practice':
                return 2;
            case 'competitions':
                return 3;
            case 'competition':
                return 3;
            case 'contactUs':
                return 4;
            case 'signUp':
                return 5;
            case 'profile':
                return 5;

            default:
                return 0;
        }
    };

    let tab = <LinkTab label="Login/Signup" component={Link} to="/signUp/" />;
    let red = null;
    let logOut = null;
    if (isAuthenticated) {
        tab = <LinkTab label="Profile" component={Link} to="/profile/" />;
        red = <Redirect to="/profile/" />;
        logOut = (
            <Box className={classes.headerLogoutBtn}>
                <div className={classes.logOut}>
                    <Link to="/logout/">
                        <Button variant="contained">Logout</Button>
                    </Link>
                </div>
            </Box>
        );
    }

    return (
        <div className={classes.root}>
            <AppBar position="fixed">
                <div>
                    <Box className={classes.headerTitleBox}>
                        <Box
                            alignItems="center"
                            className={classes.headerTitle}
                        >
                            <h1
                                style={{
                                    textAlign: 'center',
                                    textTransform: 'uppercase',
                                    letterSpacing: '2px',
                                    padding: '10px'
                                }}
                            >
                                Capture The Flag
                            </h1>
                        </Box>
                        {logOut}
                    </Box>
                </div>
                <Tabs
                    variant="fullWidth"
                    value={current() || value}
                    onChange={handleChange}
                >
                    <LinkTab label="Home" component={Link} to="/" />
                    <LinkTab label="About" component={Link} to="/about/" />
                    <LinkTab
                        label="Practice"
                        component={Link}
                        to="/practice/problems"
                    />
                    <LinkTab
                        label="Competitions"
                        component={Link}
                        to="/event/"
                    />
                    <LinkTab
                        label="Contact us"
                        component={Link}
                        to="/contactUs/"
                    />
                    {tab}
                </Tabs>
            </AppBar>
            {value === 0 && (
                <TabContainer>
                    <div>
                        <br />
                        <br /> <br /> <br />
                        <br />
                    </div>
                </TabContainer>
            )}
            {value === 1 && (
                <TabContainer>
                    <div>
                        <br /> <br /> <br /> <br />
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
                        <br /> <br /> <br /> <br />
                    </div>
                </TabContainer>
            )}
            {value === 4 && (
                <TabContainer>
                    <div>
                        <br /> <br /> <br /> <br />
                    </div>
                </TabContainer>
            )}
            {value === 5 && (
                <TabContainer>
                    <div>
                        <br /> <br /> <br /> <br />
                    </div>
                </TabContainer>
            )}
            {red}
        </div>
    );
};
NavTabs.propTypes = {
    location: PropTypes.objectOf(PropTypes.string).isRequired
};

const mapStateToProps = (state) => ({
    loading: state.loading,
    isAuthenticated: state.token !== null
});

export default connect(mapStateToProps)(withRouter(NavTabs));
