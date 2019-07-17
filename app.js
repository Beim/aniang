const {Room, API} = require('bilibili-live');

const logger = require('./config/winston');

let LiveRoom = null
let count = 0
function initRoom (url) {
  new Room({
    url
  }).connect().then(room => {
    room
      .on('danmaku.connect', () => {
        console.log('正在连接至弹幕服务器')
      })
      .on('danmaku.connected', () => {
        console.log('成功连接至弹幕服务器')
      })
      .on('danmaku.message', (msg) => {
        logger.info(msg);
        console.log(msg)
        count += 1
        console.log(count)
      })
      .on('danmaku.close', () => {
        console.log('已断开与弹幕服务器的连接')
      })
      .on('danmaku.error', () => {
        console.log('与弹幕服务器的连接出现错误')
      })
      .on('newFans', (fans) => {
        console.log('有新的粉丝')
        console.log(fans)
      })
      .on('info', (info) => {
        console.log('直播间信息')
        console.log(info)
      })
    LiveRoom = room
  })
}

initRoom(477)
