function addTransitHandler(req, res, next) {
  res.send('It works')
}

export default {
  addTransit: [addTransitHandler],
}
