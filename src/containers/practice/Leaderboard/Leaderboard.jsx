import React from 'react';
import { Typography, Container } from '@material-ui/core';
import UserTable from '../../../components/Table/UserTable/UserTable';

class leaderboard extends React.PureComponent {
  render() {
    return (
      <div>
        <Container maxWidth="md">
          <br />
          <br />
          <Typography variant="h1" align="center">
                    Leaderboard
          </Typography>
          <br />
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <UserTable width="100%" />
          </div>
        </Container>

      </div>
    );
  }
}

export default leaderboard;
