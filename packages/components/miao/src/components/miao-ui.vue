<template>
  <div class="miao-ui-main" :class="mainPanelClassComp" ref="mainRef">
    <audio preload="auto" :src='audio.audioSua' ref="audioSuaRef"/>
    <audio preload="auto" :src="audio.audioFailed" ref="audioFailedRef"/>
    <audio preload="auto" :src='audio.audioDu' ref="audioDuRef"/>
    <audio preload="auto" :src='audio.audioBgm' ref="audioBgmRef" loop/>

    <template v-if="cards">
      <template  v-for='(layer, layerIdx) of cardsComp'>
        <template v-for="(row, rowIdx) of layer" >
          <template v-for="(card, colIdx) of row">
            <div v-if="card && !card.destory"
               @click="cardClicked(card)"
               class="card-wrapper"
               :style="cardWrapperStyle(layerIdx, rowIdx, colIdx, card)"
               :key="`card-${layerIdx}-${rowIdx}-${colIdx}`">
              <card-item :card="card" :images="images" :bar="bar" :paused="pauseTimeStart !== 0"/>
            </div>
          </template>
        </template>
      </template>
    </template>

    <speaker-btn class="speaker-control" v-model="audioState"/>

    <div class="bar" :style="{top: `${barTopComp}px`}"></div>

    <div class="xipai control-btn" @click="xipaiClicked">
      {{t('btn.randomCard')}}
      <div class="corner">{{xipaiLeft}}</div>
    </div>
    <div class="zhanting control-btn" @click="pauseClicked">
      {{pauseTimeStart === 0 ? t("btn.pause") : t('btn.continue')}}
      <div class="corner">{{pauseLeft}}</div>  
    </div>

    <state-bar :time-remain="timeRemainComp" :score="score"/>

    <div class="welcome" ref="welcomeRef">
      <div class="game-name" v-for="(item, idx) of gameNameDisplayComp" :key="idx" :style="item.style">{{item.char}}</div>
      
      <div class="start-button" @click="startGame">{{t('btn.start')}}</div>
    </div>

    <div class="water-mark link">
      http://tsy.zone/site/home
    </div>

    <div class="game-over-mask">
      <div class="text">{{t('gameover')}}</div>
      <div class="start-button" @click="restartGame">{{t('btn.restart')}}</div>
    </div>
    
  </div>
</template>






<script>
import Utils from '../../../../utils.js'
import StateBar from './state-bar.vue'


import audioSua from '../assets/audio/sua.mp3'
import audioFailed from '../assets/audio/failed.mp3'
import audioDu from '../assets/audio/du.mp3'
import audioBgm from '../assets/audio/bgm.mp3'

import SpeakerBtn from './speaker-btn.vue'
import CardItem from './card-item.vue' 

import langMixin from '../mixins/lang-mixin.js'


const BAR_LENGTH = 8


const createCardsData = (layerCnt, rowCnt, columnCnt, typeCnt) => {
  let id = 1;

  const data = [];
  for (let layerIdx=0; layerIdx<layerCnt; layerIdx++) {
    const layer = []

    for (let rowIdx=0; rowIdx<rowCnt - layerIdx%2; rowIdx++) {
      const row = []
      for (let colIdx=0; colIdx<columnCnt - layerIdx%2; colIdx++) {
        row.push({
          id,
          type: Math.floor(Math.random() * typeCnt),
          layerIdx,
          rowIdx,
          colIdx,
          dark: layerIdx !== layerCnt - 1,
        })
        id++;
      }
      layer.push(row)
    }
    data.push(layer)
  }
  return data;
}

const getLocal = (path) =>{
  return Utils.getLocal('miao', path)
}

const setLocal = (obj) => {
  Utils.setLocal('miao', obj)
}

