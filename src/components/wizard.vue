<template>
  <div class="owl wizard regular" :id="wizardId" :ref="wizardId" :class="[fly, fighting]" @touchstart="touchstart">
    <!-- <div class="shining" v-if="showShining">
      <img src="../themes/images/common/shining.jpg" alt="">
    </div> -->
    <div class="ripple"></div>
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
      <div class="tail">
        <img src="../themes/images/common/tail.png" alt="">
      </div>
      <div class="abdomen">
        <img src="../themes/images/common/body.png" alt="">
      </div>
      <div class="clothes">
        <img src="../themes/images/skin/wizard-clothes.png" alt="">
      </div>
      <div class="hat">
        <img src="../themes/images/skin/wizard-hat.png" alt="">
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
      <div class="health" v-if="showHealth">
        <div class="name">{{name}}</div>
        <div class="progress" :style="{width: health + '%'}" :class="health<=10?'red':''"></div>
      </div>
      <div class="reel">
        <div class="reel-left"></div>
        <div class="painting" :class="[waveClass]">
            <ul class="inner" ref="paintingInner" :style="{left: paintingInnerLeft,width: paintingInnerWidth}"></ul>
        </div>
        <div class="reel-right"></div>
      </div>
      <div class="spell">
        <div class="inner" ref="spellInner"></div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'people',
    data () {
      return {
        wizardId: '',
        width: '', // 需要px,rem这样的单位，不能用百分比
        height: '', // 需要px,rem这样的单位，不能用百分比
        fly: '',
        waveClass: '',
        fighting: '',
        num: 100,
        pHTML: '',
        emptyStyle: {},
        widthUnit: 0,
        paintingInnerLeft: 0,
        paintingInnerWidth: 0
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
        type: [String,Number],
        default: 50,
      },
      defaultBranch: {
        type: Boolean,
        default: true,
      }
    },
    methods: {
      touchstart (e) {
        let self = this
        if(self.preventTouch) return
        self.createDom();
        self.createSpell();
        let timer1
        self.fly = 'fly'
        function run () {
          self.wave();
          self.waveClass = 'wave';
          clearTimeout(timer0);
        }
        let timer0 = setTimeout(run(), 500);
        timer1 = setTimeout(function() {
          self.waveClass = '';
          self.fly = ''
          clearTimeout(timer1);
        }, 1500)
      },
      createDom () {
        let self = this,
            oUl = self.$refs.paintingInner,
            uHTML = '',
            wizardId = self.wizardId,
            paintingWidth = self.$refs[wizardId].offsetWidth * 0.9;
        // let height = document.getElementById(wizardId);
        self.paintingInnerLeft = self.$refs[wizardId].offsetWidth * 0.05 + 'px';
        self.paintingInnerWidth = paintingWidth + 'px';
        let num = self.num;
        // let paintingWidth = document.getElementsByClassName('reel')[0].getBoundingClientRect().width * 0.9;
        let widthUnit = paintingWidth / num;
        let emptyStyle = document.querySelector('#emptyStyle');
        emptyStyle = emptyStyle ? emptyStyle : document.createElement('style');
        self.emptyStyle = emptyStyle;
        self.widthUnit = widthUnit;
        let head = document.getElementsByTagName('head')[0];
        head.appendChild(emptyStyle);
        emptyStyle.setAttribute('id', 'emptyStyle');
        for (let i = 0; i < paintingWidth / widthUnit; i++) {
          uHTML += '<li></li>';
          self.pHTML += 'ul li:nth-child(' + (i + 1) + ') {background-position-x: ' + (-i * widthUnit) + 'px;}';
        }
        oUl.innerHTML = uHTML;
        emptyStyle.innerHTML = self.pHTML + 'ul li{width:' + widthUnit + 'px;height:100%}';
      },
      createSpell () {
        let self = this;
        let oUl = self.$refs.spellInner;
        let uHTML = '';
        let spellString = '丨亅丿乛一乙乚丶八勹匕冫卜厂刀刂儿二匚阝丷几卩冂力冖凵人亻入十厶亠匸讠廴又艹屮彳巛川辶寸大飞干工弓廾广彐彑巾';
        spellString += spellString;
        for(let i = 0; i < spellString.length; i ++) {
          uHTML += '<span style="position: absolute;top: ' + 100 * Math.random() + '%;left:' + 100 * Math.random() + '%;color: rgba(255,255,255,.3);">' + spellString[i] + '</span>'
        }
        oUl.innerHTML = uHTML;
      },
      wave () {
        let self = this;
        let num = self.num;
        let pHTML = self.pHTML;
        let widthUnit = self.widthUnit;

        let direction = -1;
        let base = 3;
        let count = 1;
        let timer = setInterval(function() {
          let total = 3 * Math.PI;
          let unit = total / num;
          let factor = 0;
          let newHTML = '';
          if (count > 2) {
            for (let i = 0; i < num; i++) {
              factor = Math.sin(unit * i);
              newHTML += 'ul li:nth-child(' + (i + 1) + ') {transform: translateY(0px);}';
            }
            self.emptyStyle.innerHTML = pHTML + 'ul li{width:' + widthUnit + 'px;height:100%}' + newHTML;
            clearInterval(timer);
            return;
          }
          for (let i = 0; i < num; i++) {
            factor = Math.sin(unit * i);
            newHTML += 'ul li:nth-child(' + (i + 1) + ') {transform: translateY(' + (direction * base * factor) + 'px);}';
          }
          self.emptyStyle.innerHTML = pHTML + 'ul li{width:' + widthUnit + 'px;height:100%}' + newHTML;
          direction = -direction;
          count++;
        }, 400)
        self.$refs.paintingInner.style.width
      },
      createUniqueId (prefix) {
        return '' + (prefix || '') + Math.random();
      }
    },
    mounted () {
      let self = this;
      self.wizardId = self.createUniqueId('wizard');
      self.$nextTick(() => {
        self.createDom();
        self.createSpell();
      })
      self.$on('bridge', () => {
        self.touchstart();
      });
    }
  }
</script>
<style lang="less">
  @import "../themes/style/owl.less";
  @import "../themes/style/wizard.less";
</style>