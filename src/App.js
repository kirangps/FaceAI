import logo from './logo.svg';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import tachyons from 'tachyons'
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
//import reactDom from 'react-dom';
import React from 'react';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';

const particlesEffect ={
 
    particles: {
      number :{
        value: 10,
        density:{
          enable:true,
          value_area:50

          
        }
      }
    }
 }

 const app= new Clarifai.App({
   apiKey : '94e530d675b14c99afdb925b40c74ab4 '
 });







  class App extends React.Component{
    constructor(){
      super();
      this.state={
        input:"",
        imageUrl:"",
        box:{}
      }
    }

    onInputChange = (event) =>{
      this.setState({input : event.target.value});
    }

    calculateFaceLocation = (data) =>{
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image=document.getElementById("inputImage");
    const width=Number(image.width);
    const height = Number(image.height);
    let mainData ={
      leftCol : clarifaiFace.left_col * width,
      topRow : clarifaiFace.top_row * height,
      rightCol : width-(clarifaiFace.right_col * width),
      bottomRow : height-(clarifaiFace.bottom_row * height)          
    }
    return mainData
    }

    dispalyFaceBox = (box)=>{
      this.setState({box : box})   //changing our state
    }

    onSubmit = () =>{
      this.setState({imageUrl : this.state.input});
      console.log("kiran");
      app.models               //like fetching the data from Api
           .predict(
             'a403429f2ddf4b49b307e318f00e528b',this.state.input
           )
           .then(response=> {
            this.dispalyFaceBox(this.calculateFaceLocation(response));   //capturing the data from mainData
           })
           .catch(err =>console.log(err));
    }


    render(){
      return(
        <div className="App">
         
          <Particles params={particlesEffect} className="particles"/> 
          <Navigation/>
          <Logo/>
          <Rank/>
          <ImageLinkForm onSubmit = {this.onSubmit} onInputChange={this.onInputChange}/>
          <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box}/>
          
    </div>
    );
    }

}

export default App;