export default {
  props:{
    gameName: {
      type: String,
      default() {
        return "tsy.zone"
      }
    },
    width: Number,
    height: Number,
    images: Array
  },
  


  mixins: [langMixin],



  components: {
    CardItem,
    SpeakerBtn,
    StateBar,
  },



  created() {
    this.audio = {
      audioSua,
      audioFailed,
      audioDu,
      audioBgm
    }
  },




  data() {
    const audioState = getLocal('audio.on')
    return {
      cards: false,
      bar: [],
      audioState,
      gameStartTime: 0,
      pauseTime: 0, // 记录游戏一共暂停了多久
      pauseTimeStart: 0,  // 开始暂停的时间，在结束暂停的时候累计 pauseTime
      pauseLeft: 3,
      score: 0,
      gameTime: 10000, // 可用的游戏时间
      running: false,
      currentTime: Date.now(),
      showWelcome: true,
      gameOverFlag: false,
      xipaiFlag: false, // 正在洗牌
      xipaiLeft: 3,
    }
  },



  computed: {
    gameNameDisplayComp() {
      const {
        gameName,
        height,
        width
      } = this;
      const arr = []


      const fs = Math.min(width, height) / (gameName.length)
      const offsetX = width / (gameName.length + 1)
      const centerX = width / 2
      const centerY = height / 2
      const radius = Math.min(width, height) / 2
      const deg = 60
      for (let idx=0; idx<gameName.length; idx++) {
        const char = gameName.charAt(idx);
        const left = offsetX * (idx + 1)
        const a = centerX - left
        const topOffset = Math.sqrt(radius * radius - a * a)
        let top = centerY - topOffset
        
        const rot = deg / (gameName.length - 1) * (idx ) - deg / 2
        arr.push({
          char,
          style: {
            left: `${left}px`,
            top: `${top}px`,
            transform: `rotate(${rot}deg) translateX(-50%)`,
            'font-size': `${fs}px`
          }
        })
      }
      return arr;
    },
    mainPanelClassComp() {
      const {
        showWelcome,
        gameOverFlag
      } = this
      return {
        'show-welcome': showWelcome,
        'show-game-over': gameOverFlag
      }
    },
    timeRemainComp() {
      const {
        gameStartTime,
        currentTime,
        pauseTime,
        pauseTimeStart,
        gameTime,
      } = this
      let rv = 0
      if (pauseTimeStart === 0) { // 当前没有暂停
        rv = gameTime - (currentTime - gameStartTime) / 1000 + pauseTime
      } else {
        rv = gameTime - (pauseTimeStart - gameStartTime) / 1000 + pauseTime
      }
      return Math.floor(rv)
    },

    cardMarginLeftComp() {
      const {
        width, cardWidthComp, columnCountComp
      } = this

      return (width - cardWidthComp * columnCountComp) / 2
    },
    barMarginLeftComp() {
      return Math.floor((this.width - this.cardWidthComp * BAR_LENGTH ) / 2)
    }, 
    cardsComp() {
      return this.cards
    },
    cardHeightComp() {
      return Math.floor(this.height * 0.11) // 这里的计算规则 需要和 css中保持同步
    },
    cardWidthComp() {
      return Math.floor(this.cardHeightComp * 0.618) // 这里的计算规则 需要和 css中保持同步
    },
    columnCountComp() {
      const {
        width,
        cardWidthComp
      } = this
      return Math.floor((width * .99 ) / cardWidthComp)
    },
    barTopComp() {
      const {
        height,
        cardHeightComp
      } = this
      const top = height - cardHeightComp - height * 0.01;
      return top
    }
  }, 



  watch: {
    audioState(value) {
      setLocal({
          audio: {
            on: value
          }
        })
      if (value) {
        this.$refs.audioBgmRef.play()
      } else {
        this.$refs.audioBgmRef.pause()
      }
    },
    width(width) {
      this.$refs.mainRef.style.setProperty('--main-width', `${width}px`)
    },
    height(height) {
      this.$refs.mainRef.style.setProperty('--main-height', `${height}px`)
    },
    timeRemainComp(remain) {
      if (this.running) {
        if (remain < 6) {
          this.$refs.audioBgmRef.pause()
        }
        if (remain === 5 || remain === 4 || remain === 3 || remain === 2 || remain === 1) {
          this.audioState && this.$refs.audioDuRef.play();
        } if (remain === 0) {
          this.gameover()
        }
      }
    }
  },



  mounted() {
    const that = this
    that.$refs.audioBgmRef.volume = .5

    that.$refs.mainRef.style.setProperty('--main-width', `${this.width}px`)
    that.$refs.mainRef.style.setProperty('--main-height', `${this.height}px`)
    that.$refs.mainRef.style.setProperty('--bar-length', BAR_LENGTH)

    that.timerId = setInterval(() => {
      if(that.running) {
        that.currentTime = Date.now()
      }
    }, 10)
  },




  unmounted() {
    clearInterval(this.timerId)
  },




  methods: {
    pauseClicked() {
    
      if (this.pauseTimeStart === 0) {
        if (this.pauseLeft <= 0) {
          return false
        }
        this.pauseLeft -= 1
        this.pauseTimeStart = Date.now()
      } else {
        this.pauseTime += (Date.now() - this.pauseTimeStart) / 1000
        this.pauseTimeStart = 0
      }
    },
    cardInMatrix(layerIdx, rowIdx, colIdx, newValue) {
      const cards = JSON.parse(JSON.stringify(this.cards));
      const layer = cards[layerIdx];
      if (layer) {
        const row = layer[rowIdx];
        if (row) {
          const card = row[colIdx]
          if (newValue !== undefined) {
            row[colIdx] = newValue
            this.cards = cards
            console.log(`set matrix L[${layerIdx}] R[${rowIdx}] C[${colIdx}] to new value`, newValue)
          }
          if (card) {
            return card
          }
        }
      }
      return false;
    },
    getCardPositionInBar(cardId) {
      const {
        bar,
        barTopComp,
        cardWidthComp
      } = this

      let left = 0;
      for (let idx=0; idx<bar.length; idx++) {
        if (bar[idx].id === cardId) {
          left = idx * cardWidthComp + this.barMarginLeftComp
          break;
        }
      }

      return {
        top: barTopComp,
        left
      }
    },
    getCardPositionInMatrix(layerIdx, rowIdx, colIdx) {
      const {
        cardWidthComp, 
        cardHeightComp,
        cardMarginLeftComp
      } = this

      let offsetX = 0; // 奇偶不同图层的偏移值
      let offsetY = 0; // 奇偶不同图层的偏移值

      if (layerIdx % 2 === 1) {
        offsetX = cardWidthComp / 2
        offsetY = cardHeightComp / 2
      }

      const top = rowIdx * cardHeightComp + cardHeightComp + offsetY  // 上面空出一个卡牌高度，显示state
      const left = colIdx * cardWidthComp + cardMarginLeftComp + offsetX
      return {
        top,
        left
      }
    },
    cardWrapperStyle(layerIdx, rowIdx, colIdx,  card) {

      const cardInBar = this.bar.find(cardInBar => {
        return cardInBar && cardInBar.id === card.id
      })
      if (cardInBar) {  // 已经加入bar，用bar中的位置
        const pos = this.getCardPositionInBar(card.id)
        const style = {
          top: `${pos.top}px`,
          left: `${pos.left}px`,
          'z-index': 100000 + layerIdx,
        }
        return style;
      } 

      const {
        xipaiFlag,
        width,
        height,
        cardWidthComp,
        cardHeightComp
      } = this

      const {
        top: topOri,
        left: leftOri
      } = this.getCardPositionInMatrix(layerIdx, rowIdx, colIdx);

      let top = topOri
      let left = leftOri

      if (xipaiFlag) { // 如果当前正在洗牌，
        const centerX = width / 2
        const centerY = height / 2

        let cx = left + cardWidthComp / 2
        let cy = top + cardHeightComp / 2

        if (cy === centerY) {
          cy =+ 1
        }
        if (cx === centerX) {
          cx += 1
        }
        const b = centerY - cy // >0 上面    <0 下面
        const a = centerX - cx // >0左面     <0 右面

        let tan = b / a 

        if (tan > 20) {
          tan = 20
        } else if (tan < -20) {
          tan = -20
        }
        
        if (cx <= centerX) {  // 左面
          left = centerX - width

          if (cy <= centerY) { // 4
            top = left * tan
          } else {  // 3
            top = left * tan + centerY
          }

        } else {    // 右面
          left = centerX + width

          if (cy <= centerY) { // 1
            top = left * tan
          } else { // 2
            top = left * tan
          }
        }
      } 



      const style = {
        top: `${top}px`,
        left: `${left}px`,
        'z-index': 100000 + layerIdx,
      }

      return style;
    },
    deleteCardInBar(cardId) {
      const newBar = []

      for (let idx=0; idx<this.bar.length; idx++) {
        const cardInBar = this.bar[idx];
        if (cardInBar && cardInBar.id !== cardId) {
          newBar.push(cardInBar)
        }
      }

      this.bar = newBar
    },
    uncover(card) { // 翻开底部, 奇偶错位，分别处理
      const that = this

      const removed = (layerIdx, rowIdx, colIdx) => { // 被destory  或者 在 bar中 都是从 matrix中移除 了
        const card = this.cardInMatrix(layerIdx, rowIdx, colIdx)
        if (card === false) {
          return true
        }

        if (card.destory) {
          return card
        }

        const cardInBar = that.bar.find(cardInBar => {
          return cardInBar.id === card.id
        })

        return cardInBar
      } 

      if (card.layerIdx % 2 === 0) { // 偶数层数据多
        const needCheckCards = [{ // 上一层相邻的4张牌
          layerIdx: card.layerIdx - 1,
          rowIdx: card.rowIdx - 1,
          colIdx: card.colIdx - 1
        }, {
          layerIdx: card.layerIdx - 1,
          rowIdx: card.rowIdx - 1,
          colIdx: card.colIdx
        }, {
          layerIdx: card.layerIdx - 1,
          rowIdx: card.rowIdx,
          colIdx: card.colIdx - 1
        }, {
          layerIdx: card.layerIdx - 1,
          rowIdx: card.rowIdx,
          colIdx: card.colIdx
        }].map(pos => {
          const currCard = that.cardInMatrix(pos.layerIdx, pos.rowIdx, pos.colIdx)
          return currCard
        })

        const check = currCard => {
          const c1Removed = removed(currCard.layerIdx + 1, currCard.rowIdx,     currCard.colIdx);
          const c2Removed = removed(currCard.layerIdx + 1, currCard.rowIdx,     currCard.colIdx + 1);
          const c3Removed = removed(currCard.layerIdx + 1, currCard.rowIdx + 1, currCard.colIdx)
          const c4Removed = removed(currCard.layerIdx + 1, currCard.rowIdx + 1, currCard.colIdx + 1)
          if (c1Removed && c2Removed && c3Removed && c4Removed) {
            currCard.dark = false
            that.cardInMatrix(currCard.layerIdx, currCard.rowIdx, currCard.colIdx, currCard)
          }
        }

        needCheckCards.forEach(cardNeedCheck => {
          cardNeedCheck && check(cardNeedCheck)
        }) 


      } else { // 奇数层
        const needCheckCards = [{ // 上一层相邻的4张牌
          layerIdx: card.layerIdx - 1,
          rowIdx: card.rowIdx,
          colIdx: card.colIdx
        }, {
          layerIdx: card.layerIdx - 1,
          rowIdx: card.rowIdx + 1,
          colIdx: card.colIdx
        }, {
          layerIdx: card.layerIdx - 1,
          rowIdx: card.rowIdx,
          colIdx: card.colIdx + 1
        }, {
          layerIdx: card.layerIdx - 1,
          rowIdx: card.rowIdx + 1,
          colIdx: card.colIdx + 1
        }].map(pos => {
          const currCard = that.cardInMatrix(pos.layerIdx, pos.rowIdx, pos.colIdx)
          return currCard
        })

        const check = currCard => {
          const c1Removed = removed(currCard.layerIdx + 1, currCard.rowIdx - 1, currCard.colIdx -1);
          const c2Removed = removed(currCard.layerIdx + 1, currCard.rowIdx - 1, currCard.colIdx);
          const c3Removed = removed(currCard.layerIdx + 1, currCard.rowIdx,     currCard.colIdx -1)
          const c4Removed = removed(currCard.layerIdx + 1, currCard.rowIdx,     currCard.colIdx)
          if (c1Removed && c2Removed && c3Removed && c4Removed) {
            currCard.dark = false
            that.cardInMatrix(currCard.layerIdx, currCard.rowIdx, currCard.colIdx, currCard)
          }
        }

        needCheckCards.forEach(cardNeedCheck => {
          cardNeedCheck && check(cardNeedCheck)
        }) 
      }
    },
    xipaiClicked() {
      const that = this

      if (that.xipaiLeft <= 0) {
        return false
      }
      if (that.xipaiFlag) {
        return false
      }

      that.xipaiFlag = true
      that.xipaiLeft -= 1
      
      setTimeout(() => {
        that.xipaiFlag = false
        const {
          cards
        } = that
        for (const layer of cards) {
          for (const row of layer) {
            for (const card of row) {
              const cardInBar = that.bar.find(cardInBar => {
                return cardInBar && cardInBar.id === card.id
              })
              if (!cardInBar && !card.destory) {  // 已经加入bar，用bar中的位置, 只能变换不在bar中的card
                card.type = Math.floor(Math.random() * that.images.length)
              }
              
            }
          }
        }
      }, 1000)
    },
    cardClicked(card) {
      if (card.dark) { // 黑牌不能点击
        return false
      }

      if (this.xipaiFlag) {
        return false
      }

      if (this.pauseTimeStart !== 0) {
        return false;
      }

      if (this.gameOverFlag) {
        return false
      }

      const that = this

      const cardInBarBeforePush = that.bar.find(cib => {
        return cib.id === card.id
      })

      if (cardInBarBeforePush) { // 已经在bar中的不能点击
        return false
      }

      if (that.bar.length === BAR_LENGTH) {
        return false
      }

      that.audioState && that.$refs.audioSuaRef.play();

      that.bar.push(card)
      that.bar.sort((a, b) => {
        return a.type - b.type
      })

      this.uncover(card)

      const destoryQueue = []
      const grouped = []
      for (const cardInBar of that.bar) {
        if (!grouped[cardInBar.type]) {
          grouped[cardInBar.type] = []
        }
        grouped[cardInBar.type].push(cardInBar)
      }
      for (const key in grouped) {
        const cardGroup = grouped[key]
        if (cardGroup.length >= 3) {
          for (let destoryIdx=0; destoryIdx<3; destoryIdx++) {
            destoryQueue.push(cardGroup[destoryIdx])
          }
          that.gameTime += 5
          setTimeout(() => {
            that.score += 1
            
            that.audioState && that.$refs.audioBgmRef.play()
            destoryQueue.forEach(cardInGroup => {
              cardInGroup.destory = true
              that.cardInMatrix(cardInGroup.layerIdx, cardInGroup.rowIdx, cardInGroup.colIdx, cardInGroup)
              that.deleteCardInBar(cardInGroup.id)
              
            })
          }, 1000) 
        }
      }

      let barItemCnt = 0
      that.bar.forEach(cardInBar => {
        const needDestory = destoryQueue.find(cardInDestory => {
          return cardInBar.id === cardInDestory.id
        })
        if (!needDestory) {
          barItemCnt++
        }
      })
      if (barItemCnt > BAR_LENGTH - 1) {
        that.gameover() 
      }
    },
    gameover() {
      const that = this
      that.running = false
      that.$refs.audioBgmRef.pause()
      that.audioState && that.$refs.audioFailedRef.play()
      that.gameOverFlag = true
      
    },
    startGame() {
      this.showWelcome = false
      this.newGame()
      // this.$refs.audioDuRef.play();
    },
    restartGame() {
      this.newGame()
    },
    newGame() {
      const that = this
      that.cards = createCardsData(2, 6, this.columnCountComp, this.images.length);
      that.gameStartTime = Date.now()
      that.gameTime = 50;
      that.pauseTime = 0;
      that.pauseTimeStart = 0;
      that.running = true
      that.gameOverFlag = false
      that.bar = []
      that.score = 0
      that.audioState && that.$refs.audioBgmRef.play()
    }
  }
}
</script>









