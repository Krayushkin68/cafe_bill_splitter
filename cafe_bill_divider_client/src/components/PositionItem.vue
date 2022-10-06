<template>
    <div class="row border border-1 rounded-3 bg-light shadow-sm m-2">
        <div class="col-7 align-self-center">
            <div class="input-group input-group-lg">
                <span class="input-group-text" id="inputGroup-sizing-lg">{{ index+1 }}</span>
                <input type="text" class="form-control" aria-describedby="inputGroup-sizing-lg" :value="position.name" @input="updateName">
            </div>
        </div>
        <div class="col-5">
            <div class="row">
                <div class="col">
                    <label for="price" class="form-text">Цена</label>
                    <input type="text" class="form-control" :id="`price-${position.id}`" placeholder="Цена" :value="position.price" @input="updatePrice">
                </div>
                <div class="col">
                    <label for="count" class="form-text">Количество</label>
                    <input type="number" class="form-control" :id="`count-${position.id}`" :value="position.count" @input="updateCount">
                </div>
            </div>
            <div class="row m-1">
                <div class="col">
                    <button class="btn btn-sm btn-danger rounded-2" @click="$emit('remove', position)">Удалить</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "PositionItem",

    props: {
        position: {
            type: Object,
            required: true
        },
        index: {
            type: Number,
            required: true
        }
    },
    methods: {
        updatePrice(event) {
            this.$emit("update-price", this.position.id, event.target.value)
        },
        updateCount(event) {
            this.$emit("update-count", this.position.id, event.target.value)
        },
        updateName(event) {
            this.$emit("update-name", this.position.id, event.target.value)
        }
    }
}
</script>

<style>

</style>