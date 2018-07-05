/**
 * Created by Administrator on 2018/6/26.
 */
  import BaseModule from './BaseModule'
import api from './service.json';

class service extends BaseModule{
  getRandomBgImg(data){
   return  this.post(api.getRandomBgImg,data)
  }
  getBookmarkCategory(){
    return this.get(api.getBookmarkCategory)
  }
  getBookmarks(data){
    return this.post(api.getBookmarks, data)
  }
}
export default  new service()
