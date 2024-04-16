import React, { useState } from 'react';
import './App.css'; // Assuming you have a CSS file for styling
import 'font-awesome/css/font-awesome.min.css';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleSearch = async () => {
    if (!searchTerm) return;

    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?q=${searchTerm}&key=AIzaSyCUeiuJePOVU4Rb5EugS7267eUk7H8BrbY&part=snippet&type=video&maxResults=21`
      );
      const data = await response.json();
      setVideos(data.items);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  const handleVideoClick = (videoId) => {
    setSelectedVideo(videoId);
  };

  return (
    <div className="container">
      <div className="search-container">
        <div >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search videos..."
            className="search-input"
          />
          <button onClick={handleSearch} className="search-btn">
            <i className="fa fa-search"></i>
          </button>
        </div>
      </div>
      <div className='meme-container'>
        {videos.length===0 &&
        <img src="meme.jpg" alt="Computer man" style={{width:"20vw",height:"auto", opacity:0.5}}></img>
        }
      </div>
      <div className="videos-container">
        {videos.map((video) => (
          <div key={video.id.videoId} className="video-card" onClick={() => handleVideoClick(video.id.videoId)}>
            <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} className="video-thumbnail" />
            <p className="video-title">{video.snippet.title}</p>
          </div>
        ))}
      </div>
      {selectedVideo && (
        <div className="video-modal">
          <button onClick={() => setSelectedVideo(null)} className="close-btn">
            Close
          </button>
          <iframe
            title="YouTube Video"
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${selectedVideo}`}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      )}
      <div className='footer'>
        <b>from <strong>sawy!</strong> @2024</b>
      </div>
    </div>
  );
};

export default App;
