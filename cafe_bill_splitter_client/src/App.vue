<template>
    <NavBar/>
    <router-view/>
</template>

<script>
    import NavBar from "@/components/nav/NavBar";

    export default {
        components: {
            NavBar,
        }
    }
</script>

<style>

</style>
