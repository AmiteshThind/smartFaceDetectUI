import React from 'react';
import './FaceRecognition.css'

const FaceRecognition = ({ imageURL, box, imageAvailable }) => {
    if (imageAvailable) {
        return (

            <div className='center'>
                <div className="absolute mt5">
                    <img id='inputimage' alt='img' width='500px' height='auto' className=' ba bw2 shadow-2 ' src={imageURL} />
                    <div className='bounding-box' style={{ top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}></div>
                </div>
            </div>
        )
    } else {
        return (
            <div></div>
        )
    }
}
export default FaceRecognition; 