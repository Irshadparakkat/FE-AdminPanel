import React from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import ApiKeyModule from '@/modules/ApiKeyModule';

dayjs.locale('en');

export default function ApiKeysEntry() {
  const entity = 'Users';
  const searchConfig = {
    displayLabels: ['name', 'strFullName'],
    searchFields: 'strFullName,strDepartment',
  };


  const entityDisplayLabels = ['number', 'strFullName'];

 
  const dataTableColumns = [
    { title: 'Open Weather Api key', dataIndex: 'strWeatherKey' },
    { title: 'Telegram Bot key', dataIndex: 'strBotKey' },
  ];

  const PANEL_TITLE = 'Api key Panel';
  const dataTableTitle = 'Api key Lists';
  const DATATABLE_TITLE = 'Api key List';
  const ENTITY_NAME = 'Api Key';

  const config = {
    entity,
    PANEL_TITLE,
    dataTableTitle,
    ENTITY_NAME,
    DATATABLE_TITLE,
    dataTableColumns,
    searchConfig,
    deleteMessage: 'Do you want to Delete the User ',
    entityDisplayLabels,
    createURL: '',
    listURL: 'get_apikeys',
    deleteURL: '',
    updatURL:'update_apikey'

  };

  return <ApiKeyModule config={config} />;
}


