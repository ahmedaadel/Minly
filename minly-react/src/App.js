import React, { useState } from 'react';
import UploadMediaForm from './UploadMediaForm';
import MediaList from './MediaList';

function App() {
  const [uploaded, setUploaded] = useState(false);

  const handleUpload = () => {
    setUploaded(true);
  };

  return (
    <div>
      <h1>Media Management System</h1>
      <UploadMediaForm onUpload={handleUpload} />
      { <MediaList />}
    </div>
  );
}

export default App;
