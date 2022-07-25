<template>
<div class="template">
    <h1>Create expense</h1>

    <semipolar-spinner
    class="loader"
    v-if="isLoading"
    :animation-duration="2000"
    :size="300"
    color="#4CAF50"
    />
    <form @submit="onSubmit" v-if="!isLoading">
        <label for="productName">Product name: </label>
        <input list="products" name="productName" id="product" required v-model="productName" >
        <datalist id="products">
            <option :key="product.id" :value="productName.id" v-for="product in products">{{ product.name }}</option>
        </datalist>
        
        <br>
        <label for="productQuantity">Product quantity</label>
        <input type="number" min="1" name="productQuantity" v-model="productQuantity" required/>
        
        <label for="productGroup">Product quantity</label>
        <select name="productGroup" required v-model="productGroup">
            <option :key="productGroup.id" v-for="productGroup in productGroups" :value="productGroup.id" >{{ productGroup.productGroup }}</option>
        </select>
        <label for="productPrice">Product price</label>
        
        <input type="number" name="productPrice" step="0.01" required v-model="productPrice"/>
        <label for="boughtDate">Bought date</label>
        <input type="date" name="boughtDate" v-model="boughtDate" required/>

        <label for="paymentMethod">Payment metohod</label>
        <select name="paymentMethod" required v-model="paymentMethod">
            <option :key="paymentMethod.id" v-for="paymentMethod in paymentMethods" :value="paymentMethod.id">{{ paymentMethod.paymentMethod }}</option>
        </select>
        <input type="submit" name="submit" value="Add expense"/>
    </form>
    <Popup v-if="selectRoute" @select-route="setSelectRoute" class="popup"/>
</div>
</template>

<script>
import { SemipolarSpinner  } from 'epic-spinners'
import Popup from '../components/Popup.vue'

export default {
    name: 'App-Create-Expense',
    components: {
        SemipolarSpinner,
        Popup
    },
    data () {
        return {
            numberOfForms: 1,
            products: [],
            productGroups: [],
            paymentMethods: [],
            productName: '',
            productGroup: 1,
            productQuantity: 1,
            productPrice: 0,
            boughtDate: this.getDate(false),
            paymentMethod: 1,
            isLoading: true,
            selectRoute: false
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
        createForms () {
            const number = document.querySelector('input[name=numberOfForms]').value
            if (number < 1 || number == "")
            {
                this.numberOfForms = 1
                return;
            }else if ( number > 15) {
                this.numberOfForms = 15
                return;
            }

            this.numberOfForms = parseInt(number)
        },
        async onSubmit (e) {
        e.preventDefault()
        this.isLoading = true
        this.selectRoute = true

        this.productGroup = `api/product_groups/${this.productGroup}`
        this.paymentMethod = `api/payment_methods/${this.paymentMethod}`

        let doesProductExist = await this.fetchProduct(this.productGroup, this.productName, this.productPrice)
        if(doesProductExist.length > 0) {
            this.productName = `api/products/${doesProductExist[0].id}`
        }else {
            this.createProduct()
        }

        let doesSavingsExist = await this.doesSavingsExist(null);
        if(doesSavingsExist.length == 0) {
            let doesBudgetExist = await this.doesBudgetExist(null)
            if(doesBudgetExist.length > 0) {
                doesBudgetExist = doesBudgetExist[0].id
            }else {
                doesBudgetExist = await this.createBudget()
            }
            doesBudgetExist = `api/budgets/${doesBudgetExist}`
            doesSavingsExist = await this.createSavings(doesBudgetExist)
        }else {
            doesSavingsExist = doesSavingsExist[0].id
        }

        doesSavingsExist = `api/savings/${doesSavingsExist}`
        this.createExpense(doesSavingsExist)
        
        this.productName = ''
        this.productQuantity = 1
        this.productGroup = 1
        this.productPrice = 0
        this.paymentMethod = 1
        },

        setSelectRoute (option) {
            this.selectRoute = option
            this.isLoading = option
        },

        async createProduct () {
            const newProduct = {
                "name": this.productName,
                "productGroup": this.productGroup,
                "price": this.productPrice
            }

            const res = await fetch('api/products', {
            method: 'POST',
            headers: {
            'Content-type': 'application/json'
            },
            body: JSON.stringify(newProduct)
             })

            if(res.status === 201) {
                const data = await res.json()
                this.productName = `api/products/${data.id}`
            }
        },
        async createBudget () {
            let date = this.getDate(true).slice(0,7)
            let isBudgetAutoRenew = await this.doesBudgetExist(date)
            let newBudget = {
                "budget": 0,
                "date": this.boughtDate,
                "autoRenew": false
            }
            if(isBudgetAutoRenew.length > 0) {
                newBudget = {
                    "budget": isBudgetAutoRenew[0].budget,
                    "date": this.boughtDate,
                    "autoRenew": true
                }
            }
            const res = await fetch('api/budgets ', {
            method: 'POST',
            headers: {
            'Content-type': 'application/json'
            },
            body: JSON.stringify(newBudget)
             })

            if(res.status === 201) {
                const data = await res.json()
                return data.id
            }             
        },
        async createSavings(budget) {
            const newSavings = {
                "isTargetPassed": false,
                "date": this.boughtDate,
                "budget": budget
            }

            const res = await fetch('api/savings', {
            method: 'POST',
            headers: {
            'Content-type': 'application/json'
            },
            body: JSON.stringify(newSavings)
             })

            if(res.status === 201) {
                const data = await res.json()
                return data.id
            }       
        },
        async createExpense(savings) {
            const newExpense = {
                "quantity": this.productQuantity,
                "cost": (parseInt(this.productQuantity)*parseFloat(this.productPrice)),
                "boughtDate": this.boughtDate,
                "paymentMethod": this.paymentMethod,
                "savings": savings,
                "product": this.productName
            }

            const res = await fetch('api/expenses', {
            method: 'POST',
            headers: {
            'Content-type': 'application/json'
            },
            body: JSON.stringify(newExpense)
             })

            const data = await res.json()
            return data
        },

        async fetchProduct (productGroup, productName, productPrice) {
            const headers = { "Content-Type": "application/json" };
            const res = await fetch(`api/products?page=1&productGroup.productGroup=${productGroup}&name=${productName}&price=${productPrice}`, { headers })
            const data = await res.json()
            return data
        },
        async doesSavingsExist (date) {
            if(date === null) {
                date = this.boughtDate.slice(0,7)
            }
            const headers = { "Content-Type": "application/json" };
            const res = await fetch(`api/savings?date=${date}`, { headers })
            const data = await res.json()
            return data
        },
        async doesBudgetExist (date) {
            if(date === null) {
                date = this.boughtDate.slice(0,7)
            }
            const headers = { "Content-Type": "application/json" };
            let res = await fetch(`api/budgets?date=${date}`, { headers })
            const data = await res.json()
            return data
        },
        async fetchProducts () {
            const headers = { "Content-Type": "application/json" };
            const res = await fetch('api/products', { headers })
            const data = await res.json()
            return data
        },
        async fetchProductGroups () {
            const headers = { "Content-Type": "application/json" };
            const res = await fetch('api/product_groups', { headers })
            const data = await res.json()
            return data
        },
        async fetchPaymentMethods () {
            const headers = { "Content-Type": "application/json" };
            const res = await fetch('api/payment_methods', { headers })
            const data = await res.json()
            return data
        },
    },
    async created () {
        this.products = await this.fetchProducts()
        this.productGroups = await this.fetchProductGroups()
        this.paymentMethods = await this.fetchPaymentMethods()
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
    overflow: hidden;
}
</style>

