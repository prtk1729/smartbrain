import React, { Component } from 'react';
import Particles from 'react-particles-js'; 
import Clarifai from 'clarifai'; 
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import Rank from './Components/Rank/Rank';
import ImageLink from './Components/ImageLink/ImageLink';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';
import './index.css';
import './App.css';


const app = new Clarifai.App({
 apiKey: '1bf76a31752947698348696d992bb808'
});


const particleOptions={
    particles:{
      number: {
         value: 125, 
         density: 
          { 
            enable: true, 
            value_area: 800
         } },
      color: { value: "#ffffff" },
      move: {
      enable: true,
      speed: 6,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: { enable: false, rotateX: 600, rotateY: 1200 }
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "repulse" },
      onclick: { enable: true, mode: "push" },
      resize: true
    },
}}
          
                      
class App extends Component {

  constructor(){
    super();
    this.state={
              input: '',
              Url: '',
              box: '',
              route: 'signin',
              isSignedIn: false
              }
  }

  calculateFaceLoc=(data)=>
  {
    const clarifaiFace=data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const height = Number(image.height);
    const width = Number(image.width);
   
    return{

        leftCol: clarifaiFace.left_col*width,
        rightCol: width-(clarifaiFace.right_col*width),
        bottomRow: height-(clarifaiFace.bottom_row*height),
        topRow: clarifaiFace.top_row*height
    }
  }

  displayFaceBox=(box)=>{
    //console.log(box);
    this.setState({box: box});
  }

  onInputChange=(event)=>
  {
    this.setState({input: event.target.value});
  }

  onButtonClick=()=>
  {
    this.setState({Url: this.state.input});
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL, 
        this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLoc(response)))  
      .catch(err=> console.log(err));
  }

  onRouteChange=(data)=>
  {
    if(data==='signout')
          this.setState({isSignedIn: false});
        
    else if(data==='home')
          this.setState({isSignedIn: true});
        
                
    this.setState({route: data});
  }

  render() {
    return (
     
     <div className="App">

        <Particles 
          className='partclass'
          params={particleOptions}
        />

        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />

        {this.state.route==='home'

          ?<div>
            <Logo />
            <Rank />
            <ImageLink onInputChange={this.onInputChange} onButtonClick={this.onButtonClick}/>
            <FaceRecognition box={this.state.box} Url={this.state.Url}/>
          </div>

          :<div>
            {this.state.route==='register'
              ?<Register onRouteChange={this.onRouteChange}/>
              :<SignIn onRouteChange={this.onRouteChange}/>
              
            }
          </div>
        }

     </div>
    );
  }
}

export default App;
