<template>
  <div class="choose-wrap">
      <ul class="choose-list">
          <li v-for="(item,index) of chooseList.list" :class="{ active : activeList[index].isActive }" @click='toggle(index)'>{{ item.name }}</li>
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
          activeList:[]
      }
  },//提取ID数组
  created () {
      for(let i=0 ; i<this.chooseList.list.length ; i++){
          this.activeList.push({
              id:this.chooseList.list[i].id,
              isActive:false
          })
      }
  },
  methods:{
      toggle(index){
          if(this.activeList[index].isActive === false){
             this.activeList[index].isActive = true
          }else{
              this.activeList[index].isActive = false;
          }
          //计算属性
          this.$emit("on-change",{
              productConfigId:this.chooseList.productConfigId,
              list:this.getActiveListForId
          })
      }
  },
  computed: {
      //拿到激活的数组
      getActiveListForId(){
          let arr = [];
          this.activeList.forEach(function(element) {
              if(element.isActive){
                  arr.push(element.id)
              }
          }, this);

          return arr
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

