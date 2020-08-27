import React, { useState, Fragment } from "react";
import "./VideoPlayer.css";
const VideoPlayer = (props) => {
  const [currentPage, setPage] = useState(1);
  const { data, swipe, setSwipe } = props;
  setSwipe("static");
  if (swipe === "hold") return null;
  const {
    video,
    channel: {
      user: { name: userName },
    },
  } = data;
  if (currentPage === 1 && swipe === "right") {
    setPage(2);
  }
  if (currentPage === 2 && swipe === "left") {
    setPage(1);
  }
  console.log(currentPage);
  return (
    <div className="profileContainer">
      {currentPage === 1 && (
        <video className="video-player">
          <source src={video.originalUrl} />
        </video>
      )}
      {currentPage === 2 && <div className="profile">{userName}</div>}
    </div>
  );
};

export default VideoPlayer;
