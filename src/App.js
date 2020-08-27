import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { NotesCard } from './modules'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

function SampleLayout({ classes }) {
  return (
    <Grid container spacing={4}>
      <Grid item xs={3}>
          <NotesCard></NotesCard>
      </Grid>
    </Grid>
  )
}

export default function App() {
  const classes = useStyles();
  return (
    <SampleLayout classes={classes} />
  );
}