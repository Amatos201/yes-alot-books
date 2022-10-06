const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { saveBook } = require('../controllers/user-controller');
const resolvers = {
    Query: {
        // logic here remains the same
        me: async (parent, args, context) => {
          if (context.user) {
            const userData = await User.findOne({ _id: context.user._id })
              .select('-__v -password')
              
    
            return userData;
          }
    
          throw new AuthenticationError('Not logged in');
        },
  // get all users
  users: async () => {
    return User.find()
      .select('-__v -password')
      
  },
  // get a user by username
  user: async (parent, { username }) => {
    return User.findOne({ username })
      .select('-__v -password')
      
  },

      
      
          
        books: async (parent, { _id }) => {
          return Book.findOne({ _id });
        }
        },

        Mutation: {
          addUser: async (parent, args) => {
      const user = await User.create(args);
  const token = signToken(user);
      return {token, user };
          },
          login: async (parent, { email, password }) => {
              const user = await User.findOne({ email });
            
              if (!user) {
                throw new AuthenticationError('Incorrect credentials');
              }
            
              const correctPw = await user.isCorrectPassword(password);
            
              if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
              }
            const token = signToken(user)
              return { token, user };
            },
            saveBook: async (parent, {bookData}, context) => {
              if (context.user) {
                const updatedUser = await User.findByIdAndUpdate({ _id: context.user.id }, 
                  {$push: {saveBooks: bookData}
                },
                {new: true});
            
               
            
                return updatedUser;
              }
            
              throw new AuthenticationError('You need to be logged in!');
            }
          }
        };
          // place this inside of the `Query` nested object right after `thoughts`

  
 
    // other queries remain the same
  

  module.exports = resolvers;