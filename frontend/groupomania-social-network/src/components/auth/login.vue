<template>
    <div class="form">
        <video src="../../assets/video.mp4" autoplay muted loop></video>
        <form @submit.prevent="loginUser" method="post" >
            <img src="../../assets/icon-left-font-monochrome-black.png" class="signupicon" alt="icone Groupomania">
            <div class="login">
                <input type="email"  id="email" v-model="posts.email" placeholder="Email">
                <i class="fas fa-envelope"></i>
            </div>
            <div class="login">
            <input type="password" id="password" v-model="posts.password" placeholder="Mot de passe">
            <i class="fas fa-lock"></i>
            </div>
            <small></small>
            <button type="submit">Se connecter</button> 
            <a href="/signup"><p> Si vous n'avez pas de compte. <span id="inscription">S'inscrire</span></p></a>
        </form>
        
    </div>
</template>

<script>
export default {
    name: 'Login',
    data(){
        return {
            posts: {
                email: '',
                password: '',
                error: null, 
               
            }
        }
    },

    methods: {

        loginUser() {
            const axios= require('axios')// pour les appels api 
            const url = "http://127.0.0.1:3000/auth/login"
            const logIn = axios.post(url, {email: this.posts.email,password: this.posts.password})
            .then(function(res) {
                localStorage.setItem("token", res.data.token); 
                window.location.href=`/home`
            })
            .catch( function(){
                document.querySelector('small').innerText = "Mot de passe ou email incorrect"
            })
            setTimeout(logIn, 3000)       
        }
    }
}

 
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.form{
    display: flex;
    width: 100%;
    height: 100vh;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;  
    
}
@keyframes open {
    from{
        opacity: 0;
        transform: scale(0);
    }
    to{
        opacity: 1;
        transform: scale(1);
    }
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
    position:absolute;
    z-index: 2;
    background: rgba(255, 255, 255, .8);
    width: 35%;
    margin: 20px auto;
    display: flex;
    flex-direction: column;
    padding: 20px;
    justify-content: center;
    align-items: center;
    border-radius: 25px;
    animation: 1s open ease-in-out;
}

input{
    
    background: rgba(255, 255, 255, .8)!important;
    margin-bottom: 20px;
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
.login{
    position: relative;
}
.fas{
    position: absolute;
    left: 10px;
    top: 10px;
    color: rgba(92, 92, 150, 0.6);
}
button {
    margin-top: 15px;
    background: #723ed1;
    color: white;
    width: 30%;
    padding: 10px;
    border: none;
    cursor: pointer;
    transition: 0.5s;
     &:hover{
         background: #4a2c81;
     }
}
#inscription{
    color: blue;
    text-decoration: underline;
}

//reponsive view 
@media (max-width: 850px) {

    form{
        width: 80%;
    }
    button {
        width: 50%;
    }
    #password, #email{
        width:80%;
    }
}

</style>
