import React, { Component } from 'react';
import Particles from 'react-particles-js';
<<<<<<< HEAD
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Navigation from './components/navigation/navigation';
import Signin from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Logo from './components/Logo/logo';
import ImageLinkForm from './components/imageLinkForm/imagelinkform';
import Rank from './components/rank/rank';
import './App.css';

const particlesOptions = {
=======
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Register from'./components/Register/Register';

const app = new Clarifai.App({
  apiKey: '004d2238001c45199def97c3509d590c'
 });

 const particleOptions ={
>>>>>>> parent of 2be9576... Pre-Check Final Changes
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

class App extends Component {
  //state

  constructor() {
    super();
<<<<<<< HEAD
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

=======
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false
    }
  }

>>>>>>> parent of 2be9576... Pre-Check Final Changes
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
<<<<<<< HEAD
      fetch('https://quiet-tor-90971.herokuapp.com/imageurl', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('https://quiet-tor-90971.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            })
            .catch(console.log)

        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
=======
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signin'){
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
        this.setState({route: route, isSignedIn: true});
>>>>>>> parent of 2be9576... Pre-Check Final Changes
    }
    this.setState({route: route});
  }

  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App">
         <Particles className='particles'
          params={particlesOptions}
        />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        { route === 'home'
          ? <div>
              <Logo />
<<<<<<< HEAD
              <Rank
                name={this.state.user.name}
                entries={this.state.user.entries}
              />
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
              />
              <FaceRecognition box={box} imageUrl={imageUrl} />
            </div>
          : (
             route === 'signin'
             ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
             : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
=======
              <Rank />
              <ImageLinkForm onInputChange = {this.onInputChange} onButtonSubmit = {this.onButtonSubmit} />
              <FaceRecognition box={box} imageUrl={imageUrl} />
            </div>
          : (
              route ==='signin'
              ? <SignIn onRouteChange= {this.onRouteChange}/>
              : <Register onRouteChange= {this.onRouteChange}/> 
>>>>>>> parent of 2be9576... Pre-Check Final Changes
            )
        }
      </div>
    );
  }
}

export default App;