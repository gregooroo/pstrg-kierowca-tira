import Axios from 'axios'
import {generateError} from '../utils/errorHandlers'

export async function getCoordinates(location) {
  const ENDPOINT = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json`
  const {MAPBOX_ACCESS_TOKEN} = process.env
  try {
    const response = await Axios.get(ENDPOINT, {
      params: {
        access_token: MAPBOX_ACCESS_TOKEN,
      },
    })
    const result = response.data
    if (result.features.length === 0) {
      return generateError(404, 'NotFound', 'Provided location not found.', {
        location,
      })
    }
    return result.features[0].center
  } catch (error) {
    return error
  }
}
