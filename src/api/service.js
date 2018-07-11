/**
 * Created by Administrator on 2018/6/26.
 */
  import BaseModule from './BaseModule'
import api from './service.json';

class service extends BaseModule{
  getRandomBgImg(data){
   return  this.get(api.getRandomBgImg,data)
  }
  getBookmarkCategory(){
    return this.get(api.getBookmarkCategory)
  }
  getBookmarks(data){
    return this.get(api.getBookmarks, data)
  }
  login(data){
    return this.post(api.login, data)
  }
  checkLoginName(data){
    return this.get(api.checkLoginName,data)
  }
  checkEmail(data){
    return this.get(api.checkEmail,data)
  }
  register(data){
    return this.post(api.register,data)
  }
  logout(){
    return this.get(api.logout)
  }
}
export default  new service()
