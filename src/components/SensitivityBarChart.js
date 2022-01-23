import React from 'react';

function SensitivityBarChart(props) {
  return (
    <div className="sensitivity_chart">
      <div className="line"></div>
      {props.test
        .sort((a, b) => {
          if (a['predictionscore'] < b['predictionscore']) {
            return 1;
          }
          if (b['predictionscore'] < a['predictionscore']) {
            return -1;
          }
          return 0;
        })
        .slice(0, 5)
        .map(item => (
          <div className="chart-inline">
            <div className="inline-left">
              <span>{item.name}</span>
            </div>
            <div className="inline-right">
              {item.name == props.name ? (
                <div
                  className="sensitivity_chart-bar bar-focus"
                  style={{width: item.predictionscore}}>
                  <span>{item.predictionscore}</span>
                </div>
              ) : (
                <div
                  className="sensitivity_chart-bar"
                  style={{width: item.predictionscore}}>
                  <span>{item.predictionscore}</span>
                </div>
              )}
            </div>
          </div>
        ))}

      {/* <div className="chart-inline">
        <div className="inline-left">
          <span>Jonas</span>
        </div>
        <div className="inline-right">
          <div
            className="sensitivity_chart-bar bar-focus"
            style={{width: '71%'}}>
            <span>71%</span>
          </div>
        </div>
      </div>
      <div className="chart-inline">
        <div className="inline-left">
          <span>Tom</span>
        </div>
        <div className="inline-right">
          <div className="sensitivity_chart-bar" style={{width: '58%'}}>
            <span>58%</span>
          </div>
        </div>
      </div>
      <div className="chart-inline">
        <div className="inline-left">
          <span>Tony</span>
        </div>
        <div className="inline-right">
          <div className="sensitivity_chart-bar" style={{width: '47%'}}>
            <span>47%</span>
          </div>
        </div>
      </div>
      <div className="chart-inline">
        <div className="inline-left">
          <span>Andy</span>
        </div>
        <div className="inline-right">
          <div className="sensitivity_chart-bar" style={{width: '10%'}}>
            <span>10%</span>
          </div>
        </div>
      </div> */}

      {/* <div className="chart">
        <span>Jonas</span>
        <div className="sensitivity_chart-bar bar-focus" style={{width: '71%'}}>
          <span>71%</span>
        </div>
      </div>
      <div className="chart">
        <span>Tom</span>
        <div className="sensitivity_chart-bar" style={{width: '58%'}}>
          <span>58%</span>
        </div>
      </div>
      <div className="chart">
        <span>Tony </span>
        <div className="sensitivity_chart-bar" style={{width: '47%'}}>
          <span>47%</span>
        </div>
      </div>
      <div className="chart">
        <span>Andy</span>
        <div className="sensitivity_chart-bar" style={{width: '0%'}}>
          <span></span>
        </div>
      </div> */}
    </div>
  );
}

export default SensitivityBarChart;
