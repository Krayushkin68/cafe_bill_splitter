<template>
    <div class="container">
        <h2 class="text-center m-2">Список позиций</h2>
        <button class="btn btn-primary btn-md" @click="addPosition">Добавить позицию</button>
        <button class="btn btn-primary m-2" @click="checkPositions">Проверить</button>
        <button class="btn btn-primary m-2" @click="positions[0].count=22">Изменить</button>
        <div v-if="positions.length">
            <PositionItem
                    v-for="(position, index) in positions"
                    :key="position.id"
                    :position="position"
                    :index="index"
                    @update-name="updateName"
                    @update-price="updatePrice"
                    @update-count="updateCount"
                    @remove="removePosition"
            />
            <PositionsTotal :total="positionsTotal"/>
        </div>
        <div v-else class="text-center m-2"><h4>Список позиций пуст</h4></div>
    </div>
</template>

<script>
    import PositionItem from "@/components/PositionItem.vue"
    import PositionsTotal from "@/components/PositionsTotal.vue"

    export default {
        components: {
            PositionItem,
            PositionsTotal
        },
        data() {
            return {
                positions: [
                    {id: 1, name: "Кофе", price: 190, count: 2},
                    {id: 2, name: "Пирожное", price: 230, count: 3},
                    {id: 3, name: "Салат", price: 190, count: 2},
                    {id: 4, name: "Суп", price: 190, count: 3},
                ],
                currentId: 4
            }
        },
        methods: {
            addPosition() {
                this.currentId += 1
                this.positions.push({id: this.currentId, name: '', price: 0, count: 1})
            },
            checkPositions() {
                console.log(this.positions)
            },
            updateName(id, newValue) {
                this.positions.find(p => p.id === id).name = newValue;
            },
            updatePrice(id, newValue) {
                newValue = Number.parseInt(newValue);
                if (newValue < 1) {
                    newValue = 1
                }
                this.positions.find(p => p.id === id).price = newValue;
            },
            updateCount(id, newValue) {
                newValue = Number.parseInt(newValue);
                if (newValue < 1) {
                    newValue = 1
                }
                this.positions.find(p => p.id === id).count = newValue;
            },
            removePosition(position) {
                this.positions = this.positions.filter(p => p.id !== position.id)
            }
        },
        computed: {
            positionsTotal() {
                let sum = 0;
                this.positions.forEach(p => {
                    sum += p.price * p.count
                });
                return sum;
            }
        }
    }
</script>

<style>

</style>