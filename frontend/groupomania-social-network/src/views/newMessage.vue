<template>
    <div class="container">
        <div id="nav">
            <img class="logo" src="../assets/icon-left-font-monochrome-black.svg">
            <div class="links">
                <p><a href="http://localhost:8080/home">Home</a></p>
                <p @click="logout">Déconnexion</p>
            </div>    
        </div>
        <h1>Publication</h1>
        <PostMessage></PostMessage>
    </div>
</template>
<script>
import  PostMessage from '../components/wall/postMessage'
export default {
    name: 'newMessage',
    components: {
        PostMessage
    }
}
</script>
<style lang="scss" scoped>

</style>