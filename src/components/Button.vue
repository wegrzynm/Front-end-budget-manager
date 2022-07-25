<template>
    <button @click="onClick()" :style="{background: color}" class="btn">{{ text }}</button>
</template>

<script>
export default {
  name: 'App-Button',
  props: {
    text: String,
    color: String
  },
  methods: {
    onClick () {
      this.$emit('btn-click')
    }
  }
}
</script>

<style>
.btn {
  width: 50%;
  background-color: #4CAF50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  text-align: center;
}
</style>
