const typeDefs = `
  type Book {
    bookId: ID!
    authors: [String!]
    description: String!
    title: String!
    image: String!
    link: String!
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Int!
    savedBook: [Book!]
  }

  type Auth{
    token: ID!
    user: User!
  }

  input BookData {
    bookId: ID!
    authors: [String!]
    description: String!
    title: String!
    image: String!
    link: String!
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(data: BookData!): User
    removeBook(bookId: ID!): User
  }
`;

module.exports = typeDefs;
