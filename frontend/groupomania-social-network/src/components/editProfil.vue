<template>
<div class="profil-container">
    <img :src='profilDatas.profil_picture'>
    <h1>{{profilDatas.nom_utilisateur}}</h1>
    <p>{{profilDatas.description}}</p>
    <p>{{profilDatas.email}}</p>
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
     background: brown;
     color: white;
    
     
        h2{
            background: cornsilk;
            color: rgb(172, 62, 62);
            width: 100%;
            margin-top: $marginBtwEl;
            padding: 10px;
            box-sizing: border-box;
        }

        p{
            margin-top: $marginBtwEl;
        }

        
 }

</style>