import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Select as StyledSelect,
    MenuItem
} from '@material-ui/core';

const useStyles = makeStyles({
    root: {
    },
    outlined: {
    }
});

const Select = ({ optionObj }) => {
    const classes = useStyles();
    return (
        <React.Fragment>
            <StyledSelect
                variant="outlined"
                defaultValue={optionObj.id}
                onChange={optionObj.onClick}
                displayEmpty
                classes={{ select: classes.root }}
                inputProps={{ 'aria-label': 'Without label' }}
            >
                {
                    optionObj.options.map(option => (
                        <MenuItem key={option.label} value={option.id}>{option.label}</MenuItem>
                    ))
                }
            </StyledSelect>
        </React.Fragment>
    );
}

export default Select;
