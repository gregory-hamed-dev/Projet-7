<template>  
    <div class="form">
        <form @submit.prevent="loginUser" method="post" >
            <img src="../../assets/icon.png" class="signupicon" alt="icone Groupomania">
            <label for="mail">Email</label>
            <input type="email"  id="email" v-model="posts.email">
            <label for="password">Mot de passe</label>
            <input type="password" id="password" v-model="posts.password">
            <button type="submit">Se connecter</button>
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
                error: null
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
            window.location.href='/home/:userId/'
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
    background: linear-gradient(to right, #fc2112, #f17168 );
    display: flex;
    padding: 25px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 0;
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
    background: #fc2112;
    color: white;
    width: 30%;
    padding: 10px;
    cursor: pointer;
    
}

</style>
