<template>
  <div class="div_post_content">
        <form @submit.prevent="createPost" method="post" id="post-message">
        <!-- <label for="article-title" class="label-profil-group">Titre</label> -->
          <input id='article-title' type="text" placeholder="Votre titre ..." maxlength="45" v-model="title" v-on:keyup="titleCompteur()">
          <p class="compteur"><span class='nbrTitle'>0</span>/45</p>
          <hr>
      <!--   <label for="post-url" class="label-profil-group">Lien à partager</label> -->
          <input type="url" id="post-url" placeholder="votre lien...(optionnel)" v-model="url">
          <hr>
      <!--   <label for="post_textarea" class="label-profil-group">Commentaire</label> -->
          <textarea id="post_textarea" placeholder="Votre commentaire ..." maxlength="500" required v-model="post" v-on:keyup='compteur()'></textarea>
          <p class="compteur"><span class='nbr'>0</span>/500</p>
          <input class ="submit-com" type ="submit" value="publier">
        </form>
  </div>
</template>
<script>
import VueJwtDecode from 'vue-jwt-decode';

const axios = require('axios')
export default {
    name: 'PostMessage',
    data() {
        return{
            title: '',
            post: '',
            url: null,
            user: '',

        }
    },
    methods: {
      titleCompteur() {
            const titleCompt = document.querySelector(".nbrTitle")
            const titleArea = document.getElementById('article-title')
            titleCompt.innerHTML= titleArea.value.length

      },
      compteur(){
        const numberIte = document.querySelector(".nbr")
        const textArea = document.getElementById('post_textarea')
        numberIte.innerHTML = textArea.value.length
      },
        createPost() {
            
            const url = "http://127.0.0.1:3000/message/create/"
            axios.post(url + this.user.id, {title: this.title, post: this.post, url: this.url})
            .then(()=>{window.location.href = ("/home")})
            .catch(error =>  this.error = error.response.data.error)
        }
    },
    mounted(){
        const axios = require('axios')
        this.token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = "Bearer " + this.token;
        this.user = VueJwtDecode.decode(this.token);
    }

}
</script>
<style scoped lang="scss" >
 $font: roboto;
 $border-input-style: none;
 $input-margin-top: 1px;
 $font-size : 16px;

 #post_textarea{
   
    height: 75px; 
    resize: none;
    border: $border-input-style ;
    font-family: $font;
    margin-top: $input-margin-top;
    font-size: $font-size;
  }
  #article-title{
    border: $border-input-style;
    font-family: $font;
    margin-top: $input-margin-top;
    font-size: $font-size;
  }
  #post-url {
    border: $border-input-style;
    font-family: $font;
    margin-top: $input-margin-top;
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
  @media (max-width: 850px){
    #post-message{
      width: 90%;
    }
  }
</style>