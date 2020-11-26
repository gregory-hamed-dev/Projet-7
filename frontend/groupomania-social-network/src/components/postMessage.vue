<template>
      <div class="div_post_content">
       <Profil></Profil>
      <textarea id="post_textarea" placeholder="Votre commentaire ..." maxlength="255" required></textarea>
       <div class="post_submit">
      <input type="button" value="poster" id="btn_new_post" class="button"/>
    </div>
    </div>
</template>
<script>
import Profil from './editProfil'
export default {
    name: 'PostMessage',
    components: {
        Profil
    }
}
</script>
<style lang="scss">
 $font: roboto;

.profil-container{
    margin-bottom: 0 !important;
    width: 51% !important;
    background: cornsilk !important;
    color: black !important;
  }
  .div_post_content{
    margin-top: 0;
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