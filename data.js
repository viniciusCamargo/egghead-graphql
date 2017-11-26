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

const getVideoById = (id) => new Promise((resolve) => {
  const [video] = videos.filter((video) => video.id === id)

  resolve(video)
})

const getVideos = () => Promise.resolve(videos)

const createVIdeo = ({ title, duration, watched }) => {
  const video = {
    id: (new Buffer(title)).toString('base64'),
    title,
    duration,
    watched
  }

  videos.push(video)

  return video
}

module.exports = {
  getVideoById,
  getVideos,
  createVIdeo
}
