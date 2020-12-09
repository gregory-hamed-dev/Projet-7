<template>
  <div class="signup">
    <div id="nav">
      <img class="logo" src="../assets/icon-left-font-monochrome-black.svg">
      <div class="links">
        <a href="http://localhost:8080">Se connecter</a>
      </div>    
    </div>
   <Signup/>
  </div>
</template>
<script>
import Signup from '../components/auth/signup'
export default {
  name: 'App',
  components: {
    Signup
  } 
}
</script>
