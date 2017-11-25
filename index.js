const express = require('express')
const graphqlHTTP = require('express-graphql')
const { graphql, buildSchema } = require('graphql')

const server = express()

const schema = buildSchema(`
  type Video {
    id: ID
    title: String
    duration: Int
    watched: Boolean
  }

  type Query {
    video: Video
    videos: [Video]
  }

  type Schema {
    query: Query
  }
`)

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
  graphiql: true,
  rootValue: resolvers
}))

server.listen(3000, () => {
  console.log('listening on http://localhost:3000')
})
