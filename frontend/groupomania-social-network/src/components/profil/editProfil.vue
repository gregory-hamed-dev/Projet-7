<template>
    <div id="userModify-container">
        <h1>Modifier votre profil</h1>
        <form action="submit" @submit.prevent="editProfil" class="user-modify" enctype="multipart/form-data">
            <div class="form-group">
                <label for="name" class="label-profil-group">Nom utilisateur</label>
                <input type="text" class="form-control" id="name" v-model="name">
            </div>                                                                                
            <div class="form-group">
                <label for="description" class="label-profil-group">description</label>
                <textarea class="form-control" id="description" rows="5" v-model="description"></textarea> 
            </div> 
            <div class="form-group">
                <label for="email" class="label-profil-group">Votre nouveau mail</label>
                <input type="email" class="form-control" id="email" v-model="email">
            </div>                                                                                                                                                         
            <div class="form-group">
                <label for="file" class="label-profil-group" id="label-file">Changer votre avatar</label>
                <input type="file" id="file" name="image" ref="file" accept="image/png, image/jpeg, image/jpg" @change="handleFileUpload()" v-on:change="preview()">
            </div>
            <img id="preview" :src="this.image" style="width: 250px">  
            <button id="submit-profil">Publier profil</button>
            <p class="supp-activation" v-on:click="activeDelete">Supprimer votre compte</p>
            <p class="delete-account" v-on:click="deleteAccount">Confirmer</p>
        </form>                                                                              
    </div>

</template>

<script>
import VueJwtDecode from 'vue-jwt-decode';
const axios = require ("axios")
export default {
    name: 'ModifyProfil',

    data(){
        return {
            token: '',
            name:'',
            description:'',
            image: '',
            user: '',
            email:'',
            file: '',
            userid: '',
        }
    },
     methods: {
        handleFileUpload() {
        this.file = this.$refs.file.files[0];
        },
        // prévisualisation de l'image uploadée
        preview(){
            const fileObject = this.$refs.file.files[0];
            const fileReader = new FileReader()
            fileReader.readAsDataURL(fileObject)
            fileReader.onload = ()=> {
                let result = fileReader.result
                const img = document.getElementById('preview')
                img.setAttribute('src', result)
            }
        },
        editProfil() {
            const formData = new FormData();
            formData.append('nom_utilisateur', this.name)
            formData.append('image', this.file)
            formData.append('email', this.email)
            formData.append('description', this.description)
            axios.put('http://127.0.0.1:3000/auth/profil/modify/' + this.user.id, formData, {
                headers : {'Content-Type' : 'multipart/form-data'}
            })
            .then(() => {
                console.log('modification du profil utilisateur réussie')
                window.location.href = `/home`
            })
            .catch(() =>{
                console.log('échec de la modification')
            })
        },
        activeDelete(){
            const deleteButton = document.querySelector(".delete-account")
            const activateSupp = document.querySelector(".supp-activation")
            activateSupp.style.display= 'none';
            deleteButton.style.display= 'block';

        },
        deleteAccount() {
            const url = 'http://127.0.0.1:3000/auth/profil/delete/'
            axios.delete(url + this.user.id)
            window.location.href = `/signup`
        }
     },
     mounted () {
        
        this.token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = "Bearer " + this.token;
        this.user = VueJwtDecode.decode(this.token);
        axios.get('http://127.0.0.1:3000/auth/profil/' + this.user.id)
        .then(response => (
            this.name = response.data.nom_utilisateur, 
            this.description = response.data.description, 
            this.image = response.data.profil_picture, 
            this.email = response.data.email));   
     }
}
 
</script>

<style lang="scss">
#userModify-container{
    margin-bottom: 100px;
}
    .user-modify{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        width: 70%;
        margin: 20px auto;
    }
    
    .form-group {
        margin: 20px auto;
        width: 100%;
    }
    .label-profil-group{
        font-size: 20px;
    }
    .form-control {
        display: block;
        margin-left: auto;
        margin-right: auto;
        width: 40%;
        font-size: 16px;
    }
    textarea{
        resize: none;
        font-family: roboto;
        border: none;
        padding: 10px;
    }
    input{ 
        border: none;
        height: 40px;
        padding: 10px
    }
    #label-file {
    cursor: pointer;
    color: cornsilk;
    font-weight: bold;
    background: rgb(134, 33, 63);
    font-size: 15px;
    padding: 10px;
    transition: 0.5s;
        &:hover{
          background: rgb(88, 16, 38);  
        }
}
#file{
    display: none;
}
    
#submit-profil{
    background: rgb(77, 66, 122);
    margin-top: 30px;
    margin-bottom: 50px;
    padding: 10px;
    width: 25%;
    font-size: 15px;
    color: cornsilk;
    cursor: pointer;
    transition: 0.8s;
       &:hover {
        background:  rgb(19, 13, 46);
        }
}
.delete-account{
    background: rgb(153, 54, 54);
    color: white;
    display: none;
    padding: 10px;
    margin-bottom: 30px;
    cursor: pointer;
}
.supp-activation{
    background: rgb(153, 54, 54);
    color: white;
    padding: 10px;
    margin-bottom: 30px;
    cursor: pointer;
}
@media (max-width: 850px) {

    form{
        width: 80%;
    }
    #submit-profil {
        width: 70%;
    }
    #email, #name, #description{
        width:100%;
    }
}
</style>