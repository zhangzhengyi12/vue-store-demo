<template>
  <div class="detail-wrap">
    <div class="detail-left">
      <div class="product-board">
        <img :src="productIcon">
        <ul>
          <router-link v-for="item in products" :to="{ path: item.path }" tag="li" active-class="active" :key="item.path">
            {{ item.name }}
          </router-link>
        </ul>
      </div>
    </div>
    <div class="detail-right">
      <keep-alive>
        <router-view @click-pay="onPay"></router-view>
      </keep-alive>
    </div>
    <my-diglog :isShow="isShowPayDiglog" @on-close="closePayDiglog">
      <paylog :payData="payData" :payPrice="price" @on-complete-pay="openCheck"></paylog>
    </my-diglog>
    <check-order :is-show-check-dialog="isShowCheckDialog" @on-close-check-dialog="closeCheckDialog"></check-order>
  </div>
</template>

<script>
import diglog from "../components/dialog"
import paylog from "../components/pay"
import CheckOrder from "../components/checkOrder.vue"

export default {
  components: {
    myDiglog:diglog,
    paylog,
    CheckOrder
  },
  data () {
      return {
          payData:{},
          price:0,
          isShowPayDiglog:false,
          isShowCheckDialog:false,
          products:[
              {
                  name:"使命召唤",
                  path:"callofdely",
                  actions: false
              },
              {
                 name:"神秘海域",
                 path:"shenmi",
                 active:false
              },
              {
                 name:"消逝的光芒",
                 path:"light",
                 active:false
              },
              {
                 name:"英雄联盟",
                 path:"lol",
                 active:false
              }
          ],
          imgMap:{
            "/detail/callofdely":require("../assets/images/1.png"),
            "/detail/shenmi":require("../assets/images/2.png"),
            "/detail/light":require("../assets/images/3.png"),
            "/detail/lol":require("../assets/images/4.png"),
          }
      }
  },
  computed: {
    productIcon(){
      return this.imgMap[this.$route.path]
    } 
  },
  methods: {
    onPay(a,price){
      this.payData = a;
      this.price = parseInt(price);
      this.isShowPayDiglog = true
    },
    closePayDiglog(){
      this.isShowPayDiglog = false
    },
    openCheck(id){
      this.isShowPayDiglog = false
      this.isShowCheckDialog = true
      console.log(id);
    },
    closeCheckDialog(){
      this.isShowCheckDialog = false;
    }
  },
}
</script>

<style>
.detail-wrap {
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;
  padding-top: 20px;
}
.detail-left {
  float: left;
  width: 200px;
  text-align: center;
}
.detail-right {
  float: left;
  width: 980px;
  margin-left: 20px;
}
.product-board {
  background: #fff;
  padding: 20px 0;
}
.product-board ul {
  margin-top: 20px;
}
.product-board li {
  text-align: left;
  padding: 10px 15px;
  cursor: pointer;
}
.product-board li.active,
.product-board li:hover {
  background: #4fc08d;
  color: #fff;
}
.product-board li a {
  display: block;
}
.sales-board {
  background: #fff;
}
.sales-board-form {

}
.sales-board-intro h2 {
  font-size: 20px;
  padding: 20px;
}
.sales-board-intro p {
  background: #f7fcff;
  padding: 10px 20px;
  color: #999;
  line-height: 1.8;
}
.sales-board-form {
  padding: 30px 20px;
  font-size: 14px;
}
.sales-board-line {
  clear: both;
  padding-bottom: 20px;
}
.sales-board-line-left {
    display: inline-block;
    width: 100px;
}
.sales-board-line-right {
    display: inline-block;
    width: 75%;
}
.sales-board-des {
  border-top: 20px solid #f0f2f5;
  padding: 15px 20px;
}
.sales-board-des p {
  line-height: 1.6;
}
.sales-board-des h2 {
  font-size: 20px;
  padding-bottom: 15px;
}
.sales-board-des h3 {
  font-size: 18px;
  font-weight: bold;
  padding: 20px 0 10px 0;
}
.sales-board-des li {
  padding: 5px 0;
}
.sales-board-table {
  width: 100%;
  margin-top: 20px;
}
.sales-board-table th {
  background: #4fc08d;
  color: #fff;
}
.sales-board-table td {
    border: 1px solid #f0f2f5;
    padding: 15px;
}
</style>
