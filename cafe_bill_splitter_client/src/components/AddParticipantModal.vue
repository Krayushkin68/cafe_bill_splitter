<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" :id="id" tabindex="-1" :aria-labelledby="`${id}Label`" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" :id="`${id}Label`">Добавить участника</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="NameInput" class="form-label">Имя</label>
              <input type="text" class="form-control" id="NameInput" v-model="name"/>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
            <button type="button" class="btn btn-primary" @click.prevent="Add">Принять</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Trigger button -->
    <div class="row justify-content-center text-end mx-2 my-1">
      <div class="col-12 col-md-8">
        <button class="btn btn-primary" @click="ShowModal">Добавить</button>
      </div>
    </div>
  </div>
</template>

<script>
import bootstrap from "bootstrap/dist/js/bootstrap";

export default {
  name: "AddParticipantModal",
  props: {
    id: {
      type: String,
    },
  },
  data() {
    return {
      name: "",
      modal: null
    };
  },
  methods: {
    ShowModal(){
      if (!this.modal) {
        this.modal = new bootstrap.Modal(document.getElementById(this.id));
      }
      this.modal.show();
    },
    Add() {
      this.$emit("add", this.name);
      this.name = "";
      this.modal.hide();
    }
  }
};
</script>

<style>
</style>