import image1 from './images/1.png'
import image2 from './images/2.png'
import image3 from './images/3.png'
import * as React from 'react';  
import Button from '@mui/material/Button';  
import Stack from '@mui/material/Stack';  

const FunctionBox = () => {
    return (
        <div className='container flex flex_space-around'>
            <img src={image1} width={250} height={250}></img>
            {/* <Button
                onClick={() => {
                    alert('clicked');
                }}
            >
                Click me
            </Button> */}
            <img src={image2} width={250} height={250}></img>
            <img src={image3} width={250} height={250}></img>
        </div>
    )
}

export default FunctionBox;