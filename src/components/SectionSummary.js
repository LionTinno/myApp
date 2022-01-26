import React, {useState, useEffect} from 'react';
import Modal from 'react-modal';

import iconClose from '../assets/images/icon-close.png';
import SummaryDoughtChart from './SummaryDoughtChart';

var headerTitle = 'Summary result';

function SectionSummary(props) {
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '800px',
    },
  };

  const _BASEAWSS3URL =
    'https://fordstorage20220103.s3.ap-southeast-1.amazonaws.com/';

  const [isOpenSummaryChartModal, setIsOpenSummaryChartModal] =
    React.useState(false);
  const [itemModal, setItemModal] = React.useState('');
  const [valueService, setValueService] = React.useState('');
  const [valueCost, setValueCost] = React.useState('');
  const [valueResignPrediction, setValueResignPrediction] = React.useState('');
  const [valuePerformanceList, setValuePerformaceList] = React.useState([]);

  const [datasetJS, setDataSetJS] = React.useState('');
  const [datasetCI, setDataSetCI] = React.useState('');
  const [datasetPL, setDataSetPL] = React.useState('');
  const [datasetTW, setDataSetTW] = React.useState('');

  const [refeashState, setRefeashState] = useState(false);

  function openSummaryChartModal(item, performace) {
    setIsOpenSummaryChartModal(true);

    setItemModal(item);
    setValueService(item.detail.service);
    setValueCost(item.detail.cost);
    setValueResignPrediction(item.detail.resignprediction);

    setValuePerformaceList(performace);

    var dataJS = {
      labels: ['No', 'Yes'],
      maintainAspectRatio: false,
      responsive: false,
      datasets: [
        {
          data: item.js,
          backgroundColor: ['#AFE1AF', '#FFBA01'],
          hoverOffset: 4,
        },
      ],
    };

    setDataSetJS(dataJS);

    var dataCI = {
      labels: ['No', 'Yes'],
      maintainAspectRatio: false,
      responsive: false,
      datasets: [
        {
          data: item.ci,
          backgroundColor: ['#AFE1AF', '#FFBA01'],
          hoverOffset: 4,
        },
      ],
    };

    setDataSetCI(dataCI);

    var dataPL = {
      labels: ['No', 'Yes'],
      maintainAspectRatio: false,
      responsive: false,
      datasets: [
        {
          data: item.pl,
          backgroundColor: ['#AFE1AF', '#FFBA01'],
          hoverOffset: 4,
        },
      ],
    };

    setDataSetPL(dataPL);

    var dataTW = {
      labels: ['No', 'Yes'],
      maintainAspectRatio: false,
      responsive: false,
      datasets: [
        {
          data: item.tw,
          backgroundColor: ['#AFE1AF', '#FFBA01'],
          hoverOffset: 4,
        },
      ],
    };

    setDataSetTW(dataTW);
  }

  function closeSummaryChartModal() {
    setIsOpenSummaryChartModal(false);
  }

  const [candidateList, setCandidateList] = React.useState(props.candidateList);

  return (
    <div className="section_summary">
      <Modal
        isOpen={isOpenSummaryChartModal}
        onRequestClose={closeSummaryChartModal}
        style={customStyles}
        contentLabel="Example Modal">
        <div className="chart__header" style={{width: '600px'}}>
          <span>
            Core Performance Indicators (CPIs), Departmental Performance
            Indicators (DPIs), and Personal Performance Indicators (PPIs) -{' '}
            {itemModal.name}
          </span>
          <img
            className="icon-close"
            src={iconClose}
            width={'10px'}
            height={'10px'}
            onClick={closeSummaryChartModal}
          />
        </div>

        <hr />

        <div className="container-detail" style={{height: '100%'}}>
          <div
            className="chart__detail float-left"
            style={{width: '300px', border: '0.5px solid lightgray'}}>
            <img src={_BASEAWSS3URL + 'performance-andy.png'} width={250} />
            <div
              style={{
                position: 'absolute',
                top: '15px',
                left: '160px',
                width: '2px',
                height: '85%',
                backgroundColor: 'red',
              }}></div>
            <div
              style={{
                position: 'absolute',
                top: '15px',
                left: '215px',
                width: '2px',
                height: '85%',
                backgroundColor: 'green',
              }}></div>
          </div>

          <div
            className="chart__detail float-left"
            style={{width: '480px', border: '0.5px solid lightgray'}}>
            <div style={{position: 'relative', width: '480px'}}>
              <img
                src={_BASEAWSS3URL + itemModal.imgurl}
                width={100}
                height={100}
                style={{
                  position: 'relative',
                  display: 'inline-block',
                  marginLeft: '20px',
                  marginTop: '10px',
                }}
              />
              <div
                style={{
                  position: 'relative',
                  display: 'inline-block',
                  top: '0',
                  marginLeft: '50px',
                }}>
                <p style={{fontSize: '10px', fontWeight: 'bold'}}>
                  Employment Detail:
                </p>
                <table>
                  <tbody>
                    <tr>
                      <td>Service Year</td>
                      <td style={{textAlign: 'left'}}>{valueService}</td>
                    </tr>
                    <tr>
                      <td>Recuritment Cost (THB)</td>
                      <td style={{textAlign: 'left'}}>{valueCost} THB</td>
                    </tr>
                    <tr>
                      <td>Resign Prediction</td>
                      <td style={{textAlign: 'left'}}>
                        {valueResignPrediction}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p
                  style={{
                    fontSize: '10px',
                    fontWeight: 'bold',
                    marginTop: '20px',
                  }}>
                  Performance Rating:
                </p>

                <table>
                  <tbody>
                    {valuePerformanceList.map(item => (
                      <tr>
                        <td>{item.topic}</td>
                        <td style={{textAlign: 'left'}}>
                          {item.value == 'Top Acheiver' ? (
                            <span style={{color: 'green'}}>{item.value}</span>
                          ) : null}
                          {item.value == 'Low Acheiver' ? (
                            <span style={{color: '#D1B000'}}>{item.value}</span>
                          ) : null}
                          {item.value == 'Acheiver' ? (
                            <span>{item.value}</span>
                          ) : null}

                          {(item.value == 'Pass') | (item.value == 'Fail') ? (
                            <span>{item.value}</span>
                          ) : null}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div
              style={{
                position: 'relative',
                width: '479px',
                border: '0.5px solid lightgray',
                backgroundColor: '#F3F6F9',
                top: '10px',
              }}>
              <div className="chart__summary">
                <SummaryDoughtChart
                  title={'Job Satisfaction Index'}
                  data={datasetJS}
                  department={'78'}
                  overall={'69'}
                />
              </div>
              <div className="chart__summary">
                <SummaryDoughtChart
                  title={'Culture Index'}
                  data={datasetCI}
                  department={'84'}
                  overall={'74'}
                />
              </div>
              <div className="chart__summary">
                <SummaryDoughtChart
                  title={'People Leader Index'}
                  data={datasetPL}
                  department={'80'}
                  overall={'80'}
                />
              </div>
              <div className="chart__summary">
                <SummaryDoughtChart
                  title={'Teamwork Index'}
                  data={datasetTW}
                  department={'80'}
                  overall={'69'}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <div className="section_summary-header">
        <span>{headerTitle}</span>
      </div>

      <hr className="summary-line" />

      <div className="section_summary-setting">
        <div className="section__summary-candidate">
          {candidateList
            .sort((a, b) => {
              if (a['result'] < b['result']) {
                return 1;
              }
              if (b['result'] < a['result']) {
                return -1;
              }
              return 0;
            })
            .map(item => (
              <a
                key={item.id}
                onClick={() => openSummaryChartModal(item, item.performance)}>
                <div className="candidate__box-summary">
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
                          <td>Result : </td>
                          <td>{Number.parseFloat(item.result).toFixed(2)}</td>
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

export default SectionSummary;
