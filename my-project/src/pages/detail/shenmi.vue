<template>
  <div class="sales-board" >
      <div class="sales-board-intro">
        <h2>神秘海域</h2>
        <p>《神秘海域》是集解谜、寻宝、探险、射击于一身的冒险动作游戏系列。PS3\PS4系列由SCE旗下Naughty Dog（顽皮狗）工作室制作，PSV版则由Bend Studio制作，为外传性质作品。第一部作品于2007年发售。</p>
      </div>
      <div class="sales-board-form">
          <div class="sales-board-line">
              <div class="sales-board-line-left">
                  购买数量：
              </div>
              <div class="sales-board-line-right">
                  <count :numberSet="countNumber" @on-change="onParamChange('buyNum',$event)"></count>
              </div>
          </div>
          <div class="sales-board-line">
              <div class="sales-board-line-left">
                  产品类型：
              </div>
              <div class="sales-board-line-right">
                  <v-selection :options="prodectType" @on-change="onParamChange('proType',$event)"></v-selection>
              </div>
          </div>
          <div class="sales-board-line">
              <div class="sales-board-line-left">
                  有效时间：
              </div>
              <div class="sales-board-line-right">
                  <v-choose :chooseList="vaildTime" @on-change="onParamChange('vaTime',$event)"></v-choose>
              </div>
          </div>
          <div class="sales-board-line">
              <div class="sales-board-line-left">
                  DLC：
              </div>
              <div class="sales-board-line-right">
                  <m-choose :chooseList="productVerison" @on-change="onParamChange('proVer',$event)"></m-choose>
              </div>
          </div>
          <div class="sales-board-line">
              <div class="sales-board-line-left">
                  总价：
              </div>
              <div class="sales-board-line-right">
                  <span>{{ price }}</span>
              </div>
          </div>
          <div class="sales-board-line">
              <div class="sales-board-line-left">&nbsp;</div>
              <div class="sales-board-line-right">
                  <div class="button" >
                    立即购买
                  </div>
              </div>
          </div>
      </div>
      <div class="sales-board-des">
        <h2>产品说明</h2>
        <p>网站访问统计分析报告的基础数据源于网站流量统计信息，但其价值远高于原始数据资料。专业的网站访问统计分析报告对网络营销的价值，正如专业的财务分析报告对企业经营策略的价值。</p>

        <h3>用户行为指标</h3>
        <ul>
          <li>用户行为指标主要反映用户是如何来到网站的、在网站上停留了多长时间、访问了哪些页面等，主要的统计指标包括：</li>
          <li>用户在网站的停留时间；</li>
          <li>用户来源网站（也叫“引导网站”）；</li>
          <li>用户所使用的搜索引擎及其关键词；</li>
          <li>在不同时段的用户访问量情况等。</li>
        </ul>

        <h3>浏览网站方式</h3>
        <ul>
          <li>用户上网设备类型</li>
          <li>用户浏览器的名称和版本</li>
          <li>访问者电脑分辨率显示模式</li>
          <li>用户所使用的操作系统名称和版本</li>
          <li>用户所在地理区域分布状况等</li>
        </ul>
      </div>
  </div>
</template>

<script>
import VSelection from "../../components/base/vSelection.vue"
import VChoose from "../../components/base/choose"
import Count from "../../components/base/count"
import MChoose from "../../components/base/muiltChoose"
export default {
  components: {
      VSelection,
      VChoose,
      Count,
      MChoose
  },
  data:function (){
      return{
          price:0,
         buyNum:{},
         proType:{},
         vaTime:{},
         proVer:{},
         prodectType:{
             productConfigId:1,
             title:"产品类型",
             list:[
                 {
                     name:"穷人版",
                     id:"101"
                 },
                 {
                     name:"富人版",
                     id:"102"
                 },
                 {
                     name:"超爽版",
                     id:"103"
                 }
             ]
         },
         vaildTime:{
                productConfigId:2,
                list:[
                {
                    name:"一个月",
                    id:"201"
                },
                {
                    name:"三个月",
                    id:"202"
                },
                {
                    name: "十年",
                    id:"203"
                }
            ]
         },
         countNumber:{
             productConfigId:3,
             minNumber:20,
             defaultNumber:30,
             maxNumber:50
         },
         productVerison:{
             productConfigId:4,
             list:[
                 {
                   name:"神之降临",
                   id:"401"
                 },
                 {
                     name:"为了部落",
                     id:"402"
                 },
                 {
                     name:"为了联盟",
                     id:"403"
                 }
             ],
         },
      }
  },
  methods: {
      onParamChange(type,val){
          this[type]=val;
          if(JSON.stringify(this.buyNum) === "{}" || JSON.stringify(this.buyNum) ==="{}" || JSON.stringify(this.proType)=== "{}" || JSON.stringify(this.proVer) === "{}"){
              this.price = "请填写完整的信息"
              return
          }
          this.getPrice();
      },
      getPrice(){
          let passParam = {
              serverId:3,
              userChooseList:[
                  this.proType,
                  this.proVer,
                  this.buyNum,
                  this.vaTime
              ]
          }

          this.$http.post("/api/getPrice",passParam).
          then((res)=>{
              let data = JSON.parse(res.data)
              this.price = data + "元"
          })
      }
  }
}
</script>

<style scoped>
.buy-dialog-title {
  font-size: 16px;
  font-weight: bold;
}
.buy-dialog-btn {
  margin-top: 20px;
}
.buy-dialog-table {
  width: 100%;
  margin-bottom: 20px;
}
.buy-dialog-table td,
.buy-dialog-table th{
  border: 1px solid #e3e3e3;
  text-align: center;
  padding: 5px 0;
}
.buy-dialog-table th {
  background: #4fc08d;
  color: #fff;
  border: 1px solid #4fc08d;
}
</style>
