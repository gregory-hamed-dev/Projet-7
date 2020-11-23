<template>  
    <div class="form">
        <form>
            <img src="../assets/icon-above-font.png" class="signupicon" alt="icone Groupomania">
            <label>
                <input type="text" class="type text" placeholder="Nom utilisateur">
            </label>
            <label>
                <input type="email" class="type email" placeholder="Email">
            </label>
            <label>
                <input type="password" class="type password" placeholder="Mot de passe">
            </label>
            <button type="submit">S'inscrire</button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'Signup'
}
 
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.form{
    background: linear-gradient(to right, #fa3a2c, #f17168 );
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
    background: rgb(221, 80, 104);
    color: white;
    width: 30%;
    padding: 10px;
    cursor: pointer;
    
}

</style>
