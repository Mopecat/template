/**
 * eslint配置文件
 */
module.exports = {
  root: true,
  // 设置js语言的解析配置
  parserOptions: {
    parser: "babel-eslint",
    ecmaVersion: 2017
  },
  // 指定开发环境，配置全局变量
  env: {
    browser: true,
    node: true,
    es6: true
  },
  // 自定义全局变量
  globals: {},
  // 继承规则
  extends: ["plugin:vue/essential", "prettier", "standard"],
  // 更新vscode后 需要这样引入才可以保存自动格式话 html部分代码
  // plugins: ["prettier"],
  // 规则配置
  rules: {
    // 关闭console校验
    "no-console": 0,
    // 根据环境判断debugger校验
    "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0,
    // 去掉分号
    semi: 2,
    // 去掉function和()之前的空格
    "space-before-function-paren": ["error", "never"],
    // 校验{}之前的空格
    "space-before-blocks": ["error", "always"],
    // 关键字间距
    "keyword-spacing": ["error", { before: true }],
    // 对象字面量属性间距
    "key-spacing": [
      "error",
      { beforeColon: false, afterColon: true, mode: "strict" }
    ],
    // 两个空格缩进
    indent: ["error", 2],
    // 字符串允许使用单引号
    quotes: ["error", "single", { allowTemplateLiterals: true }],
    // 换行长度、忽略注释、忽略url、忽略字符串、忽略正则
    "max-len": [
      "error",
      {
        code: 300,
        tabWidth: 2,
        ignoreComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreRegExpLiterals: true
      }
    ],
    // 箭头函数用强制括号
    "arrow-parens": ["error", "always"],
    // 箭头函数前后空格
    "arrow-spacing": ["error", { before: true, after: true }],
    // 箭头函数中禁止书写表达式
    "no-confusing-arrow": ["error", { allowParens: false }],
    // if后必须包含{}
    curly: ["error", "all"],
    // parseInt必须有基数
    radix: ["error", "always"]
  }
};
