import React from 'react';
import ReactDOM from 'react-dom';

//Css
import './index.css';
import './Css/style-common.css';
import './Css/modal-common.css';
import './Css/section-common.css';
import './Css/SectionScoreGroup.css';
import './Css/SectionELTV.css';
import './Css/SectionMBTI.css';
import './Css/SectionSummary.css';
import './Css/SensitivityBarChart.css';

//Components

import MainPage from './components/MainPage';

const element = (
  <div>
    <MainPage />
  </div>
);

ReactDOM.render(element, document.getElementById('root'));
