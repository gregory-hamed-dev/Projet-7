<template>
    <div class="container">
        <div id="nav">
            <img class="logo" src="../assets/icon-left-font-monochrome-black.svg">
            <div class="links">
                <a href="http://localhost:8080/home">Home</a>
            </div>    
        </div>  
         <ModifyProfil></ModifyProfil>
    </div>
</template>
<script>
import ModifyProfil from '../components/profil/editProfil.vue'
export default {
    name: 'userProfil',
    components: {
     ModifyProfil
    }
}
</script>
<style scoped lang="scss" >

</style>