import React, {Component} from 'react';
import classes from './practice.module.css';
import {Container, Typography} from '@material-ui/core';
import Problems from './Problems/Problems';
import Leaderboard from './Leaderboard/Leaderboard';
import Categories from './Categories/categories';
import Rules from './Rules/rules';

class practice extends Component {
    state = {
        show : <Problems />,
    }

    clickhandler = (item) => {
        this.setState({show : item})
    }
    render() {
      return (
        <div className = {classes.body}>
                <nav>
                     <ul>
                        <li onClick={() => this.clickhandler(<Problems />)}>Problems</li>
                        <li onClick={() => this.clickhandler(<Categories />)}>Categories</li>
                        <li onClick={() => this.clickhandler(<Leaderboard />)}>Leaderboard</li>
                        <li onClick={() => this.clickhandler(<Rules />)}>Rules and Regulations</li>
                    </ul>
                </nav>
                <br />
                <Typography variant = 'h1' align = 'center'>Practice</Typography>
                <Container maxWidth='md'>
                    {this.state.show}
                </Container>
            

        </div>
      );
    }
  }



export default practice;