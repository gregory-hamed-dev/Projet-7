<template>
  <section>

    <!-- barre de navigation -->
    <div id="nav">
      <img class="logo" src="../assets/icon-left-font-monochrome-black.svg">
      <div class="links">
          <a href="http://localhost:8080/home">Home</a>
          <img class="avatar" :src="datas.user.profil_picture" alt="">
          <a :href="'http://localhost:8080/profil/' + user.id">modifier profil</a>
      </div>    
    </div>

    <!-- Article selectionné dans la home -->
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
          </div>
        </div>
    </div>

    <h2>Commentaires</h2>

<!-- partie commenter un article -->
    <form @submit.prevent="postCom" method="post" class="submit-com">
      <label for="com"></label>
      <input type="text" placeholder="Ajouter un commentaire..." id="post-com" v-model="comment">
      <button id="dothis" type='submit'>Commenter</button>
    </form>

<!-- liste des commentaires de l'article -->
    <div class="comm-message" v-for="com in commentaires" :key="com.id">
      <div class="comm-info">
        <img class="avatar" :src="com.user.profil_picture" alt="">
        <p class="name">{{com.user.nom_utilisateur}}</p>
      </div>
        <p class="post">{{com.commentaires}}</p>
      </div>
  </section>  
</template>

<!--fin du html -->

<script>
const axios = require('axios')
import VueJwtDecode from 'vue-jwt-decode'
export default {
    data(){
        return {
            datas: '',
            commentaires:'',
            user: null, 
            token: null, 
            comment: '',
        }
    },
    methods :{
      // Poster un commentaire
      postCom() {
        const url = "http://127.0.0.1:3000/commentaire/"
        axios.post(url + this.user.id + '/' + this.$route.params.id , {commentaires: this.comment})
            .then(
              function(res){
              console.log(res)
              window.location.href = ('')
              }
            )
            .catch(error =>  this.error = error.response.data.error)
      }

    },
    mounted () {
            
            const url = 'http://127.0.0.1:3000/message/'
            this.token = localStorage.getItem('token');
            this.user = VueJwtDecode.decode(this.token);
            axios.defaults.headers.common['Authorization'] = "Bearer " + this.token;
            // accès au message 
            axios.get(url + +this.$route.params.id)
            .then(response => this.datas = response.data)
            .catch(error => console.log(error))
            // accès aux commentaires liés au message posté
            axios.get('http://127.0.0.1:3000/commentaire/' +this.$route.params.id)
             .then(response => this.commentaires = response.data)
             .catch(error => console.log(error))
            
        },
}
</script>

<style lang="scss">
section{
  padding-bottom: 50px;
}
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
    }    
}
.name{
    margin-left: 10px;
    margin-right: 20px;
    font-weight: bold;  
}
.post, .title{
        text-align: left;
        margin-left: 25px;
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

/*Liste des commentaires*/ 

.comm-message{
  background: rgb(255, 255, 255);
  width: 40%;
  padding: 15px;
  margin-left: 25%;
  margin-bottom: 10px;
  margin-top: 20px;

}
.comm-info{
  display: flex;
  align-items: flex-start;
}

/* partie commenter*/ 

.submit-com{
  width: 50%;
  margin: 10px auto;
}
#post-com{
  display: block;
  width: 100%;
  border: 0px solid;
  padding-left: 10px;
  font-size: 14px;
  height: 50px;
}
#dothis{
  margin-left: 85%;
  padding: 10px;
  color: white;
  background: rgb(110, 110, 180);
  margin-top: 5px;
  cursor: pointer;
  transition: 0.6s;

    &:hover{
      background: rgb(48, 48, 138);
    }
}
</style>