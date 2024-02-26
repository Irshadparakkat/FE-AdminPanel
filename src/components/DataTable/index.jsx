import React, { useCallback, useEffect } from 'react';
import { Dropdown, Button, PageHeader, Table, Col } from 'antd';

import { EllipsisOutlined,FilterOutlined, SortAscendingOutlined,RedoOutlined,PrinterFilled} from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { crud } from '@/redux/crud/actions';
import { selectListItems } from '@/redux/crud/selectors';

import uniqueId from '@/utils/uinqueId';
import TableResponsive from '../TableResponsive';

export default function DataTable({ config, DropDownRowMenu, AddNewItem }) {
  let {  listURL,dataTableColumns, dataTableTitle,listRequestBody } = config;

  dataTableColumns = [
    { 
      title: 'Sl.No', 
      dataIndex: 'slNo',
      width: 50,
      render: (value, record, index) => (`${value || index+1}`), },
    ...dataTableColumns,
    {
      title: '',
      render: (value,row,index) => (
        <Dropdown overlay={DropDownRowMenu({ row })} trigger={['click']}>
          <EllipsisOutlined style={{ cursor: 'pointer', fontSize: '24px' }} />
        </Dropdown>
      ),
    },
  ];

  const { result: listResult, isLoading: listIsLoading } = useSelector(selectListItems);

  const { pagination, items } = listResult;
  const dispatch = useDispatch();

  const handelDataTableLoad = useCallback((pagination) => {
    const options = { page: pagination.current || 1 };
    dispatch(crud.list({ listURL, options:listRequestBody }));
  }, []);

  useEffect(() => {
    dispatch(crud.list({ listURL,options:listRequestBody }));
  }, []);

  return (
    <>
      <PageHeader
        onBack={() => window.history.back()}
        title={dataTableTitle}
        ghost={false}
        extra={[
          
          <Button onClick={handelDataTableLoad} key={`${uniqueId()}`} icon={<FilterOutlined />} className='outLineIcon'>
             
          </Button>,
          <Button onClick={handelDataTableLoad} key={`${uniqueId()}`} icon={<SortAscendingOutlined />} className='outLineIcon'>
            
          </Button>,
          
          <Button onClick={handelDataTableLoad} key={`${uniqueId()}`} icon={<PrinterFilled />} className='outLineIcon'>
            
          </Button>,
          <Button onClick={handelDataTableLoad} key={`${uniqueId()}`} icon={<RedoOutlined />} className='outLineIcon'>
            
          </Button>,
          <AddNewItem key={`${uniqueId()}`} config={config} />,
        ]}
        style={{
          padding: '20px 0px',
        }}
      ></PageHeader>
      <TableResponsive
        columns={dataTableColumns}
        rowKey={(item) => item.id}
        dataSource={items}
        pagination={pagination}
        loading={listIsLoading}
        onChange={handelDataTableLoad}
      />
    </>
  );
}
