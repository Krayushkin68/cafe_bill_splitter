<template>
    <div class="row align-items-md-center justify-content-end 
                border border-1 rounded-3 bg-light shadow-sm 
                mt-2 mx-1 
                gx-lg-3 pe-lg-1 
                gx-md-3 pe-md-1 
                pe-sm-0 pe-sm-0 
                ">
        <div class="col-lg-6 pe-lg-2
                    col-md-6 pe-md-2
                    col-sm-12 pe-sm-0 
                    col-12 pe-0
                    ms-0 ps-0 
                    ">
            <div class="input-group input-group-lg">
                <span class="input-group-text">{{ index+1 }}</span>
                <div class="form-floating">
                    <input type="text" 
                           class="form-control" 
                           :id="`name-input-${position.id}`" 
                           placeholder="Наименование" 
                           :value="position.name" 
                           @input="updateName"/>
                    <label :for="`name-input-${position.id}`">Наименование</label>
                </div>
            </div>
        </div>
        <div class="col-lg-3 mt-lg-0
                    col-md-2 mt-md-0
                    col-sm-4 pe-sm-0 mt-sm-1
                    col-4 pe-0 
                    ">
            <div class="form-floating">
                <input type="text" 
                    class="form-control" 
                    :id="`price-input-${position.id}`"  
                    placeholder="Цена" 
                    :value="position.price" 
                    @input="updatePrice"/>
                <label :for="`price-input-${position.id}`">Цена</label>
            </div>
        </div>
        <div class="col-lg-2 mt-lg-0
                    col-md-2 mt-md-0
                    col-sm-4 pe-sm-0 mt-sm-1
                    col-4 pe-0 
                    ">
            <div class="form-floating">
                <input type="number" 
                    class="form-control" 
                    :id="`count-input-${position.id}`"
                    placeholder="Количество" 
                    :value="position.count" 
                    @input="updateCount"/>
                <label :for="`count-input-${position.id}`">Количество</label>
            </div>
        </div>
        <div class="col-lg-1 
                    col-md-2 
                    col-sm-2 align-self-center
                    col-3
                    text-center
                    ">
            <button class="btn btn-sm btn-danger rounded-3" @click="$emit('remove', position)">Удалить</button>
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