<template>
  <div class="scene-container">
    <div class="scene">
      <div class="meteor" ref="meteor">
      </div>
      <div class="moon">
        <!-- <img src="themes/images/scene/moon.svg" alt=""> -->
      </div>
      <!-- <div class="branch-1"></div>
      <div class="branch-2"></div> -->
      <div class="branch-3"></div>
      <div class="branch-4"></div>
      <div class="branch-5"></div>
      <div class="branch-6"></div>
      <div class="branch-7"></div>
      <!-- <div class="cartoon-left"></div>
      <div class="cartoon-right"></div>
      <div class="grass"></div>
      <div class="broadleaf"></div> -->
      <div v-for="(item, index) in mallList" :class="['container-' + index, {'king-con': item.level === 6}]" :key="index" @touchstart="touchstartList($event, index)">
        <people v-if="item.level==0" :preventTouch="thumbnail.preventTouch" :defaultBranch="thumbnail.defaultBranch" :showHealth="thumbnail.showHealth" :name="item.nickName" :health="item.hunger">
          <!-- <div class="scene-branch-4"></div> -->
        </people>
        <general v-if="item.level==1" :preventTouch="thumbnail.preventTouch" :defaultBranch="thumbnail.defaultBranch" :showHealth="thumbnail.showHealth" :name="item.nickName" :health="item.hunger">
          <!-- <div class="scene-branch-6"></div> -->
        </general>
        <captain v-if="item.level==3" :preventTouch="thumbnail.preventTouch" :defaultBranch="thumbnail.defaultBranch" :showHealth="thumbnail.showHealth" :name="item.nickName" :health="item.hunger">
          <!-- <div class="scene-branch-3"></div> -->
        </captain>
        <commander v-if="item.level==4" :preventTouch="thumbnail.preventTouch" :defaultBranch="thumbnail.defaultBranch" :showHealth="thumbnail.showHealth" :name="item.nickName" :health="item.hunger">
          <!-- <div class="scene-branch-5"></div> -->
        </commander>
        <wizard v-if="item.level==5" :preventTouch="thumbnail.preventTouch" :defaultBranch="thumbnail.defaultBranch" :showHealth="thumbnail.showHealth" :name="item.nickName" :health="item.hunger">
          <!-- <div class="scene-branch-7"></div> -->
        </wizard>
        <guard v-if="item.level==2" :preventTouch="thumbnail.preventTouch" :defaultBranch="thumbnail.defaultBranch" :showHealth="thumbnail.showHealth" :name="item.nickName" :health="item.hunger">
          <!-- <div class="scene-branch"></div> -->
        </guard>
        <king v-if="item.level==6" :preventTouch="thumbnail.preventTouch" :defaultBranch="thumbnail.defaultBranch" :showHealth="thumbnail.showHealth" :name="item.nickName" :health="item.hunger">
        </king>
      </div>
      <div class="coins-container">
        <coins-rolling></coins-rolling>
      </div>
      <div class="mask" v-show="activeRole !== null">
        <div class="close-region" @touchstart="touchstartMask"></div>
        <div class="mask-container">
          <div v-for="(item, index) in mallList" :key="index" v-show="activeRole === index">
            <people v-if="item.level==0" ref="index" :preventTouch="detail.preventTouch" :defaultBranch="detail.defaultBranch" :showHealth="detail.showHealth" :name="item.nickName" :health="item.hunger">
              <!-- <div class="scene-branch-4"></div> -->
            </people>
            <general v-if="item.level==1" ref="index" :preventTouch="detail.preventTouch" :defaultBranch="detail.defaultBranch" :showHealth="detail.showHealth" :name="item.nickName" :health="item.hunger">
              <!-- <div class="scene-branch-6"></div> -->
            </general>
            <captain v-if="item.level==3" ref="index" :preventTouch="detail.preventTouch" :defaultBranch="detail.defaultBranch" :showHealth="detail.showHealth" :name="item.nickName" :health="item.hunger">
              <!-- <div class="scene-branch-3"></div> -->
            </captain>
            <commander v-if="item.level==4" ref="index" :preventTouch="detail.preventTouch" :defaultBranch="detail.defaultBranch" :showHealth="detail.showHealth" :name="item.nickName" :health="item.hunger">
              <!-- <div class="scene-branch-5"></div> -->
            </commander>
            <wizard v-if="item.level==5" ref="index" :preventTouch="detail.preventTouch" :defaultBranch="detail.defaultBranch" :showHealth="detail.showHealth" :name="item.nickName" :health="item.hunger">
              <!-- <div class="scene-branch-7"></div> -->
            </wizard>
            <guard v-if="item.level==2" ref="index" :preventTouch="detail.preventTouch" :defaultBranch="detail.defaultBranch" :showHealth="detail.showHealth" :name="item.nickName" :health="item.hunger">
              <!-- <div class="scene-branch"></div> -->
            </guard>
            <king v-if="item.level==6" ref="index" :preventTouch="detail.preventTouch" :defaultBranch="detail.defaultBranch" :showHealth="detail.showHealth" :name="item.nickName" :health="item.hunger">
            </king>
          </div>
        </div>
      </div>
      <slot>
      </slot>
    </div>
  </div>
</template>
<script>
  import people from './people.vue'
  import wizard from './wizard.vue'
  import general from './general.vue'
  import commander from './commander.vue'
  import captain from './captain.vue'
  import guard from './guard.vue'
  import king from './king.vue'
  import coinsRolling from './coinsRolling.vue'
  export default {
    name: 'Scene',
    props: {
      type: Array,
      mallList: {
        type: Array,
        default: () => [{
          level: 0,
          name: '小明',
          health: 50
        }, {
          level: 5,
          name: '小明',
          health: 50
        }, {
          level: 2,
          name: '小明',
          health: 50
        }, {
          level: 3,
          name: '小明',
          health: 50
        }, {
          level: 4,
          name: '小明',
          health: 50
        }]
      },
    },
    data() {
      return {
        activeRole: null,
        thumbnail: {
          preventTouch: true,
          showHealth: true,
          defaultBranch: false
        },
        detail: {
          preventTouch: false,
          showHealth: false,
          defaultBranch: true
        }
      }
    },
    components: {
      people,
      wizard,
      general,
      commander,
      captain,
      guard,
      king,
      coinsRolling
    },
    created(){
      console.log('activeRole===='+this.activeRole)
    },
    methods: {
      randomCoordinates() {
        let self = this;
        let meteor = self.$refs.meteor;
        setInterval(function() {
          meteor.style.transform = 'translateY(' + 400 * Math.random() + '%)';
        }, 5000)
      },
      touchstartList(e, index) {
        e.stopPropagation();
        let self = this;
        self.activeRole = index;
        self.$nextTick(() => {
          setTimeout(function() {
            self.$refs.index[index].$emit('bridge');
          }, 0)
        })
      },
      touchstartMask() {
        let self = this;
        self.activeRole = null
      }
    },
    mounted() {
      let self = this;
      self.randomCoordinates();
    //   self.$nextTick(() => {
    //     let width = document.getElementsByClassName('container-0')
    //   })
    }
  }
</script>
<style lang="less">
  @import '../themes/style/scene.less';
</style>