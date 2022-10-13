<template>
    <!-- Modal -->
    <div class="modal fade" :id="id" tabindex="-1" :aria-labelledby="`${id}Label`" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" :id="`${id}Label`">Назначить</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <!-- Селект из пользователей -->
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
            <button type="button" class="btn btn-primary" @click.prevent="Apply">Принять</button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Trigger button -->
    <button class="btn btn-sm btn-outline-success mx-1" @click="ShowModal">Добавить</button>
</template>

<script>
import bootstrap from "bootstrap/dist/js/bootstrap";

export default {
  name: "AddPositionParticipantModal",
  props: {
    id: {
      type: String,
    },
  },
  data() {
    return {
      name: "",
      modal: null,
    };
  },
  methods: {
    ShowModal(){
      if (!this.modal) {
        this.modal = new bootstrap.Modal(document.getElementById(this.id));
      }
      this.modal.show();
    },
    Apply() {
        this.modal.hide();
    }
  }
};
</script>

<style>
</style>