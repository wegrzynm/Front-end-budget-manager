<template>
    <h1>Budget</h1>
      <Button @btn-click="toggleAddBudget"  :text="showAddBudget ? 'Close' : 'Add budget'"
        :color="showAddBudget ? 'red' : '#4CAF50'" />
        <div v-if="showAddBudget">
            <AddBudget @add-budget="addBudget"/>
        </div>
    <easy-data-table 
    :headers="headers"
    :items="budget"
    :rows-per-page="12"
    :theme-color="'#4CAF50'"
    :sort-by="'date'"
    class="table"
    />
</template>

<script>
import Button from '../../Button.vue'
import AddBudget from './AddBudget.vue'

export default {
    name: 'App-Budget-Table',
    props: {
        budget: Object
    },
    data() {
        return {
            showAddBudget: false,
            headers: [
                { text: "Date", value: "date", width: 50 },        
                { text: "Budget", value: "budget", width: 50 },    
            ]
        }
    },
    methods: {
        addBudget(newBudget) {
            this.$emit('add-budget', newBudget)
        },
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
        toggleAddBudget () {
            this.showAddBudget = !this.showAddBudget
        },
    },
    components: {
    Button,
    AddBudget
    },
    emits: ['add-budget', 'newBudget']
}
</script>

<style scoped>
.table {
    margin: auto;
    width: 50%;
}
</style>
