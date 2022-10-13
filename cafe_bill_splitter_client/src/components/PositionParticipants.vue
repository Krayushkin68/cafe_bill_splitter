<template>
  <div class="m-1">
    <small class="text-muted me-2">Назначено:</small>
    <span class="badge rounded-pill bg-success me-1">Андрей - 1</span>
    <span class="badge rounded-pill bg-success me-1">Даня - 3</span>
    <span class="badge rounded-pill bg-secondary me-1">Коля, Витя - пополам</span>
    <AddPositionParticipantModal :id="`add-position-${position.id}-participant`"/>
  </div>
</template>

<script>
import AddPositionParticipantModal from '@/components/AddPositionParticipantModal'

export default {
  name: "PositionParticipants",
  components: {
    AddPositionParticipantModal
  },
  props: {
    position: {
      type: Object,
      require: true,
    },
  },
};
</script>

<style scoped>
span.badge {
  cursor: pointer;
}
</style>