<template>
    <section id="messages-container"> 
        <div v-for="data in datas" :key="data.id" class='post-container'>
            <div class="info-profil">
                <div class="identity">
                    <img class="avatar" :src="data.user.profil_picture" alt="">
                    <p class="name"> {{data.user.nom_utilisateur}}</p>  
                </div>
                <p class='date-post'>posté le {{data.date}}</p> 
            </div>
            <h3 class="title">{{data.title}}</h3>
            <a :href="data.url" target="blank" class="url">{{data.url}}</a>
            <p class="post">{{data.post}}</p>
            <hr style="width: 70%">
            <div class="interaction-user">
                <p><i class="fas fa-heart"></i> {{data.like}}</p>
                <a :href="'/message/' + data.id"><p><i class="far fa-comment"></i></p></a>
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
#messages-container{
    width: 50%;
    margin: 20px;
    font-family: roboto;
    font-size: 14px;
    padding-top: 0;

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
        padding: 15px;

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
    .post, .title, .url{
        text-align: left;
        margin-left: 25px;
    }
    .url{
        display: block;
        color: blue;
        text-decoration: underline;
    }
}

.interaction-user{
    width: 100%;
    display: flex;
    margin-left: auto;
    margin-right: auto;
    justify-content: space-around;
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