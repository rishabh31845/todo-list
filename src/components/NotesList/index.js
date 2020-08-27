import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Grid } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import ErrorIcon from '@material-ui/icons/Error';
import Checkbox from '@material-ui/core/Checkbox';
import { getDateTime, sortItemsByString } from '../../common/functionalHelper';

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
    },
    noteCheckBox: {
        padding: 'unset',
        fontSize: '16px'
    }
}));

const NoteCheckbox = withStyles({
    root: {
        padding: 'unset',
        fontSize: '16px'
    }
})(Checkbox);

const NoteListItem = withStyles({
    root: {
        paddingTop: 'unset',
        paddingBottom: 'unset'
    }
})(ListItem);

const getListSubHeading = (dateTime, styleClass) => (
    <div className={styleClass.subHeading}>
        <Typography variant="caption" display="block">
            {getDateTime(dateTime, 'DD MMM YYYY')}
        </Typography>
        <AccessTimeIcon fontSize='inherit' />
        <Typography className={styleClass.time} variant="caption" display="block">
            {getDateTime(dateTime, 'hh:mm a')}
        </Typography>
    </div>
);

const getNote = (note, styleClass, handleCheckList) => {
    return (
        <Grid container spacing={1}>
            <Grid item xs={2}>
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
            <Grid item xs={1}>
                <ErrorIcon fontSize='inherit'></ErrorIcon>
            </Grid>
            <Grid item xs={9}>
                {
                    note.status === 'close' ?
                        <Typography className={styleClass.strikeThrough} variant="body2">
                            {note.text}
                        </Typography> :
                        <Typography className={styleClass.nested} variant="body2">
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
                    <NoteListItem key={note.id}>
                        {getNote(note, styleClass, handleCheckList)}
                    </NoteListItem>
                ))
            }
        </List>
    );
}

const NotesList = ({ notesData, handleCheckList }) => {
    const classes = useStyles();
    return (
        Object.keys(notesData).map(noteKey => (
            getSubList(noteKey, notesData[noteKey], classes, handleCheckList)
        ))
    );
}

NotesList.propTypes = {
    notesData: PropTypes.object.isRequired,
    handleCheckList: PropTypes.func.isRequired
}

NotesList.defaultProps = {
}

export default NotesList;