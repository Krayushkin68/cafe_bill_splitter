<template>
  <li class="nav-item">
    <a
      class="nav-link"
      aria-current="page"
      href="#"
      :class="{ active: isActive }"
      @click.prevent="$emit('go-to', page.name)"
      >{{ page.display_name }}</a
    >
  </li>
</template>

<script>
export default {
  name: "NavLink",
  props: {
    isActive: {
      type: Boolean,
    },
    page: {
      type: Object,
    },
  },
};
</script>

<style>
</style>