<style scoped>
.miao-ui-main {
  --main-width: 100%;
  --main-height: 100%;
  --bar-length: 8;
  --card-height: calc(var(--main-height) * 0.11);
  --card-width: calc(var(--card-height) * 0.618);
  --game-over-z: calc(var(--speaker-z) + 1);
  --welcome-z: 899998;
  --speaker-z: calc(var(--welcome-z) + 1);
  --water-mark-z: calc(var(--welcome-z) + 1);
  --bar-left: calc((100% - var(--bar-length) * var(--card-width)) / 2);

  overflow: hidden;
  user-select: none;
  height: var(--main-height);
  width: var(--main-width);
  position: relative;
  background: linear-gradient(190deg, hsl(250, 100%, 65%), hsl(200, 100%, 65%), hsl(100, 100%, 64%))

}

.card-wrapper {
  width: var(--card-width);
  height: var(--card-height);
  display: flex;
  flex-flow: column;
  flex: 0 0 var(--card-width);
  justify-content: center;
  align-items: center;
  position: absolute;
  transition: all 1s;
}



.start-button {
  margin-top: 10%;
  color: rgb(114, 140, 255);
  background: linear-gradient(gray, black, gray);
  padding: 1% 2%; 
  border-radius: calc(var(--card-width) / 10);
  cursor: pointer;
  position: relative;
  font-size: calc(var(--card-width) / 3);
}
.start-button::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(200, 200, 200, .6);
  filter: blur(20px)
}
.start-button:hover {
  transform: scale(1.05);
}

