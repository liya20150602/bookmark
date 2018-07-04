/**
 * Created by Administrator on 2018/6/26.
 */
import axios from 'axios'
import qs from 'qs'

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
      // loading
      console.log(config)
      return config
    }, error => {
      return Promise.reject(error)
    })

    this.$http.interceptors.response.use(response => {
      return response
    }, error => {
      return Promise.resolve(error.response)
    })
  }
   checkCode (res) {
    // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
    if (res.status === -404) {
      console.log(res.msg)
    }
    if (res.data && (!res.data.success)) {
      console.log(res.data.error_msg)
    }
    return res
  }
   checkStatus (response) {
    // loading
    // 如果http状态码正常，则直接返回数据
    if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
      return response
      // 如果不需要除了data之外的数据，可以直接 return response.data
    }
    // 异常状态下，把错误信息返回去
    return {
      status: -404,
      msg: '网络异常'
    }
  }
  post(url, data){
    return this.$http({
      method: 'post',
      baseURL: '',
      url,
      data: qs.stringify(data),
      timeout: 10000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  }
  get (url, params) {
    return this.$http({
      method: 'get',
      url:url.url,
      params, // get 请求时带的参数
      timeout: 100000,

    }).then(
      (response) => {
        return this.checkStatus(response)
      }
    ).then(
      (res) => {
        return this.checkCode(res)
      }
    )
  }
}

export default BaseModule
