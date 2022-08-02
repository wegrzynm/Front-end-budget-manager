<template>
    <div class="template">
        <semipolar-spinner
            v-if="isLoading"
            class="loader"
            :animation-duration="2000"
            :size="300"
            color="#4CAF50"
            />
            
    <SavingsTable :savings="savings" v-if="!isLoading"/>   
    <div class="split">
        <BudgetTable :budget="budget" @add-budget="addBudget" v-if="!isLoading"/>
        <IncomeTable :savings="savings" @add-income="addIncome" v-if="!isLoading"/>
    </div> 
    </div>
</template>

<script>
import SavingsTable from "../components/savings/SavingsTable.vue"
import BudgetTable from "../components/savings/budget/BudgetTable.vue"
import IncomeTable from "../components/savings/income/IncomeTable.vue"

export default {
    name: 'App-Savings',
    components: {
    SavingsTable,
    BudgetTable,
    IncomeTable
},
    data () {
        return {
        savings: [],
        budget: [],
        income: [],
        currency: this.currency,
        isLoading: true
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
        async fetchSavings () {
            let date = this.getDate(false).slice(0,4)
            const headers = { "Content-Type": "application/json", 'Authorization': localStorage.getItem('token') };
            const res = await fetch(`api/savings?date=${date}`, { headers })
            const data = await res.json()
            return data
        },
        async fetchBudget () {
            let date = this.getDate(false).slice(0,4)
            const headers = { "Content-Type": "application/json", 'Authorization': localStorage.getItem('token') };
            const res = await fetch(`api/budgets?date=${date}`, { headers })
            const data = await res.json()
            return data
        },
        async addBudget(newBudget)
        {
            let doesBudgetExist = await this.doesBudgetExist()
            if(doesBudgetExist.length == 0) {
                this.addNewBudget(newBudget)
            }else {
                this.updateBudget(doesBudgetExist[0].id, newBudget)
            }
        },
        async addIncome(newIncome)
        {
            const res = await fetch('api/incomes', {
                method: 'POST',
                headers: {
                'Content-type': 'application/json',
                'Authorization': localStorage.getItem('token')
                },
                body: JSON.stringify(newIncome)
                })
            const data = await res.json()
           const savingsId = data.savings.slice(13)
           this.savings.find((s) => {
                if(s.id == savingsId ) {
                    s.income.push(`api/incomes/${data.id}`)
                    s.sumIncome += data.income
                }
           } )
        },
        async addNewBudget (newBudget) {
            const res = await fetch('api/budgets', {
                method: 'POST',
                headers: {
                'Content-type': 'application/json',
                'Authorization': localStorage.getItem('token')
                },
                body: JSON.stringify(newBudget)
                })
            const data = await res.json()
            this.budget.push(data)
            return data
        },
        async updateBudget (id, updateBudget) {
        const res = await fetch(`api/budgets/${id}`, {
            method: 'PUT',
                headers: {
                'Content-type': 'application/json',
                'Authorization': localStorage.getItem('token')
                },
                body: JSON.stringify(updateBudget)
            })
            const data = await res.json()
            
            this.budget = this.budget.map((budget) => budget.id === id ? { ...budget, budget: data.budget } : budget)
        },
        async doesBudgetExist () {
        let date = this.getDate(false).slice(0,7)
        const headers = { "Content-Type": "application/json", 'Authorization': localStorage.getItem('token') };
        const res = await fetch(`api/budgets?date=${date}`, { headers })
        const data = await res.json()
        return data
        },
    },
    async created () {
        this.savings = await this.fetchSavings()
        this.budget = await this.fetchBudget()
        this.isLoading = false
    }
}
</script>

<style scoped>
.template {
    background-color: #f2f2f2;
    width: 80%;
    margin: auto;
    padding-top: 10px;
    border-radius: 10px;
    border: 2px solid #2c3e50;
    padding-bottom: 30px;
}
.split {
    width: 100%;
    display: inline-block;
}

.splitedTable {
    width: 40%;
    display: inline-block;
}
</style>
