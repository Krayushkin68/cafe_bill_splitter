import { PositionsAPI } from "@/api/positions/positions";

export const PositionsModule = {
    namespaced: true,

    state() {
        return {
            initPositions: [],
            positions: []
        }
    },
    getters: {
        getPositions: (state) => state.positions,
    },
    mutations: {
        AddPosition(state, position) {
            position.changed = true;
            state.positions.push(position);
        },
        AddOrUpdatePositionParticipant(state, { position, participant }) {
            const existingPosition = state.positions.find(el => el.id == position.id)
            if (!existingPosition.participants) {
                existingPosition.participants = [];
            }

            const existingParticipant = existingPosition.participants.find(el => el.id == participant.id);
            if (existingParticipant) {
                existingParticipant.count = participant.count;
            } else {
                existingPosition.participants.push(participant);
            }

            delete existingPosition.changed
            const existingInitPosition = state.initPositions.find(p => p.id === position.id);
            if (existingInitPosition == null || JSON.stringify(existingPosition) != JSON.stringify(existingInitPosition)) {
                existingPosition.changed = true;
            } else {
                existingPosition.changed = false;
            }
        },
        RemovePositionParticipant(state, { position, participant }) {
            const existingPosition = state.positions.find(el => el.id == position.id);
            existingPosition.participants = existingPosition.participants.filter(p => p.id !== participant.id);

            delete existingPosition.changed
            const existingInitPosition = state.initPositions.find(p => p.id === position.id);
            if (existingInitPosition == null || JSON.stringify(existingPosition) != JSON.stringify(existingInitPosition)) {
                existingPosition.changed = true;
            } else {
                existingPosition.changed = false;
            }
        },
        DeletePosition(state, position) {
            state.positions = state.positions.filter(p => p.id !== position.id);
        },
        UpdatePosition(state, position) {
            const existingPosition = state.positions.find(p => p.id === position.id);
            existingPosition.name = position.name;
            existingPosition.price = parseFloat(position.price);
            existingPosition.count = position.count;

            delete existingPosition.changed
            const existingInitPosition = state.initPositions.find(p => p.id === position.id);
            if (existingInitPosition == null || JSON.stringify(existingPosition) != JSON.stringify(existingInitPosition)) {
                existingPosition.changed = true;
            } else {
                existingPosition.changed = false;
            }
        },
        ResetPositions(state, positions) {
            state.initPositions = eval(JSON.stringify(positions));
            state.positions = positions;
        }
    },
    actions: {
        getAllPositions({ commit }) {
            return new Promise((resolve, reject) => {
                PositionsAPI.GetAll()
                    .then((response) => {
                        commit('ResetPositions', response.data)
                        resolve()
                    })
                    .catch((error) => {
                        console.log(error)
                        reject(error)
                    })
            })
        },
        async createPosition({ commit }, data) {
            await PositionsAPI
                .Add(data)
                .then((response) => {
                    commit('AddPosition', response.data)
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        async deletePosition({ commit }, data) {
            await PositionsAPI
                .Delete(data.id)
                .then(() => {
                    commit('DeletePosition', data)
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        async removeUnpairedParticipants({ state, dispatch }) {
            var tasks = []
            state.positions.forEach(p => {
                var pairedParticipants = p.participants.filter(el => el.count === -1)
                if (pairedParticipants.length === 1) {
                    p.participants = p.participants.filter(el => el.id != pairedParticipants[0].id)
                    tasks.push(p)
                }
            });
            await Promise.all(tasks.map(PositionsAPI.Update)).then(() => dispatch('getAllPositions'))
        },
        async saveChanges({ state, dispatch }) {
            await Promise
                .all(state.positions.filter(p => p.changed).map(PositionsAPI.Update))
                .then(() => dispatch('getAllPositions'))
        }
    },

}