<template>
<div class="profil-container">
    <img :src='profilDatas.profil_picture' alt="image de profil"><br>
    <i>{{profilDatas.email}}</i><br>
    <p class="user-profil" style="margin: 0;"><b>{{profilDatas.nom_utilisateur}}</b></p>
    <p v-if="user.Admin === true"> <i class="fas fa-crown" style="color: gold;"></i> Modérateur</p>
    <p class="profil-bio">{{profilDatas.description}}</p>  
    <a :href="'http://localhost:8080/profil'"><i class="fas fa-user-edit"></i></a>
</div> 
</template>
<script>
import VueJwtDecode from 'vue-jwt-decode';
export default {
    name: 'Profil',
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
            axios.get(url + this.user.id)
            .then(response => this.profilDatas = response.data)
            .catch(error => console.log(error)) 
            
            
        },
}
</script>
<style lang="scss" scoped >
// variables
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
            height: 150px;
            width: 150px;
            border-radius: 50%;
            
        }
        .profil-bio{
            width: 40%;
            margin: 0 auto;
        }
        p{
            margin: 5 auto;
        }
        .user-profil{
            font-size: 18px;
        }
        .fa-user-edit{
            margin-top: 10px;
            color: rgb(44, 25, 78);
            display: block;
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