<template>
  <div id="app">
    
    <router-view/>
    
  </div>
</template>
<script>
  export default {
    name: 'App',
    components: {
    
    }
  }
</script>

<style lang="scss">
#app {
  font-family:  roboto;
  font-size: 14px;
  text-align: center;
  color: #2c3e50;
  box-sizing: border-box;
  
}

#nav {
  padding: 30px;
  display: flex;
  justify-content: space-between;
  box-shadow: 0 4px 2px -2px gray;
  background: white;
  }
  .links{
    margin-right: 20px;
    display: flex;
    align-items: center;
    font-weight: bold;
    
  }
  a {
    
    border-radius: 10px;
    color: #2c3e50;
    text-decoration: none;
    padding: 10px;
    color: black;
    font-size: 15px;
    margin-right: 15px;

    &.router-link-exact-active {
      color: purple;
    }
  }
  .logo{
    height: 40px;
    margin-left: 10px;
  }
  .fas{
    font-size: 20px;
    margin-right: 5px;
  }
  .deconnect{
    cursor: pointer;
  }
  /* responsive-design*/
  @media (max-width: 850px) {
    #nav{
      flex-direction: column;
      align-items: center;
    }
    .links{
      width: 100%;
      margin: 0 auto;
      text-align: center;
      display: block;
    }
   
    .logo{
      margin-bottom: 25px;
    }
  }
</style>
