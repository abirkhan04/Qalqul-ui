import React from 'react';
import Button from '@material-ui/core/Button';
import { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  imageWrapper: {
    width: '100%',
    marginTop: '40px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: '90%',
    height: 'auto',
    margin: '10px',
    border: '1px solid teal',
    borderRadius: '2%'
  }
}));

export const ImageUploadPopup = ({imageUploadAction, profileImage}) => {
  const [state, setState] = useState({ files: [], previewUrls: [], profileUrl: null});
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { id, files } = event.target;
    if(id === 'profileUrl') {
        const reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = (_event) => {
          state.profileUrl =  reader.result;
          setState({ ...state, files: files});
        };
    }
    if(id ==='previewUrls') {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (_event) => {
          state.previewUrls = [...state.previewUrls, reader.result];
          setState({ ...state, files: files });
        };
      });
    }
  }

  return <>
   <input
  id="profileUrl"
  accept="image/*"
  type="file"
  onChange={handleChange}
/><Button
    variant="contained"
    component="label" onClick={()=>{if(state.files) dispatch(imageUploadAction(state.files)).then(()=> toast("Upload Successful.", {type: 'success'}))}}>
      Upload Profile Image
</Button>
<div className={classes.imageWrapper}>
      {state.profileUrl || profileImage?<img className={classes.image} src={state.profileUrl || `data:image/png;base64,${profileImage.picture}`} alt={""} />: <></> }
</div>
<br/>
  <input
    id="previewUrls"
    accept="image/*"
    multiple
    type="file"
    onChange={handleChange}
  /><Button
    variant="contained"
    component="label" onClick={()=>{if(state.files) dispatch(imageUploadAction(state.files)).then(()=> toast("Upload Successful.", {type: 'success'}));}}>
      Upload Files
  </Button><div className={classes.imageWrapper}>
      {state.previewUrls.length > 0 ? state.previewUrls.map((url, index) => <img className={classes.image} key={index} src={url} alt={""} />) : <></>}</div>
  </>
};
