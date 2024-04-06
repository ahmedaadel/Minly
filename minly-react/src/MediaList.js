import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file

function MediaList() {
  const [mediaItems, setMediaItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://192.168.1.5:3000/media')
      .then(response => {
        setMediaItems(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  const handleLike = async (id) => {
    try {
      await axios.put(`http://192.168.1.5:3000/media/${id}`, { isliked: true });
      setMediaItems(prevItems =>
        prevItems.map(item =>
          item.id === id ? { ...item, isliked: true } : item
        )
      );
    } catch (error) {
      console.error('Error liking media:', error);
    }
  };

  const handleUnlike = async (id) => {
    try {
      await axios.put(`http://192.168.1.5:3000/media/${id}`, { isliked: false });
      setMediaItems(prevItems =>
        prevItems.map(item =>
          item.id === id ? { ...item, isliked: false } : item
        )
      );
    } catch (error) {
      console.error('Error unliking media:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>An error occurred: {error.message}</div>;
  }

  return (
    <div className="post-container">
      {mediaItems.map(item => (
        <div key={item.id} className="post">
          {item.media_type === 'image' ? (
            <>
              <div className="media-container">
                <img src={createBlobURL(item.content)} alt={item.id} className="media" />
              </div>
              <div className="like-buttons">
                <button className="like-btn" onClick={() => handleLike(item.id)}>Like</button>
                <button className="like-btn" onClick={() => handleUnlike(item.id)}>Unlike</button>
              </div>
            </>
          ) : (
            <>
              <div className="media-container">
                <video controls className="media">
                  <source src={createBlobURL(item.content)} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="like-buttons">
                <button className="like-btn" onClick={() => handleLike(item.id)}>Like</button>
                <button className="like-btn" onClick={() => handleUnlike(item.id)}>Unlike</button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

function createBlobURL(binaryData) {
  const byteArray = new Uint8Array(binaryData.data);
  const blob = new Blob([byteArray], { type: 'image/jpeg' }); 
  return URL.createObjectURL(blob);
}

export default MediaList;
