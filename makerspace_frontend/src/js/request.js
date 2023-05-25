import axios from "axios";

// dev
const baseUrl = "http://localhost:5000/makerSpace/api";
// pro
//const baseUrl = "http://makerspace-env.eu-west-1.elasticbeanstalk.com/makerSpace/api";
axios.defaults.timeout = 100000;
axios.defaults.baseURL = baseUrl;

class httpRequest {
  async get(url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.get(url, params)
        .then((response) => {
          resolve({
            success: true,
            data: response.data
          })
        })
        .catch((error) => {
          reject({
            success: false,
            data: error.data
          });
        });
    }).catch((e) => {
      return {
        success: false,
        code: e.code,
        message: e.code
      };
    });
  }
  async post(url, params = {}, contentType = "application/json") {
    return new Promise((resolve, reject) => {
      axios.post(url, params, { headers: { "content-type": contentType } })
        .then((response) => {
          if (response.status === 200 && response.data.code === 1) {
            resolve(
              {
                success: true,
                data: response.data
              }
            );
          } else {
            reject(
              {
                success: false,
                data: response.data.data,
                message: response.data.message
              }
            );
          }
        }
        ).catch((error) => {
          reject(
            {
              success: false,
              data: null,
              message: error.message
            }
          );
        });;
    }).catch((e) => {
      return e;
    });
  }
}
export default new httpRequest();