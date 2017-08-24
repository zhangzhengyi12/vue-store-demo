<template>
  <div class="sales-board" >
      <div class="sales-board-intro">
        <h2>英雄联盟</h2>
        <p>《英雄联盟》(简称LOL)是由美国拳头游戏(Riot Games)开发、中国大陆地区腾讯游戏代理运营的英雄对战MOBA竞技网游。
游戏里拥有数百个个性英雄，并拥有排位系统、天赋系统、符文系统等特色养成系统。
《英雄联盟》还致力于推动全球电子竞技的发展，除了联动各赛区发展职业联赛、打造电竞体系之外，每年还会举办“季中冠军赛”“全球总决赛”“All Star全明星赛”三大世界级赛事，获得了亿万玩家的喜爱，形成了自己独有的电子竞技文化。</p>
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
                  产品版本：
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
                     name:"普通会员",
                     id:"101"
                 },
                 {
                     name:"超级会员",
                     id:"102"
                 },
                 {
                     name:"心悦会员",
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
                    name: "六个月",
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
                   name:"超级版",
                   id:"401"
                 },
                 {
                     name:"普通版",
                     id:"402"
                 },
                 {
                     name:"旗舰版",
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

.button{
    display: inline;
    border-radius: 3px;
    padding: 5px 10px;
    background-color: #4fc08d;
    color: #FFF;
    cursor: pointer;
}
</style>