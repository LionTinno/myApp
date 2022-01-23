import React, {useState, useEffect} from 'react';
import Modal from 'react-modal';

import sourceIconInfo from '../assets/images/icon-info.png';
import sourceIconClose from '../assets/images/icon-close.png';

import BarChartEvaluationScore from './BarChartEvaluationScore';

import Amplify, {API, graphqlOperation} from 'aws-amplify';
import awsExports from '../aws-exports';
import {listProfiles} from '../graphql/queries';

Amplify.configure(awsExports);

function SectionEvaluationScore(props) {
  //Const Variables.
  const _BASEAWSS3URL =
    'https://fordstorage20220103.s3.ap-southeast-1.amazonaws.com/';

  const _EXAMPLEFILENAME = 'example-evaluationscore.jpg';
  const _ISSHOWEXAMPLE = true;

  const _COMMONMODALSTYLE = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      width: '800px',
    },
  };

  const [candidateList, setCandidateList] = useState([]);

  useEffect(() => {
    fetchTodo();
  }, []);

  const fetchTodo = async () => {
    try {
      const todoData = await API.graphql(graphqlOperation(listProfiles));
      const todoList = todoData.data.listProfiles.items;
      setCandidateList(todoList);
    } catch (error) {
      console.log('error message', error);
    }
  };

  //Setup Stages.
  const [valueWeight1, setValueWeight1] = useState(0);
  const weight1Change = event => {
    if (validateWeightFormat(event)) {
      setValueWeight1(event.target.value);
      calcuateTotal(event.target.value, valueWeight2, valueWeight3);
    }
  };
  const [valueWeight2, setValueWeight2] = useState(0);
  const weight2Change = event => {
    if (validateWeightFormat(event)) {
      setValueWeight2(event.target.value);
      calcuateTotal(valueWeight1, event.target.value, valueWeight3);
    }
  };

  const [valueWeight3, setValueWeight3] = useState(0);
  const weight3Change = event => {
    if (validateWeightFormat(event)) {
      setValueWeight3(event.target.value);
      calcuateTotal(valueWeight1, valueWeight2, event.target.value);
    }
  };

  const [valueLimitCandidate, setValueLimitCandidate] = useState(5);
  const limitcandidateChange = event => {
    if (validateWeightFormat(event)) {
      setValueLimitCandidate(event.target.value);
    }
  };

  const [isOpenExampleModal, setIsOpenExampleModal] = React.useState(false);
  const [isOpenESChartModal, setIsOpenESChartModal] = React.useState(false);

  const [itemModal, setItemModal] = React.useState('');
  const [datasetESModal, setDataSetESModal] = React.useState('');

  //Functions
  function openExampleModal() {
    setIsOpenExampleModal(true);
  }

  function closeExampleModal() {
    setIsOpenExampleModal(false);
  }

  function openESChartModal(item) {
    setIsOpenESChartModal(true);
    setItemModal(item);

    const labels = [
      'Interview',
      'Case Study/Role Play',
      'Production System Exam',
    ];

    var dataset = {
      labels,
      datasets: [
        {
          barThickness: 20,
          label: 'Overall Avg.',
          data: [73, 72, 75],
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
          datalabels: {
            display: false,
          },
        },
        {
          barThickness: 20,
          label: 'Individual',
          data: item.esdata,
          borderColor: 'rgb(8, 8, 8)',
          backgroundColor: 'rgba(8, 8, 8, 0.5)',
          datalabels: {
            display: false,
          },
        },
      ],
    };

    setDataSetESModal(dataset);
  }

  function closeESChartModal() {
    setIsOpenESChartModal(false);
  }

  function validateWeightFormat(e) {
    const re = /^[0-9\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      return true;
    }

    return false;
  }

  function calcuateTotal(w1, w2, w3) {
    candidateList.forEach(element => {
      element.total_score =
        w1 * (element.esdata[0] / 100) +
        w2 * (element.esdata[1] / 100) +
        w3 * (element.esdata[2] / 100);
    });
  }

  return (
    <div className="section__weight">
      <Modal
        isOpen={isOpenExampleModal}
        onRequestClose={closeExampleModal}
        style={_COMMONMODALSTYLE}
        contentLabel="Evaluation Score Example Modal">
        <div className="example__header">
          <span>Evaluation Score - Example</span>
          <img
            className="icon-close"
            src={sourceIconClose}
            width={'10px'}
            height={'10px'}
            onClick={closeExampleModal}
          />
        </div>

        <hr />

        <div className="example__body">
          <img
            src={_BASEAWSS3URL + _EXAMPLEFILENAME}
            width={'750'}
            height={'300'}
          />
        </div>
      </Modal>

      <Modal
        isOpen={isOpenESChartModal}
        onRequestClose={closeESChartModal}
        style={_COMMONMODALSTYLE}
        contentLabel="Evaluation Score Chart Modal">
        <div className="chart__header">
          <span>The Evaluation Score - {itemModal.name}</span>
          <img
            className="icon-close"
            src={sourceIconClose}
            width={'10px'}
            height={'10px'}
            onClick={closeESChartModal}
          />
        </div>

        <hr />

        <div className="chart__profile float-left">
          <img
            src={_BASEAWSS3URL + itemModal.imgurl}
            width={180}
            height={180}
          />
        </div>

        <div className="chart__detail float-left">
          <BarChartEvaluationScore dataset={datasetESModal} />
        </div>
      </Modal>

      <div className="weight__header">
        <span>
          {props.title}&nbsp;
          {_ISSHOWEXAMPLE == true ? (
            <a href="#" onClick={openExampleModal}>
              <img src={sourceIconInfo} width="10px" height="10px" />
            </a>
          ) : null}
        </span>
      </div>

      <div className="weight__setting">
        <p className="setting-title">Weight Setting</p>

        <div className="setting-detail">
          <div className="detail-weightsummary">
            <table>
              <tbody>
                <tr>
                  <td>The Evaluation Score</td>
                  <td>
                    <span className="font-bold">
                      {(valueWeight1 != ''
                        ? Number.parseFloat(valueWeight1)
                        : 0) +
                        (valueWeight2 != ''
                          ? Number.parseFloat(valueWeight2)
                          : 0) +
                        (valueWeight3 != ''
                          ? Number.parseFloat(valueWeight3)
                          : 0)}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <hr />

          <div className="detail-weight">
            <table>
              <tbody>
                <tr>
                  <td>
                    <p>Ford Production</p>
                    <p>System Exam</p>
                  </td>
                  <td>
                    <div>
                      <input
                        type={'text'}
                        className="input__weight"
                        value={valueWeight1}
                        onChange={weight1Change}
                        min="0"
                        max="100"
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Case Study</p>
                    <p>& Role Play</p>
                  </td>
                  <td>
                    <div>
                      {' '}
                      <input
                        type={'text'}
                        className="input__weight"
                        value={valueWeight2}
                        onChange={weight2Change}
                        min="0"
                        max="100"
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Formal interview</p>
                    <p>with Top Management</p>
                  </td>
                  <td>
                    <div>
                      <input
                        type={'text'}
                        className="input__weight"
                        value={valueWeight3}
                        onChange={weight3Change}
                        min="0"
                        max="100"
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <hr />

          <table>
            <tbody>
              <tr>
                <td className="candidate_caption">Number of Candidates</td>
                <td>
                  <div>
                    <input
                      type={'text'}
                      className="input__weight"
                      value={valueLimitCandidate}
                      onChange={limitcandidateChange}
                      min="0"
                      max="5"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <hr />

        <div className="setting-candidate">
          <p className="candidate-title">Candidate Performance</p>

          {candidateList
            .sort((a, b) => {
              if (a['total_score'] < b['total_score']) {
                return 1;
              }
              if (b['total_score'] < a['total_score']) {
                return -1;
              }
              return 0;
            })
            .slice(0, valueLimitCandidate)
            .map(item => (
              <a key={item.id} onClick={() => openESChartModal(item)}>
                <div className="candidate__box">
                  <div className="candidate__box-image">
                    <img src={_BASEAWSS3URL + item.imgurl} />
                  </div>

                  <div className="candidate__box-detail">
                    <table>
                      <tbody>
                        <tr>
                          <td colSpan={2}>{item.name}</td>
                        </tr>
                        <tr>
                          <td>Total Score :</td>
                          <td>
                            {/* {Number.parseFloat(
                              calcuateTotal(item.esdata),
                            ).toFixed(2)} */}
                            {Number.parseFloat(item.total_score).toFixed(2)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </a>
            ))}
        </div>
      </div>
    </div>
  );
}

export default SectionEvaluationScore;
