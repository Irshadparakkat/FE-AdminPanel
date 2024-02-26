import React, { useState, useEffect } from 'react'; 
import { Button, PageHeader, Row, Col, Descriptions, Progress,Statistic, Tag,Divider } from 'antd';
import { EditOutlined, FilePdfOutlined, CloseCircleOutlined ,ArrowUpOutlined} from '@ant-design/icons';
import { erp } from '@/redux/erp/actions';
import uniqueId from '@/utils/uinqueId';
import { DOWNLOAD_BASE_URL } from '@/config/serverApiConfig'; 
import { DashboardLayout } from '@/layout';
import RecentTable from '@/components/RecentTable';
  
import { useSelector, useDispatch } from 'react-redux';

import { useErpContext } from '@/context/erp'; 

import { selectCurrentItem } from '@/redux/erp/selectors'; 
import { useMoney } from '@/settings';
const TopCard = ({ title, tagContent, tagColor, prefix }) => {
  return (
    <Col
      className="gutter-row"
      xs={{ span: 24 }}
      sm={{ span: 12 }}
      md={{ span: 12 }}
      lg={{ span: 6 }}
    >
      <div className="whiteBox shadow" style={{ color: '#595959', fontSize: 13, height: '106px' }}>
        <div className="pad15 strong" style={{ textAlign: 'center', justifyContent: 'center' }}>
          <h3 style={{ color: '#22075e', marginBottom: 0 }}>{title}</h3>
        </div>
        <Divider style={{ padding: 0, margin: 0 }}></Divider>
        <div className="pad15">
          <Row gutter={[0, 0]}>
            <Col className="gutter-row" span={11} style={{ textAlign: 'left' }}>
              <div className="left">{prefix}</div>
            </Col>
            <Col className="gutter-row" span={2}>
              <Divider
                style={{
                  padding: '10px 0',
                  justifyContent: 'center',
                }}
                type="vertical"
              ></Divider>
            </Col>
            <Col
              className="gutter-row"
              span={11}
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Tag
                color={tagColor}
                style={{
                  margin: '0 auto',
                  justifyContent: 'center',
                }}
              >
                {tagContent}
              </Tag>
            </Col>
          </Row>
        </div>
      </div>
    </Col>
  );
};
const PreviewState = ({ tag, color, value }) => {
  let colorCode = '#000';
  switch (color) {
    case 'bleu':
      colorCode = '#1890ff';
      break;
    case 'green':
      colorCode = '#95de64';
      break;
    case 'red':
      colorCode = '#ff4d4f';
      break;
    case 'orange':
      colorCode = '#ffa940';
      break;
    case 'purple':
      colorCode = '#722ed1';
      break;
    case 'grey':
      colorCode = '#595959';
      break;
    case 'cyan':
      colorCode = '#13c2c2';
      break;
    case 'brown':
      colorCode = '#614700';
      break;
    default:
      break;
  }
  return (
    <div style={{ color: '#595959', marginBottom: 5 }}>
      <div className="left alignLeft">{tag}</div>
      <div className="right alignRight">{value} %</div>
      <Progress
        percent={value}
        showInfo={false}
        strokeColor={{
          '0%': colorCode,
          '100%': colorCode,
        }}
      />
    </div>
  );
};
export default function Dashboard({ config }) {
  const { entity, ENTITY_NAME } = config;
  const dispatch = useDispatch();

  const { erpContextAction } = useErpContext();

  const { moneyFormatter } = useMoney();

  const { result: currentResult } = useSelector(selectCurrentItem);

  const { readPanel, updatePanel } = erpContextAction;

  const [itemslist, setItemsList] = useState([]);
  const [currentErp, setCurrentErp] = useState({
    status: '',
    client: {
      company: '',
      email: '',
      phone: '',
      address: '',
    },
    subTotal: 0,
    taxTotal: 0,
    taxRate: 0,
    total: 0,
    credit: 0,
    number: 0,
    year: 0,
  });

  useEffect(() => {
    if (currentResult) {
      const { items } = currentResult;

      setItemsList(items);
      setCurrentErp(currentResult);
    }
  }, [currentResult]);

  useEffect(() => {
    console.info('itemslist', itemslist);
  }, [itemslist]);

  const dataTableColumns = [
    {
      title: 'N#',
      dataIndex: 'number',
    },
    {
      title: 'Client',
      dataIndex: ['client', 'company'],
    },

    {
      title: 'Total',
      dataIndex: 'total',

      render: (total) => `$ ${total}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' '),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status) => {
        let color = status === 'Draft' ? 'volcano' : 'green';

        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
  ];
  //const config = { entity, dataTableColumns };

  return (<>
  
   <PageHeader
         onBack={() => readPanel.close()}
         title={`${ENTITY_NAME}`}
         ghost={false}
         tags={<Tag color="volcano">{currentErp.paymentStatus || currentErp.status}</Tag>}
          //subTitle="This is cuurent erp page"
         extra={[
           <Button
             key={`${uniqueId()}`}
             onClick={() => readPanel.close()}
             icon={<CloseCircleOutlined />}
           >
             Close
           </Button>,
           <Button
             key={`${uniqueId()}`}
             onClick={() => {
               window.open(
                 `${DOWNLOAD_BASE_URL}${entity}/${entity}-${currentErp.id}.pdf`,
                 '_blank'
               );
             }}
             icon={<FilePdfOutlined />}
           >
             Download PDF
           </Button>,
           <Button
             key={`${uniqueId()}`}
             onClick={() => {
               dispatch(
                 erp.currentAction({
                   actionType: 'update',
                   data: currentErp,
                 })
               );
               updatePanel.open();
             }}
             type="primary"
             icon={<EditOutlined />}
           >
             Edit Erp
           </Button>,
         ]}
         style={{
           padding: '20px 0px',
         }}
       >
        
      </PageHeader>
    <DashboardLayout>
      <Row gutter={[24, 24]}>
        <TopCard
          title={'Budget'}
          tagColor={'cyan'}
          prefix={'This month'}
          tagContent={'34 000 $'}
        />
        <TopCard
          title={'Received'}
          tagColor={'purple'}
          prefix={'This month'}
          tagContent={'34 000 $'}
        />
        <TopCard
          title={'Balance'}
          tagColor={'green'}
          prefix={'This month'}
          tagContent={'34 000 $'}
        />
        <TopCard
          title={'Total Expense'}
          tagColor={'red'}
          prefix={'Not Paid'}
          tagContent={'34 000 $'}
        />
      </Row>
      <div className="space30"></div>
      <Row gutter={[24, 24]}>
        <Col
          className="gutter-row"
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 24 }}
          lg={{ span: 18 }}
        >
          <div className="whiteBox shadow" style={{ minHeight: '380px' }}>
            <Row className="pad10" gutter={[0, 0]}>
              <Col
                className="gutter-row"
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={{ span: 8 }}
                lg={{ span: 8 }}
              >
                <div className="pad15">
                  <h3
                    style={{
                      color: '#22075e',
                      marginBottom: 15,
                    }}
                  >
                    Total Expense
                  </h3>
                  <PreviewState tag={'Purchase'} color={'grey'} value={3} />
                  <PreviewState tag={'Subcontract'} color={'bleu'} value={5} />
                  <PreviewState tag={'Tools'} color={'orange'} value={12} />
                  <PreviewState tag={'Labour'} color={'red'} value={6} />
                  <PreviewState tag={'Others'} color={'cyan'} value={8} />
                  {/* <PreviewState tag={'Paid'} color={'green'} value={55} /> */}
                </div>
              </Col>
              <Col
                className="gutter-row"
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={{ span: 8 }}
                lg={{ span: 8 }}
              >
                {' '}
                <div className="pad15">
                  <h3
                    style={{
                      color: '#22075e',
                      marginBottom: 15,
                    }}
                  >
                    Work Preview
                  </h3>
                  <PreviewState tag={'To Do'} color={'grey'} value={3} />
                  <PreviewState tag={'In progress'} color={'bleu'} value={5} />
                  <PreviewState tag={'Completed'} color={'orange'} value={12} />
                  <PreviewState tag={'Verified'} color={'red'} value={6} />
                  <PreviewState tag={'Blocked'} color={'cyan'} value={8} />
                  {/* <PreviewState tag={'Paid'} color={'green'} value={55} /> */}
                </div>
              </Col>
              <Col
                className="gutter-row"
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={{ span: 8 }}
                lg={{ span: 8 }}
              >
                {' '}
                <div className="pad15">
                  <h3
                    style={{
                      color: '#22075e',
                      marginBottom: 15,
                    }}
                  >
                    Offer Preview
                  </h3>
                  <PreviewState tag={'Draft'} color={'grey'} value={3} />
                  <PreviewState tag={'Pending'} color={'bleu'} value={5} />
                  <PreviewState tag={'Not Paid'} color={'orange'} value={12} />
                  <PreviewState tag={'Overdue'} color={'red'} value={6} />
                  <PreviewState tag={'Partially Paid'} color={'cyan'} value={8} />
                  <PreviewState tag={'Paid'} color={'green'} value={55} />
                </div>
              </Col>
            </Row>
          </div>
        </Col>

        <Col
          className="gutter-row"
          xs={{ span: 0 }}
          sm={{ span: 0 }}
          md={{ span: 0 }}
          lg={{ span: 6 }}
        >
          <div className="whiteBox shadow" style={{ height: '380px' }}>
            <div
              className="pad20"
              style={{
                textAlign: 'center',
                justifyContent: 'center',
              }}
            >
              <h3 style={{ color: '#22075e', marginBottom: 30 }}>Customer Preview</h3>

              <Progress type="dashboard" percent={25} width={148} />
              <p>New Customer this Month</p>
              <Divider />
              <Statistic
                title="Active Customer"
                value={11.28}
                precision={2}
                valueStyle={{ color: '#3f8600' }}
                prefix={<ArrowUpOutlined />}
                suffix="%"
              />
            </div>
          </div>
        </Col>
      </Row>
      <div className="space30"></div>
      <Row gutter={[24, 24]}>
        <Col
          className="gutter-row"
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 12 }}
          lg={{ span: 12 }}
        >
          <div className="whiteBox shadow">
            <div className="pad20">
              <h3 style={{ color: '#22075e', marginBottom: 5 }}>Recent Invoices</h3>
            </div>

            <RecentTable entity={'invoice'} dataTableColumns={dataTableColumns} />
          </div>
        </Col>

        <Col
          className="gutter-row"
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 12 }}
          lg={{ span: 12 }}
        >
          <div className="whiteBox shadow">
            <div className="pad20">
              <h3 style={{ color: '#22075e', marginBottom: 5 }}>Recent Quotes</h3>
            </div>
            <RecentTable entity={'quote'} dataTableColumns={dataTableColumns} />
          </div>
        </Col>
      </Row>
    </DashboardLayout>
  </>
  );
}
