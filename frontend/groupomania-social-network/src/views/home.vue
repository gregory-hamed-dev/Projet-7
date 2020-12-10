<template>
  <div class="main-container">
    <div id="nav">
      <img class="logo" src="../assets/icon-left-font-monochrome-black.svg">
      <div class="links">
          <p class="deconnect" @click="logout">Déconnexion</p>
      </div>    
    </div>
    <Profil></Profil>
    <a href="../message/create"><p id="sendMess"><i class="fas fa-pen"></i>Nouveau post</p></a>
    <section class="container">
        <Allmessages></Allmessages>
  
    </section>
  </div>
</template>

<script>
import Profil from '../components/profil/getProfil'
import Allmessages from '../components/wall/allMessage'
import VueJwtDecode from 'vue-jwt-decode';

export default {
    name: 'Home',
    components: {
      Allmessages,
      Profil,
    },
    data() { 
      return {
        user: null
      }
    },
    methods: {
      logout() {
        localStorage.removeItem("token")
        this.$router.push('/')
      }
    },
    mounted() {
      this.token = localStorage.getItem('token');
      this.user = VueJwtDecode.decode(this.token)
      console.log(this.user.id)
    }
}
</script>

<style lang="scss" scoped>
  $font: roboto;
  .main-container{
    font-family: $font ; 
  }
  .avatar{
    width: 40px;
    height: 40px;
    border-radius: 50%;
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
 .container{
   display: flex;
   justify-content: center;
 }
 //responsive vue 
 @media (max-width: 850px) {
   #sendMess{
     width: 50%;
   }
 }
</style>