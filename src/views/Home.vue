<template>
	<div class="home">
		<div class="banner">
			<img :src="HomeImg.banner" alt="">
		</div>
			<!-- <i class="icon-laba"></i><h1>{{inform}}</h1> -->
			<van-notice-bar mode="closeable" left-icon="volume-o" style="height:37.5px;">
				{{inform}}
			</van-notice-bar>
		<div class="menu">
			<div class="menu-box">
				<div class="flex">
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
	</div>
</template>

<style lang="less" scoped>
	@rem: 100rem;
	.banner {	
		height: 220/@rem;	
		img {
			display: block;
			width: 100%;
			height: 100%;
		}
	}
	.menu {
		overflow: hidden;
		padding: 10/@rem;
		box-sizing: border-box;
		.cookbook, .site {
			float: left;
			
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
import { NoticeBar } from 'vant';
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
				url: 'http://tsgc.qhd58.net/public/index.php/weixin/index/queryNotice'
			}).then(res => {
				this.inform = res.data;
				console.log(res)
			}).catch(error => {
				console.log(error);
			})
			 
		}
	}
</script>