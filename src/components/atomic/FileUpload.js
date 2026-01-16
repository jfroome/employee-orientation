import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button, Typography, Grid, Alert } from '@mui/material';
import Resizer from "react-image-file-resizer";


const resizeFile = (newFile) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      newFile,
      1000,
      1000,
      "PNG",
      300,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  });

export default function FileUpload({ file, setFile, onClick, title, required }) {
  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles.length > 0) {
      getBase64(acceptedFiles[0]);
    }
  }, [])


  async function getBase64(fileInput) {
    if (fileInput.size > 1000000) { // 3.5MB
      let result = await resizeFile(fileInput);
      setFile(result);
    }
    else {
      let reader = new FileReader();
      reader.readAsDataURL(fileInput);
      reader.onload = async function () {
        const result = reader.result;
        setFile(result);
      }
    }
  }



  const { fileRejections, getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg']
    },
    maxFiles: 1,
    multiple: false,
    validator:
      (file) => {
        if (file.size >= 30000000) {
          setFile('')
          return {
            code: 'file-too-large',
            message: 'File is too large. Maximum file size is 30MB.'
          };
        }
        return null;
      }
  });



  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
      <ul>
        {errors.map(e => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ));


  return (
    <>
      <Grid item xs={12}
        component="img"
        sx={{
          maxHeight: { xs: 400, md: 400 },
          width: "auto"
        }}
        alt=""
        src={file}
      />
      {
        fileRejectionItems.length > 0 &&
        <Alert severity="error">{fileRejectionItems}</Alert>
      }
      <Grid item xs={12} {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <div className={'drop-box'}>
            <Typography variant='h7'>Drop the file here ...</Typography>
          </div>
        ) : (
          <Button type='button' variant='outlined' onClick={onClick}>
            {title ?? 'Click or drag & drop the file'}
          </Button>
        )}
      </Grid>
    </>
  )
}