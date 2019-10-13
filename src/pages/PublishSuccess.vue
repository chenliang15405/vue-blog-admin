<template>
  <div class="container">
    <div class="box">
      <div class="tip-content">
        <span class="myicon-tick-checked" />
        <!--<span class="myicon-tick-uncheck" />-->
        <h2>{{ title }}</h2>
        <div class="tip-detail">
          <span>
            文章发布成功！
          </span>
          <p>
            发布时间: {{ date | parseTime }}
          </p>
        </div>
      </div>
      <div class="tip-btn">
        <el-button type="danger" @click.native="rewrite">再写一篇</el-button>&emsp;
        <el-button @click.native="toSeeBlog">查看文章</el-button>
      </div>
    </div>
  </div>
</template>

<script>

/*
* 通过this.$router.push({name: 'name', params:{id:1}}) 通过params传递参数，可以通过 this.$route.params.id  这种获取
* 不过需要的是这个路由的name来跳转，在router.js的配置中，不仅需要配置path，还要配置name
*
* 通过this.$router.push({path: 'path', query: {id:1}}) 通过this.$route.query.id 获取参数
* path是router.js中配置的路径的跳转链接 ， path是通过query传递参数
*
* 还有一个是router.js中配置的 /path/:id 这种跳转链接，通过 this.$route.params.id 获取
*
*/
import defaultSetting from '@/settings'

export default {
  name: 'PublishSuccess',
  data() {
    return {
      title: this.$route.query.title,
      date: new Date()
    }
  },
  mounted() {
    console.log(this.$route)
  },
  methods: {
    rewrite() {
      this.$router.go(-1)
    },
    toSeeBlog() {
      window.location.href = defaultSetting.blogWebUrl
    }
  }
}
</script>

<style scoped lang="scss">
	$btn-color: #CA2316;

	.container {
		width: 100%;
		height: 100%;
	}
	.box {
		width: 500px;
		height: 500px;
		margin: 30px 50%;
		transform: translateX(-50%);
		text-align: center;
	}
	.tip-content {
		margin: 30px auto;

		.tip-detail {
			margin: 5px 0;
			font-size: 14px;
		}
	}
	.tip-btn {
	}
	.el-button--danger {
		background-color: $btn-color;
		border-color: $btn-color;
	}

	/**绿色勾*/
	.myicon-tick-checked {
		display: inline-block;
		position: relative;
		width: 150px;
		height: 150px;
		border-radius: 50%;
		background-color: #2ac845;
		margin-bottom: 20px;
	}

	/**灰色勾*/
	.myicon-tick-uncheck {
		display: inline-block;
		position: relative;
		width: 150px;
		height: 150px;
		border-radius: 50%;
		background-color: #5f646e;
	}

	.myicon-tick-checked:before, .myicon-tick-checked:after, .myicon-tick-uncheck:before, .myicon-tick-uncheck:after {
		content: '';
		pointer-events: none;
		position: absolute;
		color: white;
		border: 1px solid;
		background-color: white;
	}

	.myicon-tick-checked:before, .myicon-tick-uncheck:before {
		width: 20px;
		height: 5px;
		left: 30%;
		top: 59%;
		transform: skew(0deg, 50deg);
		animation: myicon-tick-checked-before 2s;
	}

	.myicon-tick-checked:after, .myicon-tick-uncheck:after {
		width: 49px;
		height: 5px;
		left: 44%;
		top: 48%;
		transform: skew(0deg, -50deg);
		animation: myicon-tick-checked-after 3s;
	}

	/*@keyframes myicon-tick-checked-before {
		from {
			width: 0;
			height: 0;
		}
		to {
			width: 20px;
			height: 5px;
		}
	}
	@keyframes myicon-tick-checked-after {
		from {
			width: 0;
		}
		to {
			width: 20px;
		}
	}*/
</style>
