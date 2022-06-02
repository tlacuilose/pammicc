const express = require('express');
const atob = require("atob");


function parseJwt (token) {
  let base64Url = token.split('.')[1];
  let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  console.log("parseJwt", jsonPayload);
  return JSON.parse(jsonPayload);
};

function secureRoute(req, response, next) {
  let token = null;
  if (req && req.cookies) token = req.cookies['jwt'];
  let jsonPayload = parseJwt(token);
  response.locals.jsonPayload = jsonPayload;

  // Check that the user is project_uploader.
  let role = jsonPayload.user.role;
  console.log("user",jsonPayload.user);
  console.log("Role?", role);
  if (!(role=="project_uploader" || role=="admin")) {
    return response.status(403).send({ message: "Response has been declined" })
  }
  // else
  next();
}

module.exports = secureRoute