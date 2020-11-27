<template>
      <div class="div_post_content">
       <Profil></Profil>
      <form @submit.prevent="createPost" method="post">
        <textarea id="post_textarea" placeholder="  Votre commentaire ..." maxlength="255" required v-model="post"></textarea>
        <input class ="submit-com" type ="submit" value="publier">
      </form>
    </div>
</template>
<script>
import Profil from '../profil/getProfil'
export default {
    name: 'PostMessage',
    components: {
        Profil
    },
    
    data() {
        return{
            post: '',
            user: '',

        }
    },
    methods: {
        createPost() {
            const axios = require('axios')
            const url = "http://127.0.0.1:3000/message/create"
            axios.post(url, {post: this.post})
            .then(function(res){console.log(res)})
            .catch(error =>  this.error = error.response.data.error)
        }
    },
    mounted(){
        const axios = require('axios')
        axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("token");
    }

}
</script>
<style scoped lang="scss" >
 $font: roboto;

.profil-container{
    margin-bottom: 0 !important;
    width: 50% !important;
    background: rgb(77, 66, 122) !important;
    color: rgb(228, 228, 228) !important;
    font-size: 16px !important;
  }
  .div_post_content{
    margin-top: 0;
  }
  textarea{
    width: 100%; 
    height: 100px; 
    resize: none;
    border: 0.5px solid grey;
    font-family: $font;
  }
 
  .submit-com{
    display: block;
    margin-top: 20px;
    background: rgb(77, 66, 122);
    color: white;
    padding: 5px 10px;
    font-family: $font;
    width: 100px
  }
  form{
   
      display: flex;
      flex-direction: column;
      width: 50%;
      margin-left: auto;
      margin-right: auto;

  }
</style>