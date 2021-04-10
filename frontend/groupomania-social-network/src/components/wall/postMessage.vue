<template>
  <div class="div_post_content">
        <input id="newMessage" type='text' placeholder="écrire un nouveau message ..." @click="togglePostForm">
        <div  class="form-container">
          <i class="fas fa-chevron-up" @click="closeModal"></i>
          <form @submit.prevent="createPost" method="post" id="post-message" style="width: 100%">
          <!-- <label for="article-title" class="label-profil-group">Titre</label> -->
            <input id='article-title' type="text" placeholder="Votre titre ..." maxlength="45" v-model="title" v-on:keyup="titleCompteur()">
            <p class="compteur"><span class='nbrTitle'>0</span>/45</p>
            
        <!--   <label for="post-url" class="label-profil-group">Lien à partager</label> -->
            <input type="url" id="post-url" placeholder="votre lien...(optionnel)" v-model="url">
          
        <!--   <label for="post_textarea" class="label-profil-group">Commentaire</label> -->
            <textarea id="post_textarea" placeholder="Votre commentaire ..." maxlength="500" required v-model="post" v-on:keyup='compteur()'></textarea>
            <p class="compteur"><span class='nbr'>0</span>/500</p>
            <input class ="submit-com" type ="submit" value="publier">
          </form>
        </div>
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
      togglePostForm(){
       const formContainer = document.querySelector('.form-container');
       const button = document.getElementById('newMessage')
       button.style.display = 'none'
       formContainer.classList.add('visible')      
      },
      closeModal(){
        const formContainer = document.querySelector('.form-container');
        const button = document.getElementById('newMessage')
        button.style.display = 'block'
        formContainer.classList.remove('visible')
      },
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
 $input-margin-bottom: 1px;
 $font-size : 16px;
 $frame-width: 100%;

#newMessage{
  border-radius: 30px;
  border: 1px solid rgb(209, 203, 203);
  font-size: 15px;
  outline: none;
  width: 70%;
  margin: auto;
  color: #fff;
  padding: 10px 20px;
  cursor: pointer;
}
.form-container{
  height: 0;
  display: none;
}
.fa-chevron-up{
  color: rgb(19, 18, 18);
  font-size: 40px;
  cursor: pointer;
}

.visible{
  margin-top: 20px;
  height: auto;
  display: block;
  width: 70%;
  margin: auto;
  border: 1px solid rgb(209, 203, 203);

}
.turnIcon{
  transform: rotate(180deg);
}
 .div_post_content{
   margin: auto;
   width: 50%;
   padding: 20px;
   background: #fff;
 }

 #post_textarea{
   
    height: 75px; 
    resize: none;
    outline: none;
    border: $border-input-style ;
    font-family: $font;
    margin-bottom: $input-margin-bottom;
    font-size: $font-size;
   
  }
  #article-title{
    border: $border-input-style;
    outline: none;
    font-family: $font;
    margin-bottom: $input-margin-bottom;
    font-size: $font-size;
  }
  #post-url {
    border: $border-input-style;
    outline: none;
    font-family: $font;
    margin-bottom: $input-margin-bottom;
    font-size: $font-size;
    border-bottom: 1px solid rgb(209, 203, 203);
  }
 
  .submit-com{
    display: block;
    margin: 5px auto;
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
    box-sizing: border-box;
    padding: 10px ;
    text-align: right;
    background: white;
    border-bottom: 1px solid rgb(209, 203, 203);
  }
  @media (max-width: 850px){
    #post-message{
      width: 90%;
    }
  }
</style>