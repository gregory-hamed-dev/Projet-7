<template>
    <div class="container">
        <div id="nav">
            <img class="logo" src="../assets/icon-left-font-monochrome-black.svg">
            <div class="links">
                <a href="http://localhost:8080/home/:userId">Home</a>
            </div>    
        </div>  
         <Profil></Profil>
    </div>
</template>
<script>
import Profil from '../components/editProfil.vue'
export default {
    name: 'userProfil',
    components: {
      Profil
    }
}
</script>
<style lang="scss" scoped>

</style>