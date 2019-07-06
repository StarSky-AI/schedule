<template>
	<div class="menu" v-show="isShow">
        <div class="countdown flex">
            <p class="flex">倒计时 :&nbsp;<count-down :end-time="endTime*1000"></count-down></p>
            <p>一经选择不可修改，请慎重选择！</p>
        </div>
        <van-tabs v-model="active" swipeable animated>
            <van-tab v-for="(item,index) in menu" :key="index" :title="item.title">
                <div class="box">
                    <h3 class="zaocan">早餐</h3>
                    <ul class="menu-select"> 
                        <li v-for="(item2,index2) in item.zaocan" :key="index2">
                            <div class="f"><div class="active-a" :class="{'active-b': item2.is_select}" @click="flag && selectFood(item2,index2)">{{item2.name}}</div></div>
                        </li>
                    </ul> 
                </div>
                <div class="box">
                    <h3 class="wucan">午餐</h3>
                    <ul class="menu-select"> 
                        <li v-for="(item3,index3) in item.wucan" :key="index3">
                            <div class="f"><div class="active-a" :class="{'active-b': item3.is_select}"
                            @click="flag && selectFood(item3,index3)">{{item3.name}}</div></div>
                        </li>
                    </ul> 
                </div>
                <div class="box">
                    <h3 class="wancan">晚餐</h3>
                    <ul class="menu-select"> 
                        <li v-for="(item4,index4) in item.wancan" :key="index4">
                            <div class="f"><div class="active-a" :class="{'active-b': item4.is_select}" @click="flag && selectFood(item4,index4)">{{item4.name}}</div></div>
                        </li>
                    </ul> 
                </div>                                              
            </van-tab>
        </van-tabs>
        <div class="sku flex">
            <div>已选数量：{{num}}</div>
            <button @click="onSelect" v-if="disabled === false">提交</button>
            <button @click="onSelect"class="hui" v-if="disabled" :disabled="disabled">提交</button>
        </div>
        <van-actionsheet v-model="show" class="actionsheet">
            <div class="box2">
                <h2 class="flex">
                    <span>已选菜品</span>
                    <span @click="empty"><i></i>清空</span>
                </h2>
                <div class="flex" v-for="(item,index) in order" :key="index">
                    <span>{{item.name}}</span>
                    <i @click="del(item.food_id)"></i>
                </div>
            </div>
        </van-actionsheet>
       
	</div>
</template>

