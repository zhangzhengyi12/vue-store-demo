<template>
    <form v-on:submit.prevent="onSubmit">
    <div class="form-group">
        <label for="exampleInputEmail1">邮箱： </label>
        <input type="email"   placeholder="用户名" v-model="regModelUserName">
        <span class="error" v-if="!regEmailError.status">{{ regEmailError.errorText }}</span>
    </div>
    <div class="form-group">
        <label for="exampleInputPassword1">密码：</label>
        <input type="password"  placeholder="密码" v-model="regModelPassword">
    </div>
    <div class="form-group">
        <label for="exampleInputPassword1">手机号码：</label>
        <input type="password"  placeholder="密码" v-model="regModelPassword">
    </div>

        <button type="submit" class="btn btn-default" >注册</button>
    </form>  
</template>

<script>
export default {
  data:()=>{
      return{
          regModelUserName:'',
          regModelPassword:'',
          regModelCheckMe:[]
      }
  },
  methods: {
      onSubmit(){
          let regMessage = this.regModelUserName+"&"+this.regModelPassword+"&"+(this.regModelCheckMe[0] !="checkme"? 'none' : 'checkme')
          this.$emit("on-reg",regMessage)
      }
  },
  computed: {
      regEmailError(){
          let status,errorText
          if(!/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+.([a-zA-Z0-9_-])+/.test(this.regModelUserName)){
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
}

</style>


