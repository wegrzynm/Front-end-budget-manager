<template>
<div class="currency">
    <h2 @click="toggleSetting">Currency <span v-if="toggle">&#9660;</span><span v-else>&#9650;</span> </h2>
    <section v-if="!toggle">
       <select name="currency"  v-model="currency" @change="changeCurrency">
            <option :key="currency.id" v-for="currency in currencyList" :value="currency.shortcut ? currency.shortcut : currency.symbol">{{ currency.name }} | {{ currency.shortcut ? currency.shortcut : currency.symbol }}</option>
       </select>
    </section>
</div>
</template>
<script>

export default {
    name: "App-Settings-Currency",
    data () {
      return {
        toggle: true,
        currencyList: [],
        currency: localStorage.getItem('currency')
      }  
    },
    methods: {
        toggleSetting () {
            this.toggle = !this.toggle
        },
        async fetchCurrency() {
            const headers = { "Content-Type": "application/json", 'Authorization': localStorage.getItem('token') };
            let res = await fetch(`api/currencies`, { headers })
            const data = await res.json()
            return data
        },
        async changeCurrency() {
            localStorage.setItem('currency', this.currency)
            const newCurrency = {
                "currency": `api/currencies/${this.currencyList.find(element => element.shortcut ? element.shortcut == this.currency : element.symbol == this.currency).id}`
            }
           
           const res = await fetch(localStorage.getItem('user'), {
                method: 'PUT',
                headers: {
                'Content-type': 'application/json',
                'Authorization': localStorage.getItem('token')
                },
                body: JSON.stringify(newCurrency)
            })
            const data = await res.json()
            return data
        },
    },
    async created () {
        this.currencyList = await this.fetchCurrency()
    }

}
</script>

<style scoped>
.currency {
    width: 80%;
    text-align: left;
    margin: auto;
    display: inline-block;
    margin-bottom: 15px;
}

section {
    display: inline-block;
    width: 100%;
    min-height: 50px;
}
</style>
