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
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { NotesList, CreateNote } from '../../components'
import { notesData } from '../../common/dummyNotes'
import { groupItemsByKey, sortItemsByDate } from '../../common/functionalHelper';

const noteCardHeading = 'My Notes';
const addNoteHeading = 'Add note here';

const useStyles = makeStyles({
    root: {
        minWidth: 360,
        // maxWidth: 340
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
    const [notes, setNotes] = React.useState(notesData);
    const [showMore, setShowMore] = React.useState(true);

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

    const viewMoreNotes = () => {
        console.log('See More Button Clicked!!!')
        setShowMore(!showMore)
    }

    return (
        <Card className={classes.root}>
            <CardContent>
                <Grid container spacing={4} direction={'column'}>
                    <Grid item xs>
                        <Grid container spacing={1}>
                            <Grid item xs={2}>
                                <ReceiptOutlinedIcon fontSize='large' />
                            </Grid>
                            <Grid item xs>
                                <Typography variant="subtitle1">{noteCardHeading}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                    {editMode ?
                        <Grid container item spacing={1}>
                            <CreateNote
                                onSave={onSave}
                                onCancel={onCancel}
                            />
                        </Grid>
                        :
                        <Grid container spacing={1} direction='column'>
                            <Grid item xs>
                                <BootstrapButton onClick={() => setEditMode(true)}>{addNoteHeading}</BootstrapButton>
                            </Grid>
                            <Grid item xs><Divider /></Grid>
                            <Grid container item xs>
                                <NotesList handleCheckList={handleCheckList} notesData={getSortedGroupData(notes)}></NotesList>
                            </Grid>
                            {notes.length > 4 ?
                                < Grid container item xs={12} justify='flex-end'>
                                    <Button
                                        color="primary"
                                        className={classes.button}
                                        endIcon={<ArrowDownwardIcon fontSize='small' />}
                                        onClick={viewMoreNotes}
                                    >
                                        {showMore ? 'See All Notes' : 'Hide Notes'}
                                    </Button>
                                </Grid>
                                : null
                            }
                        </Grid>
                    }
                </Grid>
            </CardContent>
        </Card >
    );
}

export default NotesCard;
