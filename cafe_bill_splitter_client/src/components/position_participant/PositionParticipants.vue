<template>
  <div class="m-1">
    <small class="text-muted me-2">Назначено:</small>

    <span 
      class="badge rounded-pill me-1" 
      v-for="(badge, index) in badges"
      :key="index"
      :class="{'bg-success': badge.type == 'simple', 'bg-secondary': badge.type == 'paired'}"
      @click="EmitEdit(badge)"
      >
      {{ badge.name }} - {{ badge.count }}
    </span>

    <!-- Modal trigger button -->
    <button :disabled="filled" class="btn btn-sm btn-outline-success mx-1" @click="$emit('show-add-modal', position)">{{ filled ? 'Заполнено' : 'Добавить' }}</button>
  </div>
</template>

<script>


export default {
  name: "PositionParticipants",
  components: {
    
  },
  data() {
    return {

    }
  },
  props: {
    position: {
      type: Object,
      require: true,
    },
  },
  methods: {
    EmitEdit(badge) {
      if (badge.type == 'simple'){
        var participant = this.position.participants.filter(p => p.name == badge.name)[0]
        var position = this.position
        this.$emit('show-edit-modal', { position, participant })
      } else {
        this.$emit('show-delete-modal', this.position)
      }
    }
  },
  computed: {
    badges(){
      var simpleParticipants = this.position.participants.filter(p => p.count > 0);
      var pairedParticipants = this.position.participants.filter(p => p.count == -1);
      var badges = []

      simpleParticipants.forEach(el => {
        badges.push({name: el.name, count: el.count, type: 'simple'})
      });
      
      if (pairedParticipants.length > 1) {
        badges.push({name: pairedParticipants.map(el => el.name).join(", "), count: "пополам", type: 'paired'})
      }
      return badges;
    },
    filled(){
      var badgesSum = 0;
      this.badges.filter(el => el.type == 'simple').forEach((el) => badgesSum += el.count);
      return this.badges.find(el => el.type == 'paired') || badgesSum >= this.position.count;
    }
  }
};
</script>

<style scoped>
span.badge {
  cursor: pointer;
}
</style>