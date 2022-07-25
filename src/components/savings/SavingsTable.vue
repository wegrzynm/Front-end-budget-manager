<template>
    <h1>Savings</h1>
    <easy-data-table
    :headers="headers"
    :items="savings"
    rows="100"
    :rows-per-page="12"
    :theme-color="'#4CAF50'"
    class="table"
    />
</template>

<script>
export default {
    name: 'App-Savings-Table',
    data () {
        return {
            headers: [   
                { text: "Income", value: "sumIncome", width: 10 },        
                { text: "Budget", value: "budget.budget", width: 10 },        
                { text: "Expenses", value: "sumExpenses", width: 10 },        
                { text: "Savings", value: "sumSavings", width: 10 },          
                { text: "Date", value: "date", width: 60 }
            ]
        }
    },
    props: {
        savings: Object,
    },
}
</script>

<style scoped>
.table {
    width: 50%;
    margin: auto;
}
</style>
