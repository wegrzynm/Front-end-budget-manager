<template>
<div class="language">
    <h2 @click="toggleSetting">Language <span v-if="toggle">&#9660;</span><span v-else>&#9650;</span> </h2>
    <section v-if="!toggle">
       <select name="language">
            <option>English</option>
            <option disabled>Polish</option>
       </select>
    </section>
</div>
</template>
<script>

export default {
    name: "App-Settings-Language",
    data () {
      return {
        toggle: true
      }  
    },
    methods: {
        toggleSetting () {
            this.toggle = !this.toggle
        }
    }
}
</script>

<style scoped>
.language {
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
