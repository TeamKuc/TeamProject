import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import { Typography } from 'antd'
import upload from '../../modules/upload';

function ThumbnailUpload({ onDrop, onDelete, images }) {
  
  const { Title } = Typography;
  const f1 = () => {
    console.log(images[0])
  }
  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
      <button onClick={f1}>src Check</button>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Dropzone onDrop={onDrop} multiple={false} maxSize={800000000}>
          {({ getRootProps, getInputProps }) => (
            <div
              style={{
                width: '300px',
                height: '240px',
                border: '1px solid lightgray',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              {...getRootProps()}
            >
              <input {...getInputProps()} />
            </div>
          )}
        </Dropzone>

        <div
          style={{
            display: 'flex',
            width: '350px',
            height: '240px',
            overflowX: 'scroll',
          }}
        >
          {images.map((image, index) => (
            <div key={index} onClick={() => onDelete(image)}>
              <img
                style={{ minWidth: '300px', width: '300px', height: '240px' }}
                alt={`productImg-${index}`}
                src={`${images[index].image.location}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ThumbnailUpload;
