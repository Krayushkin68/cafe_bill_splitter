<template>
    <div class="modal fade" :id="id" tabindex="-1" :aria-labelledby="`${id}Label`" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" :id="`${id}Label`">Редактировать</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <h5>Позиция:</h5>
            <div class="row">
              <div class="col">
                <div class="form-floating">
                  <input type="text" class="form-control" id="edit-position" :value="position.name" readonly/>
                  <label for="edit-position">Название</label>
                </div>
              </div>
              <div class="col">
                <form class="form-floating">
                  <input type="text" class="form-control" id="edit-position-availible" :value="AvailableCount" readonly>
                  <label for="edit-position-availible">Доступно</label>
                </form>
              </div>
            </div>
            <hr>
            <h5>Участник:</h5>
            <div class="form-floating mt-1">
                <input type="text" class="form-control" id="edit-participant" :value="participant.name" readonly/>
                <label for="edit-participant">Имя</label>
            </div>
            <form class="form-floating mt-1">
                <input type="number" id="edit-participant-count" class="form-control" :class="{'is-valid': CountInputValid, 'is-invalid': !CountInputValid}" @change="ValidateInput" v-model="count">
                <div class="invalid-feedback">Неверное количество</div>
                <label for="edit-participant-count">Количество</label>
            </form>
          </div>            
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="Delete">Удалить</button>
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" :disabled="!CountInputValid" @click="Apply">Сохранить</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import {mapGetters, mapActions, mapMutations} from 'vuex';

export default {
  name: "EditPositionParticipantModal",
  props: {
    position: {
      type: Object,
    },
    participant: {
      type: Object,
    },
    id: {
      type: String
    }
  },
  data() {
    return {
      count: 0,
      CountInputValid: true
    };
  },
  methods: {
    ...mapActions({
      ResetParticipants: 'ParticipantsModule/Reset'
    }),
    ...mapMutations({
      AddOrUpdatePositionParticipant: 'PositionsModule/AddOrUpdatePositionParticipant',
      RemovePositionParticipant: 'PositionsModule/RemovePositionParticipant'
    }),
    ValidateInput(event) {
      if (event.target.value <= 0 || event.target.value > this.AvailableCount){
        this.CountInputValid = false;
      } else {
        this.CountInputValid = true;
      }
    },
    Apply() {
        this.AddOrUpdatePositionParticipant({
            position: this.position, 
            participant: {...this.participant, count: this.count}
        })
    },
    Delete() {
        this.RemovePositionParticipant({
            position: this.position, 
            participant: this.participant
        })
    }
  },
  computed: {
    ...mapGetters({
      participants: 'ParticipantsModule/getParticipants'
    }),
    AvailableCount() {
      var assignedCount = 0;
      this.position.participants.forEach(el => {
        if (el.count > 0) {
          assignedCount += el.count;
        } 
      });
      return this.position.count - assignedCount + this.participant.count;
    },
  },
  watch: {
    participant() {
        this.count = this.participant.count
    }
  }
};
</script>

<style>
</style>