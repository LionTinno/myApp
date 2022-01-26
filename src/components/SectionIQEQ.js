import React, {useState, useEffect} from 'react';
import Modal from 'react-modal';

import iconInfo from '../assets/images/icon-info.png';
import iconClose from '../assets/images/icon-close.png';

import IQChart from './IQChart';
import IQBarChart from './IQBarChart';
import EQChart from './EQChart';
import EQBarChart from './EQBarChart';
import SensitivityBarChart from './SensitivityBarChart';

function SectionIQEQ(props) {
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

  const customStyles2 = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '600px',
    },
  };

  const BASES3URL =
    'https://fordstorage20220103.s3.ap-southeast-1.amazonaws.com/';

  const examplefilename = 'example-iqeq.jpg';

  const [iqeq_value, setValue] = useState(0);
  const handleChange = event => {
    if (validateWeightFormat(event)) {
      var sum =
        Number.parseInt(event.target.value == '' ? 0 : event.target.value) +
        props.weight.esweight +
        props.weight.eltvweight +
        props.weight.mbtiweight;
      if (sum <= 100) {
        setValue(event.target.value == '' ? 0 : event.target.value);
        calcuateTotal(event.target.value == '' ? 0 : event.target.value);
        props.weight.iqeqweight = Number.parseInt(
          event.target.value == '' ? 0 : event.target.value,
        );
      }
    }
  };

  const [candidate_number, setCadidateValue] = useState(5);
  const candidateChange = e => setCadidateValue(e.target.value);

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [pictureModal, setPictureModal] = React.useState('');
  const [itemModal, setItemModal] = React.useState('');
  const [datasetIQModal, setDataSetIQModal] = React.useState('');
  const [datasetBarIQModal, setDataSetBarIQModal] = React.useState('');
  const [datasetEQModal, setDataSetEQModal] = React.useState('');

  const [datasetEQBarChartModal, setDataSetEQBarChartModal] =
    React.useState('');

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {}

  function closeModal() {
    setIsOpen(false);
  }

  function validateWeightFormat(e) {
    const re = /^[0-9\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      return true;
    }

    return false;
  }

  //Line Chart Modal
  const [modalBarChartIsOpen, setBarChartIsOpen] = React.useState(false);

  function openBarChartModal(item) {
    setBarChartIsOpen(true);
    setPictureModal(BASES3URL + item.imgurl);
    setItemModal(item);

    var datasetIQ = {
      labels: ['Individual', 'Max'],
      maintainAspectRatio: false,
      responsive: false,
      datasets: [
        {
          data: item.iq,
          backgroundColor: ['#1C57A4', '#aaaaaa'],
          hoverOffset: 4,
          datalabels: {
            display: false,
          },
        },
      ],
    };

    setDataSetIQModal(datasetIQ);

    var datasetEQ = {
      labels: ['Individual', 'Max'],
      maintainAspectRatio: false,
      responsive: false,
      datasets: [
        {
          data: item.eq,
          backgroundColor: ['#1C57A4', '#aaaaaa'],
          hoverOffset: 4,
          datalabels: {
            display: false,
          },
        },
      ],
    };

    setDataSetEQModal(datasetEQ);

    var backgroundColors1 = [];
    var backgroundColors2 = [];

    switch (item.name) {
      case 'Jame':
        backgroundColors1 = [
          '#1C57A4',
          '#aaaaaa',
          '#aaaaaa',
          '#aaaaaa',
          '#aaaaaa',
        ];

        backgroundColors2 = [
          '#aaaaaa',
          '#aaaaaa',
          '#1C57A4',
          '#aaaaaa',
          '#aaaaaa',
        ];
        break;

      case 'Tony':
        backgroundColors1 = [
          '#aaaaaa',
          '#1C57A4',
          '#aaaaaa',
          '#aaaaaa',
          '#aaaaaa',
        ];
        backgroundColors2 = [
          '#aaaaaa',
          '#aaaaaa',
          '#aaaaaa',
          '#1C57A4',
          '#aaaaaa',
        ];
        break;
      case 'Jonas':
        backgroundColors1 = [
          '#aaaaaa',
          '#aaaaaa',
          '#1C57A4',
          '#aaaaaa',
          '#aaaaaa',
        ];
        backgroundColors2 = [
          '#aaaaaa',
          '#1C57A4',
          '#aaaaaa',
          '#aaaaaa',
          '#aaaaaa',
        ];
        break;
      case 'Tom':
        backgroundColors1 = [
          '#aaaaaa',
          '#aaaaaa',
          '#aaaaaa',
          '#1C57A4',
          '#aaaaaa',
        ];

        backgroundColors2 = [
          '#1C57A4',
          '#aaaaaa',
          '#aaaaaa',
          '#aaaaaa',
          '#aaaaaa',
        ];
        break;
      case 'Andy':
        backgroundColors1 = [
          '#aaaaaa',
          '#aaaaaa',
          '#aaaaaa',
          '#aaaaaa',
          '#1C57A4',
        ];

        backgroundColors2 = [
          '#aaaaaa',
          '#aaaaaa',
          '#aaaaaa',
          '#aaaaaa',
          '#1C57A4',
        ];
        break;

      default:
        break;
    }

    var datasetBarIQ = {
      labels: ['Jame', 'Tony', 'Jonas', 'Tom', 'Andy'],
      maintainAspectRatio: false,
      responsive: false,
      datasets: [
        {
          barThickness: 20,
          label: '',
          data: [123, 113, 111, 102, 94],
          backgroundColor: backgroundColors1,
          datalabels: {
            color: 'black',
            anchor: 'end',
            align: 'top',
          },
        },
      ],
    };

    setDataSetBarIQModal(datasetBarIQ);

    var datasetEQBarChart = {
      labels: ['Tom', 'Jonas', 'Jame', 'Tony', 'Andy'],
      maintainAspectRatio: false,
      responsive: false,
      datasets: [
        {
          barThickness: 20,
          label: '',
          data: [174, 168, 155, 149, 143],
          backgroundColor: backgroundColors2,
          datalabels: {
            color: 'black',
            anchor: 'end',
            align: 'top',
          },
        },
      ],
    };

    setDataSetEQBarChartModal(datasetEQBarChart);
  }

  function afterBarChartOpenModal() {}

  function closeBarChartModal() {
    setBarChartIsOpen(false);
  }

  function calcuateTotal(w1) {
    props.candidateList.forEach(element => {
      element.iqeq =
        w1 *
        (-4.76856 + 0.02548 * element.iq[0] + (0.01583 * element.eq[0]) / 1);
    });

    props.childToParent3(props.candidateList);
  }

  return (
    <div className="section_group">
      <Modal
        isOpen={modalBarChartIsOpen}
        onAfterOpen={afterBarChartOpenModal}
        onRequestClose={closeBarChartModal}
        style={customStyles2}
        contentLabel="Bar Chart Modal">
        <div className="example__header">
          <span>IQ & EQ - {itemModal.name}</span>
          <img
            className="icon-close"
            src={iconClose}
            width={'10px'}
            height={'10px'}
            onClick={closeBarChartModal}
          />
        </div>

        <hr />
        <div className="chart__profile float-left">
          <img src={pictureModal} width={120} height={120} />
        </div>

        <div className="iqeqchart">
          <div className="chart__iq">
            <span className="chart-title">{itemModal.name} IQ</span>
            <IQChart data={datasetIQModal} />
          </div>

          <div className="chart__eq">
            <span className="chart-title">{itemModal.name} EQ</span>
            <EQChart data={datasetEQModal} />
          </div>

          <div className="barchart__iq">
            <span className="chart-title">{itemModal.name} IQ Chart</span>
            <IQBarChart data={datasetBarIQModal} />
          </div>

          <div id="barchartEQ">
            <span className="chart-title">{itemModal.name} EQ Chart</span>
            <EQBarChart data={datasetEQBarChartModal} />
          </div>

          <div id="barchartSensitivity">
            <span className="chart-title">Talent Prediction Score</span>
            <br />
            <SensitivityBarChart
              name={itemModal.name}
              test={props.candidateList}
            />
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal">
        <div className="example__header">
          <span>ELTV - Example</span>
          <img
            className="icon-close"
            src={iconClose}
            width={'10px'}
            height={'10px'}
            onClick={closeModal}
          />
        </div>
        <hr />
        <div className="example__body">
          <img src={BASES3URL + examplefilename} width={750} height={300} />
        </div>
      </Modal>

      <div className="section_group-header">
        <span>
          {props.title}&nbsp;
          <a href="#" onClick={openModal}>
            <img src={iconInfo} width="10px" height="10px" />
          </a>
        </span>
      </div>

      <div className="section_group-setting">
        <p className="setting_title">Weight Setting</p>

        <div className="section_group-detail">
          <div className="setting_title_summary">
            Talent Prediction Score{' '}
            <span className="weight-summary">{iqeq_value}</span>
          </div>
          <hr />
          <div className="detail-table">
            <table>
              <tbody>
                <tr>
                  <td>
                    <p>Talent Factor</p>
                  </td>
                  <td>
                    <div>
                      <input
                        type={'text'}
                        className="input__weight"
                        value={iqeq_value}
                        onChange={handleChange}
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
                      value={candidate_number}
                      onChange={candidateChange}
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

        <div className="section__group-candidate">
          <p className="setting_title">Candidate Performance</p>

          {props.candidateList
            .sort((a, b) => {
              if (a['iqeq'] < b['iqeq']) {
                return 1;
              }
              if (b['iqeq'] < a['iqeq']) {
                return -1;
              }
              return 0;
            })
            .slice(0, candidate_number)
            .map(item => (
              <a key={item.id} onClick={() => openBarChartModal(item)}>
                <div className="candidate__box">
                  <div className="candidate__box-image">
                    <img src={BASES3URL + item.imgurl} />
                  </div>

                  <div className="candidate__box-detail">
                    <table>
                      <tbody>
                        <tr>
                          <td colSpan={2}>{item.name}</td>
                        </tr>
                        <tr>
                          <td>IQ&EQ : </td>
                          <td>{Number.parseFloat(item.iqeq).toFixed(2)}</td>
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

export default SectionIQEQ;
