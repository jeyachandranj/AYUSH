import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CommonTemplate.css'; // Import custom CSS for transitions
import { useNavigate } from 'react-router-dom';

const CommonTemplate = ({ heading, items }) => {
  const navigate = useNavigate();

  return (
    <div className="container my-4">
      <h1 className="heading">{heading}</h1>
      <div className="ag-courses_box">
        {items.map((item, index) => (
          <div key={index} className="ag-courses_item">
            <div
              className="ag-courses-item_link h-100"
              onClick={() => navigate(`/scheme/${item.id}`)}
            >
              <div className="ag-courses-item_bg"></div>
              <h5 className="ag-courses-item_title">
                {item.title}
              </h5>
              <div className="ag-courses-item_date-box">
                <span className="ag-courses-item_date description">{item.description}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommonTemplate;