<template>
    <section> 
        <div v-for="data in datas" :key="data.id" class='post-container'>
            <div class="info-profil">
                <p class="name"><i class="fas fa-user"></i> {{data.user.nom_utilisateur}}</p>  
                <p class='date-post'>publié le {{data.updatedAt}}</p> 
            </div>
            <p class="post">{{data.post}}</p>
            <div class="button-iter">
            </div>
            <div class="interaction-user">
                <p><i class="far fa-thumbs-up"></i>{{data.like}}</p>
                <p><i class="far fa-comment"></i></p>
            </div>
        </div>
   
    </section>
</template>
<script>

export default {
    name: 'Allmessages',
    data(){
        return {
            datas: '',
            newPost: ''
        }
    },
    beforeMount () {
            const axios = require('axios')
            const url = 'http://127.0.0.1:3000/message'
            axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("token");
            axios.get(url)
            .then(response => this.datas = response.data)
            .catch(error => console.log(error)) 
        },
}
</script>
<style lang ="scss">
section{
    width: 50%;
    margin: 20px auto;
    border-right: 1px solid black;
    border-left: 1px solid black;
    background: rgb(253, 253, 253);
    font-family: roboto;
    font-size: 14px;
}
.post-container{
    box-shadow: 1px 2px 15px black;
    background: white;
    width: 90%;
    margin: 10px auto;
   
    .info-profil{
        display: flex;
        justify-content: space-between;

        .name{
            margin-left: 20px;
            margin-right: 20px;
            font-weight: bold;
            
        }
    }
    .post{
        text-align: left;
        margin-left: 25px;
    }
}

.interaction-user{
    width: 100%;
    display: flex;
    margin-left: auto;
    margin-right: auto;
    justify-content: space-around;
    background: linear-gradient(to bottom, rgb(216, 216, 216), rgb(240, 240, 240));
}
.far{
    font-size: 1.2rem;
}
.fa-thumbs-up {
 margin-right: 5px;
 color: rgb(86, 86, 241);
 cursor: pointer;
}
.fa-comment{
    color: rgb(202, 25, 179);
}

</style>