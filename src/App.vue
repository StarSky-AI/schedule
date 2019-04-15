<template>
  <div id="app">
      <loading v-show="LOADING">
        <router-link to="/login"></router-link>
        <router-link to="/home"></router-link>
        <router-link to="/menu"></router-link>
        <router-link to="/site"></router-link>
        <router-link to="/password"></router-link>
      </loading>
      <router-view/>
    </div> 
    

</template>

<script>
import {mapState} from 'vuex'
import Loading from './components/loading.vue'
export default {
        computed:{
            ...mapState([
                'LOADING'
            ])
        },
        name: 'App',
        components: {
		      Loading,
		    }
}
</script>
<style lang="less">
  html, body, #app {
    width: 100%;
    height: 100%;
  }
</style>
