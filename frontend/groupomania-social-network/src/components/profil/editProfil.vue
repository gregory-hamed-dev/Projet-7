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
                <input type="file" id="file" ref="file" accept="image/png, image/jpeg, image/jpg" @change="handleFileUpload()" >
            </div>  
            <button id="submit-profil">Publier profil</button>
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
            avatar: '',
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
        editProfil() {
            const formData = new FormData();
            formData.append('nom_utilisateur', this.name)
            formData.append('profil_picture', this.file)
            formData.append('description', this.description)
            axios.put('http://127.0.0.1:3000/auth/profil/modify/' + this.user.userId, formData, {
                headers : {'Content-Type' : 'multipart/form-data'}
            })
            .then(() => {
                console.log('modification du profil utilisateur réussie')
                window.location.href = `/home/${this.user.userId}`
            })
            .catch(() =>{
                console.log('échec de la modification')
            })
        }
     },
     mounted () {
        
        this.token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = "Bearer " + this.token;
        this.user = VueJwtDecode.decode(this.token);
        axios.get('http://127.0.0.1:3000/auth/profil/')
        .then(response => (this.name = response.data.nom_utilisateur, this.description = response.data.description, this.avatar = response.data.profil_picture));   
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
    }
    input{ 
        
        height: 40px;
    }
    .label-file {
    cursor: pointer;
    color: cornsilk;
    font-weight: bold;
    background: rgb(77, 66, 122);
    font-size: 15px;
    padding: 10px;
    transition: 0.5s;
}
    
#submit-profil{
    background: rgb(77, 66, 122);
    margin-top: 30px;
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
</style>