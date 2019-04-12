<template>
	<div class="menu">
        <div class="countdown flex">
            <p class="flex" v-if="end_time">倒计时 :&nbsp;<count-down :end-time="end_time*1000"></count-down></p>
            <p>周五之前任意修改</p>
        </div>
        <van-tabs v-model="active" animated swipeable>
            <van-tab title="周六">
                <ul class="menu-select">
                    <li v-for="(item, index) in site[0].site_id" :key="index" :class="{active1:item.is_select}" @click="selectFood(item)">{{item.name}}
                    </li>
                </ul>
            </van-tab>
            <van-tab title="周日">
                <ul class="menu-select">
                    <li v-for="(item, index) in site[1].site_id" :key="index" :class="{active1:item.is_select}" @click="selectFood(item)">{{item.name}}
                    </li>
                </ul>               
            </van-tab>            
        </van-tabs>

        <div class="sku flex">
            <div>已选：站点名称</div>
            <button>提交</button>

        </div>
	</div>
</template>

<style lang="less">
    @rem: 100rem;
    .van-popup--bottom {
        bottom: 50/@rem;
        z-index: 100;
    }
    .countdown {
        width: 100%;
        height: 90/@rem;
        background: url('../assets/images/menu/header_bg.png') no-repeat;
        background-size: 100% 90/@rem;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        p {
            color: #fff;
            span {               
                display: inline-block;
                vertical-align: top;
                position: relative;
                bottom: 3/@rem;
                width: 32/@rem;
                height: 30/@rem;
                line-height: 30/@rem;
                text-align: center;               
                border-radius: 5/@rem;
                font-size: 18/@rem;
                border: 1/@rem solid #fff;
            }
            big {
                padding: 0 3/@rem;
                height: 30/@rem;
                line-height: 30/@rem;
                text-align: center;               
                border-radius: 5/@rem;
                font-size: 18/@rem;
                margin-top: 12/@rem;        
            }
        }
        p:first-child {
            font-size: 20/@rem;
        }
        p:last-child {
            font-size: 14/@rem;
            margin-top: 10/@rem;
        }
    }
    .menu-select {
        overflow: hidden;
        padding: 14/@rem 14/@rem;
        box-sizing: border-box;
        text-align: center;
        column-width: 80/@rem;
        li {
            height: 30/@rem;
            line-height: 30/@rem;
            background: url("../assets/images/site/site_bg1.png") no-repeat;
            background-size: 100% 30/@rem;
            margin-bottom: 10/@rem;
            border-radius: 4/@rem;
            box-sizing: border-box;
            color: #fff;
            font-size: 10/@rem;
        }
        .active1 {
            background: url("../assets/images/site/site_bg2.png") no-repeat;
            background-size: 100% 30/@rem;
            color: #fff;
            border: 1/@rem solid #fff;
        }
    }
    .sku {
        height: 54/@rem;
        line-height: 54/@rem;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 9999;
        div {
            flex: 3;
            background: #4c4c4a;
            color: #fff;
            text-indent: 20/@rem;
            font-size: 20/@rem;

        }
        button {
            flex: 1;
            background: #ffc848;
            font-size: 18/@rem;
            text-align: center;
        }
    }

    .actionsheet {
        .box {
            h2, div {
                justify-content: space-between;
                height: 45/@rem;
                line-height: 45/@rem;
                padding:  0 19/@rem;
                box-sizing: border-box;
            }
            h2 {
                border-left: 5/@rem solid #55bc47;
                background: #f4f4f4;
                font-size: 16/@rem;
                span  {
                    position: relative;
                    color: #7a7a7a;
                    i {
                        position: absolute;
                        display: block;
                        left: -20/@rem;
                        top: 14/@rem;
                        width: 16/@rem;
                        height: 16/@rem;
                        background: url("../assets/images/menu/delete1.png") no-repeat;
                        background-size: 100%;
                        color: #7a7a7a;
                    }
                }
                
            }
            div {
                border-bottom: 1/@rem solid #f5f5f5;
                position: relative;
                i {
                    position: absolute;
                    display: block;
                    right: 30/@rem;
                    top: 12/@rem;
                    width: 20/@rem;
                    height: 20/@rem;
                    background: url("../assets/images/menu/delete2.png") no-repeat;
                    background-size: 100%;
                }
            }
        }

    }

</style>

<script>
import countDown from '@/components/countdown'
	export default {
        name: 'Menu',
        components: {
            countDown
        },
		data() {
            return {
                active: '',
                site_id: [],
                site: [],
                end_time: '',
                isActive: false,
            }
        },
        methods: {
            selectFood(item) {
                //选中
                item.is_select = !item.is_select  
                console.log(item.is_select)
                if(item.is_select == true) {
                    this.num ++;
                    
                }else {
                    this.num == 0;
                }
            }
        },
		created() {
            // let add_time = "2019-04-02";
            
			this.$http({
                method: 'post',
                // url: 'http://tsgc.qhd58.net/public/index.php/weixin/site/index',
                url: 'http://tsgc.qhd58.net/public/index.php/weixin/site/index',
                data: {
                    
                }
			}).then(res => {
                this.site = res.data.zhandian;
                this.end_time = res.data.zhandian[0].end_time;
                
			}).catch(error => {
				console.log(error);
			})              
        }
	}
</script>