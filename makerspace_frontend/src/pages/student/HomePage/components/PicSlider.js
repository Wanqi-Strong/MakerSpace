import { useState } from "react";

const styleSlider = {
  height: '100%',
  position: 'relative',
}

const styleSlide = {
  width: '100%',
  height: '100%',
  bgPosition: 'center',
  bgSize: 'cover',
}

const styleLeftArrow = {
  top: '50%',
  transform: 'translate(0, -50%)',
  position: 'absolute',
  fontSize: '30px',
  zIndex: 1,
  left: '20px',
  cursor: "pointer",
  color: '#fff',
}

const styleRightArrow = {
  top: '50%',
  transform: 'translate(0, -50%)',
  position: 'absolute',
  fontSize: '30px',
  zIndex: 1,
  right: '20px',
  cursor: "pointer",
  color: '#fff',
}

const styleDotsContainer = {
  display: 'flex',
  justifyContent: 'center'
}

const styleDot = {
  margin: '0 3px',
  cursor: 'pointer',
  fontSize: '10px',
}

const PicSlider = ({ pics }) => {
  const [currentIdx, setCurrentIdx] = useState(0);

  const goPrevious = () => {
    const checkFirstPic = currentIdx === 0
    const newIdx = checkFirstPic ? pics.length - 1 : currentIdx - 1;
    setCurrentIdx(newIdx);
  }
  
  const goNext = () => {
    const checkLastPic = currentIdx === pics.length - 1
    const newIdx = checkLastPic ? 0 : currentIdx + 1;
    setCurrentIdx(newIdx);
  }
  
  const goToPic = (picIndex) => {
    setCurrentIdx(picIndex);
  }

  const bgStyleWidth = {
    ...styleSlide,
    bgPic: `url(${pics[currentIdx].url})`
  }

  return (
    <div style={styleSlider}>
      <div>
      <div style={styleLeftArrow} onClick={goPrevious}>
        ⋙
      </div>
      <div style={styleRightArrow} onClick={goNext}>
        ⋘
      </div>
      </div>
      <div style={bgStyleWidth}></div>
      {/* <div style={styleSlide}></div> */}
      <div style={styleDotsContainer}>
        {pics.map((pic, picIndex) => (
          <div 
            key={picIndex} 
            style={styleDot} 
            onClick={() => goToPic(picIndex)}>
              •
          </div>
        ))}
      </div>
    </div>
  )
}

export default PicSlider;