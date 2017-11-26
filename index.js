const express = require('express')
const graphqlHTTP = require('express-graphql')
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean
} = require('graphql')

const server = express()

const videoType = new GraphQLObjectType({
  name: 'Video',
  description: 'A video on Egghead.io',
  fields: {
    id: {
      type: GraphQLID,
      description: 'The id of the video'
    },
    title: {
      type: GraphQLString,
      description: 'The title of the video'
    },
    duration: {
      type: GraphQLInt,
      description: 'The duration of the video (in seconds).'
    },
    watched: {
      type: GraphQLBoolean,
      description: 'Whether or not the viewer has watched the video.'
    }
  }
})

const queryType = new GraphQLObjectType({
  name: 'QueryType',
  fields: {
    video: {
      type: videoType,
      resolve: () => Promise.resolve({
        id: 'a',
        title: 'GraphQL',
        duration: 180,
        watched: false
      })
    }
  }
})

const schema = new GraphQLSchema({
  query: queryType
})

const videoA = {
  id: 'a',
  title: 'Create a GraphQL Schema',
  duration: 120,
  watched: true
}

const videoB = {
  id: 'b',
  title: 'Ember.js CLI',
  duration: 240,
  watched: false
}

const videos = [videoA, videoB]

const resolvers = {
  video: () => ({
    id: '1',
    title: 'bar',
    duration: 180,
    watched: false
  }),
  videos: () => videos
}

server.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

server.listen(3000, () => {
  console.log('listening on http://localhost:3000')
})
