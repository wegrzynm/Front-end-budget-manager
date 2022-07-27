<template>
    <div class="template">
        <h1>Settings</h1>
        <ProductGroups />
        <PaymentMethods />
        <Language />
    </div>
</template>

<script>
import ProductGroups from '../components/settings/productGroup/ProductGroups.vue'
import PaymentMethods from '@/components/settings/paymentMethod/PaymentMethods.vue'
import Language from '@/components/settings/Language.vue'

export default {
    name: 'App-Settings',
    components: {
    ProductGroups,
    PaymentMethods,
    Language
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
    min-height: 500px;
}
</style>
