import React from 'react'
import { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Paper } from '@mui/material';
import { formAllPublication } from '../../../adapters/formAdapters';


const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};

export default function PhotosForm() {
  const [files, setFiles] = useState([]);
  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    accept: {
      'image/png': ['.png'],
      'image/jpeg':['.jpeg'],
      'image/jpg': ['.jpg']
    },
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });
  
  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          alt={file.name}
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => { URL.revokeObjectURL(file.preview) }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <Paper className="container" sx={{
      cursor:'pointer',
      background: '#fafafa',
      color: '#bdbdbd',
      border: '1px dashed #ccc',
      '&:hover':{border:'1px solid #ccc'}
    }}>
      <div {...getRootProps({className: 'dropzone'})}>
        <input name={formAllPublication.fotos} {...getInputProps()} />
        {
          isDragActive?(
            <p style={{color:'green'}}>¡Coloca tus imagenes aqui!</p>
          ):(
            <p>Suelta las imagenes aqui, o da clic para subirlas.</p>
          )
        }
        <em>Imagenes con extension .jpeg, .png, .jpg serán aceptadas.</em>
      </div>
      <aside style={thumbsContainer}>
        {thumbs}
      </aside>
    </Paper>
  );

  /*const [files, setFiles] = useState([]);
  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles);
  })
  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    accept: {'image/*':[]}
  })
  return (
    <Paper sx={{
      cursor:'pointer',
      background: '#fafafa',
      color: '#bdbdbd',
      border: '1px dashed #ccc',
      '&:hover':{border:'1px solid #ccc'}
    }}>
      <div {...getRootProps()}>
        <input {...getInputProps()}></input>
        {
          isDragActive?(
            <p style={{color:'green'}}>¡Coloca tus imagenes aqui!</p>
          ):(
            <p>Suelta las imagenes aqui, o da clic para subirlas.</p>
          )
        }
        <em>Imagenes con extension .jpeg, .png, .jpg serán aceptadas.</em>
      </div>
    </Paper>
  )*/
}
