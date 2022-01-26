import React, {useState, useEffect} from 'react';

//Sections
import FrontPage from './FrontPage';
import MainHeader from './MainHeader';
import SectionEvaluationScore from './SectionEvaluationScore';
import SectionELTV from './SectionELTV';
import SectionIQEQ from './SectionIQEQ';
import SectionMBTI from './SectionMBTI';
import SectionSummary from './SectionSummary';

import sourceIconPlus from '../assets/images/icon-plus.png';

import Amplify, {API, graphqlOperation} from 'aws-amplify';
import awsExports from '../aws-exports';
import {listProfiles} from '../graphql/queries';

Amplify.configure(awsExports);

function MainPage() {
  const [isVisibleMainPage, setIsVisibleMainPage] = useState(false);

  const handleVisible = value => {
    setIsVisibleMainPage(value);
  };

  const [refeashState, setRefeashState] = useState(false);

  function RefreshState() {
    setRefeashState(!refeashState);
  }

  const [isVisibleELTV, setIsVisibleELTV] = useState(false);
  const [isVisibleIQEQ, setIsVisibleIQEQ] = useState(false);
  const [isVisibleMBTI, setIsVisibleMBTI] = useState(false);

  const [weightSetting, setWeightSetting] = useState({
    esweight: 0,
    eltvweight: 0,
    iqeqweight: 0,
    mbtiweight: 0,
  });

  const childToParent = childdata => {
    candidateList.forEach(element => {
      childdata.forEach(element2 => {
        if (element.id == element2.id) {
          element.total_score = element2.total_score;
          element.result =
            element2.total_score +
            element.eltv +
            element.iqeq +
            element.mbti.total;
        }
      });
    });

    RefreshState();
  };

  const childToParent2 = childdata => {
    candidateList.forEach(element => {
      childdata.forEach(element2 => {
        if (element.id == element2.id) {
          element.eltv = element2.eltv;
          element.result =
            element.total_score +
            element2.eltv +
            element.iqeq +
            element.mbti.total;
        }
      });
    });

    RefreshState();
  };

  const childToParent3 = childdata => {
    candidateList.forEach(element => {
      childdata.forEach(element2 => {
        if (element.id == element2.id) {
          element.iqeq = element2.iqeq;
          element.result =
            element.total_score +
            element.eltv +
            element2.iqeq +
            element.mbti.total;
        }
      });
    });

    RefreshState();
  };

  const childToParent4 = childdata => {
    candidateList.forEach(element => {
      childdata.forEach(element2 => {
        if (element.id == element2.id) {
          element.mbti.total = element2.mbti.total;
          element.result =
            element.total_score +
            element.eltv +
            element.iqeq +
            element2.mbti.total;
        }
      });
    });

    RefreshState();
  };

  function OpenELTV() {
    setIsVisibleELTV(true);
  }

  function OpenIQEQ() {
    setIsVisibleELTV(true);
    setIsVisibleIQEQ(true);
  }

  function OpenMBTI() {
    setIsVisibleELTV(true);
    setIsVisibleIQEQ(true);
    setIsVisibleMBTI(true);
  }

  const [candidateList, setCandidateList] = useState([]);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const profileData = await API.graphql(graphqlOperation(listProfiles));
      const profileList = profileData.data.listProfiles.items;

      var maxActualEltv = 0;
      profileList.forEach(element => {
        var sum = 0;

        var eltvData = element.eltvdata.data;

        for (let index = 0; index < eltvData.length; index++) {
          const element = eltvData[index];
          const elementNext = eltvData[index + 1];
          sum +=
            (Number.parseFloat(element) + Number.parseFloat(elementNext)) / 2;

          if (index + 1 == eltvData.length - 1) {
            break;
          }
        }

        element.actualeltv = sum;
        if (maxActualEltv < sum) {
          maxActualEltv = sum;
        }
      });

      profileList.forEach(element => {
        element.eltv =
          0 *
          (Number.parseFloat(element.actualeltv) /
            Number.parseFloat(maxActualEltv));
      });

      setCandidateList(profileList);
    } catch (error) {
      console.log('error message', error);
    }
  };

  return (
    <div>
      {isVisibleMainPage ? (
        <div>
          <MainHeader />
          <div className="playground">
            <div className="playground__left">
              <div className="playground__left-1">
                <SectionEvaluationScore
                  candidateList={candidateList}
                  title={'The Evaluation Score'}
                  childToParent={childToParent}
                  weight={weightSetting}
                />
              </div>
              <div className="playground__left-2">
                {isVisibleELTV ? (
                  <SectionELTV
                    title="ELTV"
                    candidateList={candidateList}
                    childToParent2={childToParent2}
                    weight={weightSetting}
                  />
                ) : (
                  <div className="section__weight">
                    <div
                      className="weight__header"
                      style={{marginTop: '45px'}}></div>
                    <div
                      className="weight__setting"
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        minHeight: '615px',
                      }}>
                      <img
                        className="icon-plus"
                        style={{position: 'absolute', top: '50%', left: '45%'}}
                        src={sourceIconPlus}
                        width={'20px'}
                        height={'20px'}
                        onClick={OpenELTV}
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className="playground__left-3">
                {isVisibleIQEQ ? (
                  <SectionIQEQ
                    title="IQ & EQ"
                    candidateList={candidateList}
                    childToParent3={childToParent3}
                    weight={weightSetting}
                  />
                ) : (
                  <div className="section__weight">
                    <div
                      className="weight__header"
                      style={{marginTop: '45px'}}></div>
                    <div
                      className="weight__setting"
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        minHeight: '615px',
                      }}>
                      <img
                        className="icon-plus"
                        style={{position: 'absolute', top: '50%', left: '45%'}}
                        src={sourceIconPlus}
                        width={'20px'}
                        height={'20px'}
                        onClick={OpenIQEQ}
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className="playground__left-4">
                {isVisibleMBTI ? (
                  <SectionMBTI
                    title="MBTI"
                    candidateList={candidateList}
                    childToParent4={childToParent4}
                    weight={weightSetting}
                  />
                ) : (
                  <div className="section__weight">
                    <div
                      className="weight__header"
                      style={{marginTop: '45px'}}></div>
                    <div
                      className="weight__setting"
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        minHeight: '615px',
                      }}>
                      <img
                        className="icon-plus"
                        style={{position: 'absolute', top: '50%', left: '45%'}}
                        src={sourceIconPlus}
                        width={'20px'}
                        height={'20px'}
                        onClick={OpenMBTI}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="playground__right">
              <SectionSummary candidateList={candidateList} />
            </div>
          </div>
        </div>
      ) : (
        <FrontPage handleVisible={handleVisible} />
      )}
    </div>
  );
}

export default MainPage;
