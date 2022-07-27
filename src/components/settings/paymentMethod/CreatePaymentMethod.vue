<template>
    <form @submit="onSubmit" class="add-form">
      <label>Payment method name</label>
      <input v-model="paymentMethod"  type="text" minlength="1" name="paymentMethod" placeholder="Create new Payment Method" />
      <span v-if="errorMsg" class="errorMsg">Incorrect data</span>
    <input type="submit" value="Create payment method"/>
  </form>
</template>

<script>
export default {
    name: 'App-Settings-Payment-Method-Create',
    data () {
        return {
            paymentMethod:  '',
            errorMsg: false
        }
    },
    methods: {
        async onSubmit(e) {
            e.preventDefault()
            if(this.paymentMethod.length <= 1) {
                this.errorMsg = true
                return;
            }

            const newMethod = {
                "paymentMethod": this.paymentMethod
            }

            const res = await fetch('api/payment_methods', {
            method: 'POST',
            headers: {
            'Content-type': 'application/json'
            },
            body: JSON.stringify(newMethod)
             })

            const data = await res.json()
            this.$emit('update-payment-methods', data)
            this.errorMsg = false
        }
    }
}
</script>

<style>
.add-form {
    width: 100%;
    padding-top: 0;
}
.errorMsg {
    color: red;
}
</style>
