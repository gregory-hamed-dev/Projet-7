<template>
      <div class="div_post_content">
      <form @submit.prevent="createPost" method="post" id="post-message">
        <input id='article-title' type="text" placeholder="Votre titre ..." v-model="title">
        <textarea id="post_textarea" placeholder="  Votre commentaire ..." maxlength="500" required v-model="post"></textarea>
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
            user: '',

        }
    },
    methods: {
        createPost() {
            
            const url = "http://127.0.0.1:3000/message/create/"
            axios.post(url + this.user.userId, {title: this.title, post: this.post})
            .then(
              function(res){
              console.log(res)
              window.location.href = ("/home")
              }
            )
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