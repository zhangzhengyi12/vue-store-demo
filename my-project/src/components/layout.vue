<template>

    <div>
        <div class="app-head">
            <div class="app-head-inner">
              <router-link :to="{ path:'/' }">
                <img src="../assets/logo.png">
              </router-link>
                <div class="head-nav">
                    <ul class="nav-list" v-if="!user.logined">
                        <li @click="loginClick">登录</li>
                        <li class="nav-pile" @click="regClick">注册</li>
                        <li class="nav-pile" @click="aboutClick">关于</li>    
                    </ul>
                    <ul class="logined" v-if="user.logined">
                     <li>{{user.data.name}}</li>
                     <li class="nav-pile">个人信息</li>
                     <li class="nav-pile" @click="loginOut">注销</li>
                     </ul>    
                </div>    
            </div>
        </div> 
        <div class="app-content">

        <keep-alive>
          <router-view></router-view> 
        </keep-alive>  
          
        </div> 
        <div class="app-foot">
            <p>
            © 2017 zhangzhengyi12 MIT</p>
        </div>
        <my-diglog :isShow="isShowLoginDialog" @on-close="closeDialogBox('Login')" >
          <login-form @on-login="sendLogin"></login-form>
         </my-diglog>
        <my-diglog :isShow="isShowRegDialog" @on-close="closeDialogBox('Reg')">
          <reg-form></reg-form>
        </my-diglog>
        <my-diglog :isShow="isShowAboutDialog" @on-close="closeDialogBox('About')">
         <p>警告：该程序受版权法和国际公约的保护。未经授权而复制或分发该程序或其任何部分，将导致严重的民事和刑事处罚，并将遭受法律范围内最大限度的处罚。</p>
         </my-diglog>
         
   </div> 

</template>

<script>
import diglog from "../components/dialog"
import loginForm from "./logForm"
import regForm from "./regForm"

export default {
  components: {
    myDiglog:diglog,
    loginForm,
    regForm
  },
  data () {
    return {
      isShowLoginDialog:false,
      isShowRegDialog:false,
      isShowAboutDialog:false,
      user:{
        logined:false,
        data:{}
      }
    }
  },
  methods: {
   closeDialogBox(type){
     this['isShow'+type+'Dialog'] = false
   },
   loginClick(){
     this.isShowLoginDialog = true
   },
   regClick(){
     this.isShowRegDialog = true
   },
   aboutClick(){
     this.isShowAboutDialog  = true 
   },
   sendLogin(e){
     this.$http.get("/api/login")
     .then((res)=>{
       this.user.logined = true;
       this.user.data = res.data
       this.isShowLoginDialog = false;
     },(error)=>{
       console.log(error);
     })
   },
   loginOut(){
     this.user.logined = false;
   }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
  display: block;
}
body {
  line-height: 1;
}
ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
a {
  color: inherit;
  text-decoration: none;
}
body {
  background: #f0f2f5;
  font-family: "Helvetica Neue",Helvetica,Arial,"Hiragino Sans GB","Hiragino Sans GB W3","Microsoft YaHei UI","Microsoft YaHei","WenQuanYi Micro Hei",sans-serif;
  font-size: 14px;
  color: #444;
}
.app-head {
  background: #363636;
  color: #b2b2b2;
  height: 90px;
  line-height: 90px;
  width: 100%;
}
.app-head-inner {
  width: 1200px;
  margin: 0 auto;
}
.head-logo {
  float: left;
}
.app-head-inner img {
  width: 50px;
  margin-top: 20px;
}
.head-nav {
  float: right;
}
.head-nav ul {
  overflow: hidden;
}
.head-nav li {
  cursor: pointer;
  float: left;
}
.nav-pile {
  padding: 0 10px;
}
.app-foot {
  text-align: center;
  height: 80px;
  width: 100%;
  line-height: 80px;
  background: #e3e4e8;
  clear: both;
  margin-top: 30px;
}

</style>