.bar {

  height: var(--card-height);
  width: calc(var(--card-width) * var(--bar-length));
  background: lightgray;
  position: absolute;
  left: var(--bar-left);
  border-radius: 10px;
}
.bar:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: white;
  filter: blur(20px);
}

.game-over-mask {
  --light-transparent: rgba(200, 200, 200, .6);
  --dark-transparent: rgba(100, 100, 100, .8);
  top: 0;
  position: relative;
  height: 100%;
  width: 100%;
  
  z-index: var(--game-over-z);
  background: linear-gradient(var(--light-transparent) 5%, var(--dark-transparent) 50%, var(--light-transparent) 100%);
  
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  transition: all 1s;
}

.show-game-over .game-over-mask {
  top: -100%;
}

.game-over-mask>.text {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: var(--card-width);
  color: white;
}

.welcome {
  top: -100%;
  position: relative;
  height: 100%;
  width: 100%;
  
  z-index: var(--welcome-z);
  background: url(../../../../assets/images/miao-bg.webp) no-repeat;
  background-size: 100% 100%;

  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  transition: all 1s;
}

.welcome .game-name {
  color: white;
  text-shadow: calc(var(--card-height) * .07) calc(var(--card-height) * .07) gray;
  transform-origin: left;
  font-weight: bolder;
  position: absolute;
}

