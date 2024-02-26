import React, { useCallback, useEffect } from 'react';
import { Dropdown, Table } from 'antd';
import { Button, PageHeader } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { erp } from '@/redux/erp/actions';
import { settings } from '@/redux/settings/actions';
import { selectListItems } from '@/redux/erp/selectors';
import { useErpContext } from '@/context/erp';
import uniqueId from '@/utils/uinqueId';

import { RedoOutlined, PlusOutlined } from '@ant-design/icons';
import TableResponsive from '../TableResponsive';
function AddNewItem({ config }) {
  const { ADD_NEW_ENTITY } = config;
  const { erpContextAction } = useErpContext();
  const { createPanel } = erpContextAction;
  const handelClick = () => {
    createPanel.open();
  };

  return (
    <Button onClick={handelClick} type="primary" icon={<PlusOutlined />} className='primaryBtn'>
      {ADD_NEW_ENTITY}
    </Button>
  );
}

export default function DataTable({ config, DataTableDropMenu }) {
  let { entity, dataTableColumns,listURL,arrFiltersReq,filters,sorter } = config; 
  const { DATATABLE_TITLE } = config;
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
        <Dropdown overlay={DataTableDropMenu({ row, entity })} trigger={['click']}>
          <EllipsisOutlined style={{ cursor: 'pointer', fontSize: '24px' }} />
        </Dropdown>
      ),
    },
  ];
  const onFilter = (value, record)=>{
     return record;
  }
  
  const { result: listResult, isLoading: listIsLoading } = useSelector(selectListItems); 
  const { pagination, items, objFilterList  } = listResult;
  if(arrFiltersReq?.length  ){
    arrFiltersReq.forEach(({col,index},i)=>{
      if(objFilterList && objFilterList[index])
      dataTableColumns[index]={...dataTableColumns[index],
        filters: objFilterList[index],
        filterMode: 'tree',
        onFilter: onFilter}
    })
  }
  const dispatch = useDispatch();
  const handelDataTableLoad = useCallback((pagination, filters, sorter) => {
    const options = { page: pagination.current || 1,pageSize:pagination.pageSize || 100, filters, sorter,arrFiltersReq };
    dispatch(erp.list({ listURL, options }));
  }, []);

  useEffect(() => {
    dispatch(erp.list({ listURL,options:{
      page: pagination.current || 1,pageSize:pagination.pageSize || 100,
      arrFiltersReq,filters:filters||[],sorter:sorter||[]} }));
  }, []);

  return (
    <>
      <PageHeader
        title={DATATABLE_TITLE}
        ghost={true}
        extra={[
          <Button onClick={handelDataTableLoad} key={`${uniqueId()}`} icon={<RedoOutlined />} className='outLineIcon'>
            Refresh
          </Button>,
          // <Button onClick={handelCurrency} key={`${uniqueId()}`} icon={<RedoOutlined />}>
          //   Change Currency
          // </Button>,
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
