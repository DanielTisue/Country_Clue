import React from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';

import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';

import guitar from './images/guitar.png'
import useStyles from './styles';

const App = () => {
  const classes = useStyles();
  return (
      <Container maxwidth="lg">
        <AppBar className={classes.appBar} position="static" color="inherit">
        <img className={classes.image} src={guitar} alt="guitar" align="center" height="50" />
        <Typography className={classes.heading} variant="h3" align="center">Country Clue</Typography>
        
        </AppBar>

        <Grow in>
          <Container>
            <Grid container justify="space-between" alignItems="stretch" spacing={3}>
              <Grid item xs={12} sm={7}>
                <Posts />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Form />
              </Grid>
            </Grid>
          </Container>
        </Grow>
      </Container>
  );
}

export default App;