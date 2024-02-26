import React from 'react';
import { Button, Result } from 'antd';
import { useErpContext } from '@/context/erp';
const Finish = ({subTitle,stepUpdate}) => {
  
  const { erpContextAction } = useErpContext();
  const { createPanel,readPanel } = erpContextAction;
  return(
    <Result
      status="success"
      title="Successfully New Patient Created!"
      subTitle={`Patient Name : ${subTitle}`}
      extra={[
        <Button type="primary" key="console" onClick={()=>{
          stepUpdate(0);
          createPanel.close();
          readPanel.open()
        }}>
          Patient Dashboard
        </Button>,
        <Button key="buy" onClick={()=>{
          stepUpdate(0);
          createPanel.close();
        }}>Go Back</Button>,
      ]}
    />
  )};
  
  export default Finish;