/**
 * Created by Administrator on 2018/6/26.
 */
  import BaseModule from './BaseModule'
import api from './service.json';

class service extends BaseModule{
  getLocation(data){
   return  this.get(api.getLocation,data)
  }
  getCurrentCity(){
    return this.get(api.getCurrentCity)
  }
}
export default  new service()
