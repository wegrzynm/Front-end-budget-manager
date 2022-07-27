<template>
    <div class="template">
        <h1>Expenses</h1>
        <div class="showGroups" v-if="!isLoading" >
        <Button :text="'All'" :color="'#4CAF50'"  @click="chooseGroup(0)" class="groupButton"/>
        <Button :key="group.id" v-for="group in groups" :text="group.productGroup" :color="'#4CAF50'"  @click="chooseGroup(group.id)" class="groupButton"/>
        </div>
        <semipolar-spinner
            class="loader"
            v-if="isLoading"
            :animation-duration="2000"
            :size="300"
            color="#4CAF50"
            />
            
        <div v-if="!isLoading">
            Total expenses: {{ totalExpenses }}{{ currency }}
        </div>    

        <easy-data-table
        alternating
        :headers="headers"
        :items="expenses"
        rows="100"
        :rows-per-page="50"
        :theme-color="'#4CAF50'"
        class="table"
        v-if="!isLoading"
        />
    </div>
</template>

<script>
import Button from '../components/Button.vue'

export default {
    name: 'App-Expenses',
    components: {
    Button
},
    data () {
    return {
      groups: [],
      expenses: [],
      isLoading: true,
      totalExpenses: 0,
      headers: [
                { text: "ID", value: "id", sortable: true },        
                { text: "Product name", value: "product.name" },        
                { text: "Quantity", value: "quantity" },        
                { text: "Product group", value: "product.productGroup.productGroup" },        
                { text: "Product price", value: "product.price" },        
                { text: "Total cost", value: "cost" },        
                { text: "Payment method", value: "paymentMethod.paymentMethod" },        
                { text: "Bought date", value: "boughtDate", sortable: true }     
            ],
    }
    },
    methods: {
        async fetchGroups () {
        const headers = { "Content-Type": "application/json" };
        const res = await fetch('api/product_groups', { headers })
        const data = await res.json()
        return data
        },
        async fetchExpensesGroup (id) {
        const headers = { "Content-Type": "application/json" };
        const res = await fetch(`api/expenses?product.productGroup=${id}`, { headers })
        const data = await res.json()
        return data
        },
        async fetchExpenses () {
        const headers = { "Content-Type": "application/json" };
        const res = await fetch('api/expenses', { headers })
        const data = await res.json()
        return data
        },
        async chooseGroup (id) {
            this.isLoading = true
            if(id == 0) {
                this.expenses = await this.fetchExpenses()
            }else {
                this.expenses = await this.fetchExpensesGroup(id)
            }
            this.isLoading = false
        },
        getTotalExpenses() {
            let totalExpenses = 0
            for(let i = 0; i< this.expenses.length; i++) {
                totalExpenses += this.expenses[i].cost
            }
            return Math.round(totalExpenses*100)/100
        }
    },
    async created () {
        this.expenses = await this.fetchExpenses()
        this.groups = await this.fetchGroups()
        this.totalExpenses = this.getTotalExpenses()
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
}

h1 {
    font-size: 38px;
}

.groupButtons {
    width: 80%;
    display: inline-flex;
}
.groupButton {
    width: 12%;
    margin-right: 15px;
    display: flexbox;
}
.table {
    margin: auto;
    border-top: #2c3e50 2px solid;
    margin-top: 20px;
    --easy-table-header-background-color: #f2f2f2;
    --easy-table-body-row-background-color: #f2f2f2;
    --easy-table-footer-background-color: #f2f2f2;
}  
</style>
