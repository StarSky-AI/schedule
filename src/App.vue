<template>
  <div id="app">
      <router-link to="/login"></router-link>
      <router-link to="/home"></router-link>
      <router-link to="/menu"></router-link>
      <router-link to="/site"></router-link>
      <router-link to="/password"></router-link>
      <router-view/>
    </div> 
    

</template>

<style lang="less">
  html, body, #app {
    width: 100%;
    height: 100%;
  }
</style>
