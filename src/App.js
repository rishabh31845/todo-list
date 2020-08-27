import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { NotesCard, HeaderFilter } from './modules'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

function SampleLayout({ classes }) {

  const onDayFilterSelect = (evt) => {
    console.log('evt', evt);
  }

  const onActionFilterSelect = (evt) => {
    console.log('evt', evt)
  }

  const label = 'HOME';
  const filterList = [
    {
      id: 1,
      label: 'Day Filter',
      onClick: (evt) => onDayFilterSelect(evt),
      options: [
        {
          id: 1,
          label: 'Day Data 1',
          code: 1
        },
        {
          id: 2,
          label: 'Day Data 2',
          code: 2
        },
        {
          id: 3,
          label: 'Day Data 3',
          code: 3
        },
        {
          id: 4,
          label: 'Day Data 4',
          code: 4
        }
      ]
    },
    {
      id: 2,
      label: 'Action Filter',
      onClick: (evt) => onActionFilterSelect(evt),
      options: [
        {
          id: 1,
          label: 'Action Data 1',
          code: 1
        },
        {
          id: 2,
          label: 'Action Data 2',
          code: 2
        },
        {
          id: 3,
          label: 'Action Data 3',
          code: 3
        },
        {
          id: 4,
          label: 'Action Data 4',
          code: 4
        }
      ]
    },
    {
      id: 4,
      label: 'Day Filter',
      onClick: (evt) => onDayFilterSelect(evt),
      options: [
        {
          id: 1,
          label: 'Day Data 1',
          code: 1
        },
        {
          id: 2,
          label: 'Day Data 2',
          code: 2
        },
        {
          id: 3,
          label: 'Day Data 3',
          code: 3
        },
        {
          id: 4,
          label: 'Day Data 4',
          code: 4
        }
      ]
    },
    {
      id: 3,
      label: 'Day Filter',
      onClick: (evt) => onDayFilterSelect(evt),
      options: [
        {
          id: 1,
          label: 'Day Data 1',
          code: 1
        },
        {
          id: 2,
          label: 'Day Data 2',
          code: 2
        },
        {
          id: 3,
          label: 'Day Data 3',
          code: 3
        },
        {
          id: 4,
          label: 'Day Data 4',
          code: 4
        }
      ]
    },
    {
      id: 1,
      label: 'Day Filter',
      onClick: (evt) => onDayFilterSelect(evt),
      options: [
        {
          id: 1,
          label: 'Day Data 1',
          code: 1
        },
        {
          id: 2,
          label: 'Day Data 2',
          code: 2
        },
        {
          id: 3,
          label: 'Day Data 3',
          code: 3
        },
        {
          id: 4,
          label: 'Day Data 4',
          code: 4
        }
      ]
    },
  ]

  return (
    <Grid direction='column' container spacing={2}>
      <Grid container item xs>
        <HeaderFilter headerLabel={label} filterList={filterList}></HeaderFilter>
      </Grid>
      <Grid container item xs={3}>
        {/* <NotesCard></NotesCard> */}
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