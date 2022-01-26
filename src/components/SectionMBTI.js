import React, {useState, useEffect} from 'react';
import Modal from 'react-modal';

import iconInfo from '../assets/images/icon-info.png';
import iconClose from '../assets/images/icon-close.png';

import RadarChart from './RadarChart';
import RadarMBTIChart from './RadarMBTIChart';

function SectionMBTI(props) {
  Modal.setAppElement('#root');

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

  const customCompareStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '950px',
    },
  };

  const customStyles3 = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '900px',
    },
  };

  const _BASEAWSS3URL =
    'https://fordstorage20220103.s3.ap-southeast-1.amazonaws.com/';

  const examplefilename = 'example-mbti.jpg';
  const _ISSHOWEXAMPLE = true;

  const [tb_value, setTB] = useState(0);
  const tbChange = event => {
    if (validateWeightFormat(event)) {
      var sum =
        Number.parseInt(event.target.value == '' ? 0 : event.target.value) +
        Number.parseInt(pmt_value) +
        props.weight.eltvweight +
        props.weight.iqeqweight +
        props.weight.esweight;
      if (sum <= 100) {
        setTB(event.target.value == '' ? 0 : event.target.value);
        calcuateTotal(
          event.target.value == '' ? 0 : event.target.value,
          pmt_value,
        );
        props.weight.mbtiweight =
          Number.parseInt(event.target.value == '' ? 0 : event.target.value) +
          Number.parseInt(pmt_value);
      }
    }
  };

  const [pmt_value, setPMT] = useState(0);
  const pmtChange = event => {
    if (validateWeightFormat(event)) {
      var sum =
        Number.parseInt(event.target.value == '' ? 0 : event.target.value) +
        Number.parseInt(tb_value) +
        props.weight.eltvweight +
        props.weight.iqeqweight +
        props.weight.esweight;
      if (sum <= 100) {
        setPMT(event.target.value == '' ? 0 : event.target.value);
        calcuateTotal(
          tb_value,
          event.target.value == '' ? 0 : event.target.value,
        );
        props.weight.mbtiweight =
          Number.parseInt(event.target.value == '' ? 0 : event.target.value) +
          Number.parseInt(tb_value);
      }
    }
  };

  const [candidate_number, setCadidateValue] = useState(5);
  const candidateChange = e => setCadidateValue(e.target.value);

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [modalIsOpen2, setIsOpen2] = React.useState(false);
  const [isOpenMBTIChartModal, setIsOpenMBTIChartModal] = React.useState(false);

  const [itemModal, setItemModal] = React.useState('');
  const [ownerDataChart, setOwnerDataChart] = React.useState('');
  const [teamDataChart, setTeamDataChart] = React.useState('');
  const [deptDataChart, setDeptDataChart] = React.useState('');

  const [datasetCompareChart1, setDataSetCompareChart1] = React.useState(null);
  const [datasetCompareChart2, setDataSetCompareChart2] = React.useState(null);
  const [datasetCompareChart3, setDataSetCompareChart3] = React.useState(null);

  const [counter, setCounter] = React.useState(0);
  const [box1, setBox1] = React.useState(false);
  const [box1name, setBox1Name] = React.useState('');
  const [box1temp, setBox1Temp] = React.useState('');
  const [box2, setBox2] = React.useState(false);
  const [box2name, setBox2Name] = React.useState('');
  const [box2temp, setBox2Temp] = React.useState('');

  function openModal() {
    setIsOpen(true);
    setCounter(0);
    setBox1(false);
    setBox2(false);
    setDataSetCompareChart1(null);
    setDataSetCompareChart2(null);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function openModal2() {
    setIsOpen2(true);
  }

  function closeModal2() {
    setIsOpen2(false);
  }

  function compare(e, item) {
    var element = document.getElementById(e);

    if (counter < 2) {
      if (!element.classList.contains('cadidate-focus')) {
        element.classList.add('cadidate-focus');
        var number = counter + 1;
        setCounter(number);

        if (box1) {
          setBox2(true);
          setBox2Name(item.name);
          setBox2Temp(item.mbti.chart);
          setDataSetinChart2(item.mbti.chart);
        } else {
          setBox1(true);
          setBox1Name(item.name);
          setBox1Temp(item.mbti.chart);
          setDataSetinChart1(item.mbti.chart);
        }
      } else {
        element.classList.remove('cadidate-focus');

        var number = counter - 1;
        setCounter(number);

        if (box2) {
          setBox2(false);

          if (item.name != box2name) {
            setBox1Name(box2name);
            setDataSetinChart1(box2temp);
          }

          setDataSetinChart2(null);
        } else {
          setBox1(false);

          if (item.name != box1name) {
            setBox2Name(box1name);
            setDataSetinChart2(box1temp);
          }

          setDataSetinChart1(null);
        }
      }
    } else {
      if (element.classList.contains('cadidate-focus')) {
        element.classList.remove('cadidate-focus');

        var number = counter - 1;
        setCounter(number);

        if (box2) {
          setBox2(false);
          if (item.name != box2name) {
            setBox1Name(box2name);
            setDataSetinChart1(box2temp);
          }
          setDataSetinChart2(null);
        } else {
          setBox1(false);
          setDataSetinChart1(null);
          if (item.name != box1name) {
            setBox2Name(box1name);
            setDataSetinChart2(box1temp);
          }
        }
      }
    }
  }

  function setDataSetinChart1(data) {
    const labels = [
      'Extraversion',
      'Sensing',
      'Thinking',
      'Judging',
      'Introversion',
      'Intuition',
      'Feeling',
      'Persceiving',
    ];

    var dataset = {
      labels,
      datasets: [
        {
          label: '1 ',
          backgroundColor: 'rgba(34, 202, 236, .2)',
          borderColor: 'rgba(34, 202, 236, 1)',
          pointBackgroundColor: 'rgba(34, 202, 236, 1)',
          poingBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(34, 202, 236, 1)',
          data: data,
          datalabels: {
            display: false,
          },
        },
      ],
    };

    setDataSetCompareChart1(dataset);
  }

  function validateWeightFormat(e) {
    const re = /^[0-9\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      return true;
    }

    return false;
  }

  function setDataSetinChart2(data) {
    const labels = [
      'Extraversion',
      'Sensing',
      'Thinking',
      'Judging',
      'Introversion',
      'Intuition',
      'Feeling',
      'Persceiving',
    ];

    var dataset = {
      labels,
      datasets: [
        {
          label: '2',
          backgroundColor: 'rgba(34, 202, 236, .2)',
          borderColor: 'rgba(34, 202, 236, 1)',
          pointBackgroundColor: 'rgba(34, 202, 236, 1)',
          poingBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(34, 202, 236, 1)',
          data: data,
          datalabels: {
            display: false,
          },
        },
      ],
    };

    setDataSetCompareChart2(dataset);
  }

  function openMBTIChartModal(item) {
    setIsOpenMBTIChartModal(true);

    setItemModal(item);
    setOwnerDataChart(item.mbti.chart);
    setTeamDataChart(item.mbti.teamchart);
    setDeptDataChart(item.mbti.deptchart);
    setDataSetinChart3(
      item.name,
      item.mbti.chart,
      item.mbti.before,
      item.mbti.after,
    );
  }

  function closeESChartModal() {
    setIsOpenMBTIChartModal(false);
  }

  function renderOwnerData(item, index) {
    return item[index];
  }

  function setDataSetinChart3(name, chartData, teamData, DeptData) {
    const labels = [
      'Extraversion',
      'Sensing',
      'Thinking',
      'Judging',
      'Introversion',
      'Intuition',
      'Feeling',
      'Persceiving',
    ];

    var dataset = {
      labels,
      datasets: [
        {
          label: name,
          backgroundColor: 'blue',
          borderColor: 'blue',
          pointBackgroundColor: 'blue',
          poingBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'blue',
          data: chartData,
          datalabels: {
            display: false,
          },
        },
        {
          label: 'Team Average Before',
          backgroundColor: 'red',
          borderColor: 'red',
          pointBackgroundColor: 'red',
          poingBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'red',
          data: teamData,
          datalabels: {
            display: false,
          },
        },
        {
          label: 'Team Average After',
          backgroundColor: 'green',
          borderColor: 'green',
          pointBackgroundColor: 'green',
          poingBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'green',
          data: DeptData,
          datalabels: {
            display: false,
          },
        },
      ],
    };

    setDataSetCompareChart3(dataset);
  }

  function calcuateTotal(w1, w2) {
    props.candidateList.forEach(element => {
      element.mbti.total =
        w1 * (1 - element.mbtigraph / 400) + w2 * (element.matching / 5);
    });

    props.childToParent4(props.candidateList);
  }

  return (
    <div className="section_group">
      <Modal
        isOpen={modalIsOpen2}
        onRequestClose={closeModal2}
        style={customStyles}
        contentLabel="Example Modal">
        <div className="example__header">
          <span>MBTI - Example</span>
          <img
            className="icon-close"
            src={iconClose}
            width={'10px'}
            height={'10px'}
            onClick={closeModal2}
          />
        </div>
        <hr />
        <div className="example__body">
          <img src={_BASEAWSS3URL + examplefilename} width={750} height={300} />
        </div>
      </Modal>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customCompareStyles}
        contentLabel="Example Modal">
        <div className="chart__header">
          <span>Compare MBTI</span>
          <img
            className="icon-close"
            src={iconClose}
            width={'10px'}
            height={'10px'}
            onClick={closeModal}
          />
        </div>
        <hr />
        <div className="modal__detail-cadidate">
          {props.candidateList
            .sort((a, b) => {
              if (a.mbti['total'] < b.mbti['total']) {
                return 1;
              }
              if (b.mbti['total'] < a.mbti['total']) {
                return -1;
              }
              return 0;
            })
            .slice(0, candidate_number)
            .map(item => (
              <a
                key={item.id}
                onClick={() => compare('item' + item.name, item)}>
                <div id={'item' + item.name} className="candidate__box">
                  <div className="candidate-image">
                    <img src={_BASEAWSS3URL + item.imgurl} />
                  </div>

                  <div className="candidate-detail">
                    <table>
                      <tbody>
                        <tr>
                          <td colSpan={2}>{item.name}</td>
                        </tr>
                        <tr>
                          <td>MBTI : </td>
                          <td>
                            {Number.parseFloat(item.mbti.total).toFixed(2)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </a>
            ))}
        </div>
        <div className="modal__detail-chart">
          {box1 ? (
            <RadarChart name={box1name} data={datasetCompareChart1} />
          ) : null}
          {box2 ? (
            <RadarChart name={box2name} data={datasetCompareChart2} />
          ) : null}
        </div>
      </Modal>

      <Modal
        isOpen={isOpenMBTIChartModal}
        onRequestClose={closeESChartModal}
        style={customStyles3}
        contentLabel="Example Modal">
        <div className="chart__header">
          <span>MBTI - {itemModal.name}</span>
          <img
            className="icon-close"
            src={iconClose}
            width={'10px'}
            height={'10px'}
            onClick={closeESChartModal}
          />
        </div>

        <hr />
        <div className="container-detail">
          <div className="chart__profile float-left" style={{width: '150px'}}>
            <img
              src={_BASEAWSS3URL + itemModal.imgurl}
              width={120}
              height={120}
            />
          </div>

          <div className="chart__detail float-left" style={{width: '350px'}}>
            <span className="profile-description">{itemModal.description}</span>
            <br />
            <span className="profile-type">{itemModal.type}</span>
            <br />
            <table id="tableMBTIData">
              <thead>
                <tr>
                  <td></td>
                  <td>{itemModal.name}</td>
                  <td>Team</td>
                  <td>Dept</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Judging</td>
                  <td>{renderOwnerData(ownerDataChart, 3)}</td>
                  <td>{renderOwnerData(teamDataChart, 3)}</td>
                  <td>{renderOwnerData(deptDataChart, 3)}</td>
                </tr>
                <tr>
                  <td>Intuitive</td>
                  <td>{renderOwnerData(ownerDataChart, 1)}</td>
                  <td>{renderOwnerData(teamDataChart, 1)}</td>
                  <td>{renderOwnerData(deptDataChart, 1)}</td>
                </tr>
                <tr>
                  <td>Introversion</td>
                  <td>{renderOwnerData(ownerDataChart, 4)}</td>
                  <td>{renderOwnerData(teamDataChart, 4)}</td>
                  <td>{renderOwnerData(deptDataChart, 4)}</td>
                </tr>
                <tr>
                  <td>Feeling</td>
                  <td>{renderOwnerData(ownerDataChart, 6)}</td>
                  <td>{renderOwnerData(teamDataChart, 6)}</td>
                  <td>{renderOwnerData(deptDataChart, 6)}</td>
                </tr>
                <tr>
                  <td>Thinking</td>
                  <td>{renderOwnerData(ownerDataChart, 2)}</td>
                  <td>{renderOwnerData(teamDataChart, 2)}</td>
                  <td>{renderOwnerData(deptDataChart, 2)}</td>
                </tr>
                <tr>
                  <td>Extraversion</td>
                  <td>{renderOwnerData(ownerDataChart, 0)}</td>
                  <td>{renderOwnerData(teamDataChart, 0)}</td>
                  <td>{renderOwnerData(deptDataChart, 0)}</td>
                </tr>
                <tr>
                  <td>Observant</td>
                  <td>{renderOwnerData(ownerDataChart, 5)}</td>
                  <td>{renderOwnerData(teamDataChart, 5)}</td>
                  <td>{renderOwnerData(deptDataChart, 5)}</td>
                </tr>
                <tr>
                  <td>Prospecting</td>
                  <td>{renderOwnerData(ownerDataChart, 7)}</td>
                  <td>{renderOwnerData(teamDataChart, 7)}</td>
                  <td>{renderOwnerData(deptDataChart, 7)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="chart__radar float-left" style={{width: '320px'}}>
            <RadarMBTIChart name={itemModal.name} data={datasetCompareChart3} />
          </div>
        </div>
        <div className="container-type">
          <img src={_BASEAWSS3URL + itemModal.typeimgurl} width={'700'} />
        </div>
      </Modal>

      <div className="section_group-header">
        <span>
          {props.title}&nbsp;
          {_ISSHOWEXAMPLE == true ? (
            <a href="#" onClick={openModal2}>
              <img src={iconInfo} width="10px" height="10px" />
            </a>
          ) : null}
        </span>
      </div>

      <div className="section_group-setting">
        <p className="setting_title">Weight Setting</p>

        <div className="section_group-detail">
          <div className="setting_title_summary">
            MBTI{' '}
            <span className="weight-summary">
              {Number.parseFloat(tb_value) + Number.parseFloat(pmt_value)}
            </span>
          </div>
          <hr />
          <div className="detail-table">
            <table>
              <tbody>
                <tr>
                  <td>
                    <p>Team Balance</p>
                    <p>Score</p>
                  </td>
                  <td>
                    <div>
                      <input
                        type={'text'}
                        className="input__weight"
                        value={tb_value}
                        onChange={tbChange}
                        min="0"
                        max="100"
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Personality</p>
                    <p>Matching with</p>
                    <p>Team Members</p>
                  </td>
                  <td>
                    <div>
                      <input
                        type={'text'}
                        className="input__weight"
                        value={pmt_value}
                        onChange={pmtChange}
                        min="0"
                        max="100"
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} align="center">
                    <input
                      type="button"
                      className="btn btn-compare"
                      value="Compare"
                      onClick={openModal}
                    />
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
              if (a.mbti['total'] < b.mbti['total']) {
                return 1;
              }
              if (b.mbti['total'] < a.mbti['total']) {
                return -1;
              }
              return 0;
            })
            .slice(0, candidate_number)
            .map(item => (
              <a key={item.id} onClick={() => openMBTIChartModal(item)}>
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
                          <td>MBTI : </td>
                          <td>
                            {Number.parseFloat(item.mbti.total).toFixed(2)}
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

export default SectionMBTI;
