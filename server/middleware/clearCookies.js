const express = require('express')

const clearCookies = (...cookies) => (req, res, next) => {
  for (const c of cookies) res.clearCookie(c)
  next()
}

module.exports = clearCookies
