<template>
<div class="profil-container">
    <img :src='profilDatas.profil_picture'>
    <p>{{profilDatas.nom_utilisateur}}</p>
    <p>{{profilDatas.description}}</p>
</div> 
</template>
<script>
export default {
    name: 'Profil',
    data(){
        return{
        profilDatas: ''
        }
    }, 
     mounted () {
            const axios = require('axios')
            const url = 'http://127.0.0.1:3000/auth/profil/'
            axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("token");
            axios.get(url)
            .then(response => this.profilDatas = response.data)
            .catch(error => console.log(error)) 
        },
}
</script>
<style lang="scss" scoped >
// variables
$marginBtwEl: 20px;

 .profil-container{
     width: 40%;
     margin: 20px auto;
     display: flex;
     flex-direction: column;
     align-items: center;
     background: rgb(99, 42, 165);
     color: white;
    
     
        img{
            margin-top: 20px;
            height: 100px;
            width: 100px;
            border-radius: 50%;
        }

        p{
            margin-top: $marginBtwEl;
        }

        
 }

</style>