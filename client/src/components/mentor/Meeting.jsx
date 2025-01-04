import React, { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Meeting = () => {
    const navigate = useNavigate();
    const jitsiContainerRef = useRef(null);
    const apiRef = useRef(null); // Store the Jitsi API instance
    const scriptLoaded = useRef(false); // Flag to check if script is loaded
    const meetingInitialized = useRef(false); // Flag to check if meeting is initialized
    const { id } = useParams();
    let webinar="";
    if(id){
        webinar=id;
    }
    //alert(id)
    const generateRandomString = () => Math.random().toString(36).substr(2, 10);

    useEffect(() => {
        updateStatus();
        const loadJitsiScript = () => {
            if (window.JitsiMeetExternalAPI) {
                // Jitsi script already loaded, initialize the meeting
                initializeMeeting();
            } else if (!scriptLoaded.current) {
                // Load the Jitsi API script if it's not loaded yet
                const script = document.createElement('script');
                script.src = 'https://8x8.vc/vpaas-magic-cookie-7bafe0b72aea45628ea0dc08833d2d49/external_api.js';
                script.async = true;
                script.onload = () => {
                    scriptLoaded.current = true; // Set flag when script is loaded
                    initializeMeeting();
                };
                script.onerror = () => {
                    console.error('Failed to load Jitsi script.');
                };
                document.body.appendChild(script);
            }
        };

        const initializeMeeting = async () => {
            if (meetingInitialized.current) return;

            // Dispose of existing API instance if present
            if (apiRef.current) {
                apiRef.current.dispose();
                apiRef.current = null; // Reset the reference to prevent reuse
                console.log('Disposed of existing Jitsi API instance.');
            }


            const randomUserId = generateRandomString();
            apiRef.current = new window.JitsiMeetExternalAPI('8x8.vc', {
                roomName: `vpaas-magic-cookie-7bafe0b72aea45628ea0dc08833d2d49/${webinar}`,
                parentNode: jitsiContainerRef.current, // The container for Jitsi
            });

            // Add event listener for 'readyToClose' to navigate to home page when meeting ends
            apiRef.current.on('readyToClose', () => {
                console.log('Meeting closed, navigating to home page.');
                navigate('/');
            });

            meetingInitialized.current = true;
        };

        loadJitsiScript();

        // Cleanup function to dispose of the meeting instance when component unmounts
        return () => {
            if (apiRef.current) {
                apiRef.current.dispose();
                apiRef.current = null; // Reset the reference
                console.log('Cleaning up component, disposed of Jitsi API instance.');
            }
        };
    }, [navigate]);
    const updateStatus=async()=>{
        
        const data = JSON.parse(localStorage.getItem('data'));
        console.log(data);
        if (webinar=="") {
            const API_URL = 'http://localhost:5000/api/mentor/setWebinar/';
            let a = JSON.parse(localStorage.getItem('user'));
            try {
                const response = await axios.post(API_URL, { 
                    ...data,
                }, {
                    headers: { 'x-auth-token': `${a?.token}` }
                });
                console.log('API response:', response.data.mentor);
                if(data.role=="mentor"){
                    console.log("Dharun");
                    webinar=response.data.mentor.userId;
                }
                else{
                    console.log("Dharun");
                    webinar=data._id;
                }
            } catch (error) {
                console.error('Error making API request:', error);
            }
        }
    }
    return <div id="jitsi-container" ref={jitsiContainerRef} style={{ height: '100vh' }} />;
};

export default Meeting;