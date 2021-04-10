<template>  
    <div class="form">
        <video src="../../assets/video.mp4" autoplay muted loop></video>
        <form @submit.prevent="createUser" method="post">
            <img src="../../assets/icon-left-font-monochrome-black.png" class="signupicon" alt="icone Groupomania">
                <div class="edit-info">
                    <input type="text" class="type text" placeholder="Nom utilisateur" required v-model="posts.name" maxlength="50">
                    <i class="fas fa-user"></i>
                </div>
                <div class="edit-info">
                    <input type="email" class="type email" placeholder="Email" required v-model="posts.email">
                    <i class="fas fa-envelope"></i>
                </div>
                <small v-if="emailValid() !==true" style="color: red">(Renseigner une adresse mail correcte)</small>
                <small v-if="emailValid() ===true" style="color: green;">Adresse mail correcte</small>
                <div class="edit-info">
                <input type="password" class="type password" placeholder="Mot de passe" required v-model="posts.password">
                <i class="fas fa-lock"></i>
                </div>
                <small v-if="passwordValid() !== true" style="color: red">(Au minimum 8 caractères dont une majuscule et un chiffre)</small>
                <small v-if="passwordValid() === true" style="color: green">Mot de passe valide</small>
                <button type="submit">S'inscrire</button>
                <a href="/"><p>Vous avez un compte ? <span id="inscription">Se connecter</span></p></a>
        </form>
    </div>
</template>

<script>

export default {
    name: 'Signup',
    data() {
        return {
            posts: {
                name:'',
                email: null,
                password: '',
            }
        }
    },
    methods : {
        emailValid : function(){
            const regexEmail = new RegExp("^[a-zA-Z0-9.-_]+[@]{1}[a-z]+[.]{1}[a-z]{2,4}$", "g")
            const isValidEmail = (value) => (regexEmail.test(value) ? true : false);
            if (isValidEmail(this.posts.email)) {
                 return true
            }
        },
        passwordValid: function(){
            const regexPassword = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$", "g")
            const isValidPassword = (value) => (regexPassword.test(value) ? true : false);
            if (isValidPassword(this.posts.password)){
                return true
            }
        },
        createUser() {
            const axios = require('axios')
            const url = 'http://127.0.0.1:3000/auth/signup'
            axios.post(url, {
                nom_utilisateur: this.posts.name,
                email: this.posts.email,
                password: this.posts.password
            })
                .then(() =>{window.location.href= '/'})
                .catch(error =>  this.error = error.response.data.error)}
    }
}
 
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.form{
    display: flex;
    height: 100vh;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
video{
    width: 100vw;
    height: 100vh;
    object-fit: cover;
}
.signupicon{
    width: 300px;
    height: 200px;
    margin: 0;
    object-fit: cover;
}
form{
    position: absolute;
    background: rgba(255, 255, 255, .7);
    width: 45%;
    margin: 20px auto;
    display: flex;
    flex-direction: column;
    padding: 20px;
    border-radius: 25px;
    justify-content: center;
    align-items: center;
}

input{
    margin-top: 25px;
    height: 20px;
    border-radius: 25px;
    padding: 10px;
    padding-left: 35px;
    border: 2px solid skyblue;
     &:focus{
        outline: none;
        box-shadow: -2px -2px 10px skyblue;
        
         
     }

}
button {
    margin-top: 15px;
    background: #723ed1;
    color: white;
    width: 30%;
    padding: 10px;
    cursor: pointer;
    border: none;
    transition: 0.5s;
    
    &:hover{
        background: #4a2c81;
    }  
}
p{
        margin-top: 25px;
}
.edit-info{
    position: relative;
}
#inscription{
    color: blue;
    text-decoration: underline;
}

.fas{
    position: absolute;
    left: 10px;
    top: 35px;
    color: rgba(92, 92, 150, 0.6);

}
@media (max-width: 850px) {

    form{
        width: 80%;
    }
    button {
        width: 50%;
    }
    input{
        width:80%;
    }
}

</style>
