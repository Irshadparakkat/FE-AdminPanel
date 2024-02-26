import React from 'react';
import { Dropdown, List , Typography, Card, Row, Col} from 'antd';
import { HeartOutlined, StarOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Tab } from '@mui/material';

const TableResposiveList = ({columns,dataSource}) =>{ 
    
const { Text, Link } = Typography;
    return(
<List itemLayout="horizontal" dataSource={dataSource} renderItem={(item, index)=> (
    <List.Item>
        <Card style={{
        width: 400,
      }}>
        {columns && columns.map( ({title,dataIndex,render,isAction,DataTableDropMenu})=>{
        return (<Col>
        <Row>
        <Text type="secondary">{`${title}    :  `}</Text>
            {/* {isAction && ( 
            <Dropdown overlay={DataTableDropMenu({ row:item, entity:'files',isMobile:true })} trigger={['click']}>
               <EllipsisOutlined style={{ cursor: 'pointer', fontSize: '24px' }} />
           </Dropdown>)} */}
            { render &&  render(item[dataIndex],item,index)}
            {!render && <p> {item[dataIndex]}</p>}
        </Row>
        </Col>)

        })}
        </Card>
    </List.Item>
    )}
    />
    )};


    export default TableResposiveList;