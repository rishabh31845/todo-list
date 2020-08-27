import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { NotesCard } from './modules'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function SampleLayout({ classes }) {
  return (
    <Grid container spacing={5}>
      <Grid item xs={4}>
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