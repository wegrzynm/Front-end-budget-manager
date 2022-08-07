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
    Button,
},
  data () {
    return {
      user: localStorage.getItem('user'),
    }
  },
  computed: {
    homePage () {
      if (this.$route.path != '/' && this.$route.path != '/login' ) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    logout() {
      localStorage.clear()
      this.$router.push('/login') 
    }
  },
  async created () {
   const that = this;
   setInterval(function() {
    console.log('check')
    if(localStorage.getItem('created') !== null) {
        const created = localStorage.getItem('created')
        const now = Date.now()/1000
        const exp = 3350 //refresh token time so we need to refresh token eariler in my case 5 minutes before it expires
        let timeUntilRefresh = now - created
        if(parseInt(timeUntilRefresh) > exp) {
          that.logout()
        }
      }
   }, 300000)
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

.template {
    background-color: #f2f2f2;
    width: 80%;
    margin: auto;
    padding-top: 10px;
    border-radius: 10px;
    border: 2px solid #2c3e50;
    padding-bottom: 30px;
}

footer {
  font-size: 15px;
  text-decoration: none;  
}
footer > a {
  color: #2c3e50;
  text-decoration: none;
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
