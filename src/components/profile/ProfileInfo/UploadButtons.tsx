import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';


type UploadButtonsProps = {
    savePhoto: (file: File) => void
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        input: {
            display: 'none',
        },
        icon: {
            color: '#000'
        }
    }),
);

const UploadButtons: React.FC<UploadButtonsProps> = (props) => {
    const classes = useStyles();
    const onMainPhotoSelected = (e:React.ChangeEvent<{ files: any }>) => {
        if(e.target.files.length){
            props.savePhoto(e.target.files[0])
        }
    }
    return (
        <div className={classes.root}>
            <input accept="image/*" className={classes.input} id="icon-button-file" type="file" onChange={onMainPhotoSelected}/>
            <label htmlFor="icon-button-file">
                <IconButton color="primary" aria-label="upload picture" component="span">
                    <PhotoCamera className={classes.icon}/>
                </IconButton>
            </label>
        </div>
    );
}

export default UploadButtons
