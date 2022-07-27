<template>
<div class="productGroups">
    <h2 @click="toggleSetting">Product groups <span v-if="toggle">&#9660;</span><span v-else>&#9650;</span> </h2>
    <section v-if="!toggle">
        <article class="table">
            <easy-data-table
                    alternating
                    ref="dataTable"
                    :headers="headers"
                    :items="groups"
                    rows="10"
                    :rows-per-page="7"
                    :theme-color="'#4CAF50'"
                    class="table"
            />
        </article>
        <article class="create">
             <h3>Create new product group: </h3> <br>
             <CreateProductGroup @update-product-groups="updateProductGroups"/>
        </article>
    </section>
</div>
</template>
<script>
import CreateProductGroup from "./CreateProductGroup.vue";

export default {
    name: "App-Settings-Product-Group",
    data() {
        return {
            groups: [],
            toggle: true,
            headers: [
                { text: "Product groups", value: "productGroup" }
            ],
        };
    },
    methods: {
        async fetchGroups() {
            const headers = { "Content-Type": "application/json" };
            const res = await fetch("api/product_groups", { headers });
            const data = await res.json();
            return data;
        },
        updateProductGroups(productGroup) {
            this.groups = [...this.groups, productGroup]
        },
        toggleSetting () {
            this.toggle = !this.toggle
        }
    },
    async created() {
        this.groups = await this.fetchGroups();
    },
    components: { CreateProductGroup }
}
</script>

<style scoped>
.productGroups {
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
