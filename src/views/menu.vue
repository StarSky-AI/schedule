<template>
	<div class="menu">
        <div class="countdown flex">
            <p class="flex">倒计时 :&nbsp;<count-down :end-time="end_time[3]*1000"></count-down></p>
            <p>一经选择不可修改，请慎重选择！</p>

        </div>
        <ul class="menu-select">
            <li v-for="(item,index) in food" :key="index">
                <h3>{{item.title}}</h3>
                <div class="f"><div :class="{active:items.is_select}" v-for="(items,index) in item.food" :key="index" @click="selectFood(items)">{{items.name}}</div></div>
            </li>
        </ul>
        <div class="sku flex">
            <div>已选数量：{{num}}</div>
            <button @click="onSelect" :disabled="NoOnclick">提交</button>
        </div>
        <van-actionsheet v-model="show" class="actionsheet">
            <div class="box">
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
        <van-popup v-model="show2" :close-on-click-overlay="false" style="width:200px;height:80px;line-height:80px;text-align:center;">本周已投票！</van-popup>
	</div>
</template>

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
    .menu-select {
        overflow: hidden;
        padding: 14/@rem 14/@rem;
        box-sizing: border-box;
        li {
            h3 {
                height: 29/@rem;
                line-height: 29/@rem;
                margin-bottom: 10/@rem;
                &:before {
                    content: '';

                }
            }
            .f {
                display: flex;
                flex-wrap: wrap;
                div {
                    text-align: center;
                    padding: 2/@rem 15/@rem;
                    border: 1/@rem solid #000;
                    margin-bottom: 10/@rem;
                    border-radius: 60/@rem;
                    box-sizing: border-box;
                    margin-left: 15/@rem;
                    margin-bottom: 15/@rem;
                }

            }
        }
        .active {
            background: #ff9f27;
            background: linear-gradient(#c21500,#ffc500);
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
            text-indent: 59/@rem;
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
import { Dialog } from 'vant';
	export default {
        name: 'Menu',
        components: {
            countDown
        },
		data() {
            return {
                end_time: '',
                food: [],
                changeRed:-1,
                show: false,
                show2: true,
                num : 0,
                message: null,
                NoOnclick: false
            }
        },
        computed: {
            order() {
                let order = [];                
                console.log(this.food,"213123")
                this.food.map(item => {
                    item.food.map((key) => {
                        if(key.is_select) {
                            order.push(key)
                        }
                    })

                })     
                console.log(order,"``");           
                return order             
            }            
        },
        methods: {
            selectFood(items) {
                //选中
                items.is_select = !items.is_select  
                console.log(items.is_select)
                if(items.is_select == true) {
                    this.num ++;
                    
                }else {
                    this.num --;
                }
            },
            onSelect() {
                // 点击选项时默认不会关闭菜单，可以手动关闭 
                if(!this.show) {
                    this.show = true;
                }else {
                let foodId = "",menuId="";
                this.food.map((item) => {
                item.food.map((childItem) => {
                if(childItem.is_select === true) {
                    foodId += childItem.food_id + "-";
                    menuId = childItem.menu_id;
                }
                return childItem;
                })
                return item;
                })
                console.log(foodId)
                console.log(menuId)  
                    this.$http({
                        method: 'post',
                        url: 'http://tsgc.qhd58.net/public/index.php/weixin/food/foodVote',
                        data: {
                        id: window.localStorage.getItem('id'),
                        food_id: foodId,
                        menu_id: menuId
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
                this.show = true;

            },
            //清空
            empty() {
                console.log(this.food,"food");
                let food = this.food.map((item) => {
                    item.food.map((childItem) => {
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
                let food = this.food.map((item) => {
                    item.food.map((childItem) => {
                        if(childItem.food_id === id) {
                            childItem.is_select = false;
                        }
                        return childItem;
                    })
                    return item;
                })
                this.food = food;
                this.num --;
                if(this.num <= 0) {
                    this.show = false;
                }
            }
        },
		created() {
			this.$http({
                method: 'post',
                // url: 'http://tsgc.qhd58.net/public/index.php/api/weixin/food/queryFoodList',
                url: 'http://tsgc.qhd58.net/public/index.php/weixin/food/queryFoodList',
                data: {
                    id: window.localStorage.getItem('id')
                }
			}).then(res => {
                console.log(res);
                this.message = res.msg;
                if(this.message == 3) {
                    //信息框
                    this.show2 == true;
                    this.NoOnclick = true;
                    console.log(this.NoOnclick);
                }
                this.end_time = res.data.map((item) => {
                    return item.end_time;
                })
                this.food = res.data;  
                console.log(res.data, "res.data");              
			}).catch(error => {
				console.log(error);
			})            
        }
	}
</script>