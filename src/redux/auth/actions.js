import * as actionTypes from './types';
import * as authService from '@/auth';

import history from '@/utils/history';

export const login =
  ({ loginData }) =>
  async (dispatch) => {
    dispatch({
      type: actionTypes.LOADING_REQUEST,
      payload: { loading: true },
    });
    let data = await authService.login({ loginData });

    if (data.strUserType == 'Patient') {

   let newData ={
        success: false,
        strMessage: 'Patients do not have access.',
        statusCode: 400,
        apiStatus:'error',
      };
      dispatch({
        type: actionTypes.FAILED_REQUEST,
        payload: newData
      });
    }
    else if (data.success === true && data?.strUserType !='Patient') {
      console.log('data.result', data);
      window.localStorage.setItem('isLoggedIn', true);
      window.localStorage.setItem('auth', JSON.stringify({...data,'isLoggedIn':true}));
      window.localStorage.setItem('strToken', data?.strToken);
      window.localStorage.setItem('strUserType', data?.strUserType);
      dispatch({
        type: actionTypes.LOGIN_SUCCESS,
        payload: data,
      });
      history.push('/');
    } else {
      dispatch({
        type: actionTypes.FAILED_REQUEST,
        payload: data,
      });
    }
  };

export const logout = () => async (dispatch) => {
  authService.logout();
  dispatch({
    type: actionTypes.LOGOUT_SUCCESS,
  });
  history.push('/login');
};
