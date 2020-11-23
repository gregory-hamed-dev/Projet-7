<template>
  <div id="app">
    
    <Signup/>
  </div>
</template>

<script>
 import Signup from './components/signup.vue'

export default {
  name: 'App',
  components: {
   Signup
  }
}
</script>

<style lang="scss">
*{
  margin: 0;
}
</style>
