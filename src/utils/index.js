import loadash from 'Lodash'
import crypto from 'crypto'

const util={
  setUserInfo(value){
    localStorage.setItem("userInfo",value)
  },
  getUserInfo(){
    const user=localStorage.getItem("userInfo")
    if(user===''|| loadash.isUndefined(user)){
      return ''
    }else {
      try {
        return JSON.parse(user)
      }catch (e) {
        return ''
      }
    }
  },
  clearUserInfo(){
    localStorage.removeItem("userInfo")
  },
  md5Pwd(value){
    var md5 = crypto.createHash("md5");
    md5.update(value);
    return md5.digest('hex');
  }
}
export default util
