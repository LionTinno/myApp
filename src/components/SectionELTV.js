import React, {useState, useEffect} from 'react';
import Modal from 'react-modal';

import iconInfo from '../assets/images/icon-info.png';
import iconClose from '../assets/images/icon-close.png';

import ELTVLineChart from './ELTVLineChart';

import Amplify, {API, graphqlOperation} from 'aws-amplify';
import awsExports from '../aws-exports';
import {listProfiles} from '../graphql/queries';
Amplify.configure(awsExports);

function SectionELTV(props) {
  const BASES3URL =
    'https://fordstorage20220103.s3.ap-southeast-1.amazonaws.com/';

  const examplefilename = 'example-eltv.jpg';

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

  const [eltv_value, setValue] = useState(0);
  const handleChange = e => setValue(e.target.value);

  const [valueGrowthRate, setValueGrowthRate] = useState(5);
  const GrowthRateChange = event => {
    if (validateWeightFormat(event)) {
      setValueGrowthRate(event.target.value);
    }
  };

  const [valueDiscountRate, setValueDiscountRate] = useState(5);
  const DiscountRateChange = event => {
    if (validateWeightFormat(event)) {
      setValueDiscountRate(event.target.value);
    }
  };

  const [valueLifeSpan, setValueLifeSpan] = useState(8);
  const LifeSpanChange = event => {
    if (validateWeightFormat(event)) {
      setValueLifeSpan(event.target.value);
    }
  };

  const [candidate_number, setCadidateValue] = useState(5);
  const candidateChange = e => setCadidateValue(e.target.value);

  const [modalIsOpen, setIsOpen] = React.useState(false);

  const [itemModal, setItemModal] = React.useState('');
  const [datasetModal, setDataSetModal] = React.useState('');

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  //Line Chart Modal
  const [modalBarChartIsOpen, setBarChartIsOpen] = React.useState(false);

  function openBarChartModal(item) {
    setBarChartIsOpen(true);
    setItemModal(item);

    setValueGrowthRate(5);
    setValueDiscountRate(5);
    setValueLifeSpan(8);

    calculateLifeSpan(item);
  }

  function closeBarChartModal() {
    setBarChartIsOpen(false);
  }

  function validateWeightFormat(e) {
    const re = /^[0-9\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      return true;
    }

    return false;
  }

  function setBarChart(labels, data) {
    var dataset = {
      labels,
      datasets: [
        {
          label: 'Dataset 1',
          data: data,
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
          datalabels: {
            display: false,
          },
        },
      ],
    };

    setDataSetModal(dataset);
  }

  function calculateLifeSpan(item) {
    var finalRate = valueDiscountRate - valueGrowthRate;

    var lastYear = item.eltvdata.labels.at(-1);
    var calYearList = [];

    for (let index = 0; index < item.eltvdata.labels.length; index++) {
      calYearList.push(item.eltvdata.labels[index]);
    }

    var lastCost = item.eltvdata.data.at(-1);
    var calCostList = [];

    for (let index = 0; index < item.eltvdata.data.length; index++) {
      calCostList.push(item.eltvdata.data[index]);
    }

    for (let index = 0; index < valueLifeSpan - 1; index++) {
      var calCost = lastCost + lastCost * (finalRate / 100);
      lastCost = calCost;
      calCostList.push(calCost);

      var calYear = Number.parseInt(lastYear) + 1;
      lastYear = calYear;
      calYearList.push(calYear);
    }

    calYearList.push(Number.parseInt(calYearList.at(-1)) + 1);
    calCostList.push(0);

    setBarChart(calYearList, calCostList);
  }

  return (
    <div className="section_group">
      <Modal
        isOpen={modalBarChartIsOpen}
        onRequestClose={closeBarChartModal}
        style={customStyles}
        contentLabel="Bar Chart Modal">
        <div className="example__header">
          <span>The Evaluation Score - {itemModal.name}</span>
          <img
            className="icon-close"
            src={iconClose}
            width={'10px'}
            height={'10px'}
            onClick={closeBarChartModal}
          />
        </div>

        <hr />
        <div className="linechart">
          <span>The Expected Employee Lifecycle - {itemModal.name}</span>
          <ELTVLineChart data={datasetModal} />
        </div>

        <div className="modal__config">
          <table>
            <tbody>
              <tr>
                <td>Growth rate</td>
                <td>
                  <div>
                    <input
                      type={'text'}
                      className="input__weight"
                      value={valueGrowthRate}
                      onChange={GrowthRateChange}
                      min="0"
                      max="100"
                    />
                  </div>
                </td>
                <td style={{fontSize: '10px', fontWeight: 'bold'}}>%</td>
              </tr>
              <tr>
                <td>Discount rate</td>
                <td>
                  <div>
                    <input
                      type={'text'}
                      className="input__weight"
                      value={valueDiscountRate}
                      onChange={DiscountRateChange}
                      min="0"
                      max="100"
                    />
                  </div>
                </td>
                <td style={{fontSize: '10px', fontWeight: 'bold'}}>%</td>
              </tr>
              <tr>
                <td>Employee Life Span</td>
                <td>
                  <div>
                    <input
                      type={'text'}
                      className="input__weight"
                      value={valueLifeSpan}
                      onChange={LifeSpanChange}
                      min="0"
                      max="100"
                    />
                  </div>
                </td>
                <td style={{fontSize: '10px', fontWeight: 'bold'}}>Years</td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <input
                    type={'button'}
                    id="finishButton"
                    className="btn btn-compare"
                    value={'Finish'}
                    onClick={() => calculateLifeSpan(itemModal)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Modal>

      <Modal
        isOpen={modalIsOpen}
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
            ELTV <span className="weight-summary">{eltv_value}</span>
          </div>
          <hr />
          <div className="detail-table">
            <table>
              <tbody>
                <tr>
                  <td>
                    <p>ELTV</p>
                  </td>
                  <td>
                    <div>
                      <input
                        type={'text'}
                        className="input__weight"
                        value={eltv_value}
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

          {candidateList
            .sort((a, b) => {
              if (a['eltv'] < b['eltv']) {
                return 1;
              }
              if (b['eltv'] < a['eltv']) {
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
                          <td>ELTV : </td>
                          <td>{Number.parseFloat(item.eltv).toFixed(2)}</td>
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

export default SectionELTV;
