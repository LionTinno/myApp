import react from 'react';
import fordlogo from '../assets/images/logo-ford.png';

function MainHeader() {
  return (
    <div className="header">
      <div className="header_logo">
        <img src={fordlogo} width="80" height="30" />
      </div>
      <div className="header_title">
        <p>
          Applying Business Intelligence and Analytics to HR Management
          Decisions: Tracking the Employee Journey
        </p>
        <p>
          for Promotion to a Leadership Position at Ford Motor Company Thailand
        </p>
      </div>
    </div>
  );
}

export default MainHeader;
