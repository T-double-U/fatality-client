import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/header/header';
import Slider from './components/slider/slider';
import Individuals from './components/individuals/individuals';
import Privilegies from './components/privilegies/privilegies';
import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/global.css'
import ScrollableAnchor from 'react-scrollable-anchor';
import OpenTestModal from './components/openTestModal/openTestModal'

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      modalToggled: true
    }
  }

  toggleModal = () =>{
    this.setState({modalToggled: !this.state.modalToggled})
  }
  
  componentDidUpdate(){
    if (this.state.modalToggled){
      document.getElementById('root').classList.add("blurred");
    }else{
        document.getElementById('root').classList.remove("blurred");
    }
  }

  componentDidMount(){
    if (this.state.modalToggled){
      document.getElementById('root').classList.add("blurred");
    }else{
        document.getElementById('root').classList.remove("blurred");
    }
    console.log(process.env.NODE_ENV)
    
    if (window.location.search.includes('ref')){
      var url = new URL(window.location);
      localStorage.setItem('ref', url.searchParams.get("ref"));
    }

    if (window.location.search.includes('steam_data')){
      var url = new URL(window.location);
      let steamData = JSON.parse(url.searchParams.get("steam_data"));
      localStorage.setItem('steam_id', steamData['steamID'].replace('STEAM_0', 'STEAM_1'));
      localStorage.setItem('steam_id64', steamData['steamid']);
      localStorage.setItem('nickname', steamData['personaname']);
      localStorage.setItem('profileurl', steamData['profileurl']);
      localStorage.setItem('avatarfull', steamData['avatarfull']);
      window.location.href = window.location.origin
    }
  }

  render(){
    return (
      <div className="App d-flex flex-column">
        <OpenTestModal
                  show={this.state.modalToggled}
                  onHide={() => this.toggleModal(false)}
              />
        <Header />
        <Slider />
        <ScrollableAnchor id={'privilegies'} >
          <Privilegies />
        </ScrollableAnchor>
        <div className='splitter'>
          <ScrollableAnchor id={'personal-stuff'}><div></div></ScrollableAnchor>
          <div className='splitter__clip'></div>
        </div>
        <Individuals/>
      </div>
    );
  }
}

export default App;
