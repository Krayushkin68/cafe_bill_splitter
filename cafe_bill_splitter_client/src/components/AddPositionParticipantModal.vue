<template>
    <div class="modal fade" :id="id" tabindex="-1" :aria-labelledby="`${id}Label`" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" :id="`${id}Label`">Назначить</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <h5>Позиция:</h5>
            <div class="row">
              <div class="col">
                <div class="form-floating">
                  <input type="text" class="form-control" :id="`position-${position.id}-name`" :value="position.name" readonly/>
                  <label :for="`position-${position.id}-name`">Название</label>
                </div>
              </div>
              <div class="col">
                <form class="form-floating">
                  <input type="text" class="form-control" :id="`position-${position.id}-availible`" :value="AvailableCount" readonly>
                  <label :for="`position-${position.id}-availible`">Доступно</label>
                </form>
              </div>
            </div>
            <hr>
            <p>Выберите одного или несколько участников</p>
            <div class="participants-select">
              <div class="input-group mb-1 participant-select" v-for="(participant, index) in AvailableParticipants" :value="index" :key="index" @click="UpdateChecked(participant)">
                <div class="input-group-text">
                  <input class="form-check-input mt-0 participant-select" type="checkbox" :value="participant.id" :checked="checkedParticipants.includes(participant)">
                </div>
                <input type="text" class="form-control participant-select" :value="participant.name" readonly>
              </div>
            </div>
            <div v-if="checkedParticipants.length" class="mt-3">
              <!-- Input Количество с максимальным значением -->
              <div v-if="LessThan2Checked" class="row">
                <label for="inputCount" class="col-auto col-form-label">Количество:</label>
                <div class="col-auto">
                  <input type="number" id="inputCount" class="form-control" :class="{'is-valid': CountInputValid, 'is-invalid': !CountInputValid}" @change="ValidateInput" v-model="count">
                  <div class="invalid-feedback">Неверное количество</div>
                </div>
              </div>
              <!-- Checkbox Пополам -->
              <div v-else class="form-check form-switch">
                <input class="form-check-input" type="checkbox" role="switch" id="switch" checked>
                <label class="form-check-label" for="switch">Разделить пополам между выбранными участниками</label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
            <button type="button" class="btn btn-primary" :disabled="!CanApply" @click.prevent="Apply">Принять</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import {mapGetters, mapActions, mapMutations} from 'vuex';

export default {
  name: "AddPositionParticipantModal",
  props: {
    position: {
      type: Object,
    },
    id: {
      type: String
    }
  },
  data() {
    return {
      checkedParticipants: [],
      count: 0,
      CountInputValid: false
    };
  },
  methods: {
    ...mapActions({
      ResetParticipants: 'ParticipantsModule/Reset'
    }),
    ...mapMutations({
      AddOrUpdatePositionParticipant: 'PositionsModule/AddOrUpdatePositionParticipant'
    }),
    UpdateChecked(participant){
      if (this.checkedParticipants.includes(participant)) {
        this.checkedParticipants = this.checkedParticipants.filter(p => p.id !== participant.id)
      }
      else {
        this.checkedParticipants.push(participant)
      }
    },
    ValidateInput(event) {
      if (event.target.value <= 0 || event.target.value > this.AvailableCount){
        this.CountInputValid = false;
      } else {
        this.CountInputValid = true;
      }
    },
    Clear() {
      this.checkedParticipants = [];
      this.CountInputValid = false;
    },
    Apply() {
      if (this.checkedParticipants.length == 1) {
        this.AddOrUpdatePositionParticipant({
          position: this.position, 
          participant: {...this.checkedParticipants[0], count: this.count}
          })
      } else {
        this.checkedParticipants.forEach(el => {
          this.AddOrUpdatePositionParticipant({
            position: this.position, 
            participant: {...el, count: -1}
            })
        })
      }
      this.Clear();
    }
  },
  computed: {
    ...mapGetters({
      participants: 'ParticipantsModule/getParticipants'
    }),
    LessThan2Checked(){
      return this.checkedParticipants.length < 2
    },
    AvailableParticipants(){
      var usedIds = this.position.participants.map(el => el.id);
      return this.participants.filter(el => !usedIds.includes(el.id));
    },
    AvailableCount(){
      var assignedCount = 0;
      this.position.participants.forEach(el => {
        if (el.count > 0) {
          assignedCount += el.count;
        } 
      });
      return this.position.count - assignedCount;
    },
    CanApply(){
      return (this.CountInputValid && this.checkedParticipants.length == 1) || (this.checkedParticipants.length > 1);
    }
  },
  watch: {
    position() {
      this.Clear();
    }
  },
  created(){
    this.ResetParticipants();
  }
};
</script>

<style>
.participant-select{
  cursor: pointer;
}
</style>