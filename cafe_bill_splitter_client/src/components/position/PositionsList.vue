<template>
  <div class="container">
    <h2 class="text-center m-2">Список позиций</h2>
    <div class="hstack gap-2 me-2 mt-3 justify-content-end">
      <button class="btn btn-primary" @click="addPosition">Добавить</button>
      <button class="btn btn-primary" @click="updatePositions">Обновить</button>
      <button class="btn btn-success" @click="saveChanges" :disabled="!hasChanges">Сохранить</button>
    </div>
    <div v-if="positions.length">
      <PositionItem
        v-for="(position, index) in positions"
        :key="position.id"
        :position="position"
        :index="index"
        @update="UpdatePosition"
        @remove="deletePosition"
        @show-add-modal="ShowAddModal"
        @show-edit-modal="ShowEditModal"
        @show-delete-modal="ShowDeleteModal"
        />
      <PositionsTotal :total="positionsTotal" />
      <AddPositionParticipantModal :position="modalPosition" :id="'add-position-participant-modal'" />
      <EditPositionParticipantModal :position="modalPosition" :participant="modalParticipant" :id="'edit-position-participant-modal'" />
      <DeletePairedPositionParticipantModal :position="modalPosition" :id="'delete-position-participant-modal'" />
    </div>
    <div v-else class="text-center mx-2 my-3 bg-light border border-1 rounded-3">
      <h5>Список позиций пуст</h5>
    </div>
  </div>
</template>

<script>
import PositionItem from "@/components/position/PositionItem.vue";
import PositionsTotal from "@/components/position/PositionsTotal.vue";
import AddPositionParticipantModal from '@/components/position_participant/AddPositionParticipantModal'
import EditPositionParticipantModal from '@/components/position_participant/EditPositionParticipantModal'
import DeletePairedPositionParticipantModal from '@/components/position_participant/DeletePairedPositionParticipantModal'
import bootstrap from "bootstrap/dist/js/bootstrap";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  name: "PositionsList",
  components: {
    PositionItem,
    PositionsTotal,
    AddPositionParticipantModal,
    EditPositionParticipantModal,
    DeletePairedPositionParticipantModal
  },
  data() {
    return {
      modalPosition: {id: 1, name: "", count: 1, participants: []},
      modalParticipant: {id: 1, name: "", count: 1},
      addModal: null,
      editModal: null,
      deleteModal: null
    };
  },
  methods: {
    ...mapActions({
      updatePositions: "PositionsModule/getAllPositions",
      createPosition: "PositionsModule/createPosition",
      deletePosition: "PositionsModule/deletePosition",
      saveChanges: "PositionsModule/saveChanges",
    }),
    ...mapMutations({
      UpdatePosition: "PositionsModule/UpdatePosition",
    }),
    addPosition() {
      this.createPosition({ name: "", price: 0, count: 1, participants: [] });
    },
    ShowAddModal(position) {
        this.modalPosition = position;
        if (!this.addModal){
          this.addModal = new bootstrap.Modal(document.getElementById('add-position-participant-modal'));
        }
        this.addModal.show();
    },
    ShowEditModal({position, participant}) {
      this.modalPosition = position;
      this.modalParticipant = participant;
      if (!this.editModal){
          this.editModal = new bootstrap.Modal(document.getElementById('edit-position-participant-modal'));
        }
        this.editModal.show();
    },
    ShowDeleteModal(position) {
      this.modalPosition = position;
      if (!this.deleteModal){
          this.deleteModal = new bootstrap.Modal(document.getElementById('delete-position-participant-modal'));
        }
        this.deleteModal.show();
    },
  },
  computed: {
    ...mapGetters({
      positions: "PositionsModule/getPositions",
    }),
    positionsTotal() {
      var sum = 0;
      this.positions.forEach((p) => {
        sum += p.price * p.count;
      });
      return sum;
    },
    hasChanges() {
      return this.positions.filter((p) => p.changed).length > 0;
    },
  },
  mounted() {
    if (this.positions.length === 0)
      this.updatePositions();
  },
};
</script>

<style>
</style>