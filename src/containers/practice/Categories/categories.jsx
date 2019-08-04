import React from 'react';
import {
  Grid, Box, Container, Typography,
} from '@material-ui/core';
import ComplexButton from '../../../components/ComplexButton/complexButton';

const Categories = () => (
  <div>
    <Typography variant="h1" align="center">Categories</Typography>
    <Container maxWidth="md">
      <Box p={1}>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <ComplexButton name="Category 1" to="/practice/categories/1" />
          </Grid>
          <Grid item xs={4}>
            <ComplexButton name="Category 2" to="/practice/categories/2" />
          </Grid>
          <Grid item xs={4}>
            <ComplexButton name="Category 3" to="/practice/categories/3" />
          </Grid>
          <Grid item xs={4}>
            <ComplexButton name="Category 4" to="/practice/categories/4" />
          </Grid>
          <Grid item xs={4}>
            <ComplexButton name="Category 5" to="/practice/categories/5" />
          </Grid>
          <Grid item xs={4}>
            <ComplexButton name="Hidden Problems" to="/practice/categories/hidden" />
          </Grid>
        </Grid>

      </Box>

    </Container>


  </div>
);


export default Categories;
