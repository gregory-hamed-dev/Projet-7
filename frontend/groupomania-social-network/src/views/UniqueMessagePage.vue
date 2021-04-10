<template>
  <section>

    <!-- barre de navigation -->
    <div id="nav">
      <img class="logo" src="../assets/icon-left-font-monochrome-black.svg">
      <div class="links">
          <router-link to="/home">Home</router-link>
         <!-- <a :href="'http://localhost:8080/profil/' + user.id">modifier profil</a> -->
      </div>    
    </div>

    <!-- Article selectionné dans la home -->
    <div id="messageContainer" >
        <h1>{{datas.title}}</h1>
        <div class="post-container">
          <div class="info-profil">
            <div class="identity">
              <img class="avatar" :src="datas.user.profil_picture" alt="photo profil">
              <p class="name"> {{datas.user.nom_utilisateur}}</p>  
            </div>
            <p class='date-post'>posté le {{datas.date}}</p> 
          </div>
          <h3 class="title">{{datas.title}}</h3>
          <a v-if="datas.url !== null" :href="datas.url" target="blank" class="url">
            <iframe width="500" height="300" :src="datas.url.replace('watch?v=', 'embed/')" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </a>
          <p class="post">{{datas.post}}</p>
          <hr style="width: 80%">
          <div class="interaction-user">
             <!-- <p><i class="fas fa-heart"></i> {{datas.like}}</p> -->
          </div>
          <div id="update-delete-container">
                <!-- seul l'utilisateur qui a crée le post peut le modifier-->
                <a :href="'/message/update/' + datas.id"><p v-if="user.id === datas.userId" class="button-modify"><i class="far fa-edit"></i></p></a>
                <!--L'utiisateur qui a crée le post ou le modérateur peuvent effacer le post -->
                <p v-if="user.id === datas.userId || user.Admin ===true" class="button-delete" v-on:click="removeMessage"><i class="far fa-trash-alt"></i></p>
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
        <div class="identity">
        <img class="avatar" :src="com.user.profil_picture" alt="">
        <p class="name">{{com.user.nom_utilisateur}}</p>
        </div>
        <p class="dateCom"> réponse le {{com.dateCom}}</p>
      </div>
        <p class="post">{{com.commentaires}}</p>
         <hr style="width: 80%">
        <a :href="'/commentaire/' + com.id"><p v-if="user.id === com.userId || user.Admin ===true"><i class="far fa-trash-alt"></i></p></a>
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
            datas: null,
            commentaires:[],
            com:'',
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
      },
      // supprimer le post et les commentaires liés
      removeMessage(){
            const axios = require('axios')
            const url = 'http://127.0.0.1:3000/message/delete/'
            axios.delete(url + this.$route.params.id)
            window.location.href = `/home`
        },
    },
    mounted () {
        // appel api et authorisation     
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

.post, .title, .url{
        text-align: center;
        margin-left: 25px;
    }

 .url{
        display: block;
        color:rgb(177, 156, 42);
        text-decoration: underline;
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

/* div avec avatar et nom sur le post et les réponses */
.identity{
  margin-top: 5px;
  margin-left: 5px;
  display: flex;
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
  justify-content: space-between;
}

/* partie commenter*/ 

.submit-com{
  width: 50%;
  margin: 10px auto;
}
#post-com{
  display: block;
  width: 100%;
  border: none;
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
  border: none;
  cursor: pointer;
  transition: 0.6s;

    &:hover{
      background: rgb(48, 48, 138);
    }
}

#update-delete-container {
    display: flex;
    justify-content: space-around;
}
.button-modify, .button-delete{
    cursor: pointer;     
}

a{
    padding: 0
}
//responsive design

@media (max-width: 850px) {

    .post-container, .comm-message, #dothis{
        width: 85%;
        margin-left: auto;
        margin-right: auto;
    }
    button {
        width: 50%;
    }
    .submit-com{
        width:80%;
    }
    .info-profil, .comm-info{
      flex-direction: column;
      align-items: center
    }
}
</style>