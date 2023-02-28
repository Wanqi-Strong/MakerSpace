import './userHome.css';
import { useState } from "react";

const PicSlider = ({ pics }) => {
  const [currentIdx, setCurrentIdx] = useState(0);

  const goPrevious = () => {
    const checkFirstPic = currentIdx === 0;
    const newIdx = checkFirstPic ? pics.length - 1 : currentIdx - 1;
    setCurrentIdx(newIdx);
  }

  const goNext = () => {
    const checkLastPic = currentIdx === pics.length - 1;
    const newIdx = checkLastPic ? 0 : currentIdx + 1;
    setCurrentIdx(newIdx);
  }

  const goToPic = (picIndex) => {
    setCurrentIdx(picIndex);
  }

  return (
    <div className='slider'>
      <div>
        <div className='leftArrow' onClick={goPrevious}>
          ❰
        </div>
        <div className='rightArrow' onClick={goNext}>
          ❱
        </div>
      </div>
      <div className='slide'></div>
      <div className='dotsContainer'>
        {pics.map((pic, picIndex) => (
          <div
            key={picIndex}
            className='dot'
            onClick={() => goToPic(picIndex)}>
            ●
          </div>
        ))}
      </div>
    </div>
  );
};

export default PicSlider;