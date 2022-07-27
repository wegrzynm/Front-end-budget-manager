<template>
  <div class="template">
    <h1>About</h1>
    <p>Budget Manager v.1.0.0</p>
    <p>Updates coming soon</p>
    <router-link to="/settings">
      Settings
    </router-link>

    <footer>
      Created by Mateusz Węgrzyn &copy;
    </footer>
  </div>
</template>

<style scoped>
.template {
    background-color: #f2f2f2;
    width: 80%;
    margin: auto;
    padding-top: 10px;
    border-radius: 10px;
    border: 2px solid #2c3e50;
    overflow: hidden;
    height: 500px;
}

a {
  color: #4CAF50;
  text-decoration: none;
}

footer {
  display: flexbox;
  margin-top: 300px;
}
</style>
