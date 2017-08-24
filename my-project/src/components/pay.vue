<template>


<div class="pay-log">
    <div class="pay-titles">
    <div class="title" v-for="item of parsedPayData" >{{ item.key }}</div>
    </div>
    <div class="pay-vals">
      <div class="val" v-for="item of parsedPayData">{{ item.val }}</div> 
    </div>
    <bank-chooser @on-change="onChangeBanks"></bank-chooser>
    <div class="button" @click="confirmBuy">立即购买</div>
</div>

  
</template>


<script>
import BankChooser from "../components/bankChooser.vue"
import parsePayData from "../util/productNameIDMap.js"
export default {
  props: {
      payData:{
          type:Object,
          default:{}
      },
      payPrice:{
          type:Number,
          default:0
      }
  },
  data:function(){
      return {
          parsedPayData:[],
          bankId:null,
          orderId:null
      }
  },
  created () {
      this.parsedPayData = parsePayData.parse(this.payData)
      this.parsedPayData.push({
          key:"价格",
          val:this.payPrice
      })
  },
  components: {
      BankChooser,
  },
  methods: {
       onChangeBanks(bankObj){
           this.bankId = bankObj.id
           console.log(this.bankId);
       },
       confirmBuy(){
           if(!this.bankId){alert("请选择银行");return}
           
           let payData = {
               Bank:this.bankId,
               data:this.payData
           }
           this.$http.post("/api/createOrder",payData)
           .then((res)=>{
                this.orderId = res.data.orderId;
                this.$emit("on-complete-pay",this.orderId)
           },(err)=>{

           })
       }
  }
  
}
</script>

<style>
.button{
    display: inline-block;
    cursor: pointer;
    padding: 5px 10px;
    background-color: #4fc08d;
    margin-top: 20px;
    color: #fff;
    font-size: 16px;
    line-height: 16px;
    border-radius: 3px;
}

.pay-log{
    width: 90%;
    margin: 30px auto;
}

.pay-log .pay-titles{
    background-color: #4fc08d;
    display: -webkit-box;
    display: box;
    padding: 10px 5px;
}
.pay-log .pay-titles .title{
    text-align: center;
    color:#fff;
    width: 1%;
    -moz-box-flex: 1;
    -webkit-box-flex: 1;
    box-flex:1;
}
.pay-log .pay-vals{
    display:-webkit-box;
    display: box;
}
.pay-log .pay-vals .val{
   text-align: center;
    width: 1%;
    -moz-box-flex: 1;
    -webkit-box-flex: 1;
    box-flex:1;
    font-size: 15px;
    height: 26px;
    line-height: 26px;
    border:1px solid #ccc;

}
</style>

