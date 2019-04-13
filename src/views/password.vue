<template>
	<div class="password">
        <div class="sub flex"><h2 @click="goback()">返回</h2><h2 @click="revise()">确定</h2></div>
        <div class="form">
            <p><label>旧密码</label><input type="text" placeholder="请填写旧密码" v-model="password"></p>
            <p><label>新密码</label><input type="text" placeholder="请输入新的密码" v-model="newpassword"></p>
            <p><label>确认密码</label><input type="text" placeholder="请再次输入新的密码" v-model="true_new"></p>
        </div>
        <span>如忘记旧密码请联系管理员</span>
	</div>
</template>

<style lang="less">
    @rem: 100rem;
    .password {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        background: #f2f2f2;
        .sub {
            height: 50/@rem;
            line-height: 50/@rem;
            background: #f8f8f8;
            justify-content: space-between;
            padding: 0/@rem 20/@rem;
            border-bottom:2/@rem solid #f2f2f2;
            font-size: 12/@rem;
        }
        .form {
            p {
                padding: 20/@rem 0;
                background: #fff;
                border-bottom: 1/@rem solid #f2f2f2;
                label {
                    margin-left: 20/@rem;
                }
                input {
                    margin-left: 40/@rem;
                }
                input::-webkit-input-placeholder {
                    color: #cbcbcd;
                }
                &:last-child input {
                    margin-left: 25/@rem;
                }
            }
        }
        span {
            margin-top: 15/@rem;
            margin-left: 20/@rem;
            color: #676c8c;
        }
    }
</style>

<script>
	export default {
		name: 'password',
		components: {

		},
		data() {
            return {
                id: '',
                password: '',
                newpassword: '',
                true_new: ''
            }
        },
        methods: {
            goback() {
                this.$router.go(-1);
            },
            revise() {
                this.$http({
                    method: 'post',
                    // url: 'http://tsgc.qhd58.net/public/index.php/weixin/index/editPassword',
                    url: 'http://tsgc.qhd58.net/public/index.php/weixin/index/editPassword',
                    data: {
                        id: window.localStorage.getItem('id'),
                        old: this.password,
                        new: this.newpassword,
                        true_new: this.true_new
                    }
                }).then(res => {
                    if(res.result == true) {
                        const toast = this.$toast.loading({
                            duration: 0,       // 持续展示 toast
                            forbidClick: true, // 禁用背景点击
                            loadingType: 'spinner',
                            message: res.msg
                        });
                        let second = 1;
                        const timer = setInterval(() => {
                        second--;
                        if (second) {
                            toast.message = `倒计时 ${second} 秒`;
                            
                        } else {
                            clearInterval(timer);
                            this.$toast.clear();
                            this.$router.push('/home');
                        }
                        }, 1000);
                        
                    }else {
                        this.$toast(res.msg);
                    }
                }).catch(error => {
                    console.log(error);
                })   
            }
            
        },
		created() {

        }
	}
</script>