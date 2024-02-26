import { notification } from 'antd';

import codeMessage from './codeMessage';

const successHandler = (response, options = { notifyOnSuccess: false, notifyOnFailed: true }) => {
  const { data } = response;

  let MystrMessage ='';
  
  if (data.strUserType === 'Patient') {
    MystrMessage = 'This user doesn\'t have access.';
  }
  
  if (data && data.success === true && data.strUserType !='Patient')  {
    const message = response?.data?.strMessage;
    const successText = message || codeMessage[response.status];

    if (options.notifyOnSuccess) {
      notification.config({
        duration: 5,
      });
      notification.success({
        message: `Request success`,
        description: successText,
      });
    }
  } else {
    const message =response?.data?.strMessage ||MystrMessage;
    const errorText = message || codeMessage[response.status];
    const { status } = '400'
    if (options.notifyOnFailed) {
      notification.config({
        duration: 5,
      });
      notification.error({
        message: `Request error 400`,
        description: errorText,
      });
    }
  }
};

export default successHandler;
