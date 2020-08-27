import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
    Card,
    Divider,
    CardContent,
    Button,
    Typography,
    Grid
} from '@material-ui/core';
import ReceiptOutlinedIcon from '@material-ui/icons/ReceiptOutlined';
import { NotesList, CreateNote } from '../../components'
import { notesData } from '../../common/dummyNotes'
import { groupItemsByKey, sortItemsByDate } from '../../common/functionalHelper';

const noteCardHeading = 'My Notes';
const addNoteHeading = 'Add note here';

const useStyles = makeStyles({
    root: {
        minWidth: 340,
        maxWidth: 340
        // width: 100
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    displayCardHeading: {
        display: 'flex'
    }
});

const BootstrapButton = withStyles({
    root: {
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 12,
        padding: '6px 12px',
        lineHeight: 1.5,
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:hover': {
            boxShadow: 'none',
            background: 'none'
        },
        '&:active': {
            boxShadow: 'none',
        }
    },
})(Button);

const getSortedGroupData = (notes) => {
    const clonedNotesData = [...notes];
    // sort the data and will take top 4 data only
    const sortedData = sortItemsByDate(clonedNotesData, 'createdDate', 'DESCENDING').splice(0, 4);

    // return the group data based on date time
    return groupItemsByKey(sortedData, 'createdDate');
}

const NotesCard = () => {
    const classes = useStyles();
    const [editMode, setEditMode] = React.useState(false);
    const [notes, setNotes] = React.useState(notesData)

    const onSave = (data) => {
        const newNotes = [...notes, data]
        setNotes(newNotes);
        setEditMode(false);
    };

    const onCancel = () => {
        setEditMode(false);
    }

    const handleCheckList = (id) => {
        console.log('Called -> ', id);
        notes.forEach(note => {
            if (note.id === id) {
                note.status = note.status === 'open' ? 'close' : 'open';
            }
        });
        setNotes([...notes]);
    }

    console.log('notes', notes);

    return (
        <Card className={classes.root}>
            <CardContent>
                <Grid container spacing={1} direction={'column'}>
                    <Grid item className={classes.displayCardHeading}>
                        <ReceiptOutlinedIcon fontSize='large' />
                        <Typography variant="caption">{noteCardHeading}</Typography>
                    </Grid>
                    <Grid item>
                        {editMode ?
                            <CreateNote
                                onSave={onSave}
                                onCancel={onCancel}
                            /> :
                            <>
                                <BootstrapButton onClick={() => setEditMode(true)}>{addNoteHeading}</BootstrapButton>
                                <Divider />
                                <NotesList handleCheckList={handleCheckList} notesData={getSortedGroupData(notes)}></NotesList>
                            </>
                        }
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}

export default NotesCard;
