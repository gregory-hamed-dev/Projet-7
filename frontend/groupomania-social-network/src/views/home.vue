<template>
  <div class="container">
    <div id="nav">
      <img class="logo" src="../assets/icon-left-font-monochrome-black.svg">
      <div class="links">
          <a href="http://localhost:8080/profil/1">modifier profil</a>
          <p class="deconnect" @click="logout">Déconnexion</p>
      </div>    
    </div>
    <Profil></Profil>
    <a href="../message/create"><p id="sendMess">Créer nouvel article</p></a>
    <Allmessages></Allmessages>
  </div>
</template>

<script>
import Profil from '../components/profil/getProfil'
import Allmessages from '../components/wall/home'
export default {
    name: 'Home',
    components: {
      Allmessages,
      Profil
    },
    methods: {
      logout() {
        localStorage.removeItem("token")
        this.$router.push('/')
      }
    }
}
</script>

<style lang="scss" scoped>
  $font: roboto;
  .container{
    font-family: $font ; 
  }
  #sendMess{
     background: rgba(91, 91, 156, 0.7);
     color: white;
     width: 10%;
     margin: 10px auto;
     padding: 10px;
     transition: 0.5s;
     
      &:hover{
        background: rgba(67, 67, 114, 0.8);
      }
  }

</style>