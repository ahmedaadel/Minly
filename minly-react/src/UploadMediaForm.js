import React, { useState } from 'react';
import axios from 'axios';
import './UploadMediaForm.css'; 

function UploadMediaForm({ onUpload }) {
  const [file, setFile] = useState(null);
  const [mediaType, setMediaType] = useState('image');

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.readAsArrayBuffer(file);

    reader.onload = () => {
      const base64Content = btoa(
        new Uint8Array(reader.result)
          .reduce((data, byte) => data + String.fromCharCode(byte), '')
      );
      const data = {
        content: base64Content,
        media_type: mediaType,
      };

      axios.post('http://localhost:3000/media', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(() => {
        onUpload();
        alert('Media content uploaded successfully');
      })
      .catch((error) => {
        console.error('Error uploading media content:', error);
        alert('Failed to upload media content');
      });
    };

    reader.onerror = () => {
      console.error('Error reading file:', reader.error);
      alert('Failed to read the selected file');
    };
  };

  return (
    <form className="upload-form" onSubmit={handleSubmit}>
      <label>
        Upload File:
        <input type="file" onChange={handleFileChange} />
      </label>
      <label>
        Media Type:
        <select value={mediaType} onChange={(e) => setMediaType(e.target.value)}>
          <option value="image">Image</option>
          <option value="video">Video</option>
        </select>
      </label>
      <button type="submit">Upload</button>
    </form>
  );
}

export default UploadMediaForm;
