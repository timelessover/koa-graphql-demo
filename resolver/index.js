const fs = require('fs');
const path = require('path');
const _ = require('lodash'); // npm install lodash 添加依赖

// 包含所有的resolve
const resolvers = {};

// 同步读取当前目录下所有 .js 文件
const dirs = fs.readdirSync(__dirname);

dirs.forEach((dir) => {
    const filePath = path.join(__dirname, dir);
    if (
        fs.statSync(filePath).isFile &&
        filePath.endsWith('.js') &&
        !filePath.endsWith('index.js') // 不包含此文件
    ) {

        const resolver = require(filePath);

        _.merge(resolvers, resolver); // 合并所有的resolver到reslovers中
    }

});

// 导出resolvers
module.exports = resolvers;