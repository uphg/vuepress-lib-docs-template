function toPath(url = '', array = []) {
  return array.map(item => url + '/' + item)
}

module.exports = toPath