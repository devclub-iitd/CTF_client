import React from 'react';
import { Grid, Box, Container, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ComplexButton from '../../../components/ComplexButton/complexButton';

const Categories = (props) => {
    const { profile, token } = props;
    let isAdmin = null;
    if (profile) {
        isAdmin = profile.isAdmin;
    }

    return (
        <div>
            <Typography variant="h1" align="center">
                Categories
            </Typography>
            <Container maxWidth="md">
                <Box p={1}>
                    <Grid container spacing={3}>
                        <Grid item xs={4}>
                            <ComplexButton
                                name=" Binary Exploitation"
                                to="/practice/categories/1"
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <ComplexButton
                                name="Reverse Engineering"
                                to="/practice/categories/2"
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <ComplexButton
                                name="Web Exploitation"
                                to="/practice/categories/3"
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <ComplexButton
                                name="Cryptography"
                                to="/practice/categories/4"
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <ComplexButton
                                name="Forensics"
                                to="/practice/categories/5"
                            />
                        </Grid>
                        {isAdmin && token ? (
                            <Grid item xs={4}>
                                <ComplexButton
                                    name="Hidden Problems"
                                    to="/practice/categories/hidden"
                                />
                            </Grid>
                        ) : null}
                    </Grid>
                </Box>
            </Container>
        </div>
    );
};

Categories.propTypes = {
    profile: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
    token: state.token,
    profile: state.profile
});

export default connect(mapStateToProps)(Categories);
