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
  padding: 0;
  height: 100%;
}

#nav {
  padding: 30px;
  display: flex;
  justify-content: space-between;
  box-shadow: 0 4px 2px -2px gray;
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
</style>
