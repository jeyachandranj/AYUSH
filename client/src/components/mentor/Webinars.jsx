import axios from 'axios';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const Webinars = () => {
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
            console.log(response.data.mentor);
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
  <h1 className="mb-5 text-center text-success display-6 fw-bold">Available Webinars</h1>
  <div className="row justify-content-center">
    {webinars.length > 0 ? (
      webinars.map((webinar, index) => (
        <div key={index} className="col-md-4 mb-3">
          <div className="card shadow-sm border border-success">
            <div className="card-body">
              <h5 className="card-title text-success fw-bold">Webinar Provided by {webinar.name}</h5>
              <p className="card-text p-2"><strong>Topic:</strong> {webinar.interestedCategorySector}</p>
              <p className="card-text p-2"><strong>State:</strong> {webinar.state}</p>
              <a href={`#webinar${index}`} className="btn btn-success pt-3 pb-3" onClick={() => handleWebinar(webinar)}>Click to Join Webinar</a>
            </div>
          </div>
        </div>
      ))
    ) : (
      <p className="text-center text-muted">No webinars available</p>
    )}
  </div>
</div>
    );
};

export default Webinars;
