import {getCoordinates} from './getCoordinates'
import {calculateDistance} from './calculateDistance'

// TODO: Test for errors - non existing addresses
// TODO: Escape diacritics

export default function calculate(sourceAddress, destinationAddress) {
  return Promise.all([
    getCoordinates(sourceAddress),
    getCoordinates(destinationAddress),
  ])
    .then(([source, destination]) => {
      console.log('TCL: calculate -> destination', destination)
      console.log('TCL: calculate -> source', source)

      return calculateDistance(source, destination)
    })
    .catch(errors => errors)
}
