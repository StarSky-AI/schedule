<template>
	<div class="menu">
        <div class="countdown flex">
            <p class="flex" v-if="end_time">倒计时 :&nbsp;<count-down :end-time="end_time*1000"></count-down></p>
            <p>一经选择不可修改，请慎重选择！</p>
        </div>

        <van-tabs>
        <van-tab v-for="(item,index) in site" :title="item.xingqi" :key="index">
            <ul class="menu-select">				
                <li v-for="(items,index3) in item.site" :key="index3" :class="{'active':items.is_select}" @click="select(item,index3)">{{items.name}}</li>
            </ul> 
        </van-tab>
        </van-tabs>

        <div class="sku flex">
            <button @click="onSelect" v-if="disabled===false">提交</button>
            <!-- <button v-else :disabled="disabled" class="hui">提交</button> -->
        </div>
        <van-actionsheet v-model="show" class="actionsheet">
            <div class="box">
                <h2 class="flex" v-for="(item,index) in order" :key="index">
                    <span>{{item.name}}</span>
					<van-stepper v-model="item[index]" />
                    <span v-if="item.is_select_dt==0"><i @click="del(index)"></i>删除</span>
                </h2>
				
            </div>
        </van-actionsheet>
	</div>
</template>

<style lang="less" scoped>
    @rem: 100rem;
    .van-popup--bottom {
        bottom: 54/@rem;
        z-index: 100;
    }
    .menu {
        width: 100%;
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
        padding: 14/@rem 14/@rem;
        box-sizing: border-box;
        text-align: center;
        display: flex;
        flex-wrap: wrap;
        li {
            width: 113/@rem;;
            height: 30/@rem;
            margin-left: 2/@rem;
            line-height: 30/@rem;
            background: url("../assets/images/site/site_bg1.png") no-repeat;
            background-size: 100% 30/@rem;
            margin-bottom: 10/@rem;
            border-radius: 4/@rem;
            box-sizing: border-box;
            color: #fff;
            font-size: 10/@rem;
        }
        .active {
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
        .hui {
            flex: 1;
            background: #ccc;
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
import countDown from '@/components/countdown';
import { Dialog } from 'vant';
	export default {
        name: 'Menu',
        components: {
            countDown
        },
		data() {
            return {
                active: '',
                show: false,
                end_time: '',
                //计步器
                value: 1,
                disabled: false,
                site: [],
				order:[],
				siteId: '',
				Newsite: [],
				idx: 0,
				selectData: [],
				flag: true
            }
        },
        methods: {
            onSelect() {
				
				
				let selectList = [];
				// order
				 this.site.map(e=>e.site.map(v=>{
					if(v.is_select==1 && v.is_select_dt==0){
						selectList.push(v);	
					}
				}));
				let list = this.order = selectList;
				list.map(item=> {
					this.siteId += item.site_id + ',' + item.site_line_id + ',' + list[0]+ '-';
				})
				console.log(list)
				if(list.length==0){
					this.$toast("请选择一个吧");
					return;
				}
                if(!this.show) {
                    this.show = true;
                }else {
					
					// let item = list[0];
					// this.siteId += item.site_id + ',' + item.site_line_id + ',' + item['0']+ '-';
					// console.log(this.siteId)
					if(this.siteId) {
						this.$http({
							method: 'post',
							// url: 'http://tsgc.qhd58.net/public/index.php/weixin/site/index',
							url: 'http://tsgc.qhd58.net/public/index.php/weixin/site/sitere',
							data: {
								id: window.localStorage.getItem('id'),
								site_id: this.siteId
								
							}
						}).then(res => {
							console.log(res)
								Dialog.alert({
									message: '投票成功！'
								}).then(() => {
									//刷新页面
									// location. reload()
								});

						}).catch(error => {
							console.log(error);
						})						
					}
					

                }
            },
            select(list,index) {	
				let item = list.site[index];
				if(item.is_select_dt == 0){
					let status = item.is_select;
					list.site.map(e=>{
						e.is_select = 0;
					});
					item.is_select = status==0?1:0;
					list.site[index] = item;
				}
            },
            del(index) {				
                this.order.splice(index,1);
            }
        },
		created() {						

			this.$http({
                method: 'post',
                // url: 'http://tsgc.qhd58.net/public/index.php/weixin/site/index',
                url: 'http://tsgc.qhd58.net/public/index.php/weixin/site/index',
                data: {
                    id: window.localStorage.getItem('id')
                }

			}).then(res => {
                console.log(res)
				console.log(this.value)
                this.site = res.data;
                this.end_time = res.data[res.data.length-1].end_time;


			}).catch(error => {
				console.log(error);
			})              
        }
	}
</script>