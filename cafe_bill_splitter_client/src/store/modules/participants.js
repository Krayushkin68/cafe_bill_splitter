import { ParticipantsAPI } from "@/api/participants/participants";

export const ParticipantsModule = {
    namespaced: true,

    state() {
        return {
            participants: []
        }
    },
    getters: {
        getParticipants: (state) => state.participants,
    },
    mutations: {
        Add(state, participant) {
            state.participants.push(participant)
        },
        Delete(state, participant) {
            state.participants = state.participants.filter(p => p.id !== participant.id)
        },
        Reset(state, participants) {
            state.participants = participants
        }
    },
    actions: {
        async Reset({ commit }) {
            await ParticipantsAPI.GetAll()
                .then((response) => {
                    commit('Reset', response.data)
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        async Create({ commit }, data) {
            await ParticipantsAPI
                .Add(data)
                .then((response) => {
                    commit('Add', response.data)
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        async Delete({ commit }, data) {
            await ParticipantsAPI
                .Delete(data.id)
                .then(() => {
                    commit('Delete', data)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    },

}