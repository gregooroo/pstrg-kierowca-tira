import getCoordinates from './getCoordinates'
import calculateDistance from './calculateDistance'

export default function mapbox(sourceAddress, destinationAddress) {
  return new Promise((resolve, reject) => {
    return Promise.all([
      getCoordinates(sourceAddress),
      getCoordinates(destinationAddress),
    ])
      .then(([source, destination]) =>
        resolve(calculateDistance(source, destination)),
      )
      .catch(errors => reject(errors))
  })
}
