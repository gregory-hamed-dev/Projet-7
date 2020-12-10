<template>
    <section>
        <div id="nav">
            <img class="logo" src="../assets/icon-left-font-monochrome-black.svg">
            <div class="links">
                <a href="http://localhost:8080/home">Home</a>
            </div>    
        </div>
        <div class="profil-container">
            <img :src='profilDatas.profil_picture'><br>
            <i>{{profilDatas.email}}</i><br>
            <p class="user-profil" style="margin: 0;"><b>{{profilDatas.nom_utilisateur}}</b></p>
            <p v-if="profilDatas.admin === true"> <i class="fas fa-crown" style="color: gold;"></i> Modérateur</p>
            <p class="profil-bio">{{profilDatas.description}}</p>
        </div>
    </section>
</template>
<script>
import VueJwtDecode from 'vue-jwt-decode';
export default {
    data(){
        return{
        profilDatas: '',
        user: '',
        }
    }, 
     mounted () {
            this.token = localStorage.getItem('token');
            const axios = require('axios')
            this.user = VueJwtDecode.decode(this.token);
            const url = 'http://127.0.0.1:3000/auth/profil/'
            axios.defaults.headers.common['Authorization'] = "Bearer " + this.token;
            axios.get(url + this.$route.params.id)
            .then(response => this.profilDatas = response.data)
            .catch(error => console.log(error))     
        },
}
</script>
<style lang="scss">
$marginBtwEl: 20px;

 .profil-container{
     width: 60%;
     margin: 20px auto;
     display: block;
     background: white;
     color: rgb(37, 28, 28);
     padding-bottom: 25px;
 
     
        img{
            margin-top: 20px;
            height: 250px;
            width: 250px;
            border-radius: 50%;
            
        }
        .profil-bio{
            width: 40%;
            margin: 0 auto;
            font-size: 17px;
        }
        p{
            margin: 5 auto;
        }
        .user-profil{
            font-size: 25px;
        }
    
 }
 @media (max-width: 850px) {
     .profil-container{
         width: 100%;
         
         .profil-bio{
         width: 90%;
     }
     }   
   
 }
</style>