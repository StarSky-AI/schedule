<template>
	<div class="menu">
        <div class="countdown flex">
            <p class="flex" v-if="end_time">倒计时 :&nbsp;<count-down :end-time="end_time*1000"></count-down></p>
            <p>一经选择不可修改，请慎重选择！</p>

        </div>
        <ul class="menu-select">
            <li v-for="(item, index) in food" :key="index" :class="{active:item.is_select}" @click="selectFood(item)">{{item.name}}</li>
        </ul>
        <div class="sku flex">
            <div>已选数量：{{num}}</div>
            <button @click="onSelect">提交</button>
        </div>
        <van-actionsheet v-model="show" class="actionsheet">
            <div class="box">
                <h2 class="flex">
                    <span>已选菜品</span>
                    <span @click="empty()"><i></i>清空</span>
                </h2>
                <div class="flex" v-for="(item,index) in order" :key="index">
                    <span>{{item.name}}</span>
                    <i @click="del(item.id)"></i>
                </div>
            </div>

        </van-actionsheet>
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
        column-width: 100/@rem;
        li {
            height: 40/@rem;
            line-height: 40/@rem;
            border: 1/@rem solid #000;
            margin-bottom: 10/@rem;
            border-radius: 60/@rem;
            box-sizing: border-box;
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
	export default {
        name: 'Menu',
        components: {
            countDown
        },
		data() {
            return {
                end_time: '',
                food: [],
                isActive: false,
                changeRed:-1,
                show: false,
                num : 0
            }
        },
        computed: {
            order() {
                let order = [];
                this.food.map(item => {
                    if(item.is_select) {
                        order.push(item)
                    }
                })
                
                return order
               
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
                    this.num = 0;
                }
            },
            onSelect() {
                // 点击选项时默认不会关闭菜单，可以手动关闭
                this.show = true;
            },
            //清空
            empty(id) {
                this.food.some(item => {
                    if(item.id === id) {
                        item.is_select = false;
                    }     
                })
                this.show = false; 
                this.num = 0; 
                return true;            
            },
            //在方法中定义形参id,在标签中写入要循环的food_id  即可删除指定的
            del(id) {
                // this.food.some(item => {
                //     if(item.id === id) {
                //         item.is_select = false;
                //     }
                    
                // })
                // console.log(this.order);
                // return true;
                let index = this.food.some(function(item) {
                    if(item.id === id) {
                        item.is_select = false;
                    item.is_select.splice(this.item.is_select.find( item => {
                    return orders.id === id;
                }), 1);
                    }
                    
                })
                //删除元素
                















                
                // console.log(this.food);
            }
        },
		created() {
            // let add_time = "2019-04-02";
            
			this.$http({
				method: 'post',
                url: 'http://tsgc.qhd58.net/public/index.php/weixin/food/queryFoodList',
                data: {
                    food_id: this.food.food_id
                }
			}).then(res => {
                console.log(res.data);
                this.food = res.data.food;
                this.end_time = res.data.end_time;
                this.food.map((item) => {
                    item.is_select = false
                })
                // console.log(Is_select);
                
			}).catch(error => {
				console.log(error);
			})              
        }
	}
</script>