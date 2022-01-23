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
import MainHeader from './components/MainHeader';

//Sections
import SectionEvaluationScore from './components/SectionEvaluationScore';
import SectionELTV from './components/SectionELTV';
import SectionIQEQ from './components/SectionIQEQ';
import SectionMBTI from './components/SectionMBTI';
import SectionSummary from './components/SectionSummary';

const element = (
  <div>
    <MainHeader />
    <div className="playground">
      <div className="playground__left">
        <div className="playground__left-1">
          <SectionEvaluationScore title={'The Evaluation Score'} />
        </div>
        <div className="playground__left-2">
          <SectionELTV title="ELTV" />
        </div>
        <div className="playground__left-3">
          <SectionIQEQ title="IQ & EQ" />
        </div>
        <div className="playground__left-4">
          <SectionMBTI title="MBTI" />
        </div>
      </div>
      <div className="playground__right">
        <SectionSummary />
      </div>
    </div>
  </div>
);

ReactDOM.render(element, document.getElementById('root'));
