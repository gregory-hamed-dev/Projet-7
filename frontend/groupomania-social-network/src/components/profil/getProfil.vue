<template>
<div class="profil-container">
    <img :src='profilDatas.profil_picture'><br>
    <i>{{profilDatas.email}}</i><br>
    <p style="margin: 0;"><b>{{profilDatas.nom_utilisateur}}</b> </p>
    <p v-if="this.user.Admin = true"> <i class="fas fa-crown" style="color: gold;"></i> Modérateur</p>
    <p class="profil-bio">{{profilDatas.description}}</p>  
</div> 
</template>
<script>
import VueJwtDecode from 'vue-jwt-decode';
export default {
    name: 'Profil',
    data(){
        return{
        profilDatas: '',
        }
    }, 
     mounted () {
            this.token = localStorage.getItem('token');
            const axios = require('axios')
            const url = 'http://127.0.0.1:3000/auth/profil/'
            axios.defaults.headers.common['Authorization'] = "Bearer " + this.token;
            axios.get(url)
            .then(response => this.profilDatas = response.data)
            .catch(error => console.log(error)) 
            this.user = VueJwtDecode.decode(this.token);

            
        },
}
</script>
<style lang="scss" scoped >
// variables
$marginBtwEl: 20px;

 .profil-container{
     width: 50%;
     margin: 20px auto;
     display: block;
     background: white;
     color: rgb(37, 28, 28);
    
     
        img{
            margin-top: 20px;
            height: 150px;
            width: 150px;
            border-radius: 50%;
            
        }
        .profil-bio{
            width: 40%;
            text-align:center;
            margin: 0 auto;
        }
        p{
            margin: 5 auto;
        }
 }

</style>