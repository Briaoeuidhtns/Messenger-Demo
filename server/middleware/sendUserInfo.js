const express = require('express')

const handler = (req, res) => {
  const userDoc = req.user?.data
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
        cause: req.user?.error,
      },
    })
}

module.exports = handler
