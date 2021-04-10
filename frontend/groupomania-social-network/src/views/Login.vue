<template>
  <div class="login">
    
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
.login{
  height: 100%;
}
</style>

