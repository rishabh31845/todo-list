import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Typography,
    Grid
} from '@material-ui/core';
import { Select } from '../../components'

const useStyles = makeStyles({
    root: {
        margin: '12px',
    },
});

const HeaderFilter = ({ headerLabel, filterList }) => {
    const classes = useStyles();

    return (
        <Grid classes={{ root: classes.root }} container direction='row'>
            <Grid container item xs={2} justify='space-evenly' alignItems='center'>
                <Typography variant="h5">{headerLabel}</Typography>
            </Grid>
            <Grid container spacing={2} alignContent='center' justify='flex-end' item xs={10}>
                {
                    filterList.map(filter =>
                        <Grid item xs='auto'>
                            <Select id={filter.id}
                                optionObj={filter} />
                        </Grid>
                    )
                }
            </Grid>
        </Grid>
    );
}

export default HeaderFilter;
