import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Divider, TextField, Grid, Select, MenuItem, Button } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/moment';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { getDateTime } from '../../common/functionalHelper';
import { Constants } from '../../common/constants';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        minWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(1),
    },
    strikeThrough: {
        textDecorationLine: 'line-through',
        paddingLeft: theme.spacing(1)
    },
    subHeading: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '60%'
    },
    time: {
        color: theme.palette.error.main
    }
}));

const StyledDatePicker = withStyles({

})(KeyboardDatePicker);

const getPriorityDropdown = (value, onChange, classes) => {
    return (
        <Select
            value={value}
            onChange={onChange}
            displayEmpty
            className={classes.selectEmpty}
            inputProps={{ 'aria-label': 'Without label' }}
        >
            {
                Constants.PRIORITY_MAPPING.map(priority => (
                    <MenuItem key={priority.key} value={priority.name}>{priority.name}</MenuItem>
                ))
            }
        </Select>
    )
}

const CreateNote = ({ onSave, onCancel }) => {
    const classes = useStyles();

    const [noteText, setNoteText] = React.useState();
    const [date, setDate] = React.useState();
    const [showTime, setShowTime] = React.useState(false);
    const [showPriority, setShowPriority] = React.useState(false);
    const [time, setTime] = React.useState();
    const [priority, setPriority] = React.useState('Low');

    const handleNoteTextChange = (event) => {
        setNoteText(event.target.value);
    };

    const handleDateChange = (event) => {
        setDate(new Date(event.format()));
        setShowTime(true);
    }

    const handleTimeChange = (event) => {
        console.log('event ---> ', event);
        setTime(new Date(event.format()));
        setShowPriority(true);
    }

    const handlePriorityChange = (event) => {
        console.log('event', event);
        setPriority(event.target.value)
    }

    const saveNote = () => {
        console.log('Date :', date);
        console.log('Time :', time);
        if (noteText && priority) {
            const noteObj = {
                priority,
                createdDate: new Date(),
                text: noteText,
                status: 'open',
                id: Math.random()
            }
            onSave(noteObj);
        } else {
            alert('Fill all details!!!')
        }

    }

    const cancelNote = () => {
        onCancel();
    }

    return (
        <>
            <TextField
                id="standard-number"
                value={noteText}
                InputLabelProps={{
                    shrink: true,
                }}
                placeholder='Enter the note here'
                onChange={handleNoteTextChange}
            />
            <br />
            <br />
            <Divider />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container style={{ display: 'flex' }} justify="space-between">
                    <Grid item xs={4}>
                        <KeyboardDatePicker
                            // margin="normal"
                            id="date-picker-dialog"
                            format="DD MMM yyyy"
                            value={date}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </Grid>
                    {showTime ?
                        <Grid item xs={4}>
                            <KeyboardTimePicker
                                // margin="normal"
                                id="time-picker"
                                value={time}
                                format="hh:mm A"
                                onChange={handleTimeChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                }}
                            />
                        </Grid> : null
                    }
                    {
                        showPriority ?
                            <Grid item xs={4}>
                                {getPriorityDropdown(priority, handlePriorityChange, classes)}
                            </Grid> : null
                    }
                </Grid>
                <Grid style={{ display: 'flex' }} justify='flex-end'>
                    <Button onClick={cancelNote}>Cancel</Button>
                    <Button onClick={saveNote}>Save</Button>
                </Grid>
            </MuiPickersUtilsProvider>
        </>
    );
}

CreateNote.propTypes = {
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
}

CreateNote.defaultProps = {
}

export default CreateNote;