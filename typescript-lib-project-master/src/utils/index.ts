/**
 * 动态加载
 * @param {string} url 文件路径
 */
export function includeScript(url: string): Promise<any> {
  return new Promise(function(resolve, reject) {
    var script = document.createElement('script')
    script.src = url
    script.type = 'text/javascript'
    script.defer = true
    document.head.appendChild(script)
    script.onload = function() {
      resolve()
    }
    script.onerror = function() {
      reject()
    }
  })
}
