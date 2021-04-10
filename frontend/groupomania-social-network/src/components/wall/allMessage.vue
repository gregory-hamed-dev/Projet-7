<template>
    <section id="messages-container"> 
        
        <div v-for="data in datas" :key="data.id" class='post-container'>
            <div class="info-profil">
                <div class="identity">
                    <img class="avatar" :src="data.user.profil_picture" alt="">
                    <p class="name"><router-link style="color: cornsilk" :to="{name: 'uniqueUserProfil', params: {id: data.userId}}"> {{data.user.nom_utilisateur}}</router-link></p>  
                </div>
                <p class='date-post'>posté le {{data.date}}</p> 
            </div>
            <h3 class="title">{{data.title}}</h3>
            <p class="post">{{data.post}}</p>
            <a v-if="data.url !== null" :href="data.url" target="_blank" class="url">
                <iframe width="650" height="400" :src="data.url.replace('watch?v=', 'embed/')" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </a>
            <hr style="width: 70%">
            <div class="interaction-user">
                <router-link :to="{name: 'MessageVue', params: {id: data.id}}"><p><i class="far fa-comment"></i></p></router-link>
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
    mounted() {
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
    height: auto;
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
        padding: 15px;
        color: cornsilk;
        background:  rgba(77, 66, 122, 0.6);

        .identity{
            margin-top: 5px;
            margin-left: 5px;
            display: flex;
            color: cornsilk;
            
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
        margin-left: 50px;
        margin-right: 50px;
        
    }
    .url{
        display: block;
        color: rgb(177, 156, 42);
        text-decoration: underline;
        text-align: center;
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
.fa-comment{
    color: rgb(202, 25, 179);
}
/* responsive design*/
@media (max-width: 850px) {
    #messages-container{
        width: 95%;
    }
    .post, .title{
        width: 90%;
        text-align: center;
    }
    .url{
        width: 300px;
    }
    .info-profil{
        flex-direction: column;
    }
    .identity{
        justify-content: center;
    }
    iframe{
        margin: auto;
        display: block;
    }

}
</style>