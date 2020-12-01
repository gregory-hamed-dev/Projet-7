<template>
    <section>
        <div id="nav">
            <img class="logo" src="../assets/icon-left-font-monochrome-black.svg">
            <div class="links">
                <a href="http://localhost:8080/home">Home</a>
            </div>    
        </div>  
        <div class="div_post_content">
        <form @submit.prevent="updateMessage" method="post" id="post-message">
            <label for="article-title" class="label-profil-group">Titre</label>
            <input id='article-title' type="text" placeholder="Votre titre ..." v-model="title">
            <label for="post_textarea" class="label-profil-group">commentaire</label>
            <textarea id="post_textarea" placeholder="  Votre commentaire ..." maxlength="500" required v-model="post"></textarea>
            <button class ="submit-com" type ="submit" value="publier">publier</button>
        </form>
    </div>
    </section>
    
</template>
<script>
const axios = require ("axios")
import VueJwtDecode from 'vue-jwt-decode';
export default {
    name:'updateMessage',
    data() {
        return{
            title: '',
            post: '',
            user: '',
            token: ''
        }
    },
    methods : {
        updateMessage() {
            const url = 'http://127.0.0.1:3000/message/update/'
            axios.put(url + this.user.userId + '/' + this.$route.params.id, {title: this.title, post: this.post})
            .then(() => {
                console.log('modification du message utilisateur réussie')
                window.location.href = `/home/`
            })
            .catch(() =>{
                console.log('échec de la modification du message')
            })
        }
    },
    mounted () {
            
            const url = 'http://127.0.0.1:3000/message/'
            this.token = localStorage.getItem('token');
            this.user = VueJwtDecode.decode(this.token);
            axios.defaults.headers.common['Authorization'] = "Bearer " + this.token;
            axios.get(url  + this.$route.params.id)
            .then(response => (this.title = response.data.title, this.post = response.data.post))
            .catch(error => console.log(error))
    }
}


</script>
<style lang='scss'>
 $font: roboto;
 .div_post_content{
     margin-top: 25px;
 }
#post_textarea{
   
    height: 75px; 
    resize: none;
    border: 0.5px solid grey;
    font-family: $font;
    margin-top: 20px;
    font-size: 17px;
  }
  #article-title{
    border: 0.5px solid grey;
    font-family: $font;
    margin-top: 20px;
    font-size: 17px;
  }
 
  .submit-com{
    display: block;
    margin-top: 20px;
    background: rgba(77, 66, 122, 0.6);
    color: white;
    padding: 5px 10px;
    font-family: $font;
    width: 100px;
    cursor: pointer;
    transition: 0.7s;
      
      &:hover {
        background: rgb(77, 66, 122);
      }
  }
  #post-message{
   
      display: flex;
      flex-direction: column;
      width: 50%;
      margin-left: auto;
      margin-right: auto;

  }
</style>
