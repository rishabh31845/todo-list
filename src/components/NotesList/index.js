import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Grid, Checkbox, ListItem, ListSubheader } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import ErrorIcon from '@material-ui/icons/Error';
import { getDateTime, sortItemsByString } from '../../common/functionalHelper';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        // minWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    strikeThrough: {
        textDecorationLine: 'line-through',
    },
    time: {
        color: theme.palette.error.main
    },
    noteCheckBox: {
        padding: 'unset',
        fontSize: '16px'
    },
    subListHeader: {
        lineHeight: '12px'
    },
    noteListItem: {
        paddingTop: 'unset',
        paddingBottom: 'unset'
    },
    criticalPriority: {
        color: '#FFB5BC',
        marginTop: '4px'
    },
    highPriority: {
        color: '#FFDB99',
        marginTop: '4px'
    },
    lowPriority: {
        color: '#B8E4FD',
        marginTop: '4px'
    }
}));

const getListSubHeading = (dateTime, styleClass) => (
    <Grid alignItems='center' container spacing={1} classes={{ root: styleClass.subListHeader }}>
        <Grid item xs={3}>
            <Typography variant="caption">
                {getDateTime(dateTime, 'DD MMM YYYY')}
            </Typography>
        </Grid>
        <Grid item xs={1}>
            <AccessTimeIcon fontSize='inherit' />
        </Grid>
        <Grid item xs={4}>
            <Typography className={styleClass.time} variant="caption">
                {getDateTime(dateTime, 'hh:mm a')}
            </Typography>
        </Grid>
    </Grid>
);

const getNote = (note, styleClass, handleCheckList) => {

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'Critical': return 'criticalPriority'
            case 'High': return 'highPriority'
            case 'Low': return 'lowPriority'
            default: break
        }
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs={1}>
                <Checkbox
                    // edge="start"
                    checked={note.status === 'close' ? true : false}
                    tabIndex={-1}
                    disableRipple
                    onChange={(evt) => handleCheckList(note.id)}
                    classes={{ root: styleClass.noteCheckBox }}
                // inputProps={{ 'aria-labelledby': labelId }}
                />
            </Grid>
            <Grid container direction='row' justify='center' item xs={1}>
                <ErrorIcon classes={{ root: styleClass[getPriorityColor(note.priority)] }} fontSize='inherit'></ErrorIcon>
            </Grid>
            <Grid item xs={9}>
                {
                    note.status === 'close' ?
                        <Typography className={styleClass.strikeThrough} variant="body2">
                            {note.text}
                        </Typography> :
                        <Typography variant="body2">
                            {note.text}
                        </Typography>
                }
            </Grid>
        </Grid>
    )
}

const getSubList = (heading, notes, styleClass, handleCheckList) => {
    const sortedNotes = sortItemsByString(notes, 'priority', 'DESCENDING');
    return (
        <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    {getListSubHeading(heading, styleClass)}
                </ListSubheader>
            }
            className={styleClass.root}
            key={heading}
        >
            {
                sortedNotes.map(note => (
                    <ListItem key={note.id}>
                        {getNote(note, styleClass, handleCheckList)}
                    </ListItem>
                ))
            }
        </List>
    );
}

const NotesList = ({ notesData, handleCheckList }) => {
    const classes = useStyles();
    return (
        <Grid container>
            {
                Object.keys(notesData).map(noteKey => (
                    getSubList(noteKey, notesData[noteKey], classes, handleCheckList)
                ))
            }
        </Grid>
    );
}

NotesList.propTypes = {
    notesData: PropTypes.object.isRequired,
    handleCheckList: PropTypes.func.isRequired
}

NotesList.defaultProps = {
}

export default NotesList;