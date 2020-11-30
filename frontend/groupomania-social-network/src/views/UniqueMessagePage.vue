<template>
  <section>
    <div id="nav">
      <img class="logo" src="../assets/icon-left-font-monochrome-black.svg">
      <div class="links">
          
          <a href="http://localhost:8080/home">Home</a>
          <img class="avatar" :src="datas.user.profil_picture" alt="">
          <a :href="'http://localhost:8080/profil/' + user.userId">modifier profil</a>
      </div>    
    </div>
    <div id="messageContainer" >
        <h1>{{datas.title}}</h1>
        <div class="post-container">
          <div class="info-profil">
            <div class="identity">
              <img class="avatar" :src="datas.user.profil_picture" alt="">
              <p class="name"> {{datas.user.nom_utilisateur}}</p>  
            </div>
            <p class='date-post'>publié le {{datas.updatedAt}}</p> 
            </div>
            <h3 class="title">{{datas.title}}</h3>
            <p class="post">{{datas.post}}</p>
            <hr style="width: 80%">
            <div class="interaction-user">
                <p><i class="fas fa-heart"></i> {{datas.like}}</p>
                <p><i class="far fa-comment"></i></p>
            </div>
        </div> 
    </div>
  </section>  
</template>
<script>
import VueJwtDecode from 'vue-jwt-decode'
export default {
    data(){
        return {
            datas: '',
            user: null, 
            token: null
        }
    },
    mounted () {
            const axios = require('axios')
            const url = 'http://127.0.0.1:3000/message/'
            this.token = localStorage.getItem('token');
            this.user = VueJwtDecode.decode(this.token);
            axios.defaults.headers.common['Authorization'] = "Bearer " + this.token;
            axios.get(url + +this.$route.params.id)
            .then(response => this.datas = response.data)
            .catch(error => console.log(error)) 
            
        },
}
</script>
<style lang="scss">
  .post-container{
   /* box-shadow: 1px 2px 15px black; */
    background: white;
    width: 50%;
    margin: 10px auto;
    padding: 25px;
   
    .info-profil{
        display: flex;
        justify-content: space-between;

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
        
    }
    .post, .title{
        text-align: left;
        margin-left: 25px;
    }
}
.avatar{
    width: 40px;
    height: 40px;
    border-radius: 50%;
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