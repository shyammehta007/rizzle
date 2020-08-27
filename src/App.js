import React, { useState, Fragment } from "react";
import "./App.css";
import data from "./data";
import VideoPlayer from "./components/VideoPlayer";

const findSwipeType = (deltaX, deltaY, setSwipe) => {
  const absX = Math.abs(deltaX);
  const absY = Math.abs(deltaY);
  if (absX <= 30 && absY <= 30) {
    setSwipe("hold");
    return;
  }
  absX > absY
    ? deltaX > 0
      ? setSwipe("right")
      : setSwipe("left")
    : deltaY > 0
    ? setSwipe("down")
    : setSwipe("up");
};

function App() {
  const [touchCoOrdinates, setCoOrdinates] = useState({});
  const [swipeType, setSwipe] = useState("statics");

  const handleTouchStart = (e) => {
    e.persist();
    setCoOrdinates({
      startX: e.targetTouches[0].clientX,
      startY: e.targetTouches[0].clientY,
    });
  };

  const handleTouchEnd = (e) => {
    e.persist();
    const { clientX: endX, clientY: endY } = e.changedTouches[0];
    const { startX, startY } = touchCoOrdinates;
    setCoOrdinates({});
    const deltaX = startX - endX;
    const deltaY = startY - endY;
    findSwipeType(deltaX, deltaY, setSwipe);
    document.ontouchmove = function (e) {
      return true;
    };
  };

  console.log(swipeType);
  const demo = data.slice(2, 5);
  return (
    <Fragment>
      {demo.map((items) => {
        return (
          <div
            onTouchStart={(e) => handleTouchStart(e)}
            onTouchEnd={(e) => handleTouchEnd(e)}
            className="container"
          >
            <VideoPlayer data={items} swipe={swipeType} setSwipe={setSwipe} />
          </div>
        );
      })}
    </Fragment>
  );
}

export default App;
