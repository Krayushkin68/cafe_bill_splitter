import { createStore } from 'vuex'
import {AuthModule} from "@/store/modules/auth";
import {PositionsModule} from "@/store/modules/positions";

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    AuthModule,
    PositionsModule
  }
})
