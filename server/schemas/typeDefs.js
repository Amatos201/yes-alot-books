// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
// add thought to it change later
const typeDefs = gql`
type Query {
  me: User
}
type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }
type Book {
    bookId: String
    authors: [String]
    description: String
    image: String
    link: String
    title: String
}
input savedBook {
authors: [String]
description: String
bookId: String
image: String
link: String
title: String
}
type Auth {
    token: ID
    user: User
    
  }
  
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(input: savedBook!): User
    removeBook(bookId: ID): User
  }
   
   
  
  
`;


// export the typeDefs
module.exports = typeDefs;