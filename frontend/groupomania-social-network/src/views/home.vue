<template>
  <div class="container">
    <div id="nav">
      <img class="logo" src="../assets/icon-left-font-monochrome-black.svg">
      <div class="links">
          <a href="http://localhost:8080/profil/:userId"><i class="fas fa-users-cog"></i>Profil</a>
          <p class="deconnect" @click="logout"><i class="fas fa-sign-out-alt"></i>Déconnexion</p>
      </div>    
    </div>
    <PostMessage></PostMessage>
    <Allmessages></Allmessages>
  </div>
</template>

<script>
import  PostMessage from '../components/postMessage'
import Allmessages from '../components/home'
export default {
    name: 'Home',
    components: {
      Allmessages,
      PostMessage
    },
    methods: {
      logout() {
        localStorage.removeItem("token")
        this.$router.push('/login')
      }
    }
}
</script>

<style lang="scss" scoped>


  $font: roboto;
  .container{
    font-family: $font ;
  }
  
  
</style>