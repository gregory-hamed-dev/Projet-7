<template>
    <div class="form">
        <form @submit.prevent="loginUser" method="post" >
            <img src="../../assets/icon.png" class="signupicon" alt="icone Groupomania">
            <label for="mail">Email</label>
            <input type="email"  id="email" v-model="posts.email">
            <label for="password">Mot de passe</label>
            <input type="password" id="password" v-model="posts.password">
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
    axios.post(url, {
        email: this.posts.email,
        password: this.posts.password
    })
        .then(function(res) {
            console.log(res.data)
            localStorage.setItem("token", res.data.token); 
            window.location.href=`/home`
        }
        )
        .catch(error =>  this.error = error.response.data.error)

        
    }
}
}

 
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.form{
    background: linear-gradient(to right, #b6aaa9, #756564 );
    display: flex;
    padding: 80px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
}

.signupicon{
    width: 250px;
}
form{
    background: white;
    width: 35%;
    margin: 20px auto;
    display: flex;
    flex-direction: column;
    padding: 20px;
    justify-content: center;
    align-items: center;
    border-radius: 25px;
}

input{
    margin-top: 10px;
    margin-bottom: 10px;
    height: 20px;
    border-radius: 25px;
    padding: 10px;
    border: 2px solid skyblue;
     &:focus{
        outline: none;
        box-shadow: -2px -2px 10px skyblue;
        
         
     }

}
button {
    margin-top: 15px;
    background: rgba(218, 61, 50, 0.6);
    color: white;
    width: 30%;
    padding: 10px;
    cursor: pointer;
    transition: 0.5s;
     &:hover{
         background: #f55a4f;
     }
}
#inscription{
    color: blue;
    text-decoration: underline;
}

</style>
