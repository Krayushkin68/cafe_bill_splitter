<template>
  <div>
    <ul class="nav nav-pills nav-fill justify-content-center m-3 gap-2">
      <li class="nav-item">
        <a
          class="nav-link"
          href="#"
          :class="{ active: tabName === 'positions' }"
          @click.prevent="Trigger('positions')"
          >Позиции</a
        >
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          href="#"
          :class="{ active: tabName === 'participants' }"
          @click.prevent="Trigger('participants')"
          >Участники</a
        >
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          href="#"
          :class="{ active: tabName === 'calculation' }"
          @click.prevent="Trigger('calculation')"
          >Расчет</a
        >
      </li>
    </ul>

    <PositionsList v-if="tabName === 'positions'" />
    <ParticipantsList v-if="tabName === 'participants'" />
  </div>
</template>

<script>
import PositionsList from "@/components/PositionsList.vue";
import ParticipantsList from "@/components/ParticipantsList.vue";

export default {
  name: "BillCalculateView",
  components: {
    PositionsList,
    ParticipantsList,
  },
  data() {
    return {
      tabName: "positions",
    };
  },
  methods: {
    Trigger(tabName) {
      this.tabName = tabName;
    },
  },
};
</script>

<style>
</style>