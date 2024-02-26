import React from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import UserModule from '@/modules/UserModule';

dayjs.locale('en');

export default function DoctorEntry() {
  const entity = 'Users';
  const searchConfig = {
    displayLabels: ['name', 'strFullName'],
    searchFields: 'strFullName,strDepartment',
  };


  const entityDisplayLabels = ['number', 'strFullName'];

 
  const dataTableColumns = [
    {
      title: 'User Name', dataIndex: 'strName'
    }, 
    {
      title: 'City', dataIndex: 'strCity'
    },
    
    {
      title: 'Status', dataIndex: 'strStatus'
    },
  ];

  const PANEL_TITLE = 'User Panel';
  const dataTableTitle = 'User Lists';
  const DATATABLE_TITLE = 'User List';
  const ENTITY_NAME = 'Users';
  const CREATE_ENTITY = 'Save Doctor Details';
  const UPDATE_ENTITY = 'Update Doctor Details';

  const config = {
    entity,
    PANEL_TITLE,
    dataTableTitle,
    ENTITY_NAME,
    CREATE_ENTITY,
    UPDATE_ENTITY,
    DATATABLE_TITLE,
    dataTableColumns,
    searchConfig,
    deleteMessage: 'Do you want to Delete the User ',
    modalTitle: 'Delete User ',
    entityDisplayLabels,
    createURL: '',
    listURL: 'get_user',
    deleteURL: 'delete_user',
  };

  return <UserModule config={config} />;
}


