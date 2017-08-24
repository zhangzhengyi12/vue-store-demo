<template>
  <div class="options-wrap">
      <div class="options-show" @click="startSelectioning">
          <span>{{ comTitle }}</span>
          <div class="arrow"></div>
      </div>
      <ul class="options-list" v-if="isSelectioning">
          <li v-for="item of options.list" @click="selectionItem(item)">{{ item.name }}</li>
      </ul>
  </div>
</template>

<script>
export default {
  props:{
      options:{
          default:{},
          type:Object
      }
  },
  data:function(){
      return{
          currSelct:null,
          isSelectioning:false
      }
  },
  computed: {
      comTitle:function(){
          if(this.currSelct){return this.currSelct.name}
          if(this.options.title){return this.options.title};
          return options.list[0];
      }
  },
  methods: {
      startSelectioning(){
          this.isSelectioning = true;
      },
      selectionItem(item){
          this.$emit("on-change",{
              productConfigId:this.options.productConfigId,
              list:[item.id],
          })
          this.isSelectioning  = false;
          this.currSelct = item;
      }
  }
}
</script>

<style>

.options-wrap{
    display: inline-block;
    position: relative;
    z-index: 0;
}

.options-show{
    display: inline-block;
    padding: 0px 30px 0px 30px;
    border: 1px solid #e3e3e3;
    cursor: pointer;
    height: 25px;
    line-height: 25px;
    border-radius: 3px;
}

.options-show .arrow{
    display: inline-block;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    width: 0;
    height: 0;
    border-top: 10px solid #e3e3e3;
    margin-top: -1px;
    margin-left: 6px;
    margin-right: -14px;
    vertical-align: middle;
}
.options-list{
    display: inline-block;
    position: absolute;
    left: 0;
    top: 25px;
    width: 100%;
}
.options-list li{
    border: 1px solid #e3e3e3;
    padding-top: 5px;
    text-align: center;
    line-height: 25px;
    cursor: pointer;
    background-color: #ffffff;
}
.options-list li:hover{
    background-color: #888;
    color: #fff;
}
</style>


