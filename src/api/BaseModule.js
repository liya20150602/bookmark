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
      console.log("-----")
      console.log(config)
      return config
    }, error => {
      return Promise.reject(error)
    })

    this.$http.interceptors.response.use(response => {

      if(response.status==200){
          if(response.data.state==1){
              return Promise.resolve(response.data.data)
            }else {
            this.$message('服务器接口错误');
          }
      }else {
        return Promise.reject()
      }
      return response
    }, error => {
      // this.$message('400');
      return Promise.reject(error.response)
    })
  }
  post(url, data){
    return this.$http({
      method: 'post',
      url: url.url,
      // data: qs.stringify(data),
      data: data,
      timeout: 10000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
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
