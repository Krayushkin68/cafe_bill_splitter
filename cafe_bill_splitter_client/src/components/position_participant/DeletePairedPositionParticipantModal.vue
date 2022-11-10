<template>
    <div class="modal fade" :id="id" tabindex="-1" :aria-labelledby="`${id}Label`" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" :id="`${id}DeleteLabel`">Удалить</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <h5>Позиция:</h5>
            <div class="row">
              <div class="col">
                <div class="form-floating">
                  <input type="text" class="form-control" id="delete-position" :value="position.name" readonly/>
                  <label for="delete--position">Название</label>
                </div>
              </div>
              <div class="col">
                <form class="form-floating">
                  <input type="text" class="form-control" id="delete-position-availible" :value="AvailableCount" readonly>
                  <label for="delete-position-availible">Доступно</label>
                </form>
              </div>
            </div>
            <br>
            <h5>Участники:</h5>
            <div class="form-floating mt-1">
                <input type="text" class="form-control" id="delete-participant" aria-describedby="helpBox" :value="PairedParticipantName" readonly/>
                <label for="delete-participant">Имена</label>
                <div id="helpBox" class="form-text">Внимание, для парных участников редактирование недоступно</div>
            </div>

          </div>            
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="Delete">Удалить</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex';

export default {
  name: "DeletePairedPositionParticipantModal",
  props: {
    position: {
      type: Object,
    },
    id: {
      type: String
    }
  },
  methods: {
    ...mapMutations({
      RemovePositionParticipant: 'PositionsModule/RemovePositionParticipant'
    }),
    Delete() {
      this.position.participants.filter(el => el.count == -1).forEach(p => {
        this.RemovePositionParticipant({
            position: this.position, 
            participant: p
        })
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
      return this.position.count - assignedCount;
    },
    PairedParticipantName() {
      var names = this.position.participants.filter(el => el.count == -1).map(el => el.name);
      return names.join(', ')
    }
  }
};
</script>

<style>
</style>