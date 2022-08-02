<template>
  <router-link to="/" v-show="homePage">
        <Button :text="'Go back'" :color="'black'"  class="btn-go-back"/>
    </router-link>
  <router-view/>
</template>

<script>
import Button from './components/Button.vue'
export default {
  components: {
    Button
  },
  computed: {
    homePage () {
      if (this.$route.path != '/') {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  margin: 0;
  width: 100%;
  height: 100%;
  background-color: gray;
}

input[type=number], input[type=text], select, input[type=date], input[list], input[type=email], input[type=password] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  text-align: center;
}

input[type=submit] {
  width: 100%;
  background-color: #4CAF50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type=submit]:hover {
  background-color: #45a049;
}

form {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
  width: 50%;
  margin: auto;
}

.loader
{
    position: absolute;
    left: 38%;
    top: auto;
    z-index: 100;
}

.btn-go-back
{
  width: 80%;
}
</style>
