import React from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';




const startingState = {
  input: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id:'',
    name:'',
    email:'',
    entries: 0,
    joined: ''
  }
};

class App extends React.Component {
  constructor() {
    super();
    this.state = startingState;
  }
  onInputChange= (event) => {
    this.setState({input: event.target.value,box:{}});
  }

  loadUser = (user) => {
    this.setState({user: {
      id: user.id,
      name: user.name,
      email: user.email,
      entries: user.entries,
      joined: user.joined
    }});
  }

  calculateFaceLocation = (resp) => {
    const box_info = resp.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('imageId');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: box_info.left_col * width,
      topRow: box_info.top_row * height,
      rightCol: width - box_info.right_col * width,
      bottomRow: height - box_info.bottom_row * height
    }
  }

  displayBox = (box) => {
    this.setState({box: box});
  }

  onSubmit = () => {
    fetch('http://localhost:3000/apiCall', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
        input: this.state.input
      })
    }).then(resp => resp.json())
    .then(resp => {
          if(resp) {
            fetch('http://localhost:3000/image', {
              method: 'put',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                id: this.state.user.id
              })
            }).then(resp => resp.json())
              .then(entry => {
                this.setState(Object.assign(this.state.user,{entries: entry}));
              });
          }
          return this.calculateFaceLocation(resp)
       }).then(box => this.displayBox(box))
      .catch(err => console.log(err));
  }
  onRouteChange = (route) => {
    if(route === 'home') {
      this.setState({isSignedIn:true});
    } else {
      this.setState(startingState);
    }
    this.setState({route:route});
  }

  render() {
    return (
      <div className="App">
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn}/>
        <Logo />
        { this.state.route === 'home'
          ? <div>
              <Rank uname = {this.state.user.name} entries = {this.state.user.entries}/>
              <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit} />
              <FaceRecognition imageURL={this.state.input} box = {this.state.box}/>
            </div>
          : ( this.state.route === 'signin'
              ? <SignIn onRouteChange={this.onRouteChange} loadUser = {this.loadUser}/>
              : <SignUp onRouteChange={this.onRouteChange} loadUser = {this.loadUser}/>
            )
        }
      </div>
    );
  }
}

export default App;
