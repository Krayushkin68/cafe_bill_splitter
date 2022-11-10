<template>
    <div class="row justify-content-end bg-secondary border border-1 rounded-3 m-2 sticky-bottom">
        <div class="col-4 text-light text-end me-1">
            <h3 class="m-0 p-0">Итого: </h3>
        </div>
        <div class="col-4 p-0">
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