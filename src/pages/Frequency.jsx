import React from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import FreequancyModule from '@/modules/FreequancyModule';

dayjs.locale('en');

export default function Frequancy() {
  const entity = 'Users';
  const searchConfig = {
    displayLabels: ['name', 'strFreequancyType'],
    searchFields: 'strFreequancyType',
  };


  const entityDisplayLabels = ['number', 'strFreequancyType'];

 
  const dataTableColumns = [
    { title: 'frequency', dataIndex: 'strFreequancyType' },
  ];

  const PANEL_TITLE = 'Frequency Panel';
  const dataTableTitle = 'Frequency Lists';
  const DATATABLE_TITLE = 'Frequency List';
  const ENTITY_NAME = 'Frequency';

  const config = {
    entity,
    PANEL_TITLE,
    dataTableTitle,
    ENTITY_NAME,
    DATATABLE_TITLE,
    dataTableColumns,
    searchConfig,
    deleteMessage: ' ',
    entityDisplayLabels,
    createURL: '',
    listURL: 'get_freequancy',
    deleteURL: '',

  };

  return <FreequancyModule config={config} />;
}


