const Koa = require('koa');
const { ApolloServer, gql } = require('apollo-server-koa');

const books = [
    {
        id:1,
        title: 'Harry Potter and the Chamber of Secrets',
        author: 'J.K. Rowling',
    },
    {
        id:2,
        title: 'Jurassic Park',
        author: 'Michael Crichton',
    },
];

const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    id:ID!
    title: String
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books(id:ID!): [Book]
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
    Query: {
        books: () => books,
    },
};

const app = new Koa();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true, // 开启开发UI调试工具
});

server.applyMiddleware({ app });

const port = 8000;
app.listen({ port }, () => console.log(`graphql server start at http://localhost:${port}${server.graphqlPath}`));