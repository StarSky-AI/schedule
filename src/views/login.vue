<template>
  <div class="login">
	  <h1 class="logo">
		  <img src="../assets/touxiang.png" alt="">
		  <span>登陆</span>
	  </h1>

		<div class="form">
			<div class="input-box">
				<input type="text" placeholder="手机号" v-model="model.phone">
			</div>
			<div class="input-box">
				<input type="password" placeholder="密码" v-model="model.password">						
			</div>
			<div class="input-box" @click="submit()">
				<button>登录</button>
			</div>				
		</div>

  </div>
</template>

<style lang="less">
	@rem: 100rem;
	.login {
		overflow:hidden;
		.logo {
			text-align: center;
			margin-top: 40/@rem;
			img {
				width: 100/@rem;
				height: 100/@rem;
				border-radius: 50%;
			}
			span {
				display: block;
				font-size: 20/@rem;
				font-weight: 400;
				text-align: center;
				margin-top: 16/@rem;
			}
		}
		.form {
			margin: 0 50/@rem;
			margin-top: 40/@rem;
			overflow: hidden;
			.input-box {
				border: 2/@rem solid #f5f5f5;
				margin-bottom: 15/@rem;
				background: #fff;
				position: relative;
				input {
					display: block;
					width: 96%;
					height: 44/@rem;
					line-height: 44/@rem;
					font-size: 16/@rem;
					margin-left: 10/@rem;
				}
				input::-webkit-input-placeholder {
					font-size: 14/@rem;
				}
				input::-ms-input-placeholder { 
					font-size: 14/@rem;
				}
				input::-moz-placeholder { 
					font-size: 14/@rem;
				}
				input::-moz-placeholder {
					font-size: 14/@rem;
				}
				input:-internal-autofill-selected {
					box-shadow: 0 0 0px 1000px white inset;
					background-image: none !important;
					color: rgb(0, 0, 0) !important;
				}
				&:last-child {
					border: none;
					button {
						display: block;
						width: 100%;
						height: 44/@rem;
						border-radius: 5/@rem;
						color: #fff;
						font-size: 16/@rem;
						text-align: center;
						line-height: 44/@rem;
						background: #f08d4a;
						margin: 0 auto;
						margin-top: 40/@rem;
					}
				}
			}
		}

	}
</style>

<script>
import md5 from 'js-md5'
export default {
  name: 'login',
  components: {

  },
  data() {
	return {
		valid: undefined,
		model: {
			id: '',
			//手机号
			phone: '',
			//密码
			password: ''
		},
		//校验手机号
		rules0: {
			required: true,
			type: 'string',
			pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
		},
		//手机号校验提示信息
		messages0: {
			required: '手机号不能为空！',
			pattern: '手机号不正确！'
		},
		//校验密码
		rules1: {
			required: true,
			type: 'string'
		},
		//密码校验提示信息
		messages1: {
			required: "密码不能为空！",
			pattern: "密码不正确！！"
		}
	}  
  },
  methods: {
	//点击登陆
	async submit() {
		let password = this.model.password;
		let phone = this.model.phone;
		try {
			const result = await this.$http({
				method: 'post',
				url: 'http://tsgc.qhd58.net/public/index.php/weixin/login/login',
				data: {
					id: this.model.id,
					phone: this.model.phone,
					password: md5('bff1bf5cd9f5696d3bc7c9757f242b1a' + this.model.password)
				}
			})
			if(result.code == 0 && result.result == true) {
				//传入vuex中的token和后台token对应
				this.$store.commit('settoken', result.data.token);
				//本地存入token
				window.localStorage.setItem('token',result.data.token);
				console.log(result.data.id) //6
				window.localStorage.setItem('id',result.data.id);
    			const toast = this.$toast.loading({
					duration: 0,       // 持续展示 toast
					forbidClick: true, // 禁用背景点击
					loadingType: 'spinner',
					message: result.msg
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
				this.$toast(result.msg);						
			}	
		}catch(err) {
			console.log(err)
			this.$toast(result.msg);	
		}
	}
  }
}
</script>
