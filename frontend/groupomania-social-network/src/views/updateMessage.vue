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
            <input id='article-title' type="text" placeholder="Votre titre ..." maxlength="45" v-model="title" v-on:keyup="titleCompteur()">
            <p class="compteur"><span class='nbrTitle'>0</span>/45</p>
            <label for="post-url" class="label-profil-group">Lien à partager</label>
            <input type="url" id="post-url" placeholder="votre lien...(facultatif)" v-model="url">
            <label for="post_textarea" class="label-profil-group">Commentaire</label>
            <textarea id="post_textarea" placeholder="  Votre commentaire ..." maxlength="500" required v-model="post" v-on:keyup='compteur()'></textarea>
            <p class="compteur"><span class='nbr'>0</span>/500</p>
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
            url: null,
            user: '',
            token: ''
        }
    },
    methods : {
        //compteur de caractères pour le titre
        titleCompteur() {
            const titleCompt = document.querySelector(".nbrTitle")
            const titleArea = document.getElementById('article-title')
            titleCompt.innerHTML= titleArea.value.length

        },
        //compteur de caractères pour le corps du post
         compteur(){
            const numberIte = document.querySelector(".nbr")
            const textArea = document.getElementById('post_textarea')
            numberIte.innerHTML = textArea.value.length
      },
        updateMessage() {
            const url = 'http://127.0.0.1:3000/message/update/'
            axios.put(url + this.user.id + '/' + this.$route.params.id, {title: this.title, post: this.post, url: this.url})
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
            .then(response => (this.title = response.data.title, this.url = response.data.url, this.post = response.data.post))
            .catch(error => console.log(error))
    }
}


</script>
<style lang='scss'>
 $font: roboto;
 $font-size: 16px;


 .div_post_content{
     margin-top: 25px;
 }
#post_textarea{
   
    height: 75px; 
    resize: none;
    border: none;
    font-family: $font;
    margin-top: 20px;
    font-size: $font-size;
  }
  #article-title{
    border: none;
    font-family: $font;
    margin-top: 20px;
    font-size: $font-size;
  }
  #post-url{
    border: none;
    font-family: $font;
    margin-top: 20px;
    font-size: $font-size;
  }
 
  .submit-com{
    display: block;
    margin-top: 20px;
    background: rgba(77, 66, 122, 0.6);
    color: white;
    padding: 5px 10px;
    font-family: $font;
    width: 100px;
    border: none;
    padding: 10px;
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
   .compteur{
    width: 100%;
    margin-top: 0;
    text-align: right;
    background: white;
  }
  label{
      margin-top: 15px;
  }
  @media (max-width: 850px){
      #post-message{
          width: 90%;
      }
  }
</style>
