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
    <CalculateList v-if="tabName === 'calculation'" />
  </div>
</template>

<script>
import PositionsList from "@/components/position/PositionsList.vue";
import CalculateList from "@/components/calculate/CalculateList.vue";
import ParticipantsList from "@/components/participant/ParticipantsList.vue";

export default {
  name: "BillCalculateView",
  components: {
    PositionsList,
    ParticipantsList,
    CalculateList
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