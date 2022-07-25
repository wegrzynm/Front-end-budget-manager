<template>
    <div class="popup">
        <h1>Do You want to add another expense?</h1>
        <Button :text="'Yes'"
        :color="'#4CAF50'" @click="yes" class="btn"/>
        <Button :text="'No'"
        :color="'red'" @click="no" />
    </div>
</template>

<script>
import Button from './Button.vue'

export default {
    name: 'App-Popup',
    components: {
        Button
    },
    methods: {
        no () {
            this.$router.push('/expenses') 
        },
        yes () {
            this.$emit('select-route', false)
        }
    }
}
</script>

<style scoped>
.popup {
    position: absolute;
    width: 50%;
    height: 50%;
    z-index: 200;
    left: 25%;
    top: 10%;
    color: #2c3e50;
    background-color: #f2f2f2;
    border-radius: 20px;
}

h1 {
    margin-top: 10%;
}
.btn {
    margin-right: 10px;
}
</style>
