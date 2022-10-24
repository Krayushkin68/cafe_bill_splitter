import {PositionsAPI} from "@/api/positions/positions";

export const PositionsModule = {
    namespaced: true,

    state() {
        return {
            positions: []
        }
    },
    getters: {
        getPositions: (state) => state.positions,
    },
    mutations: {
        AddPosition(state, position) {
            state.positions.push(position)
        },
        AddOrUpdatePositionParticipant(state, {position, participant}) {
            const existingPosition = state.positions.find(el => el.id == position.id)
            if (!existingPosition.participants) {
                existingPosition.participants = []
            }
            const existingParticipant = existingPosition.participants.find(el => el.id == participant.id);
            if (existingParticipant) {
                existingParticipant.count = participant.count
            } else {
                existingPosition.participants.push(participant)
            }
        },
        DeletePosition(state, position) {
            state.positions = state.positions.filter(p => p.id !== position.id)
        },
        UpdatePosition(state, position) {
            const existingPosition = state.positions.find(p => p.id === position.id);
            existingPosition.name = position.name
            existingPosition.price = position.price
            existingPosition.count = position.count
            existingPosition.changed = true;
        },
        ResetPositions(state, positions) {
            state.positions = positions
        }
    },
    actions: {
        async getAllPositions({commit}) {
            await PositionsAPI.GetAll()
                    .then((response) => {
                        commit('ResetPositions', response.data)
                    })
                    .catch((error) => {
                        console.log(error)
                    })
        },
        async createPosition({commit}, data) {
            await PositionsAPI
                    .Add(data)
                    .then((response) => {
                        commit('AddPosition', response.data)
                    })
                    .catch((error) => {
                        console.log(error)
                    })
        },
        async deletePosition({commit}, data) {
            await PositionsAPI
                    .Delete(data.id)
                    .then(() => {
                        commit('DeletePosition', data)
                    })
                    .catch((error) => {
                        console.log(error)
                    })
        },
        async saveChanges({state, dispatch}) {
            await Promise
                  .all(state.positions.filter(p => p.changed).map(PositionsAPI.Update))
                  .then(() => dispatch('getAllPositions'))
        }
    },

}