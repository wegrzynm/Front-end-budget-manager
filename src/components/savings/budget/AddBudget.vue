<template>
    <semipolar-spinner
      v-if="isLoading"
      class="loader"
      :animation-duration="2000"
      :size="300"
      color="#4CAF50"
    />
    <form @submit="onSubmit" class="add-form" v-if="!isLoading">
      <label>Budget</label>
      <input v-model="budget"  type="number" step="0.01" min="0" name="budget" placeholder="Add Budget" />
      <label>Set auto renew</label>
      <input type="checkbox" v-model="autoRenew" name="autoRenew" />
    <input type="submit" value="Save Budget" class="btn btn-block" />
  </form>
</template>

<script>
export default {
  name: 'App-AddBudget',
  components: {
    
  },
  data () {
    return {
      budget: 0,
      autoRenew: true,
      isLoading: false
      }
  },
  methods: {
    getDate(lastMonth) {
        let dt =  new Date()
        let year =  dt.getFullYear()
        let month = (dt.getMonth() + 1).toString().padStart(2, "0")

        if(lastMonth == true) {
            month = (dt.getMonth()).toString().padStart(2, "0")
        }
        let day = dt.getDate().toString().padStart(2, "0")
        return `${year}-${month}-${day}`
    },
    async onSubmit (e) {
        e.preventDefault()
        this.isLoading = true
        const newBudget = {
            budget: this.budget,
            date: this.getDate(false).slice(0,10),
            autoRenew: this.autoRenew,
            "user": localStorage.getItem('user')
        }

        this.$emit('add-budget', newBudget)

        this.budget = 0
        this.autoRenew = true
        this.isLoading = false
    }
  },
  emits: ['add-budget']
}
</script>
