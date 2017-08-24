<template>
  <div class="choose-wrap">
      <ul class="choose-list">
          <li v-for="(item,index) of chooseList.list" :class="{ active : activeIndex==index }" @click='toggle(index)'>{{ item.name }}</li>
      </ul>
  </div>
</template>


<script>
export default {
  props: {
      chooseList:{
          type:Object,
          default:{}
      }
  },
  data:function() {
      return {
          activeIndex:null
      }
  },
  methods:{
      toggle(index){
          this.activeIndex = index;
          this.$emit("on-change",{
              productConfigId:this.chooseList.productConfigId,
              list:[this.chooseList.list[index].id]
          })
      }
  }
}
</script>

<style>

.choose-wrap{
    
}

.choose-wrap .choose-list{

}

.choose-list li{
    display: inline-block;
    border: 1px slolid #e3e3e3;
    padding: 6px 8px;
    background-color: #ccc;
    color: #fff;
    margin-right: 10px;
    border-radius: 3px;
    cursor: pointer;
}

.choose-list li:hover{
    background-color: #4fc08d;
}

.choose-list li.active{
    background-color: #4fc08d;
}
</style>

