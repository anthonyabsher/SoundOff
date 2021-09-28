import '../App.css';
import React, { Component } from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import TextField from '@material-ui/core/TextField';
import {  withRouter } from "react-router-dom";
import yellow_flow from '../yellow_flow.mp4';



function genID() {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < 6; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}


const ButtonTEST = withRouter(({ history, props }) => (
  <button type='button' style={styles.submitButton}
    onClick={async () => {
      if(!props.user) {
        alert("A valid username must be entered!");
      } else if(!props.accessToken) {
        alert("No valid access token, please navigate back to the home screen.");
      } else {
        if(!props.id) { 
          props.id = genID(); 
        }
        // const requestOptions = {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', "mode": "no-cors"},
        //   body: JSON.stringify({ id: props.id })
        // };
        // let checkRoom = await fetch("http://localhost:4001/checkRoom", requestOptions);
        // if(checkRoom){
        //   alert("Room ID already exists");
        // } else {
          history.push('/room', props);
        // }
      }
    }}
  >
    Start
  </button>
))

class Entry extends Component {
  constructor() {
    super();
    this.changeOption = this.changeOption.bind(this);
    this.updateUserName = this.updateUserName.bind(this);
    this.updateRoomId = this.updateRoomId.bind(this);

    const params = this.getHashParams();
    this.state = {
      loggedIn: params.access_token? true : false,
      accessToken: params.access_token? params.access_token : '',
      choice: 'create',
      leftButtonStyle: styles.buttonGroupSelected,
      rightButtonStyle: styles.buttonGroupButton,
      id: null
    };
  }

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  changeOption(event, option){
    console.log(event, option);
    if(option !== null){
      if(option === 'create') {
        this.setState({choice: option, leftButtonStyle: styles.buttonGroupSelected, rightButtonStyle: styles.buttonGroupButton});
      } else {
        this.setState({choice: option, leftButtonStyle: styles.buttonGroupButton, rightButtonStyle: styles.buttonGroupSelected});
      }

    }
  }

  updateUserName(val) {
    this.setState({username: val.target.value});
  }

  updateRoomId(val) {
    this.setState({id: val.target.value});
  }

  render() {
    return (
      <div className="App" style={styles.container}>
        <video style={styles.bgVid} id="background-video" muted={true} loop autoPlay>
        <source src={yellow_flow} type="video/mp4"/>
        </video>
        <div style={styles.optionsContainer}>
          {/* <ToggleButtonGroup style={{justifyContent: 'center', marginTop: '30px'}}
            value={this.state.choice}
            exclusive
            onChange={this.changeOption}
            aria-label="text alignment"
            >
            <ToggleButton style={this.state.leftButtonStyle} value="create" aria-label="left aligned">
              Start a Room
            </ToggleButton>
            <ToggleButton style={this.state.rightButtonStyle} value="join" aria-label="right aligned">
              Join a Room
            </ToggleButton>
          </ToggleButtonGroup> */}
            {/* {this.state.choice === 'join' && */}
              <div style={{marginTop: '100px'}}>
                <TextField onChange={this.updateRoomId} style={{width: '450px'}} color="whitesmoke" id="outlined-basic" label="(Optional) Room Code to Join or Create" variant="outlined" />
              </div>
            {/* } */}
            <div>
              <TextField onChange={this.updateUserName} style={{width: '450px'}} color="whitesmoke" id="outlined-basic" label="Your Username" variant="outlined" />
            </div>
            {/* <a href="http://localhost:8888/login"> */}
            <div style={{justifyContent: 'flex-end', display: 'flex', flexDirection: 'column'}}>
              <ButtonTEST props={{user: this.state.username, accessToken: this.state.accessToken, loggedIn: true, id: this.state.id}}></ButtonTEST>
            </div>
           
        </div>
      </div>
    )};
  }


  var styles = {
    container: {
      alignContent: 'center',
      textAlign: 'center',
      fontFamily: 'DejaVu Sans Mono, monospace',
      padding: '20px',
    },
    buttonGroupSelected: {
      backgroundColor: '#099909',
      fontWeight: 'bold',
      color: 'whitesmoke',
      width: '200px',
      height: '60px'
    },
    buttonGroupButton:{
      backgroundColor: 'lightgray',
      fontWeight: 'bold',
      color: 'black',
      width: '200px',
      height: '60px'
    },
    optionsContainer: {
      width: '600px',
      height: '600px',
      backgroundColor: 'whitesmoke',
      margin: 'auto',
      padding: '20px',
      borderRadius: '85px',
      boxShadow: '-7px 7px 7px #696969',
      flexDirection: 'column',
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '100px',
      position: 'absolute',
      left: '50vw',
      transform: 'translate(-300px, 0px)'
    },
    submitButton:{
      margin: '20px',
      border: '2px solid #099909',
      backgroundColor: '#3a3938',
      height: '70px',
      width: '500px',
      borderRadius: '25px',
      fontWeight: 'bold',
      color: 'whitesmoke',
      fontSize: '25px',
      fontFamily: 'system-ui',
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
      textDecoration: 'none',
      cursor: 'pointer'
  },
  bgVid: {
    position: 'absolute',
    left: '0px',
    width: '100vw',
    height: '100vh',
    top: '0px',
    objectFit: 'cover'
  }
  }
  
  export default Entry;