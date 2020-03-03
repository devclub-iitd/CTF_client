import React from 'react';
import {
  Grid, Box, Container, Typography,
} from '@material-ui/core';
import ComplexButton from '../../../components/ComplexButton/complexButton';
import classes from './categories.module.css'

const Categories = () => (
  <div className={classes.mainCont}>
    <div className={classes.innerCont}>
      <div className={classes.pageTitle}>Categories</div>
      <div className={classes.miniLine} />
      <div className={classes.pageDetCont}>
        <ComplexButton name="Category 1" to="/practice/categories/1" />
        <ComplexButton name="Category 2" to="/practice/categories/2" />
        <ComplexButton name="Category 3" to="/practice/categories/3" />
        <ComplexButton name="Category 4" to="/practice/categories/4" />
        <ComplexButton name="Category 5" to="/practice/categories/5" />
        <ComplexButton name="Hidden Problems" to="/practice/categories/hidden" />
      </div>
    </div>
  </div>
);


export default Categories;
