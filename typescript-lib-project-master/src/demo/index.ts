import MobBridge from '..'

console.log('See this in your browser console: Typescript Webpack Starter Launched')

function init() {
  const mobBridge = MobBridge.getInstance()
  mobBridge.login()
  console.log('mob-bridge intance', mobBridge)
}

init()