<script>
import countDown from '@/components/countdown'
import { Dialog } from 'vant';
	export default {
        name: 'Menu',
        components: {
            countDown
        },
		data() {
            return {
                //全局显隐
                isShow: false,
                //底部弹框显隐
                show: false,
                //截止时间
                endTime: '',
                //菜品数组
                menu: [],
                //横向选项卡高亮
                active: 2,
                //数量
                num: 0,
                //禁止提交开关
                disabled: false,
                flag: true
            }
        },
        computed: {
            order() {
                let order = [];                
                this.menu.map(item => {
                    item.zaocan.map((key) => {
                        if(key.is_select) {
                            order.push(key)
                        }
                    })
                    item.wucan.map((key) => {
                        if(key.is_select) {
                            order.push(key)
                        }
                    })
                    item.wancan.map((key) => {
                        if(key.is_select) {
                            order.push(key)
                        }
                    })                                        
                })                
                return order;             
            }           
        },
        created() {
            
			this.$http({
                method: 'post',
                url: 'http://tsgc.qhd58.net/public/index.php/weixin/food/queryFoodList',
                data: {
                    id: window.localStorage.getItem('id')
                }
			}).then(res => {
                this.menu = res.data;
                this.isShow = true;
                console.log(this.menu);
                
                // 这段代码很有用！，需要循环找到dtsfyx
                // if(item.dtsfyx) {
                //     return item.is_select;

                // }else if(!item.dtsfyx || !item.is_select) {

                //     item.is_select = !item.is_select;
                // }
                
                let [...endtime] = this.menu.map((item) => {
                    if(item.end_time) {
                        return item.end_time;
                    }
                })
                this.endTime = endtime.slice(-1);
            
			}).catch(error => {
				console.log(error);
			})            
        },
        methods: {
            selectFood(item,index) {
                if(item.dtsfyx) {
                    return item.is_select;

                }else if(!item.dtsfyx || !item.is_select) {

                    item.is_select = !item.is_select;
                }

                if(item.is_select == true) {
                    this.num ++;
                }else {
                    this.num --;
                    if(this.num <= 0) {
                        this.num = 0;
                    }
                }                
            },
            onSelect() {
                // 点击选项时默认不会关闭菜单，可以手动关闭 
                if(!this.show) {
                    this.show = true;
                }else {
                    
                    let foodId = "", foodId2 = "", foodId3 = "";
                    this.menu.map((item) => {
                        item.zaocan.map((childItem) => {
                            if(childItem.is_select === true) {
                                foodId += childItem.menu_id + "," + childItem.food_id + "-";   
                            }
                            return childItem;
                        })
                        item.wucan.map((childItem) => {
                            if(childItem.is_select === true) {
                                foodId2 += childItem.menu_id + "," + childItem.food_id + "-"; 
                            }
                            return childItem;
                        })
                        item.wancan.map((childItem) => {
                            if(childItem.is_select === true) {
                                foodId3 += childItem.menu_id + "," + childItem.food_id + "-"; 
                            }
                            return childItem;
                        })                                
                            return item;
                    }) 
                    let foodid = foodId + foodId2 + foodId3;
                    this.$http({
                        method: 'post',
                        url: 'http://tsgc.qhd58.net/public/index.php/weixin/food/foodVote',
                        data: {
                        id: window.localStorage.getItem('id'),
                        food_id: foodid
                    }
                    }).then(res => {
                        if(res.result === true) {
                            Dialog.alert({
                                message: '投票成功！'
                            }).then(() => {
                                //刷新页面
                                location. reload()
                            });
                        }
                        else {
                            this.$toast('请选择菜品！');
                        }
                        
                    }).catch(error => {
                        console.log(error);
                    }) 
                }
                
            },
            //清空
            empty() {
                let food = this.menu.map((item) => {
                    item.zaocan.map((childItem) => {
                        childItem.is_select = false;
                        return childItem;
                    })
                    item.wucan.map((childItem) => {
                        childItem.is_select = false;
                        return childItem;
                    })
                    item.wancan.map((childItem) => {
                        childItem.is_select = false;
                        return childItem;
                    })                   
                    return item;
                })
                this.food = food;
                this.show = false; 
                this.num = 0; 
            },
            //在方法中定义形参id,在标签中写入要循环的food_id  即可删除指定的
            del(id) { 
                let menu = this.menu.map((item) => {
                    item.zaocan.map((childItem) => {
                        if(childItem.food_id === id) {
                            childItem.is_select = false;
                        }
                        return childItem;
                    })
                    item.wucan.map((childItem) => {
                        if(childItem.food_id === id) {
                            childItem.is_select = false;
                        }
                        return childItem;
                    })
                    item.wancan.map((childItem) => {
                        if(childItem.food_id === id) {
                            childItem.is_select = false;
                        }
                        return childItem;
                    })                                        
                    return item;
                })
                this.menu = menu;
                this.num --;
                if(this.num <= 0) {
                    this.show = false;
                }
            }
        }
	}
</script>

<style lang="less" scoped>
    @rem: 100rem;
    .van-popup--bottom {
        bottom: 54/@rem;
        z-index: 100;
    }
    .menu {
        padding-bottom: 54/@rem;
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
    .box {
        margin-top: .2rem;
        h3 {
            text-indent: .3rem;
        }
        .zaocan {
            color: #e54d42;
            text-shadow: 3px 3px 4px rgba(204, 69, 59, 0.2);
        }
        .wucan {
            color: #9c26b0;
            text-shadow: 3px 3px 4px rgba(133, 33, 150, 0.2);
        }
        .wancan {
            color: #333333;
            text-shadow: 3px 3px 4px rgba(26, 26, 26, 0.2);
        }
        .menu-select {
            overflow: hidden;
            padding: 14/@rem 14/@rem;
            box-sizing: border-box;
            display: flex;
            flex-wrap: wrap;
            li {
                .f {
                    display: flex;
                    flex-wrap: wrap;
                    div {
                        text-align: center;
                        padding: 2/@rem 15/@rem;
                        margin-bottom: 10/@rem;
                        border-radius: 20/@rem;
                        box-sizing: border-box;
                        margin-left: 15/@rem;
                        margin-bottom: 15/@rem;
                        font-size: .16rem;
                        height: .3rem;
                    }

                }
            }
            .active-a {
                background: #fff;
                color: #39b54a;
                border: 1/@rem solid #39b54a;
            }
            .active-b {
                background-image: -webkit-linear-gradient(45deg, #39b54a, #8dc63f);
                background-image: -o-linear-gradient(45deg, #39b54a, #8dc63f);
                background-image: linear-gradient(45deg, #39b54a, #8dc63f);
                color: #ffffff;
                border: 1/@rem solid #fff;
            }            
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
            text-indent: 19/@rem;
            font-size: 20/@rem;

        }
        button {
            flex: 1;
            background: #ffc848;
            font-size: 18/@rem;
            text-align: center;
        }
        .hui {
            flex: 1;
            background: #ccc;
            font-size: 18/@rem;
            text-align: center;
        }
    }

    .actionsheet {
        .box2 {
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