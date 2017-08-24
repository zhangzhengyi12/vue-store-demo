<template>
    <form v-on:submit.prevent="onSubmit">
    <div class="form-group">
        <label for="exampleInputEmail1">用户名： </label>
        <input type="email"   placeholder="用户名" v-model="loginModelUserName" autocomplete="on">
        <span class="error" v-if="!loginEmailError.status">{{ loginEmailError.errorText }}</span>
    </div>
    <div class="form-group">
        <label for="exampleInputPassword1">密码：</label>
        <input type="password"  placeholder="密码" v-model="loginModelPassword">
        <span class="error" v-if="!loginPasswordError.status">{{ loginPasswordError.errorText }}</span>
    </div>
    <div class="checkbox">
        <label>
        记住密码 
        <input type="checkbox" id="passwrod" value="checkme" v-model="loginModelCheckMe">
        </label>
    </div>
    <button type="submit" class="btn btn-default" >登录</button>
    <span class="error" v-if="!finalUserLoginMessage">确认您的登录信息</span>
    </form>  
</template>

<script>
export default {
  data:()=>{
      return{
          loginModelUserName:'',
          loginModelPassword:'',
          loginModelCheckMe:[],
          finalUserLoginMessage:true
      }
  },
  methods: {
      onSubmit(){
          //验证表单
          if(this.loginEmailError.status === false || this.loginPasswordError.status === false){this.finalUserLoginMessage=false;return}
          let loginMessage = this.loginModelUserName+"&"+this.loginModelPassword+"&"+(this.loginModelCheckMe[0] !="checkme"? 'none' : 'checkme')
          this.$emit("on-login",loginMessage)
      }
  } ,
  computed: {
      loginEmailError(){
          let status,errorText
          if(!/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+.([a-zA-Z0-9_-])+/.test(this.loginModelUserName)){
              status = false
              errorText = '请确认您的邮箱'
          }else{
              status = true
              errorText = ""
          }

          return{
              status,
              errorText
          }
      },
      loginPasswordError(){
          let status,errorText
          if(/^([a-zA-Z0-9]){1,6}$/.test(this.loginModelPassword)){
              status = false
              errorText = '密码长度错误'
          }else{
              status = true
              errorText = ""
          }
          return{
              status,
              errorText
          }
      },
  }
}
</script>

<style>

form .form-group{
    line-height: 25px;
    padding: 10px 0 10px 0;
}

form .form-group label{
    width: 100px;
    text-align: center;
    display: inline-block;
}

form .checkbox {
    padding: 10px 0 10px 0;
    width: 100px;
    text-align: center;
}

form .form-group input{
    border: 1px solid  #4fc08d;
    border-radius: 2px;
    height: 20px;
line-height: 20px;
}

form button {
    display: inline-block;
    padding: 10px 20px 10px 20px;
    border-radius: 1px;
    border: 1px solid  #fff;
    background-color: #4fc08d;
    color: #fff;
    cursor: pointer;
    margin-right: 30px;
}

.error{
    color: red;
    padding-left: 20px;
}

</style>


