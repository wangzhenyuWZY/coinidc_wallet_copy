<template>
  <div class="owl commander regular" ref="owl" :class="[fly, fighting, lighting]" @touchstart="touchstart">
    <!-- <div class="shining" v-if="showShining">
      <img src="../themes/images/common/shining.jpg" alt="">
    </div> -->
    <div class="halo"></div>
    <div class="lightning">
      <div class="light-1"></div>
      <div class="light-2"></div>
      <div class="light-3"></div>
      <div class="light-4"></div>
    </div>
    <div class="body">
      <div class="wings folded">
        <div class="left">
          <img src="../themes/images/common/folded-wing-left.png" alt="">
        </div>
        <div class="right">
          <img src="../themes/images/common/folded-wing-right.png" alt="">
        </div>
      </div>
      <div class="wings spread">
        <div class="left">
          <img src="../themes/images/common/wing-left.png" alt="">
        </div>
        <div class="right">
          <img src="../themes/images/common/wing-right.png" alt="">
        </div>
      </div>
      <div class="arms">
        <div class="left">
          <img src="../themes/images/common/hold-wing.png" alt="">
        </div>
      </div>
      <div class="hand">
        <img src="../themes/images/common/hand.png" alt="">
      </div>
      <div class="tail">
        <img src="../themes/images/common/tail.png" alt="">
      </div>
      <div class="abdomen">
        <img src="../themes/images/common/body.png" alt="">
      </div>
      <div class="clothes">
        <img src="../themes/images/skin/commander-clothes.png" alt="">
      </div>
      <div class="hat">
        <img src="../themes/images/skin/commander-hat.png" alt="">
      </div>
      <div class="branch" v-if="defaultBranch">
        <img src="../themes/images/common/branch.png" alt="">
      </div>
      <slot></slot>
      <div class="feet">
        <div class="left">
          <img src="../themes/images/common/foot.png" alt="">
        </div>
        <div class="right">
          <img src="../themes/images/common/foot.png" alt="">
        </div>
      </div>
      <div class="head">
        <div class="ear">
          <div class="left">
            <img src="../themes/images/common/ear-left.png" alt="">
          </div>
          <div class="right">
            <img src="../themes/images/common/ear-right.png" alt="">
          </div>
        </div>
        <div class="eye">
          <div class="circle left">
            <div class="contour">
              <img src="../themes/images/common/eye-circle-left.png" alt="">
            </div>
            <div class="eyebrow left">
              <img src="../themes/images/common/eyebrow-left.png" alt="">
            </div>
            <div class="eyeball">
              <div class="pupil"></div>
              <div class="star-1"></div>
              <div class="star-2"></div>
            </div>
          </div>
          <div class="circle right">
            <div class="contour">
              <img src="../themes/images/common/eye-circle-right.png" alt="">
            </div>
            <div class="eyebrow right">
              <img src="../themes/images/common/eyebrow-right.png" alt="">
            </div>
            <div class="eyeball">
              <div class="pupil"></div>
              <div class="star-1"></div>
              <div class="star-2"></div>
            </div>
          </div>
        </div>
        <div class="mouth">
          <img src="../themes/images/common/mouth.png" alt="">
        </div>
      </div>
      <div class="bamboo">
        <img src="../themes/images/skin/commander-sword.png" alt="">
      </div>
      <div class="health" v-if="showHealth">
        <div class="name">{{name}}</div>
        <div class="progress" :style="{width: health + '%'}" :class="health<=10?'red':''"></div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'commander',
    data() {
      return {
        fly: '',
        fighting: '',
        lighting: ''
      }
    },
    props: {
      preventTouch: {
        type: Boolean,
        default: false
      },
      showShining: {
        type: Boolean,
        default: false
      },
      showHealth: {
        type: Boolean,
        default: false
      },
      name: {
        type: String,
        default: '',
      },
      health: {
        type: [String, Number],
        default: 50,
      },
      defaultBranch: {
        type: Boolean,
        default: true,
      }
    },
    methods: {
      touchstart(e) {
        let self = this
        if (self.preventTouch) return
        let timer1, timer2
        // self.fly = 'fly'
        self.fighting = 'fighting'
        timer1 = setTimeout(function() {
          self.lighting = 'lighting'
        }, 600)
        timer2 = setTimeout(function() {
          self.lighting = ''
          self.fighting = ''
          clearTimeout(timer1)
          clearTimeout(timer2)
        }, 1000)
      }
    },
    mounted() {
      let self = this;
      self.$on('bridge', () => {
        self.touchstart();
      });
    }
  }
</script>
<style lang="less" scoped>
  @import "../themes/style/owl.less";
  @import "../themes/style/commander.less";
</style>