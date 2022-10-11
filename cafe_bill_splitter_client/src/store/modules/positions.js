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
        DeletePosition(state, position) {
            state.positions = state.positions.filter(p => p.id !== position.id)
        },
        UpdatePositionPrice(state, data) {
            const position = state.positions.find(p => p.id === data.id);
            const value = Number.parseInt(data.value)
            if (value >= 0) {
                position.price = data.value;
                position.changed = true;
            }
        },
        UpdatePositionName(state, data) {
            const position = state.positions.find(p => p.id === data.id);
            position.name = data.value;
            position.changed = true;
        },
        UpdatePositionCount(state, data) {
            const position = state.positions.find(p => p.id === data.id);
            position.count = data.value;
            position.changed = true;
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