<template>
  <div class="container">
    <h2 class="text-center m-2">Список участников</h2>
    <AddParticipantModal :id="'add_participant_modal'" @add="Add"/>
    <div v-if="participants.length">
      <ParticipantItem
        v-for="(participant, index) in participants"
        :key="index"
        :index="index"
        :participant="participant"
        @remove="Delete"
      />
    </div>
    <div v-else class="text-center mx-2 my-3 bg-light border border-1 rounded-3">
      <h5>Список участников пуст</h5>
    </div>
  </div>
</template>

<script>
import ParticipantItem from "@/components/participant/ParticipantItem.vue";
import AddParticipantModal from "@/components/participant/AddParticipantModal.vue";

import { mapGetters, mapActions } from "vuex";

export default {
  name: "ParticipantsList",
  data() {
    return { }
  },
  components: {
    ParticipantItem,
    AddParticipantModal,
  },
  methods: {
    ...mapActions({
      resetParticipants: "ParticipantsModule/Reset",
      createParticipant: "ParticipantsModule/Create",
      deleteParticipant: "ParticipantsModule/Delete",
      updatePositions: "PositionsModule/getAllPositions",
      removeUnpairedParticipants: "PositionsModule/removeUnpairedParticipants",
    }),
    Add(name) {
      this.createParticipant({ name: name });
      this.updatePositions();
      
    },
    Delete(participant) {
      this.deleteParticipant(participant).then(() => {
        this.updatePositions().then(() => {
          this.removeUnpairedParticipants();
        })
      });
    },
  },
  computed: {
    ...mapGetters({
      participants: "ParticipantsModule/getParticipants",
    }),
  },
  mounted() {
    this.resetParticipants();
  },
};
</script>

<style>
</style>