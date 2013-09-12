"use strict";
var uuid = require("node-uuid");

module.exports = {
  boundary: boundary,
  body: body,
  length: length,
  contentType: contentType,
  create: create
};

function boundary() {
  return "----FormBoundary-" + uuid.v1();
}

function body(form, boundary) {
  var body = "";

  if (!(form instanceof Object && typeof boundary === "string")) {
    throw new Error("Invalid arguments to body().  Expecting object and string.");
  }

  for (var input in form) {
    body += "--" + boundary + "\r\n" + "Content-Disposition: form-data; name=\"" + input + "\"\r\n\r\n" + form[input] + "\r\n";
  }

  body += "--" + boundary + "--";
  return body;
}

function length(body) {
  if (!typeof body === "string") {
    throw new Error("Invalid argument to length().  Expecting string.");
  }

  return Buffer.byteLength(body);
}

function contentType(boundary) {
  if (!typeof boundary === "string") {
    throw new Error("Invalid argument to contentType().  Expecting string.");
  }

  return "multipart/form-data; boundary=" + boundary;
}

function create(form) {
  if (!form instanceof Object) {
    throw new Error("Invalid argument to create().  Expecting object.");
  }

  var _boundary = boundary();
  var _body = body(form, _boundary);
  var _contentLength = length(_body);
  var _contentType = contentType(_boundary);

  return {
    boundary: _boundary,
    body: _body,
    contentLength: _contentLength,
    contentType: _contentType
  };
}
