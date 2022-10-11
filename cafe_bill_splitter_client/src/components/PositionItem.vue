<template>
    <div class="row align-items-md-center justify-content-end 
                border border-1 rounded-3 shadow-sm 
                mt-2 mx-1 gx-3 pe-0 pe-md-1"
        :class="{'bg-danger bg-opacity-10': this.position.changed,
                 'bg-light': !this.position.changed}">
        <div class="col-12 col-md-6 ms-0 ps-0 pe-0 pe-md-2">
            <div class="input-group input-group-lg">
                <span class="input-group-text">{{ index+1 }}</span>
                <div class="form-floating">
                    <input type="text" 
                           class="form-control" 
                           :id="`name-input-${index}`" 
                           placeholder="Наименование" 
                           :value="position.name" 
                           @input="updateName"/>
                    <label :for="`name-input-${index}`">Наименование</label>
                </div>
            </div>
        </div>
        <div class="col-4 col-md-2 col-lg-3 mt-1 mt-md-0 pe-0">
            <div class="form-floating">
                <input type="text" 
                    class="form-control" 
                    :id="`price-input-${index}`"  
                    placeholder="Цена" 
                    :value="position.price" 
                    @input="updatePrice"/>
                <label :for="`price-input-${index}`">Цена</label>
            </div>
        </div>
        <div class="col-4 col-md-2 mt-1 mt-md-0 pe-0">
            <div class="form-floating">
                <input type="number" 
                    class="form-control" 
                    :id="`count-input-${index}`"
                    placeholder="Количество" 
                    :value="position.count" 
                    @input="updateCount"/>
                <label :for="`count-input-${index}`">Количество</label>
            </div>
        </div>
        <div class="col-3 col-sm-2 col-lg-1 text-center align-self-center">
            <button class="btn btn-sm btn-danger" @click="$emit('remove', position)">Удалить</button>
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
        updateName(event) {
            this.$emit("update-name", {id: this.position.id, value: event.target.value})
        },
        updatePrice(event) {
            this.$emit("update-price", {id: this.position.id, value: event.target.value})
        },
        updateCount(event) {
            this.$emit("update-count", {id: this.position.id, value: event.target.value})
        },
    }
}
</script>

<style>

</style>