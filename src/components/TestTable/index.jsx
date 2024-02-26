import { Card, Col, Table } from 'antd';
import dayjs from 'dayjs';
import React, { useState, useEffect } from 'react';

function TestTable({ TableColumns, tableData, title }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const rederResponsive = () => {
    if (isMobile) {
      return tableData.map((item, index) => {
        switch (title) {
          case 'Pending Test':
            return (
              <Card style={{ marginBottom: '10px' }}>
                <p>Sl.No: {item.slNo || index + 1}</p>
                <p>Patiant Name: {item.strFullName}</p>
                <p>Test Name: {item.strTestName}</p>
                <p>
                  Status:{' '}
                  {(() => {
                    let statusText = '';
                    let textColor = '';

                    if (item.intTestStatus === 1) {
                      statusText = 'Pending';
                      textColor = 'blue';
                    } else if (item.intTestStatus === -1) {
                      statusText = 'Completed';
                      textColor = 'green';
                    } else {
                      statusText = 'Cancelled';
                      textColor = 'red';
                    }

                    const textStyle = { color: textColor };
                    return <span style={textStyle}>{statusText}</span>;
                  })()}
                </p>
              </Card>
            );
          case 'Completed Test':
            return (
              <Card style={{ marginBottom: '10px' }}>
                <p>Sl.No: {item.slNo || index + 1}</p>
                <p>Patiant Name: {item.strFullName}</p>
                <p>Test Name: {item.strTestName}</p>
                <p>
                  Status:{' '}
                  {(() => {
                    let statusText = '';
                    let textColor = '';

                    if (item.intTestStatus === 1) {
                      statusText = 'Pending';
                      textColor = 'blue';
                    } else if (item.intTestStatus === -1) {
                      statusText = 'Completed';
                      textColor = 'green';
                    } else {
                      statusText = 'Cancelled';
                      textColor = 'red';
                    }

                    const textStyle = { color: textColor };
                    return <span style={textStyle}>{statusText}</span>;
                  })()}
                </p>
              </Card>
            );
          default:
            return;
        }
      });
    } else {
      return <Table dataSource={tableData} columns={TableColumns} pagination={{ pageSize: 5 }} />;
    }
  };

  return (
    <Col
      className="gutter-row"
      xs={{ span: 24 }}
      sm={{ span: 24 }}
      md={{ span: 12 }}
      lg={{ span: 12 }}
    >
      <div className="whiteBox shadow">
        <div className="pad20">
          <h3 style={{ color: '#22075e', marginBottom: 5 }}>{title}</h3>
        </div>

        <div style={{ margin: 'auto', width: '100%', marginTop: '10px' }}>{rederResponsive()}</div>
      </div>
    </Col>
  );
}

export default TestTable;
