import React from 'react'

const Navigation = ({onRouteChange,isSignedIn})=>{

    if(isSignedIn){
            return(
                <div>
                     <nav onClick={() => onRouteChange('signin')} style={{display:'flex', justifyContent:'flex-end'}}>
                        <p className = "f3 col link dim black underline pa3 pointer">
                            Sign Out
                        </p>
                     </nav>
                </div>
            )
        }
    else{
        return(
            <div className='row'>
                <div className='col'>
                <nav onClick={() => onRouteChange('signin')} style={{display:'flex', justifyContent:'flex-end'}}>
                        <p className = "f3 col link dim black underline pa3 pointer">
                            Sign In
                        </p>
                     </nav>
                     </div>
                     <div className='col'>
                <nav onClick={() => onRouteChange('register')} style={{display:'flex', justifyContent:'flex-end'}}>
                        <p className = "f3 col link dim black underline pa3 pointer">
                            Register
                        </p>
                </nav>
                    </div>
                    
                     
            </div>
        )
    }

}

export default Navigation