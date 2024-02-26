import React, { useEffect, useState } from 'react';
import { Steps } from 'antd';
import Step1 from './CreateSteps/Step1'
import Step2 from './CreateSteps/Step2'
import Step3 from './CreateSteps/Step3'
import Step4 from './CreateSteps/Step4' 
import  Finish from './CreateSteps/Finish'

  export default function CreateStepsForm  ({config,stepStatus=0,updateForm=false}) {
  

    useEffect(()=>{
      if(stepStatus){
        stepUpdate(stepStatus)
      }
    },[stepStatus])
  const [current, setCurrent] = useState(0);
  const [isFromLater, setIsFromLater] = useState(false);
  const [patientData, updatePatientData] = useState({});
  const stepUpdate = (next,isFromNext = false) => {
    setCurrent(next);
    setIsFromLater(isFromNext)
  };
  

 
  
  const steps = [
    {
      title: 'Patient Details',
      content: <Step1 config={config} 
                      stepStatus={updateForm? stepStatus:'1/4'}
                      stepUpdate={stepUpdate}
                      isFromLater={isFromLater}
                      updatePatientData={updatePatientData}
                      patientData={patientData}
                      subTitle='Project Details'/>,
    },
    {
      title: 'Discharge Reports',
      content: <Step2 config={config} 
                      stepStatus={updateForm? stepStatus:'2/4'}
                      stepUpdate={stepUpdate}
                      updatePatientData={updatePatientData}
                      patientData={patientData}
                      subTitle={patientData?.strFullName}/>,
    },
    {
        title: 'Scheduling',
        content: <Step3 config={config} 
                        stepStatus={updateForm? stepStatus:'3/4'}
                        stepUpdate={stepUpdate}
                        patientData={patientData}
                        updatePatientData={updatePatientData} 
                        subTitle={patientData?.strFullName}/>,
    },
    // {
    //     title: 'Resourse Allocations',
    //     content: <Step4 config={config} 
    //                     stepStatus={updateForm? stepStatus:'4/4'}
    //                     stepUpdate={stepUpdate}
    //                     updatePatientData={updatePatientData}
    //                     patientData={patientData}
    //                     subTitle={patientData?.strProjectName}/>,
    // },
    {
        title: 'Finish',
        content: <Finish subTitle={patientData?.strFullName}  stepUpdate={stepUpdate}/>,
    }
  ];
  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  return (
    <>
      <Steps current={current} items={items} />
      <div >{steps[current].content}</div>
    </>
  );
  }