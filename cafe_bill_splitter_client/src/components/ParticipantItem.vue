<template>
  <div class="row justify-content-center mx-2 my-1">
    <div class="col-12 col-md-8">
      <div class="input-group">
        <span class="input-group-text">{{ index + 1 }}</span>
        <div class="form-floating">
          <input
            type="text"
            class="form-control"
            placeholder="Имя"
            :id="`name-input-${index + 1}`"
            :value="participant.name"
            readonly
          />
          <label :for="`name-input-${index + 1}`">Имя</label>
        </div>
        <button
          class="btn btn-sm btn-outline-danger"
          @click.prevent="$emit('remove', participant)"
        >
          Удалить
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ParticipantItem",
  props: {
    participant: {
      type: Object,
      require: true,
    },
    index: {
      type: Number,
    },
  },
};
</script>

<style>
</style>