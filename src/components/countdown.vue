<!--  author:   Date:  -->
<template>
  <div class="style">
    <div v-if="isShow">
      <span>{{day}}</span> : <span>{{hour}}</span> : <span>{{minute}}</span> : <span>{{second}}</span>
    </div>
    <div v-else>
      <i>结束</i>
    </div>
  </div>
</template>

<script>
export default {
  name: "countDown",
  components: {

  },
  data () {
    return {
        day: "",
        hour: "",
        minute: "",
        second: "",
        timeout: null,
        isShow: true
    };
  },
  props: {
    endTime: {
      type: [Number, Number],
      default: null
    }
  },
  methods: {
    recordTime() {
      this.timeout = setTimeout(() => {
        clearTimeout(this.timeout)
        let shenyu=(this.endTime - new Date()),//倒计时毫秒数
        shengyuD=parseInt(shenyu/(60*60*24*1000)),//转换为天
        D=parseInt(shenyu)-parseInt(shengyuD*60*60*24*1000),//除去天的毫秒数
        shengyuH=parseInt(D/(60*60*1000)),//除去天的毫秒数转换成小时
        H=D-shengyuH*60*60*1000,//除去天、小时的毫秒数
        shengyuM=parseInt(H/(60*1000)),//除去天的毫秒数转换成分钟
        M=H-shengyuM*60*1000,//除去天、小时、分的毫秒数
        shengyuS=parseInt((shenyu-shengyuD*60*60*24*1000-shengyuH*60*60*1000-shengyuM*60*1000)/1000)//除去天、小时、分的毫秒数转化为秒
        this.day = shengyuD
        this.hour = shengyuH
        this.minute = shengyuM
        this.second = shengyuS
        if(this.day + this.hour + this.minute + this.second <= 0) {
          clearTimeout(this.timeout)
          this.isShow = false;
          this.day = this.hour = this.minute = this.second = 0;
        }else {
            this.recordTime()
        }
        
      }, 1000)
      
    }
  },
  computed: {

  },
  mounted() {

  },
  watch: {
    endTime: {
      handler: function(newVal) {
        
        if(newVal) {
            clearTimeout(this.timeout)
            this.recordTime()
        }
      },
      immediate: true
    }
  }
}

</script>
<style lang='less' scoped>
  @rem: 100rem;
  .style {
    span {
      border: 2/@rem solid #fff;
      display: inline-block;
      width: 30/@rem;
      height: 27/@rem;
      line-height: 27/@rem;
      text-align: center;
    }
  }
</style>