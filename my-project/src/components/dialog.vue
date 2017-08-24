<template>
  <div>
      <div class="dialog-wrap" >
          <div class="dialog-cover" @click="closeMySelf" v-if="isShow"></div>
          <transition name="down">
            <div class="dialog-content" v-if="isShow">
                <p class="dialog-close" @click="closeMySelf">X</p>
                <slot>empty</slot>
            </div>
          </transition>
      </div>
  </div>
</template>

<script>
export default {
  props: {
      isShow:{
          type:Boolean,
          default:true
      },
  },
  created () {
  },
  methods: {
      closeMySelf(){
          this.$emit('on-close')
      }
  }
}
</script>

<style>

.dialog-wrap{
    position: fixed;
    top: 0;
}

.dialog-wrap .dialog-cover{
    position: fixed;
    z-index: 3;
    background-color: #333;
    opacity: .3;
    height: 100%;
    width: 100%;
}

.dialog-wrap .dialog-content{
    position: fixed;
    z-index: 9;
    max-height: 50%;
    width: 600px;
    background: #fff;
    left: 50%;
    margin-left: -300px;
    margin-top: 150px;
    border: 3px solid #4fc08d;
    padding: 10px;
}

.dialog-wrap .dialog-content .dialog-close{
    position: absolute;
    z-index: 4;
    font-size: 30px;
    color: #4fc08d;
    right: -30px;
    top:-15px;
    cursor: pointer;

}

.down-enter-active {
    transition: all .5s ease;
}

.down-leave-active{
    transition: all .3s ease;
}

.down-enter{
    transform: translateY(-500px);
}

.down-leave-active{
    transform: translateX(-1000px);
}

</style>


