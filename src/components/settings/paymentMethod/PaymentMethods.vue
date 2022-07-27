<template>
<div class="paymentMethods">
    <h2 @click="toggleSetting">Payment methods <span v-if="toggle">&#9660;</span><span v-else>&#9650;</span></h2>
    <section v-if="!toggle">
        <article class="table">
            <easy-data-table
                    alternating
                    :headers="headers"
                    :items="methods"
                    rows="5"
                    :rows-per-page="5"
                    :theme-color="'#4CAF50'"
                    class="table"
            />
        </article>
        <article class="create">
             <h3>Create new payment method: </h3> <br>
             <CreatePaymentMethod @update-payment-methods="updatePaymentMethods"/>
        </article>
    </section>
</div>
</template>
<script>
import CreatePaymentMethod from "./CreatePaymentMethod.vue";

export default {
    name: "App-Settings-Payment-Methods",
    data() {
        return {
            toggle: true,
            methods: [],
            headers: [
                { text: "Payment methods", value: "paymentMethod" }
            ],
        };
    },
    methods: {
        async fetchMethods() {
            const headers = { "Content-Type": "application/json" };
            const res = await fetch("api/payment_methods", { headers });
            const data = await res.json();
            return data;
        },
        updatePaymentMethods(paymentMethod) {
            this.methods = [...this.methods, paymentMethod]
        },
        toggleSetting () {
            this.toggle = !this.toggle
        }
    },
    async created() {
        this.methods = await this.fetchMethods();
    },
    components: { CreatePaymentMethod }
}
</script>

<style scoped>
.paymentMethods {
    width: 80%;
    text-align: left;
    margin: auto;
    display: inline-block;
    margin-bottom: 15px;
}

section {
    display: inline-block;
    width: 100%;
    min-height: 350px;
}

article {
    float: left;
}


article > table {
    width: 100%;
}

.create {
    width: 50%;
    margin-left: 5%;
    text-align: center;
}
</style>
