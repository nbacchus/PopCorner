const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    showCount: Int
    savedShows: [Show]
  }

  type Show {
    _id: ID
    name: [String]
    genre: String
    showId: String
    
    url: String
    summary: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    user(username: String!): User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveShow(userId: ID!, name: String!, genre: [String], showId: String!,  url: String, summary: String!): User
    removeShow(userId: ID!, showId: String!): User
  }
`;


module.exports = typeDefs;
