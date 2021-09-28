import '../App.css';
import * as S from 'spotify-web-api-js';
import React, { Component } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import {io} from "socket.io-client";
import SoundOffTitle from '../SoundOffTitle.png';

const spotifyAPI = new S();
var socket;

class Playroom extends Component {
  state = {};
  constructor() {
    super();
    this.getPlaylistTracks = this.getPlaylistTracks.bind(this);
    this.updateCurComment = this.updateCurComment.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateUserName = this.updateUserName.bind(this);
    this.kd = this.kd.bind(this);
    // const params = this.getHashParams();
    // console.log(params);

    this.state = {
      // loggedIn: params.access_token? true : false,
      nowPlaying: {
        name: 'N/A',
        image: ''
      },
      recents: [],
      playlists: [],
      currentPlaylist: '',
      playlistTracks: [],
      // accessToken: params.access_token? params.access_token : '',
      currentURIs: [],
      messages: [],
      value: '',
      username: '',
      isPlaying: false,
      roomID: '',
      activeUsers: 0
    };
   
    

    // socket.on("message received", data => {
    //   console.log('Message received!', data);
    //   this.state.messages.push(data);
    //   this.setState({messages: this.state.messages});
    // });
    // socket.on("track update received", data => {
    //   console.log('received track update : ', data);
    //   this.playTrack(data.uri);
    // });
    // socket.on("player update received", data => {
    //   console.log('received player update : ', data);
    //   this.setState({isPlaying: data.isPlaying});
    // });
    
  }

  componentDidMount(){
    // if(this.state.loggedIn) {
    //   console.log('here');
    console.log(this.props.location.state);
    this.setState({
        username: this.props.location.state.user
      , accessToken: this.props.location.state.accessToken
      , loggedIn: this.props.location.state.loggedIn
      , roomID: this.props.location.state.id
    });
    spotifyAPI.setAccessToken(this.props.location.state.accessToken);
    spotifyAPI.getUserPlaylists().then(res => { 
      console.log('playlists', res);
      this.setState({playlists: res.items})
      spotifyAPI.getPlaylist(res.items[0].id).then(res => {
        console.log('Playlist Data', res);
        this.setState({playlistTracks: res.tracks.items});
      })
    });
    console.log(this.state.roomID);
    socket = io("http://localhost:4001",{
      query: {
        "roomID": this.props.location.state.id
      }
    });
    socket.on("connect", () => {
      console.log(socket.id); 
  
    });
    socket.on("FromServer", data => {
      console.log(data);
    });
    socket.on("joined", data => {
      console.log(data);
      this.setState({activeUsers: data});
    });
    socket.on(this.props.location.state.id, data => {
      console.log(data);
      if(data.type === 'message'){
        let msg = {user: data.user, message: data.message};
        this.state.messages.push(msg);
        this.setState({messages: this.state.messages});
      } else if(data.type === 'check'){
        socket.emit("")
      }
    });
    // }
  }
  
  getNowPlaying() {
    spotifyAPI.getMyRecentlyPlayedTracks().then(res => {
      console.log(res);
      this.setState({recents: res.items})
    })
    // spotifyAPI.getNewReleases().then((res) => { console.log(res); });
    spotifyAPI.getMyCurrentPlaybackState((err, value) => {
      if(err){
        console.log('ERROR', err);
      } else {
        console.log(value);
        if(value.item) {
          this.setState({
            nowPlaying: {
              name: value.item.name,
              image: value.item.album.images[0]
      
            }
          })
        }
      }
    });
  }
  
  getPlaylistTracks(ev) {
    console.log(ev.target.value);
    let id = ev.target.value;
    spotifyAPI.getPlaylist(id).then(res => {
      console.log('Playlist Data', res);
      this.setState({playlistTracks: res.tracks.items});
    })
  }

  playTrack(curURI){
    this.setState({currentURIs: [curURI], isPlaying: true});
  }

  updateCurComment(comment){
    // console.log(comment.target.value);
    this.setState({value: comment.target.value});
  }

  handleSubmit(){
    var newMessage = {user: this.state.username, message: this.state.value, id: this.state.roomID, time: new Date().toLocaleString()};
    console.log(newMessage.time);
    socket.emit("message", newMessage);
    this.state.messages.push(newMessage);
    this.setState({messages: this.state.messages, value: ''});
    // console.log(this.state.messages);
  }

  updateUserName(val) {
    this.setState({username: val.target.value});
  }

  kd(ev) {
    if(ev.key === 'Enter') {
      this.handleSubmit();
    }
  }

