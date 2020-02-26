module.exports = (err, res) => {
  try {
    res.status(err.status)
    res.json({
      code: err.status,
      message: err.message
    })
  } catch (err) {
    res.status(500)
    res.json({
      code: 500,
      message: 'internal server error'
    })
  }
}
