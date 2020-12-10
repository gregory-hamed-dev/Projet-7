<template>
    <button id="com-delete" v-on:click="deleteCom">Supprimer le commentaire</button>
</template>
<script>
const axios = require('axios')
import VueJwtDecode from 'vue-jwt-decode'
export default {
    data(){
        return {
            token: '',
            user: '',
        }
    },
    methods: {
        deleteCom(){
            this.token = localStorage.getItem('token');
            this.user = VueJwtDecode.decode(this.token);
            const url = 'http://127.0.0.1:3000/commentaire/delete/'
            axios.defaults.headers.common['Authorization'] = "Bearer " + this.token;
            axios.delete(url + this.$route.params.id)
            window.location.href = `/home`
        }
    }

}
</script>
<style lang="scss">
 button{
     margin-top: 50px;
     padding: 20px;
     border: none;
     background: rgba(228, 26, 26, 0.8);
     color: white;
     cursor: pointer;
 }
</style>