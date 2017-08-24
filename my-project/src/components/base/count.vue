<template>
<div>
  <div class="count-wrap">
      <div class="count-sub" @click="sub">-</div>
      <transition name="fade-number" mode="out-in">
        <input class="count-number"  v-model.number="nowNumber" @blur="setNumber()">{{ nowNumber }}</input>
      </transition>
      <div class="count-add" @click="add">+</div>
  </div>
      <span> 范围 {{ numberSet.minNumber}} ~ {{ numberSet.maxNumber }}</span>
  </div>
</template>

<script>
export default {
    props: {
        numberSet:{
           type:Object,
           default:{
               defaultNumber:3,
               maxNumber:20
           } 
        }
    },
    data:function(){
        return{
            nowNumber:this.numberSet.defaultNumber,
        }
    },
    created () {
      this.change 
    },
    methods: {
        sub(){
           if(this.nowNumber-1<this.numberSet.minNumber){
               return
           }
           this.nowNumber--
           this.change
        },
        add(){
            if(this.nowNumber+1>this.numberSet.maxNumber){
                return
            }
            this.nowNumber++
            this.change
        },
        setNumber(){
            if(typeof this.nowNumber === "string"){
              this.nowNumber = Number(this.nowNumber.replace(/\d/g,""))
            }
            this.nowNumber = this.checkNumberRange
            this.chang
        }
        
    },
    computed: {
        change(){
            this.$emit("on-change",{
                productConfigId:this.numberSet.productConfigId,
                list:[this.nowNumber]
            })
        },
        checkNumberRange(){
            if(this.nowNumber > this.numberSet.maxNumber){
                return this.numberSet.maxNumber
            }
            if(this.nowNumber < this.numberSet.minNumber){
                return this.numberSet.minNumber
            }
            
            return this.nowNumber
        }
    },
   
  
}
</script>

<style>
.count-wrap{
    border: 1px solid #ccc;
    display: inline-block;
    /* overflow: hidden; */
}
.count-sub{
    display: inline-block;
    height: 20px;
    width: 20px;
    line-height: 20px;
    vertical-align: center;
    text-align: center;
    font-size: 15px;
    border-right: 1px solid #ccc;
    cursor: pointer;
}

.count-number{
   display: inline-block;
    height: 20px;
    width: 30px;
    line-height: 20px;
    vertical-align: center;
    text-align: center;
    font-size: 15px;
    border: none;
}

.count-add{
    display: inline-block;
    height: 20px;
    width: 20px;
    line-height: 20px;
    vertical-align: center;
    text-align: center;
    font-size: 15px;
    border-left: 1px solid #ccc;
    cursor: pointer;
}

.count-add:hover{
    background-color: #CCC;
    color: #fff;
}
.count-sub:hover{
    background-color: #CCC;
    color: #fff;
}

.fade-number-enter{
opacity: 0;
transform:translateY(10px);
}


.fade-number-enter-to,fade-number-leave{
    opacity: 1;
}

.fade-number-enter-active,.fade-number-leave-active{
    transition: all .1s;
}

</style>