.show-welcome .welcome {
  top: 0;
}


.speaker-control {
  position: absolute;
  right: 3%;
  top: calc(var(--card-height) * .75);
  width: calc(var(--card-width) / 3);
  height: calc(var(--card-width) / 3);
  z-index: var(--speaker-z);
}

.water-mark {
  user-select:all;
  position: absolute;
  right: calc(var(--main-width) * .01);
  bottom: calc(var(--main-height) * .01);
  z-index: var(--water-mark-z);
  color: gray;
}


.control-btn {
  position: absolute;
  font-size: calc(var(--card-width) * .3);
  padding: calc(var(--card-width) * .15);
  background: linear-gradient(#eee, white, #eee);
  border-radius: calc(var(--card-width) * .2);
  cursor: pointer;
  color: rgb(77, 73, 73);
  border: 1px solid gray;
  --box-shadow-size: calc(var(--card-width) * .05);
  box-shadow: var(--box-shadow-size) var(--box-shadow-size) var(--box-shadow-size) gray;
}
.control-btn>.corner {
  display: flex;
  justify-content: center;
  align-items: center;
  --coner-width: calc(var(--card-width) * .4);
  position: absolute;
  right: 0;
  top: calc(0px - var(--coner-width) * .5);
  border-radius: calc(var(--coner-width) / 2);
  background: red;
  color: white;
  width: var(--coner-width);
  height: var(--coner-width);
}

.xipai.control-btn {
  right: calc(var(--card-width) * .5);
  bottom: calc(var(--card-height) * 1.3);
}

.zhanting {
  right: calc(var(--card-width) * 2);
  bottom: calc(var(--card-height) * 1.3);
}
</style>