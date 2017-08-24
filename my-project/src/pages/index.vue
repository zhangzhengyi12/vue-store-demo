<template>
  <div class="index-wrap">
    <div class="index-left">
      <div class="index-left-block">
        <h2>全部产品</h2>
        
        <template v-for="product in productList">
          <h3>{{ product.title}}</h3>
          <ul>
            <li v-for="item in product.list">
              <a :href="item.url">{{ item.name }}</a>
              <span v-if="item.hot" class="hot-tag">HOT</span>
            </li>
          </ul>
          <div v-if="!product.last" class="hr"></div>
        </template>
      </div>
      <div class="index-left-block lastest-news">
        <h2>最新消息</h2>
        <ul>
          <li v-for="item in newsList">
            <a :href="item.url" class="new-item">{{ item.title }}</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="index-right">
      <!-- <slide-show :slides="slides" :inv="invTime"></slide-show> -->
      <slide-show :imgList='slideList' :config="slideConfig"></slide-show> 
      <div class="index-board-list">
        <div
        class="index-board-item"
        v-for="(item, index) in boardList"
        :class="[{'line-last' : index % 2 !== 0}, 'index-board-' + item.id ]">
          <div :class="[item.bgType,'index-board-item-inner']" >
            <h2>{{ item.title }}</h2>
            <p>{{ item.description }}</p>
            <div class="index-board-button">
              <router-link class="button" :to="{path: 'detail/' + item.toKey}">立即购买</router-link>
            </div>  
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import slideShow from "../components/sliderShow"
export default {
  components: {
    slideShow,
  },
  created: function () {
    this.$http.get('api/getNewsList')
    .then((res) => {
      this.newsList = res.data
    }, (err) => {
      console.log(err)
    })
  }, 
  data () {
    return {
      productList:[{
        title:"最新游戏",
        list:[{url:"www.baidu.com",hot:true,name:'全名大冲锋'},{url:"www.baidu.com",hot:true,name:'勇闯小熊岛'},{url:"www.baidu.com",hot:false,name:'性感沙滩8'},{url:"www.baidu.com",hot:false,name:'只爱一个战士'},{url:"www.baidu.com",hot:false,name:'黑人传说',last:true},],
      },{
        title:'热门游戏',
        last:true,
        list:[{url:"www.baidu.com",hot:true,name:'神鬼传说'},{url:"www.baidu.com",hot:true,name:'美男与野兽'},{url:"www.baidu.com",hot:true,name:'vim'},{url:"www.baidu.com",hot:true,name:'Ctyle'},{url:"www.baidu.com",hot:true,name:'宠物大作战'},],
      }],
      newsList:[
        {url:'www.laoliuscript.tk',title:'神鬼传说销量破万'},
        {url:'www.laoliuscript.tk',title:'元宵节感恩回馈'},
        {url:'www.laoliuscript.tk',title:'补偿活动将于周一开始'},
        {url:'www.laoliuscript.tk',title:'激活指南'},
      ],
      boardList: [
        {
          title: '英雄联盟',
          description: '超爽MOBA电竞',
          saleout: false,
          id:'loud',
          toKey:"lol"
        },
        {
          title: '消逝的光芒',
          description: '猛干僵尸我们最爱',
          saleout: false,
          id:'car',
          toKey:"light"
        },
        {
          title: '神秘海域',
          description: '飞一样的感觉',
          saleout: false,
          id: 'earth',
          toKey:'callofdely'
        },
        {
          title: '使命召唤',
          description: '精英玩家俱乐部',
          saleout: false,
          id: 'hill',
          toKey:'shenmi'
        }
      ],
      slideList:[
        {id:1,url:require('../assets/slideShow/1.jpg'),href:"detail/lol"},
        {id:2,url:require('../assets/slideShow/2.jpg'),href:"detail/shenmi"},
        {id:3,url:require('../assets/slideShow/3.png'),href:"detail/callofdely"},
        {id:4,url:require('../assets/slideShow/4.jpg'),href:"detail/light"},
        {id:5,url:require('../assets/slideShow/5.jpg')},
      ],
      slideConfig:{
        autoPlay:true,
        time:3000,
        firstImg:1
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.index-wrap {
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;
}
.index-left {
  float: left;
  width: 300px;
  text-align: left;
}
.index-right {
  float: left;
  width: 900px;
}
.index-left-block {
  margin: 15px;
  background: #fff;
  box-shadow: 0 0 1px #ddd;
}
.index-left-block .hr {
  margin-bottom: 20px;
  width: 100%;
  height: 1px;
  background-color: #4fc08d;
}
.index-left-block h2 {
  background: #4fc08d;
  color: #fff;
  padding: 10px 15px;
  margin-bottom: 20px;
}
.index-left-block h3 {
  padding: 0 15px 5px 15px;
  font-weight: bold;
  color: #222;
}
.index-left-block ul {
  padding: 10px 15px;
}
.index-left-block li {
  padding: 5px;
}
.index-board-list {
  overflow: hidden;
}
.index-board-item {
  float: left;
  width: 400px;
  background: #fff;
  box-shadow: 0 0 1px #ddd;
  padding: 20px;
  margin-right: 20px;
  margin-bottom: 20px;
}
.index-board-item-inner {
  min-height: 125px;
  padding-left: 120px;
}
.index-board-car .index-board-item-inner{
  background: url(../assets/images/2.png) no-repeat;
}
 .index-board-loud .index-board-item-inner{
  background: url(../assets/images/3.png) no-repeat;
}
.index-board-earth .index-board-item-inner{
  background: url(../assets/images/1.png) no-repeat;
}
.index-board-hill .index-board-item-inner{
  background: url(../assets/images/4.png) no-repeat;
} 
.index-board-item h2 {
  font-size: 18px;
  font-weight: bold;
  color: #000;
  margin-bottom: 15px;
}
.line-last {
  margin-right: 0;
}
.index-board-button {
  margin-top: 20px;
  display: inline-block;
  padding: 10px;
  background-color: #4fc08d;
  border-radius: 3px ;
  box-shadow: 1px 2px #ccc
}
.lastest-news {
  min-height: 512px;
}
.hot-tag {
  background: red;
  color: #fff;
}
.new-item {
  display: inline-block;
  width: 230px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.button{
  padding: 5px 10px;
  background-color: #4fc08d
}
</style>


