<template>
<section id="userscontainer">
    <div v-for="data in datas" :key="data.id" class="each-profil-container">
        <img :src="data.profil_picture" alt="photo-profil" class="user-profil-picture">
        <p class=username>{{data.nom_utilisateur}}<p>
        <p class="user-description">{{data.description}}</p>
    </div>
</section>
</template>
<script>
import VueJwtDecode from 'vue-jwt-decode'
export default {
    name: 'AllUsers',
    data() {
        return {
            datas: '',
            user: null,
            token: null
        }
    },
    mounted(){
        const axios = require('axios')
            const url = 'http://127.0.0.1:3000/auth/profils'
            this.token = localStorage.getItem('token');
            axios.defaults.headers.common['Authorization'] = "Bearer " + this.token;
            this.user = VueJwtDecode.decode(this.token);
            axios.get(url)
            .then(response => this.datas = response.data)
            .catch(error => console.log(error))    
    }
}
</script>
<style lang="scss">
#userscontainer {
    width: 20%;
}
.user-profil-picture{
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 2px solid rgb(66, 65, 57);
    margin-top: 10px;
}
.each-profil-container{
    margin-top: 30px;
    background: white;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
}
.username{
    font-size: 15px;
    font-weight: bold;
    background: rgba(91, 91, 156, 0.7);
    color: white;
    padding: 10px;
}
.user-description{
    padding: 10px;
}
</style>