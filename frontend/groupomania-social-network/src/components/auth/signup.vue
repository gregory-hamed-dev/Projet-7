<template>  
    <div class="form">
        <form @submit.prevent="createUser" method="post">
            <img src="../../assets/icon.png" class="signupicon" alt="icone Groupomania">
            <label>
                <input type="text" class="type text" placeholder="Nom utilisateur" v-model="posts.name">
            </label>
            <label>
                <input type="email" class="type email" placeholder="Email" v-model="posts.email">
            </label>
            <label>
                <input type="password" class="type password" placeholder="Mot de passe" v-model="posts.password">
            </label>
            <button type="submit">S'inscrire</button>
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
                email: '',
                password: '',
            }
        }
    },
    methods : {
        createUser() {
            const axios = require('axios')
            const url = 'http://127.0.0.1:3000/auth/signup'
            axios.post(url, {
                nom_utilisateur: this.posts.name,
                email: this.posts.email,
                password: this.posts.password
            })
                 .then(function(res) {
                    console.log(res.data)
                    window.location.href=`/login`
                })
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
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
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
    margin-top: 25px;
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
    background: rgba(218, 61, 50, 0.6);;
    color: white;
    width: 30%;
    padding: 10px;
    cursor: pointer;
    
}

</style>
