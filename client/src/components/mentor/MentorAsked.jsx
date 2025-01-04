import {useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const MentorAsked=()=>{
    const [webinars, setWebinars] = useState([]);
    const navigate=useNavigate();
    const API_URL = 'http://localhost:5000/api/mentor/getWebinar';

    const getWebinars = async () => {
        let a = JSON.parse(localStorage.getItem('user'));
        let d = JSON.parse(localStorage.getItem('data')); // 'data' is not used, consider removing it if not needed
        console.log(d); // Logging 'd' instead of 'data'
        
        try {
            const response = await axios.get(API_URL, {
                headers: {
                    'x-auth-token': `${a?.token}`
                }
            });
            console.log(response.data.mentor.webinarsAsked);
            setWebinars(response.data.mentor);
        } catch (error) {
            console.error('Error fetching webinars:', error);
        }
    };

    const handleWebinar=async(data)=>{
        console.log(data);
        navigate(`/mentor/meeting/${data.userId}`)
    }

    useEffect(() => {
        getWebinars();
    }, []); // Empty dependency array to run only once on mount

    return (
        <div className="container mt-4">
            <h2 className="mb-4 text-center">Available Webinars</h2>
            <div className="row">
                {webinars.length > 0 ? (
                    webinars.map((webinar, index) => (
                        <div key={index} className="col-md-4 mb-3">
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title">Webinar Provided by {webinar.name}</h5>
                                    <p className="card-text"><strong>Topic:</strong> {webinar.interestedCategorySector}</p>
                                    <p className="card-text"><strong>State:</strong> {webinar.state}</p>
                                    <a href={`#webinar${index}`} className="btn btn-primary" onClick={()=>handleWebinar(webinar)}>Click to Webinar</a>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center">No webinars available</p>
                )}
            </div>
        </div>
    );
}
export default MentorAsked;