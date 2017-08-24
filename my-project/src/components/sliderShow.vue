<template>

<div class="slide-wrap"   @mouseover="clearAutoPlay" @mouseout="setTimer">
  
    <div class="slide-imgs" key="imgs">
<transition-group name="slide-fade">
        <a v-for="item of imgList" :href="item.href" key="index"><img :src="item.url" v-show="item.active" ></a>
</transition-group>
    </div>
  <ul class="button-list">
    <li class="prev btn-span" @click="prevImg" ><</li>
    <li class="btn-span point" v-for="(item,index) of imgList" @mouseover="slideGo(index)" :class="{ active: item.active }"></li>
    <li class="next btn-span" @click="nextImg" >></li>
  </ul>
</div>

</template>

<script>
import Vue from "vue"
export default {
  created () {
   //初始化imgList激活状态
   this.initImgListToActive(); 
   // init auto play
   this.setTimer();
  },
  props: {
    imgList:{
      type:Array,
      default:[]
    },
    config:{
      type:Object,
      default:{
        autoPlay:true,
        time:1000,
        firstImg:2
      }
    }
  },
  data:()=>{
      return {
         currImgIndex:0,
         timer:{}
      }
  },
  methods: {
    slideGo:function(index){
      this.imgList[this.currImgIndex].active = false;
      this.imgList[index].active  = true;
      this.currImgIndex = index
    },
    initImgListToActive(){
      // 必须使用vue.set方法，不然直接加入是无法触发刷新的
      this.imgList.forEach(function(element,index) {
        Vue.set(element,'active',false)
        if(index === this.config.firstImg-1){
          Vue.set(element,'active',true)
          this.currImgIndex = index;
        }
      }, this);
    },
    autoPlay(){
      let tragetIndex = this.currImgIndex+1;
      if(tragetIndex >= this.imgList.length){
        tragetIndex = 0
      }
      this.slideGo(tragetIndex)
    },
    setTimer(){
      this.timer = setInterval(()=>{
        this.autoPlay();
      },this.config.time)
    },
    prevImg(){
      let tragetIndex = this.currImgIndex-1
      if(tragetIndex < 0){
        tragetIndex = this.imgList.length-1
      }
      this.slideGo(tragetIndex)
    },
    nextImg(){
      let tragetIndex = this.currImgIndex+1;
      if(tragetIndex >= this.imgList.length){
        tragetIndex = 0
      }
      this.slideGo(tragetIndex)
    },
    clearAutoPlay(){
      console.log("object");
      clearInterval(this.timer)
    }
  }
}
</script>

<style>

.slide-wrap{
  width: 900px;
  height: 500px;
  margin-top: 15px;
  overflow: hidden;
  margin-bottom: 20px;
  position: relative;
}

.slide-wrap .slide-imgs img{
  height: 500px;
  width: 900px;
}

.slide-wrap .button-list{
  margin-right: 20px;
  position: absolute;
  bottom: 20px;
  right: 10px;
  height: 20px;
  line-height: 20px;
}

.slide-wrap .button-list .btn-span{
  color: #fff;
  font-size: 20px;
  display: inline-block;
  cursor:pointer; 
  line-height: 20px;
  vertical-align: middle;
}

.slide-wrap .button-list .btn-span.active{
  background-color: #666
}

.slide-wrap .button-list .point {
  height: 10px;
  width: 10px;
  border-radius: 10px;
  background-color: #fff;
  margin-right: 10px;
  margin-left: 10px;
  vertical-align:middle; 
}

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

</style>


