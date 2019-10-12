const { installDependencies } = require("../utils");
const path = require("path");

/***
 * 要交互的问题都放在 prompts中
 * when是当什么情况下 用来判断是否 显示这个问题
 * type是提问的类型
 * message就是要显示的问题
 */
module.exports = {
  prompts: {
    name: {
      when: "ismeta",
      type: "string",
      message: "项目名称:"
    },
    description: {
      when: "ismeta",
      type: "string",
      message: "项目介绍:"
    },
    author: {
      when: "ismeta",
      type: "string",
      message: "项目作者:"
    },
    email: {
      when: "ismeta",
      type: "string",
      message: "邮箱:"
    },
    autoInstall: {
      when: "ismeta",
      type: "confirm",
      message: "是否自动执行npm install 安装依赖？"
    }
  },
  complete: function(data, { chalk }, destination) {
    /**
     * 用于判断是否执行自动安装依赖
     */
    const green = chalk.green; // 取绿色
    const cwd = path.join(process.cwd(), data.inPlace ? "" : data.destDirName);
    if (data.autoInstall) {
      installDependencies(cwd, "npm", green) // 这里使用npm安装
        .then(() => {
          console.log();
          console.log(chalk.green("构建完成"));
          console.log();
          console.log(
            `${chalk.green("去=>")} ${destination} ${chalk.green(
              "愉快的开始coding吧~"
            )}`
          );
          console.log();
        })
        .catch(e => {
          console.log(chalk.red("Error:"), e);
        });
    } else {
      console.log();
      console.log(chalk.green("构建完成"));
      console.log();
      console.log(
        `${chalk.green("去=>")} ${destination} ${chalk.green(
          "愉快的开始coding吧~"
        )}`
      );
      console.log();
    }
  }
};
