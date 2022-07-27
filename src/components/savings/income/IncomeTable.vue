<template>
    <h1>Income</h1>
    <Button @btn-click="toggleAddIncome"  :text="showAddIncome ? 'Close' : 'Add income'"
        :color="showAddIncome ? 'red' : '#4CAF50'" />
        <div v-if="showAddIncome">
            <AddIncome @add-income="addIncome"/>
        </div>
    <easy-data-table 
    :headers="headers"
    :items="savings"
    :rows-per-page="12"
    :theme-color="'#4CAF50'"
    :sort-by="'date'"
    class="table"
    />
</template>

<script>
import Button from '../../Button.vue'
import AddIncome from './AddIncome.vue'

export default {
    name: 'App-Income-Table',
    props: {
        savings: Object
    },
    data() {
        return {
            showAddIncome: false,
            headers: [
                { text: "Date", value: "date", width: 50 },        
                { text: "Income", value: "sumIncome", width: 50 },    
            ],
        }
    },
    methods: {
        addIncome(newIncome) {
            this.$emit('add-income', newIncome)
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
        toggleAddIncome () {
            this.showAddIncome = !this.showAddIncome
        },
    },
    components: {
        Button,
        AddIncome
    },
    emits: ['add-income', 'newIncome']
}
</script>

<style scoped>
.table {
    width: 50%;
    margin: auto;
}
</style>
