//建立的是全局请求拦截文件，要引入axios、vuex、router
import axios from 'axios'
import store from './store'
import router from './router'
//token要放在我们请求头上面带回给后台

//设置请求拦截方法
export default function setAxios() {
    //拦截属性interceptors
    axios.interceptors.request.use(
        //配置，从vuex那里拿token判断是否存在，存在就给后端带回去
        config => {
            if(store.state.token) {
                config.headers.token = store.state.token
            }
            //这样就实现了全局的token带入
            return config
        }
    )
    //全局再设置一个http优化，让其不出现404难看的页面,每次的请求有返回的，都是先经过这个拦截器先的。
    axios.interceptors.response.use(
        response => {
            if(response.status == 200) {
                const data = response.data
                //跟后台商量账号密码不对的时候，code定多少需要重新登陆，并且清除vuex里的token和localstorage里的token
                if(data.code == -100 && data.result == false) {
                    //先清除vuex里的token
                    store.commit('settoken','')
                    //再清除本地token
                    localStorage.removeItem('token')
                    //如果不成功那就回到登陆页
                    router.replace({path: '/login'})
                }
                //返回data
                return data
            }
            //返回response
            return response
        }
    )
}