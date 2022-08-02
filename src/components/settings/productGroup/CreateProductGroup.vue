<template>
    <form @submit="onSubmit" class="add-form">
      <label>Name</label>
      <input v-model="productGroup"  type="text" minlength="1" name="productGroup" placeholder="Create new Product Group" />
      <span v-if="errorMsg" class="errorMsg">Incorrect data</span>
    <input type="submit" value="Create group"/>
  </form>
</template>

<script>
export default {
    name: 'App-Settings-Product-Group-Create',
    data () {
        return {
            productGroup:  '',
            errorMsg: false
        }
    },
    methods: {
        async onSubmit(e) {
            e.preventDefault()
            if(this.productGroup.length <= 1) {
                this.errorMsg = true
                return;
            }

            const newGroup = {
                "productGroup": this.productGroup
            }

            const res = await fetch('api/product_groups', {
            method: 'POST',
            headers: {
            'Content-type': 'application/json'
            },
            body: JSON.stringify(newGroup)
             })

            const data = await res.json()
            this.$emit('update-product-groups', data)
            this.errorMsg = false
            return data
        }
    }
}
</script>

<style scoped>
.add-form {
    width: 100%;
    padding-top: 0;
}
.errorMsg {
    color: red;
}
</style>
