import Axios from 'axios'
import {generateError} from '../utils/errorHandlers'

export default function getCoordinates(location) {
  const normalizedLocation = location
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

  const ENDPOINT = `https://api.mapbox.com/geocoding/v5/mapbox.places/${normalizedLocation}.json`
  const {MAPBOX_ACCESS_TOKEN} = process.env

  return new Promise((resolve, reject) => {
    return Axios.get(ENDPOINT, {
      params: {
        access_token: MAPBOX_ACCESS_TOKEN,
      },
    })
      .then(response => response.data)
      .then(result => {
        if (result.features.length === 0) {
          reject(
            generateError(404, 'Not Found', 'Provided location not found', {
              location,
            }),
          )
        }
        resolve(result.features[0].center)
      })
      .catch(error => reject(error))
  })
}
