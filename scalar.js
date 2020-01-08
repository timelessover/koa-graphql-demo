const { GraphQLScalarType } = require('graphql');

const resolvers = {
    Date: new GraphQLScalarType({
        name: 'Date',
        description: '日期类型',
        parseValue(value) {
            // 这个函数用于转换客户端传过来的json值
            // json值是类似这样传过来的 { query: "user(date: $date): User", variables: { $date: "2017-07-30" }}
            return new Date(value);
        },
        parseLiteral(ast) { 
            // 这个函数用于转换客户端传过来的字面量值
            // 字面量值是类似这样传过来的 { query: "user(date: '2017-07-30'): User" }
            return new Date(ast.value);
        },
        serialize(value) {
            // 发送给客户端时将Date类型的值转换成可序列化的字符串值
            return value.toISOString();
        },
    }),
};

module.exports = resolvers;