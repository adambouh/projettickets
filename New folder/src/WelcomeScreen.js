import React,{useState} from 'react';
import { Link } from 'react-router-dom'; // Import Link from 'react-router-dom'
import footballImage from './football.png'; // Import football image

function WelcomeScreen() {
    return (
        <div style={styles.container}>
            <div style={styles.backgroundImage}></div>
            <div style={styles.textContainer}>
                <div style={styles.heading}>Welcome to the World Cup Ticketing App!</div>
                <div style={styles.description}>Discover and purchase tickets for exciting matches.</div>
                <Link to="/Matches" style={styles.button}>Browse Matches</Link>
            </div>
        </div>
    );
};

const styles = {
    container: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        color: 'white',
        fontFamily: 'Arial, sans-serif',
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `url(${footballImage})`,
        backgroundSize: 'cover',
        filter: 'brightness(0.5)', // Add some transparency to the background image
        zIndex: -1,
    },
    textContainer: {
        textAlign: 'center',
    },
    heading: {
        fontSize: '32px',
        fontWeight: 'bold',
        marginBottom: '10px',
    },
    description: {
        fontSize: '18px',
        lineHeight: '1.5',
        marginBottom: '20px',
    },
    button: {
        display: 'inline-block',
        padding: '10px 20px',
        background: 'blue',
        color: 'white',
        textAlign:' center',
        textDecoration: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        fontWeight: 'bold',
    },
};

export default WelcomeScreen;
