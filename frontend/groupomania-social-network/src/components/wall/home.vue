<template>
    <section> 
        <div v-for="data in datas" :key="data.id" class='post-container'>
            <a :href="'/message/' + data.id">
            <div class="info-profil">
                <div class="identity">
                    <img class="avatar" :src="data.user.profil_picture" alt="">
                    <p class="name"> {{data.user.nom_utilisateur}}</p>  
                </div>
                <p class='date-post'>publié le {{data.updatedAt}}</p> 
            </div>
            <h3 class="title">{{data.title}}</h3>
            <p class="post">{{data.post}}</p></a>
            <div id="update-delete-container">
                <!-- seul l'utilisateur qui a crée le post peut le modifier-->
                <p v-if="user.userId === data.userId" class="button-modify">Modifier</p>
                <!--L'utiisateur qui a crée le post ou le modérateur peuvent effacer le post -->
                <p v-if="user.userId === data.userId || user.Admin ===true" class="button-delete">Supprimer</p>
            </div>
            <hr style="width: 70%">
            <div class="interaction-user">
                <p><i class="fas fa-heart"></i> {{data.like}}</p>
                <p><i class="far fa-comment"></i></p>
            </div>
        </div>
   
    </section>
</template>
<script>
import VueJwtDecode from 'vue-jwt-decode'
export default {
    name: 'Allmessages',
    data(){
        return {
            datas: '',
            user: null, 
            token: null
        }
    },
    mounted () {
            const axios = require('axios')
            const url = 'http://127.0.0.1:3000/message'
            this.token = localStorage.getItem('token');
            axios.defaults.headers.common['Authorization'] = "Bearer " + this.token;
            this.user = VueJwtDecode.decode(this.token);
            axios.get(url)
            .then(response => this.datas = response.data)
            .catch(error => console.log(error))    
        },
}
</script>
<style lang ="scss">
section{
    width: 50%;
    margin: 20px auto;
    font-family: roboto;
    font-size: 14px;
    padding-bottom: 100px;

}
.post-container{
   /* box-shadow: 1px 2px 15px black; */
    background: white;
    width: 100%;
    margin: 10px auto;
   
    .info-profil{
        display: flex;
        justify-content: space-between;
        margin-left: 25px;

        .identity{
            margin-top: 5px;
            margin-left: 5px;
            display: flex;
        }
        h2{
            text-align: left;
        }
        .name{
            margin-left: 10px;
            margin-right: 20px;
            font-weight: bold;  
        }
        img{
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
    }
    .post, .title{
        text-align: left;
        margin-left: 25px;
    }
}

.interaction-user{
    width: 100%;
    display: flex;
    margin-left: auto;
    margin-right: auto;
    justify-content: space-around;
}
#update-delete-container {
    display: flex;
    justify-content: space-around;
}
.button-modify{
    background: rgba(100, 163, 100, 0.8);
    padding: 10px;
    color: white;
    cursor: pointer;
    transition: 0.5s;
       
        &:hover{
        background: rgb(75, 121, 75);
        }
}
.button-delete{
    background: rgba(228, 26, 26, 0.8);
    padding: 10px;
    color: white;
    cursor: pointer;
    transition: 0.5s;

    &:hover{
        background: rgb(228, 26, 26);
        }
}
.far{
    font-size: 1.2rem;
}
.fa-heart {
 margin-right: 5px;
 color: rgb(170, 22, 35);
 cursor: pointer;
}
.fa-comment{
    color: rgb(202, 25, 179);
}


</style>