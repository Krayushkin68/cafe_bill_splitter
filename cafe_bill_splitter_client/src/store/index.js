import { createStore } from 'vuex'
import {AuthModule} from "@/store/modules/auth";
import {PositionsModule} from "@/store/modules/positions";
import {ParticipantsModule} from "@/store/modules/participants";

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
    PositionsModule,
    ParticipantsModule
  }
})
