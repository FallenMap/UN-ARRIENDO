import React from 'react'
import { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Paper } from '@mui/material';
import { formAllListings } from '../../../adapters/formAdapters';


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

export default function PhotosForm(props) {
  const [files, setFiles] = useState([]);

  if (files.length === 0) {
    let tempFiles = props.data.getAll('files');
    if (tempFiles.length !== 0) {
      setFiles(tempFiles.map(file => {
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        });
        return file;
      }));
    }
  }
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpeg'],
      'image/jpg': ['.jpg']
    },
    onDrop: acceptedFiles => {
      while (props.data.get('files')) {
        props.data.delete('files');
      }
      acceptedFiles.forEach((file) => { props.data.append('files', file) });
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    },
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
      cursor: 'pointer',
      background: '#fafafa',
      color: '#bdbdbd',
      border: '1px dashed #ccc',
      '&:hover': { border: '1px solid #ccc' }
    }}>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input name={formAllListings.fotos} {...getInputProps()} />
        {
          isDragActive ? (
            <p style={{ color: 'green' }}>¡Coloca tus imagenes aqui!</p>
          ) : (
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
}
