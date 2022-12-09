<template>
  <Navigation />
  <router-view />
</template>

<script>
import { defineAsyncComponent } from 'vue';
const Navigation = defineAsyncComponent(() => import('./components/navigation'));
import './assets/css/fonts.css';
import './assets/css/utility-classes.css';
import './assets/css/global-styles.css'

export default {
  components: { 
    Navigation,
  }
}
</script>

<style>
#app {
  font-family: Lato, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
