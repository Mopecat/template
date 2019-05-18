export class MobBridge {
  // 登录
  login() {
    console.log('ts-lib-project login')
  }
  // 唤起app
  callApp() {
    console.log('ts-lib-project callApp')
  }
  // 微信分享
  shareWeixin() {
    console.log('ts-lib-project shareWeixin')
  }
  // 微博分享
  shareWeiBo() {
    console.log('ts-lib-project shareWeiBo')
  }

  // static
  static _instance: MobBridge
  static getInstance(): MobBridge {
    if (!MobBridge._instance) {
      MobBridge._instance = new MobBridge()
    }
    return MobBridge._instance
  }
}

export default MobBridge
