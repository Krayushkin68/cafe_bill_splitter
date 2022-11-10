<template>
    <div v-if="participants.length" class="container">
      <CalculateParticipant
        v-for="(participant, index) in participants"
        :key="participant.id"
        :participant="participant"
        :index="index"
        />
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import CalculateParticipant from "@/components/calculate/CalculateParticipant.vue";

export default {
  name: "CalculateList",
  components: {
    CalculateParticipant
  },
  computed: {
    ...mapGetters({
      participants: "ParticipantsModule/getParticipants"
    })
  },
};
</script>

<style>
</style>