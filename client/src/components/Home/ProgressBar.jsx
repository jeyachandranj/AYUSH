import React from 'react';
import './progressBar.css';

function ProgressBar({ currentStep ,setStep }) {
  function navi(step){
    //alert(step)
    setStep(step);
  }
  const data = [
    {
      step: 1,
      title: 'Entity Details',
      description: 'Step 1',
      complete: false,
      active: false,
    },
    {
      step: 2,
      title: 'Address Details',
      description: 'Step 2',
      complete: false,
      active: false,
    },
    {
      step: 3,
      title: 'Authorized Representative',
      description: 'Step 3',
      complete: false,
      active: false,
    },
    {
      step: 4,
      title: 'Certificate Details',
      description: 'Step 4',
      complete: false,
      active: false,
    },
    {
      step: 5,
      title: 'Information Details',
      description: 'Step 5',
      complete: false,
      active: false,
    },
    {
      step: 6,
      title: 'Certificate Details',
      description: 'Step 6',
      complete: false,
      active: false,
    },
    {
      step: 7,
      title: 'Terms & conditions',
      description: 'Step 7',
      complete: false,
      active: false,
    },
  ];

  // Update `complete` and `active` based on `currentStep`
  data.forEach((item, index) => {
    if (item.step < currentStep) {
      data[index].complete = true;
      data[index].active = true;
    } else if (item.step === currentStep) {
      data[index].active = true;
    }
  });

  return (
    <div className="progressBar hidden lg:block">
      {data.map((item, index) => (
        <div key={index} className="progressBar-item cursor-pointer" onClick={() => navi(index)}>
          <div className="progressBar-info">
            <div
              className={`progressBar-circle ${item.complete ? 'complete' : ''} ${item.active ? 'active' : ''}`}
            >
              {!item.complete && <span>{item.step}</span>}
            </div>
            <div className="progressBar-text">
              <p className="progressBar-title">{item.title}</p>
              <p className="progressBar-description">{item.description}</p>
            </div>
          </div>
          {index < data.length - 1 && <div className="progressBar-line" />}
        </div>
      ))}
    </div>
  );
}

export default ProgressBar;
