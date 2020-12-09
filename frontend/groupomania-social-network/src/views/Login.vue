<template>
  <div class="login">
    <div id="nav">
      <img class="logo" src="../assets/icon-left-font-monochrome-black.svg">
      <div class="links">
        <a href="http://localhost:8080/signup">S'inscrire</a>
      </div>    
    </div>
    <Login/>
  </div>
</template>

<script>
  import Login from '../components/auth/login'
  export default {
    name: 'App',
    components: {
      Login
    }
  }
</script>
<style lang="scss">

</style>

