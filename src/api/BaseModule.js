/**
 * Created by Administrator on 2018/6/26.
 */
import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui'
import utils from '@/utils/'


class BaseModule {
  constructor(){
    this.$http=axios.create({
      baseURL:'', //
      timeout: 5000, // 请求的超时时间
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      withCredentials: true // 允许携带cookie
    })
    this.$http.interceptors.request.use(config => {
        if(!utils.isNul(utils.getUserInfo())){
          config.headers.common['authToken'] =utils.getUserInfo().authToken
        }
      return config
    }, error => {
      return Promise.reject(error)
    })

    this.$http.interceptors.response.use(response => {

      if(response.status==200){
          if(response.data.state==0){
            //token失效 清除token
            utils.clearuserInfo()
            window.load()
            }else {
            return Promise.resolve(response.data)
          }
      }else {
        return Promise.reject()
      }
      return response
    }, error => {
      Message.error('400');
      return Promise.reject(error.response)
    })
  }
  post(url, data){
    return this.$http({
      method: 'post',
      url: url.url,
      data: data,
      timeout: 10000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json; charset=UTF-8'
      }
    })
  }
  get (url, params) {
    return this.$http({
      method: 'get',
      url:url.url,
      params, // get 请求时带的参数
      timeout: 100000,

    })
  }
}

export default BaseModule
