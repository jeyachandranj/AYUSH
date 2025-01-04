import React, { useState } from 'react';
import axios from 'axios'; // Ensure axios is imported if you're using it
import { useNavigate } from 'react-router-dom'; // Import useNavigate if you want to redirect
import Navbar from './Navbar';

const AddClerk = () => {
  const [create, setCreate] = useState({
    name: '',
    email: '',
    password: '',
    mobile:'+91'
  });

  const navigate = useNavigate(); // Initialize navigate

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCreate(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const addClerk = async (e) => {
    e.preventDefault();
    try {
      const a = JSON.parse(localStorage.getItem('user'));
      console.log(a.token);
      const response = await axios.post(`http://localhost:5000/api/government/create`,{...create,role:'clerk'}, {
        headers: {
          'x-auth-token': a.token
        }
      });
      console.log(response);
      alert("Successfully created the clerk");
      navigate('/government');
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  return (
    <>
    <Navbar/>
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Add Clerk</h5>
              <form onSubmit={addClerk}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control mt-3 mb-3"
                    id="email"
                    placeholder="Enter email"
                    value={create.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control mt-3 mb-3"
                    id="name"
                    placeholder="Enter username"
                    value={create.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="mobile">Mobile</label>
                  <input
                    type="text"
                    className="form-control mt-3 mb-3"
                    id="mobile"
                    placeholder="Enter Mobile"
                    value={create.mobile}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control mt-3 mb-3"
                    id="password"
                    placeholder="Enter password"
                    value={create.password}
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary">Add Clerk</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default AddClerk;
