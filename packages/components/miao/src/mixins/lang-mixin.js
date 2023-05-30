export default {
  methods: {
    t(key) {
      let value = lang.ch
      const keySplit = key.split(/[.]/)
      for (const currKey of keySplit) {
        if (value === null || value === undefined) {
          return key
        }
        value = value[currKey]
      }
      return value;
    }
  }
}

const lang = {
  ch: {
    state: {
      score: '得分',
      timeRemain: '剩余时间'
    },
    btn: {
      start: '开始游戏',
      restart: '重新开始',
      randomCard: '洗牌',
      pause: '暂停',
      continue: '继续'
    }
  }
}