<template>
  <div class="container">
    <div id="nav">
      <img class="logo" src="../assets/icon-left-font-monochrome-black.svg">
      <div class="links">
          <a href="http://localhost:8080/home">Home</a>
          <a href="http://localhost:8080/profil/:userId"><i class="fas fa-users-cog"></i>Profil</a>
          <p class="deconnect" @click="logout"><i class="fas fa-sign-out-alt"></i>Déconnexion</p>
      </div>    
    </div>
    
    <div class="div_post_content">
      <textarea id="post_textarea" placeholder="Votre commentaire ..." maxlength="255" required></textarea>
    </div>
    <div class="post_submit">
      <input type="button" value="poster" id="btn_new_post" class="button"/>
    </div>
    
    <Allmessages></Allmessages>
  </div>
</template>

<script>
import Allmessages from '../components/home'
export default {
    name: 'Home',
    components: {
      Allmessages
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

  #nav {
  padding: 30px;
  display: flex;
  justify-content: space-between;
  box-shadow: 0 4px 2px -2px gray;
  }
  .links{
    margin-right: 20px;
    display: flex;
    align-items: center;
    font-weight: bold;
    
  }
  a {
    
    border-radius: 10px;
    color: #2c3e50;
    text-decoration: none;
    padding: 10px;
    color: black;
    font-size: 15px;
    margin-right: 15px;

    &.router-link-exact-active {
      color: purple;
    }
  }
  .logo{
    height: 40px;
    margin-left: 10px;
  }
  .fas{
    font-size: 20px;
    margin-right: 5px;
  }
  .deconnect{
    cursor: pointer;
  }
  .container{
    font-family: $font ;
  }
  .div_post_content{
    margin-top: 50px;
  }
  textarea{
    width: 50%; 
    height: 100px; 
    resize: none;
    padding-left: 10px;
    font-family: $font;
  }

  .post_submit{
   width: 50%;
   margin: 10px auto;
  }
  input{
    display: block;
  }
  .button{
    background: rgb(64, 62, 163);
    color: white;
    padding: 5px 10px;
    font-family: $font;
  }
</style>