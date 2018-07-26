import Vuex from 'vuex'
import Vue from 'vue'
import service from '@/api/service'
import utils from '@/utils/'
Vue.use(Vuex)

console.log("utils.getUserName()",utils.getUserName())
const store = new Vuex.Store({
  state: {
    token: utils.getToken(),
    userName:utils.getUserName(),
    category:[],
    bookmarks:[]
  },
  mutations: {
    SET_TOKEN(state,token){
      state.token=token
    },
    SET_USER(state,userName){
      state.userName=userName
    },
    SET_CATEGORY(state,category){
      state.category=category
    },
    SET_BOOKMARK(state,bookmarks){
      state.bookmarks=bookmarks
    }
  },
  actions:{
    loginActions({commit},para){
      return new Promise((resolve,reject)=>{
        service.login(para).then(res=>{
          commit("SET_TOKEN",res.authToken)
          commit("SET_USER",res.loginName)
          utils.setToken(res.authToken)
          utils.setUserName(res.loginName)
          resolve(res)
        }).catch(err=>{
          console.log(err)
          reject(err)
        })
      })
    },
    registerAction({commit},para){
      return new Promise(((resolve, reject) => {
        service.register(para).then(res=>{
          commit("SET_TOKEN",res.authToken)
          commit("SET_USER",para.loginName)
          utils.setToken(res.authToken)
          utils.setUserName(para.loginName)
          resolve(res)
        }).catch(err=>{
          reject(err)
        })
      }))
    },
    logoutAction({commit}){
      return new Promise(((resolve, reject) => {
        service.logout().then(res=>{
          commit("SET_TOKEN",'')
          commit("SET_USER",'')
          utils.setToken('')
          utils.setUserName('')
          resolve(res)
        }).catch(err=>{
          reject(err)
        })
      }))
    },
    getCategoryActions({commit}){
      return new Promise((resolve,reject)=>{
        let apiService = 'getSysBookmarkCategory'
        if(this.state.token){
          apiService = 'getUserBookmarkCategory'
        }
        service[apiService]().then(res=>{
          commit("SET_CATEGORY",res)
          resolve(res)
        }).catch(err=>{
          reject(err)
        })
      })
    },
    getBookmarksAction({commit},para){
      return new Promise((resolve,reject)=>{
        let apiService = 'getSysBookmarks'
        if(this.state.token){
          apiService = 'getUserBookmarks'
        }
        service[apiService](para).then(res=>{
          commit("SET_BOOKMARK",res)
          resolve(res)
        }).catch(err=>{
          reject(err)
        })
      })
    }
  }
})
export default store
