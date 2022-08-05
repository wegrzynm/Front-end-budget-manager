<template>
<div class="template">
  <div v-show="logged">
    <Button :text="'Logout'" @click="logout" :color="'black'"  class="btn-go-back" />
    <div>
      <h1>Budget Manager</h1>
    </div>
    <div class="menu">
      <div class="item">
        <router-link to="/expenses/create">Create expense</router-link>
      </div>
      <div class="item">
              <router-link to="/expenses">Expenses</router-link>
      </div>
      <div class="item">
        <router-link to="/savings">Savings</router-link>
      </div>    
    </div>
    <footer>
        <router-link to="/about">
              About
        </router-link>
        &copy; 2022 M.Wegrzyn 
    </footer>
  </div>
</div>
</template>

<script>
import Button from '../components/Button.vue'
export default {
  data() {
      return {
          logged: false
      };
  },
  methods: {
    logout() {
      localStorage.clear()
      this.logged = false
      this.$router.push('/login') 
    },
    getStatus() {
      if(localStorage.getItem('logged') != false && localStorage.getItem('logged') !== null) {
        this.logged = true
      } else {
        this.$router.push('login')
      }
    }
  },
  async created() {
    this.getStatus()
  },
  components: { Button }
}
</script>

<style scoped>
h1 {
  font-size: 3em;
  width: 75%;
  color: #4CAF50;
  border: 10px solid #4CAF50;
  border-radius: 20px;
  margin: 25px auto 20px auto;
  padding: 30px 0 30px 0;
}

.menu {
  color: #2c3e50;
  width: 75%;
  height: 80%;
  margin: auto;
  font-size: 2em;
  text-decoration: none;
  padding-bottom: 30px;
  font-weight: bold;
  font-size: 2.5em;
}

.menu > .item {
  padding: 25px;
}

.menu > .item > a {
  text-decoration: none;
  color: #2c3e50;
}

.menu > .item:hover {
  background-color: lightgray; 
}

.menu > .item > a:hover {
  color: #4CAF50;
}
</style>
