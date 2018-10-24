import React, { Component } from 'react';
import './App.css';
import Navigation from './components/navigation/navigation';
import SignIn from './components/SignIn/SignIn';
import Logo from './components/Logo/logo'
import ImageLinkForm from './components/imageLinkForm/imagelinkform';
import Rank from './components/rank/rank'
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Register from'./components/Register/Register';

const app = new Clarifai.App({
  apiKey: '004d2238001c45199def97c3509d590c'
 });

 const particleOptions ={
  particles: {
    number:{
      value:30,
      density: {
        enable: true,
        value_area: 800
      }
    },
  }
}

class App extends Component {
  //state

  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    }
  }
  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  displayFaceBox = (box) => {
    this.setState({box:box})
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signin'){
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
        this.setState({route: route, isSignedIn: true});
    }
    this.setState({route: route});
  }
  render() {
    const { isSignedIn, imageUrl, route, box} = this.state;
    return (
      <div className="App">
        <Particles className='particles' params={particleOptions} />
        <Navigation isSignedIn={isSignedIn} onRouteChange= {this.onRouteChange}/>
        { route === 'home'
          ? <div>
              <Logo />
              <Rank />
              <ImageLinkForm onInputChange = {this.onInputChange} onButtonSubmit = {this.onButtonSubmit} />
              <FaceRecognition box={box} imageUrl={imageUrl} />
            </div>
          : (
              route ==='signin'
              ? <SignIn onRouteChange= {this.onRouteChange}/>
              : <Register onRouteChange= {this.onRouteChange}/> 
            )
        }
      </div>
    );
  }
}

export default App;
