import { withClientState } from 'apollo-link-state'

const typeDefs = `
  type Post {
    id: String!
    title: String!
    votes: Int
    url: String
    createdAt: String
    favorited: Boolean
  }

  type Query {
    allPosts: [Post!]!
  }

  type Mutation {
    favorite(id: String!): Post
  }
`

const defaults = {
  allPosts: [
    {
      id: '123',
      title: 'Testando',
      votes: 12,
      url: 'http://local.com',
      createdAt: null,
      favorited: false,
      __typename: 'Post',
    },
    {
      id: '124',
      title: 'Testando 2',
      votes: 42,
      favorited: false,
      url: 'http://asdadlocal.com',
      createdAt: null,
      __typename: 'Post',
    },
  ],
}

const resolvers = {
  Post: {
    createdAt: () => new Date().toDateString(),
    favorited: ({ favorited = false }) => favorited,
  },
  Mutation: {
    favorite: (root, { id }, { cache }) => {
      cache.writeData({ id: `Post:${id}`, data: { favorited: true } })
      return null
    },
    unFavorite: (root, { id }, { cache }) => {
      cache.writeData({ id: `Post:${id}`, data: { favorited: false } })
      return null
    },
  },
}

const createLocalSateLink = ({ cache }) => {
  return withClientState({ resolvers, typeDefs, cache, defaults })
}

export default createLocalSateLink
