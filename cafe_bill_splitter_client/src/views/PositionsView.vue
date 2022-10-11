<template>
    <div class="container">
        <h2 class="text-center m-2">Список позиций</h2>
        <div class="hstack gap-2 me-2 mt-3 justify-content-end">
            <button class="btn btn-primary" @click="addPosition">Добавить позицию</button>
            <button class="btn btn-primary" @click="updatePositions">Обновить</button>
            <button class="btn btn-success" @click="saveChanges" :disabled="!hasChanges">Сохранить</button>
        </div>
        <div v-if="positions.length">
            <PositionItem
                    v-for="(position, index) in positions"
                    :key="position.id"
                    :position="position"
                    :index="index"
                    @update-name="UpdatePositionName"
                    @update-price="UpdatePositionPrice"
                    @update-count="UpdatePositionCount"
                    @remove="deletePosition"
            />
            <PositionsTotal :total="positionsTotal"/>
        </div>
        <div v-else class="text-center m-2"><h4>Список позиций пуст</h4></div>
    </div>
</template>

<script>
    import PositionItem from "@/components/PositionItem.vue"
    import PositionsTotal from "@/components/PositionsTotal.vue"
    import {mapActions, mapGetters, mapMutations} from 'vuex';

    export default {
        components: {
            PositionItem,
            PositionsTotal
        },
        data() {
            return { }
        },
        methods: {
            ...mapActions({
                updatePositions: 'PositionsModule/getAllPositions',
                createPosition: 'PositionsModule/createPosition',
                deletePosition: 'PositionsModule/deletePosition',
                saveChanges: 'PositionsModule/saveChanges'
            }),
            ...mapMutations({
                UpdatePositionPrice: 'PositionsModule/UpdatePositionPrice',
                UpdatePositionName: 'PositionsModule/UpdatePositionName',
                UpdatePositionCount: 'PositionsModule/UpdatePositionCount',
            }),
            addPosition() {
                this.createPosition({name: '', price: 0, count: 1})
            }
        },
        computed: {
            ...mapGetters({
                positions: 'PositionsModule/getPositions'
            }),
            positionsTotal() {
                let sum = 0;
                this.positions.forEach(p => {
                    sum += p.price * p.count
                });
                return sum;
            },
            hasChanges() {
                return this.positions.filter(p => p.changed).length > 0
            }
        },
        mounted(){
            this.updatePositions()
        }
    }
</script>

<style>

</style>