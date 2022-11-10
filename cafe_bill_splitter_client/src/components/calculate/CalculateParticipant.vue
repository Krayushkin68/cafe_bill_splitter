<template>
  <div class="card mx-2 mb-2">
    <div class="card-body">
        <h5 class="card-title">{{ participant.name }}</h5>
        <h6 class="card-subtitle mb-2 text-muted">Счет</h6>
        <table class="table table-sm">
            <thead>
                <tr>
                    <th>Позиция</th>
                    <th>Цена шт.</th>
                    <th>Количество</th>
                    <th>Сумма</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(position, index) in AppliedPositions" :key="index">
                    <td>{{ position.position }}</td>
                    <td>{{ position.price }}</td>
                    <td>{{ position.count }}</td>
                    <td>{{ RoundNumber(position.total) }}</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="card-footer">
        <h6>Итог: <strong>{{ RoundNumber(ParticipantTotal) }}</strong></h6>
    </div>
  </div>  
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "CalculateParticipant",
  props: {
    participant: {
      type: Object,
      required: true,
    },
  },
  methods: {
    RoundNumber(num) {
        return Number(num.toFixed(2))
    }
  },
  computed: {
    ...mapGetters({
      positions: "PositionsModule/getPositions",
    }),
    AppliedPositions() {
      var appliedPositions = [];

      this.positions.forEach((position) => {
        var positionParticipant = position.participants.find(p => p.id === this.participant.id);
        if (positionParticipant == null) {
          return;
        }
        if (positionParticipant.count > 0) {
          appliedPositions.push({
            position: position.name,
            price: position.price,
            count: `${positionParticipant.count} шт.`,
            total: position.price * positionParticipant.count,
          });
        } else if (positionParticipant.count === -1) {
          var pairedParticipants = position.participants.filter((el) => el.count === -1);
          var otherParticipantsAppliedCount = 0;
          position.participants.filter((el) => el.count > 0).forEach((el) => {otherParticipantsAppliedCount += el.count; });

          var countPerPaired = position.count - otherParticipantsAppliedCount;
          appliedPositions.push({
            position: position.name,
            price: position.price,
            count: `${countPerPaired} шт. - (${pairedParticipants.map((el) => el.name).join(", ")})`,
            total: (countPerPaired * position.price) / pairedParticipants.length,
          });
        }
      });
      return appliedPositions;
    },
    ParticipantTotal() {
      var total = 0;
      this.AppliedPositions.forEach((p) => {
        total += p.total;
      });
      return total;
    },
  },
};
</script>

<style>
</style>