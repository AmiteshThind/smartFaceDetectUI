import React from 'react';
import "./ImageLinkForm.css"

const ImageLinkForm = ({onInputChange,onSubmit})=>{
    return(
        <div>
            <p className="f3">{'This Magic brain will detect the faces in any image you upload. Try it out.'}</p>
            <div className='center'>
                <div className="center form pa4 br3 shadow-5">
                <input className='form-control f4 pa2 w-70 center' type='text' onChange={onInputChange} />
                <button className='btn button w-30 grow f4 link grow ph3 pv dib white bg-light-purple' onClick={()=>onSubmit()} >Detect</button>
            </div>
            </div>  
        </div>

    )
}

export default ImageLinkForm;