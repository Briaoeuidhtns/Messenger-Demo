const express = require('express')

const handler = (req, res) => {
  const userDoc = res.locals.user?.data
  if (userDoc)
    res.send({
      data: {
        kind: 'user',
        user: userDoc.toObject(),
      },
    })
  else
    res.status(404).send({
      error: {
        kind: 'no user',
        message: "Couldn't find user",
        cause: res.locals.user?.error,
      },
    })
}

module.exports = handler
