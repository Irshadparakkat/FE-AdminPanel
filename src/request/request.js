import axios from 'axios';
import { API_BASE_URL } from '@/config/serverApiConfig';

import errorHandler from './errorHandler';
import successHandler from './successHandler';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
const request = {
  create: async ({ createURL, jsonData }) => {
    try {
      let strToken = window.localStorage.getItem('strToken');
      const response = await axiosInstance.post(createURL, jsonData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: strToken,
        },
      });
      successHandler(response, {
        notifyOnSuccess: true,
        notifyOnFailed: true,
      });
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },
  createProcess: async ({ createURL, jsonData }) => {
    try {
      let strToken = window.localStorage.getItem('strToken');
      const response = await axiosInstance.post(createURL, jsonData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: strToken,
        },
      });
      successHandler(response, {
        notifyOnSuccess: true,
        notifyOnFailed: true,
      });
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },
  read: async ({ entity, id }) => {
    try {
      const response = await axiosInstance.get(entity + '/read/' + id);
      successHandler(response, {
        notifyOnSuccess: false,
        notifyOnFailed: true,
      });
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },
  update: async ({ updateURL, jsonData }) => {
    try {
      let strToken = window.localStorage.getItem('strToken');
      const response = await axiosInstance.post(updateURL, jsonData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: strToken,
        },
      });
      successHandler(response, {
        notifyOnSuccess: true,
        notifyOnFailed: true,
      });
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },

  delete: async ({ deleteURL, jsonData }) => {
    try {
      let strToken = window.localStorage.getItem('strToken');
      const response = await axiosInstance.post(deleteURL, jsonData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: strToken,
        },
      });
      successHandler(response, {
        notifyOnSuccess: true,
        notifyOnFailed: true,
      });
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },

  filter: async ({ entity, options = {} }) => {
    try {
      let filter = options.filter ? 'filter=' + options.filter : '';
      let equal = options.equal ? '&equal=' + options.equal : '';
      let query = `?${filter}${equal}`;

      const response = await axiosInstance.get(entity + '/filter' + query);
      successHandler(response, {
        notifyOnSuccess: false,
        notifyOnFailed: false,
      });
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },

  search: async ({ entity, options }) => {
    let strToken = window.localStorage.getItem('strToken');
    try {
      // headersInstance.cancelToken = source.token;
      const response = await axiosInstance.get('/async_search', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: strToken,
        },
        params: { strType: entity, ...options },
      });

      successHandler(response, {
        notifyOnSuccess: false,
        notifyOnFailed: false,
      });
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },

  list: async ({ listURL, options = {} }) => {
    try {
      console.log('listURL', listURL, 'options   ', options);
      let strToken = window.localStorage.getItem('strToken');
      const response = await axiosInstance.post(listURL, options, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: strToken,
        },
      });

      successHandler(response, {
        notifyOnSuccess: false,
        notifyOnFailed: false,
      });
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },
  getAllTypeList: async ({ strType }) => {
    try {
      let strToken = window.localStorage.getItem('strToken');
      const response = await axiosInstance.post(
        'get_type_list',
        {
          strType,
          type: 'allTypes',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: strToken,
          },
        }
      );
      successHandler(response, {
        notifyOnSuccess: false,
        notifyOnFailed: false,
      });
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },
  post: async ({ entity, jsonData, options = {} }) => {
    try {
      const response = await axiosInstance.post(entity, jsonData);

      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },
  get: async ({ entity }) => {
    try {
      const response = await axiosInstance.get(entity);
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },
  patch: async ({ entity, jsonData }) => {
    try {
      const response = await axiosInstance.patch(entity, jsonData);
      successHandler(response, {
        notifyOnSuccess: true,
        notifyOnFailed: true,
      });
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },

  source: () => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    return source;
  },
};
export default request;
