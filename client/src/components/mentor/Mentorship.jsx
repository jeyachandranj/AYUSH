import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Mentorship = () => {
  const [webinars, setWebinars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const API_URL = `http://localhost:5000/api/mentor`;
  const getWebinars = async () => {
    let a = JSON.parse(localStorage.getItem('user'));
    let d = JSON.parse(localStorage.getItem('data'));

    try {
      const response = await axios.get(`${API_URL}/${d._id}`, {
        headers: {
          'x-auth-token': `${a?.token}`,
        },
      });
      setWebinars(response.data.mentor.webinarAsked);
      setLoading(false);
    } catch (error) {
      setError('Error fetching webinars');
      setLoading(false);
      console.error('Error fetching webinars:', error);
    }
  };

  useEffect(() => {
    getWebinars();
  }, []);

  if (loading) {
    return <div className="container text-center mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="container text-center mt-5 text-danger">{error}</div>;
  }

  const handleWebinar = (item) => {
    navigate(`/mentor/meeting/${item}`);
  };

  return (
    <div className="container mt-5">
      <button 
        className="btn btn-secondary mb-4" 
        onClick={() => navigate('/')} // Navigate back to home
      >
        Back to Home
      </button>
      
      <h1 className="text-center mb-5 display-6">Mentorship Requests</h1>
      
      {webinars.length > 0 ? (
        <div className="row">
          {webinars.map((item) => (
            <div className="col-md-6 col-lg-4 mb-4" key={item.email}>
              <div className="card h-100 shadow-lg border-light">
                <div className="card-body">
                  <h5 className="card-title text-primary display-6">{item.role}</h5>
                  <p className="card-text">
                    <strong>{item.name}</strong> asked for mentorship.
                  </p>
                  <p className="card-text text-muted">{item.email}</p>
                  <button
                    className="btn btn-primary w-100 mt-3"
                    onClick={() => handleWebinar(item.id)}
                  >
                    Join Mentorship
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center">
          <p className="text-muted">Nobody has asked for mentorship yet.</p>
        </div>
      )}
    </div>
  );
};

export default Mentorship;
