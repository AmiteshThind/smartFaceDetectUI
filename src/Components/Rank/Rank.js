import React from 'react';

const Rank = ({name,entries})=>{
    return(
        <div>
            <div>
            <p className='f3 white'>{`${name}, your current rank is...`}</p>
            </div>
            <div>
                <p className='f1 white'>{entries}</p>
            </div>
        </div>
    )
}

export default Rank;