const { User, Thought } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, { username }) => {
      return User.findOne({ username }).populate('thoughts');
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    saveBook: async (parent, { data }, context) => {
      
      const user = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { savedBooks: data } }
      );

      return user;
    },
    removeBook: async (parent, { bookId }) => {
        const user = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { savedBooks: {bookId: bookId} } }
      );
    
      return user;
    },
  },
};

module.exports = resolvers;
