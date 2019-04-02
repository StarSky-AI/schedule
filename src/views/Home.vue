<template>
	<div class="home">
		<div class="banner">
			<img :src="HomeImg.banner" alt="">
		</div>
		<div class="inform">
			<i class="icon-laba"></i><h1>{{inform}}</h1>
		</div>
		<div class="menu">
			<div class="menu-box">
				<div class="cookbook" @click="cookbook()">
					<img :src="MenuBg.bg" alt="">
				</div>
				<div class="site" @click="site()">
					<img :src="MenuBg.bg2" alt="">
				</div>
			</div>
			<div class="revise" @click="password()">
				<img :src="MenuBg.bg3" alt="">
			</div>
		</div>
	</div>
</template>

<style lang="less" scoped>
	@rem: 100rem;
	/*定义动画*/
	@keyframes gundong {
		from{
			position: absolute;
			left: 0;
		}
		to{
			left: -400/@rem;
		}
	}
	.banner {
		
		img {
			display: block;
			width: 100%;
			height: 100%;
		}
	}
	.inform {
		height: 54/@rem;
		line-height: 54/@rem;
		font-size: 10/@rem;
		background: #f8f8f8;
		position: relative;
		.icon-laba {
			display: block;
			width: 40/@rem;
			height: 54/@rem;
			position: absolute;
			left: 0;
			background: url('../assets/images/home/laba.png') no-repeat;
			background-size: 18/@rem;
			background-position: 18/@rem 18/@rem;
			background-color: #f8f8f8;
			z-index: 999;
		}
		h1 {
			padding-left: 44/@rem;
			 overflow:hidden;
			text-overflow:ellipsis;
			white-space:nowrap;
			animation: gundong 5s linear 0s infinite;

		}
	}
	.menu {
		overflow: hidden;
		padding: 10/@rem;
		box-sizing: border-box;
		.cookbook, .site {
			float: left;
			width: 48%;
		}
		.cookbook {
			margin-right: 11/@rem;
		}
		.revise {
			float: left;
			height: 80/@rem;
			margin-top: 5/@rem;
		}
	}
</style>

<script>
	export default {
		name: 'home',
		components: {

		},
		data() {
			return {
				HomeImg: {
					banner: require('../assets/images/home/banner.png')
				},
				MenuBg: {
					bg: require('../assets/images/home/menu.png'),
					bg2: require('../assets/images/home/site.png'),
					bg3: require('../assets/images/home/revise.png')
				},
				//通知公告
				inform: ''
			}
		},
		methods: {
			//菜谱点击事件
			cookbook() {
				this.$router.push('/menu');
			},
			//站点点击事件
			site() {
				this.$router.push('/site');
			},
			password() {
				this.$router.push('/password');
			}
		},
		created() {
			this.$http({
				method: 'post',
				url: '/api/weixin/index/queryNotice'
			}).then(res => {
				this.inform = res.data;
				console.log(res)
			}).catch(error => {
				console.log(error);
			})
			 
		}
	}
</script>