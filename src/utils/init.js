import { util, reg } from "@/utils/util";
import { api,wxHostUrl, appid} from "@/utils/api";
import query from "@/utils/query"
import  store from '@/store'



export default{
  install(Vue){
     Vue.prototype.util = new util();
     Vue.prototype.reg = new reg();
     Vue.prototype.api = new api();
     Vue.prototype.query = query;
    Vue.prototype.wxHostUrl = wxHostUrl;
    Vue.prototype.appid = appid;
    Vue.prototype.store = store.store;
  }
}
