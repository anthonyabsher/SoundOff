import '../App.css';
import React, { Component } from 'react';
import sptfy from './spotify.png';
import red_flow from '../red_flow.mp4';
import {CSSTransition} from 'react-transition-group';
import SoundOffTitle from '../SoundOffTitle.png';

class LoadingPage extends Component {
    state = {};

    getHashParams() {
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        while ( e = r.exec(q)) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
        }
        return hashParams;
    }
    

    render(){
        return(
                <section id="openingPageSection">
                   
                    <div style={styles.entryBanner}>
                        <video style={styles.bgVid} id="background-video" muted={true} loop autoPlay>
                        <source src={red_flow} type="video/mp4"/>
                        </video>
                        {/* <h1 style={styles.title}>Sound<span style={{color:'whitesmoke'}}>Off</span></h1>
                        <hr/>
                        <div style={{height: '350px'}}>
                            <h2>Be a DJ for friends, family, or even strangers</h2>
                            
                        </div> 
                        <hr/>*/}
                        <img style={{height: '50px', filter: 'invert(1)'}} src={SoundOffTitle}></img>
                            {/* <a href="http://localhost:8888/login"> */}
                            <a href="https://ew38pwppbq.us-east-2.awsapprunner.com/login">
                                <button style={styles.loginButton}>
                                    <img style={styles.buttonImage} src={sptfy} alt={"sptfy"}/>
                                    Login With Spotify
                                </button>
                            </a>
                    </div>
                </section>
        );
    }
}

var styles ={
    entryBanner: {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '100vw',
        height: '100px',
        backgroundColor: 'none',
        // borderRadius: '15px',
        textAlign: 'center',
        borderRadius: '85px',
        marginTop: '45vh'
    },
    title: {
        fontSize: '64px',
        fontFamily: 'system-ui',
        color: 'green',
        marginTop: '15px',
        marginBottom: '15px',
    },
    subTitle: {

    },
    loginButton:{
        margin: '20px',
        border: '2px solid #099909',
        backgroundColor: '#3a3938',
        height: '80px',
        width: '350px',
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
    buttonImage: {
        height: '40px',
        width: '40px',
        marginTop: '1',
        verticalAlign: 'middle',
        paddingRight: '30px',
    },
    bgVid: {
        position: 'absolute',
        left: '0px',
        width: '100vw',
        height: '100vh',
        top: '0px',
        objectFit: 'cover',
        zIndex: '-1'
    }
}

export default LoadingPage;