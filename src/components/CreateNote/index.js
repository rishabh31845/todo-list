import React from 'react';
import PropTypes from 'prop-types';
import { TextField, Grid, Select, MenuItem, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
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
        // width: '60%'
    },
    datePicker: {
        fontSize: '12px',
        padding: 0
    },
    noteText: {
        width: '100%',
        backgroundColor: 'white'
    },
    saveButton: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.background.default
    }
}));

const getPriorityDropdown = (value, onChange, classes, isPriorityOpened, setPriorityDropdownOpened) => {
    return (
        <React.Fragment>
            <Select
                defaultValue='Priority'
                value={value}
                onChange={onChange}
                displayEmpty
                className={classes.selectEmpty}
                inputProps={{ 'aria-label': 'Without label' }}
                onOpen={(evt) => setPriorityDropdownOpened(true)}
            >
                {!isPriorityOpened ? <MenuItem key='initial' value='Priority' >Priority</MenuItem>
                    :
                    Constants.PRIORITY_MAPPING.map(priority => (
                        <MenuItem key={priority.key} value={priority.name}>{priority.name}</MenuItem>
                    ))
                }
            </Select>
        </React.Fragment>
    )
}

const CreateNote = ({ onSave, onCancel }) => {
    const classes = useStyles();

    const [noteText, setNoteText] = React.useState();
    const [date, setDate] = React.useState();
    const [time, setTime] = React.useState();
    const [priority, setPriority] = React.useState();
    const [priorityDropdownOpened, setPriorityDropdownOpened] = React.useState(false);

    const handleNoteTextChange = (event) => {
        setNoteText(event.target.value);
    };

    const handleDateChange = (event) => {
        setDate(event);
    }

    const handleTimeChange = (event) => {
        setTime(event);
    }

    const handlePriorityChange = (event) => {
        setPriority(event.target.value)
    }

    const saveNote = () => {
        if (noteText && priority) {
            const noteObj = {
                priority,
                createdDate: `${getDateTime(date, 'YYYY-MM-DD')}T${getDateTime(time, 'HH:mm:ss')}`,
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
        <Grid container justify='space-around' spacing={4} direction='column'>
            <Grid item xs>
                <TextField
                    id="standard-multiline-static"
                    value={noteText}
                    multiline
                    rows={3}
                    rowsMax={4}
                    classes={{ root: classes.noteText }}
                    placeholder='Enter the note here'
                    onChange={handleNoteTextChange}
                />
            </Grid>
            <Grid container justify='space-around' spacing={2} item xs={12}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
                            classes={{ root: classes.datePicker }}
                        />
                    </Grid>
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
                    </Grid>
                </MuiPickersUtilsProvider>
                {/* </Grid> */}
                <Grid item xs={4}>
                    {
                        getPriorityDropdown(priority, handlePriorityChange, classes, priorityDropdownOpened, setPriorityDropdownOpened)
                    }
                </Grid>
            </Grid >
            <Grid container item xs={12} justify='flex-end'>
                <Grid item xs={3}>
                    <Button onClick={cancelNote}>Cancel</Button>
                </Grid>
                <Grid item xs={3}>
                    <Button variant="contained" className={classes.saveButton} onClick={saveNote}>Save</Button>
                </Grid>
            </Grid>
        </Grid>
    );
}

CreateNote.propTypes = {
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
}

CreateNote.defaultProps = {
}

export default CreateNote;