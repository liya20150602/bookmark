import loadash from 'Lodash'
import crypto from 'crypto'

const token = "token"
const userName = "userName"
const util = {
  setToken(value) {
    localStorage.setItem(token, value)
  },
  getToken() {
    return localStorage.getItem(token)
  },
  setUserName(value){
    localStorage.setItem(userName,value)
  },
  getUserName(){
    return localStorage.getItem(userName)
  },
  md5Pwd(value) {
    var md5 = crypto.createHash("md5");
    md5.update(value);
    return md5.digest('hex');
  },
  isNul(value) {
    if (value == undefined || value == "") {
      return true
    }
    return false
  }
}
export default util
