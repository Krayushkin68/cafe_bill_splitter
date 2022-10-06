<template>
    <div class="row bg-secondary border border-1 rounded-3 m-2">
        <div class="col-9 text-light text-end">
            <h3>Итого: </h3>
        </div>
        <div class="col">
             <span class="input-group-text"><strong>{{ total }}</strong></span>
        </div>
    </div>
</template>

<script>
export default {
    name: "PositionsTotal",
    props: {
        total: {
            type: Number,
            required: true,
            default: 0
        }
    }
}
</script>

<style>

</style>