import Axios from 'axios'

export default function calculateDistance(source, destination) {
  const a = source.join(',')
  const b = destination.join(',')
  const ENDPOINT = `https://api.mapbox.com/directions-matrix/v1/mapbox/driving/${a};${b}`
  const {MAPBOX_ACCESS_TOKEN} = process.env

  return new Promise((resolve, reject) => {
    return Axios.get(ENDPOINT, {
      params: {
        access_token: MAPBOX_ACCESS_TOKEN,
        annotations: 'distance',
      },
    })
      .then(response => response.data)
      .then(result => {
        resolve(result.distances[0][1])
      })
      .catch(error => reject(error))
  })
}
