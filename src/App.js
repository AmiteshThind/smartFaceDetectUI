import React from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation'
import Logo from './Components/Logo/Logo'
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm'
import Rank from './Components/Rank/Rank'
import SignIn from './Components/SignIn/SignIn'
import FaceRecognition from './Components/FaceRecognition /FaceRecognition'
import Register from './Components/Register/Register'
import Particles from 'react-particles-js'
import { useState } from 'react'
import Clarifai from 'clarifai'


const app = new Clarifai.App({
  apiKey: '0587b6c8f5264486a9ee527c6f00622e'
});

const particleOptions = {
  particles: {
    number: {
      value: 150,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

function App() {
  const [route, setRoute] = useState('signin')
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [input, setInput] = useState('');
  const [imageURL, setImageURL] = useState('')
  const [box, setBox] = useState({});
  const [imageAvailable, setImageAvailable] = useState(false);
  const [user, setUser] = useState({ id: '', name: '', email: '', entries: '', joined: '' })


  let loadUser = (data) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined

    });
    setImageAvailable(false);
    setBox({});
  }

  let onInputChange = (event) => {
    console.log(event.target.value);
    setInput(event.target.value);
  }

  let calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;

    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * 500,
      rightCol: width - clarifaiFace.right_col * 500,
      topRow: clarifaiFace.top_row * height,
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  let displayFaceBox = (box) => {
    setBox(box);
  }

  let onSubmit = () => {
    //setImageAvailable(false);
    setImageURL(input)
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        input)
      .then(
        function (response) {
          
          setImageAvailable(true);

          fetch('https://powerful-inlet-04840.herokuapp.com/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: user.id
            })
          }).then(response => response.json())
            .then(count => setUser(prevState => {
              return { ...prevState, entries: count }
            }));

          displayFaceBox(calculateFaceLocation(response));

          
        })
      .catch(err => console.log(err));
    ;
  }

  let onRouteChange = (route) => {
    if (route === 'home') {
      setIsSignedIn(true);
    } else {
      setIsSignedIn(false);
    }
    setRoute(route);
  }

  return (
    <div className="App">
      <Particles className="particles"
        params={particleOptions}
      />

      {route === 'home'
        ?
        <div>
          <div className="row mt3 mr4">
            <Logo />
            <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
          </div>

          <Rank name={user.name} entries={user.entries} />
          <ImageLinkForm onInputChange={onInputChange} onSubmit={onSubmit} />
          <FaceRecognition imageAvailable={imageAvailable} box={box} imageURL={imageURL} />
        </div>

        : (route === 'signin')
          ?
          <div className='mt3 mr4'>
            <div className='row'>
              <Logo />
              <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
            </div>

            <SignIn loadUser={loadUser} onRouteChange={onRouteChange} />
          </div>
          :
          <div className='mt3 mr4'>
            <div className='row'>
              <Logo />
              <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
            </div>
            <Register loadUser={loadUser} onRouteChange={onRouteChange} />
          </div>
      }
    </div>
  );
}

export default App;
