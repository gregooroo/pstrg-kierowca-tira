import Axios from 'axios'

export async function calculateDistance(source, destination) {
  const a = source.join(',')
  const b = destination.join(',')
  const ENDPOINT = `https://api.mapbox.com/directions-matrix/v1/mapbox/driving/${a};${b}`
  const {MAPBOX_ACCESS_TOKEN} = process.env
  try {
    const response = await Axios.get(ENDPOINT, {
      params: {
        access_token: MAPBOX_ACCESS_TOKEN,
        annotations: 'distance',
      },
    })
    const result = response.data
    return result.distances[0][1]
  } catch (error) {
    return error
  }
}
