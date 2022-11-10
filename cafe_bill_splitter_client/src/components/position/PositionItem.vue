<template>
    <div class="row align-items-md-center justify-content-end 
                border border-1 rounded-3 shadow-sm 
                mt-2 mx-1 gx-3 pe-0 pe-md-1"
        :class="{'bg-danger bg-opacity-10': this.position.changed,
                 'bg-light': !this.position.changed && !this.IsFilled,
                 'bg-success bg-opacity-10': this.IsFilled
                 }">
        <div class="col-12 col-md-6 ms-0 ps-0 pe-0 pe-md-2">
            <div class="input-group input-group-lg">
                <span class="input-group-text" @click="ToggleCollapse">{{ index+1 }}</span>
                <div class="form-floating">
                    <input type="text" 
                           class="form-control" 
                           :id="`name-input-${index}`" 
                           placeholder="Наименование" 
                           :value="position.name" 
                           @input="updateName"/>
                    <label :for="`name-input-${index}`">Наименование</label>
                </div>
            </div>
        </div>
        <div class="col-4 col-md-2 col-lg-3 mt-1 mt-md-0 pe-0">
            <div class="form-floating">
                <input type="text" 
                    class="form-control" 
                    :id="`price-input-${index}`"  
                    placeholder="Цена" 
                    :value="position.price" 
                    @input="updatePrice"/>
                <label :for="`price-input-${index}`">Цена</label>
            </div>
        </div>
        <div class="col-4 col-md-2 mt-1 mt-md-0 pe-0">
            <div class="form-floating">
                <input type="number" 
                    class="form-control" 
                    :id="`count-input-${index}`"
                    placeholder="Количество" 
                    :value="position.count" 
                    @input="updateCount"/>
                <label :for="`count-input-${index}`">Количество</label>
            </div>
        </div>
        <div class="col-3 col-sm-2 col-lg-1 text-center align-self-center">
            <button class="btn btn-sm btn-danger" @click="$emit('remove', position)">Удалить</button>
        </div>
        <div :id="`collapse-${index}`" class="collapse">
            <PositionParticipants :position="position" @show-add-modal="ShowAddModal" @show-edit-modal="ShowEditModal" @show-delete-modal="ShowDeleteModal"/>
        </div>
    </div>

</template>

<script>
import bootstrap from 'bootstrap/dist/js/bootstrap'
import PositionParticipants from '@/components/position_participant/PositionParticipants.vue'

export default {
    name: "PositionItem",
    components: {
        PositionParticipants
    },
    data() {
        return {
            collapse: null
        }
    },
    props: {
        position: {
            type: Object,
            required: true
        },
        index: {
            type: Number,
            required: true
        }
    },
    methods: {
        updateName(event) {
            this.$emit("update", {...this.position, name: event.target.value})
        },
        updatePrice(event) {
            var newVal = parseFloat(event.target.value)
            if (isNaN(newVal) || newVal < 0) {
                event.target.value = 0
                return
            }
            this.$emit("update", {...this.position, price: event.target.value})
        },
        updateCount(event) {
            var newVal = parseInt(event.target.value)
            var neededCount = this.HasPairedParticipant ? this.FilledCount + 1 : this.FilledCount
            if (neededCount === 0) neededCount = 1
            if (newVal < neededCount) {
                event.target.value = neededCount
                return
            }
            this.$emit("update", {...this.position, count: parseInt(event.target.value)})
        },
        ToggleCollapse() {
            if (!this.collapse) {
                this.collapse = new bootstrap.Collapse(document.getElementById(`collapse-${this.index}`));
            }
            this.collapse.toggle()
        },
        ShowAddModal(position) {
            this.$emit('show-add-modal', position)
        },
        ShowEditModal(data) {
            this.$emit('show-edit-modal', data)
        },
        ShowDeleteModal(position) {
            this.$emit('show-delete-modal', position)
        }
    },
    computed: {
        IsFilled() {
            var participants = this.position.participants
            if (participants == null) 
                return false

            if (this.HasPairedParticipant)
                return true
            
            if (this.FilledCount >= this.position.count)
                return true

            return false
        },
        HasPairedParticipant(){
            var participants = this.position.participants
            if (participants == null) 
                return false
            return participants.find(p => p.count == -1) != null ? true : false
        },
        FilledCount() {
            var sum = 0;
            if (this.position.participants != null)
                this.position.participants.filter(el => el.count > 0).forEach(el => sum += el.count);
            return sum;
        }
    }
}
</script>

<style scoped>
span.input-group-text {
    cursor: pointer;
}
</style>