  playerUpdate(playerState) {
    console.log('state', playerState.type);
    if (playerState.type === 'track_update') {
      socket.emit("track update", playerState.track);
      // this.playTrack(playerState.track)
    } else if (playerState.type === 'player_update') {
      socket.emit("player_update", playerState);
      this.setState({isPlaying: playerState.isPlaying});
    } else if (playerState.type === 'status_update') {
      // this.setState({isPlaying: true});
    }
  }

  
  render() {
    return (
      <div className="App">
        {/* <a href="http://localhost:8888/login">
          <button>Login With Spotify</button>
        </a> */}

        {/* <input className="chatInput" type="text" onChange={this.updateUserName}/> */}
        {/* <div>
          Now Playing: {this.state.nowPlaying.name}
        </div>
        <div>
          <img src={this.state.nowPlaying.image}/>
        </div>

        <button onClick={() => this.getNowPlaying()}>
          Check Now Playing!
        </button> */}

       <div className="headerBar" style={styles.headerBar}>
         <img style={{height: '40px', marginTop: '5px', filter: 'invert(1)'}} src={SoundOffTitle}></img>
         {/* <h1 style={{margin: '0px'}}>Sound<span style={{color: 'black'}}>Off</span></h1> */}
         </div>
       <div className="roomInfoContainer">
          <h3>Room ID: {this.state.roomID} </h3>
          <h3>Active Users: {this.state.activeUsers} </h3> 
        </div>

        <div style={{display:"flex", alignItems: 'center', justifyContent: 'center'}}>
          <div className="playlistContainer">
            <div>
              <select onChange={this.getPlaylistTracks}>
                {this.state.playlists.map(ind => (
                  <option value={ind.id}>{ind.name}</option>
                ))}
              </select>
            </div>
            <div style={{overflow: 'scroll', height: '90%'}}>
              <ul style={{marginLeft: '0px'}}>
                {this.state.playlistTracks.map(ind => (
                  <li onClick={() => this.playTrack(ind.track.uri)} className={this.state.currentURIs[0] === ind.track.uri? "playlistItemSelected" : "playlistItem"}>
                    <img style={{height: '100px', display: 'block'}} src={ind.track.album.images[0].url}/>
                    <div style={{textAlign: 'initial', padding: '20px'}}>
                      <div style={{display: 'table-row'}}>{ind.track.name}</div>
                      <div style={{display: 'table-header-group', fontWeight: 'bold'}}>{ind.track.artists[0].name}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="chatContainer">
            <div className="messageWindow">
              {this.state.messages.map(message => (
                <div><span style={{fontWeight: 'bold'}}>{message.user}</span>{': ' + message.message}</div>
              ))}
            </div>
          
            <input className="chatInput" type="text" value={this.state.value} onChange={this.updateCurComment} onKeyDown={this.kd}  />
            <button className="chatSubmitButton" onClick={this.handleSubmit}> {'>'} </button>
          </div>
        </div>
        
        { this.state.loggedIn && 
          <div style={{position: 'absolute', bottom: 0, width: '100vw', overflow: 'hidden'}}>
            <SpotifyPlayer
              play={this.state.isPlaying}
              autoPlay={false}
              token={this.state.accessToken}
              uris={this.state.currentURIs}
              styles={styles.playerStyle}
              isPlaying={this.state.isPlaying}
              callback={(state) => {this.playerUpdate(state);}}
            />
          </div>
        }

       
        
        {/* {this.state.recents.map(ind => ( */}
        {/* {this.state.playlistTracks.map(ind => (
          <div>
            <img style={{height: '150px', display: 'block'}} src={ind.track.album.images[0].url}/>
            <div style={{display: 'table-row'}}>{ind.track.name}</div>
            <div style={{display: 'table-header-group', fontWeight: 'bold'}}>{ind.track.artists[0].name}</div>
          </div>
        ))} */}
      </div>
    );
  }
}

let styles = {
  playerStyle: {
    activeColor: '#fff',
    bgColor: 'var(--main-bg-color)',
    color: 'whitesmoke',
    loaderColor: '#fff',
    sliderColor: 'var(--highlight-color)',//'#1cb954',
    trackArtistColor: 'black',
    trackNameColor: 'whitesmoke',
    sliderHandleColor: 'var(--highlight-color)',//'#1cb954',
    sliderHeight: 10,
    height: 75,
    boxShadow: 'rgb(119 119 119) 0px -1px 10px'
  },
  headerBar: {
    margin: '0px',
    background: 'var(--main-bg-color)',//'rgb(255 187 103)', // 'rgb(58 134 53)',
    textAlign: 'center',
    boxShadow: '0px 2px 5px rgb(119 119 119)',
    marginBottom: '30px'
  }
}

export default Playroom;
