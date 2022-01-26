import React from 'react';

import sourceEllipse from '../assets/images/Ellipse.png';
import sourceEllipse1 from '../assets/images/Ellipse-1.png';
import sourceVector from '../assets/images/Vector.png';
import fordlogo from '../assets/images/logo-ford.png';

function FrontPage(props) {
  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        backgroundColor: '#003478',
      }}>
      <img
        src={sourceEllipse}
        style={{
          position: 'absolute',
          width: '350px',
          height: '400px',
          left: '0',
          bottom: '0',
        }}
      />

      <img
        src={sourceEllipse1}
        style={{
          position: 'absolute',
          width: '300px',
          height: '350px',
          left: '0',
          bottom: '0',
        }}
      />

      <img
        src={sourceVector}
        style={{
          position: 'absolute',
          width: '600px',
          height: '550px',
          right: '0',
          top: '0',
        }}
      />

      <img
        src={fordlogo}
        style={{
          position: 'relative',
          width: '150px',
          height: '60px',
          left: '45%',
          top: '25%',
        }}
      />

      <span
        style={{
          position: 'absolute',
          width: '100%',
          left: '50%',
          top: '40%',
          transform: 'translate(-30%, -50%)',
          color: 'white',
        }}>
        Applying Business Intelligence and Analytics to HR Management
        Decisions:Tracking the Employee Journey
      </span>
      <span
        style={{
          position: 'absolute',
          left: '50%',
          top: '45%',
          transform: 'translate(-45%, -50%)',
          color: 'white',
        }}>
        for Promotion to a Leadership Position at Ford Motor Company Thailand
      </span>

      <span
        style={{
          position: 'absolute',
          left: '50%',
          top: '55%',
          transform: 'translate(-50%, -50%)',
          color: 'white',
          fontSize: '24px',
        }}>
        “Put the right man in the Right job”
      </span>

      <button className="btn_start" onClick={() => props.handleVisible(true)}>
        Start
      </button>
    </div>
  );
}

export default FrontPage;
