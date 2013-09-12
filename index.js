"use strict";

module.exports = {
  boundary: boundary,
  body: body,
  length: length,
  contentType: contentType,
  create: create
};

function boundary() {
  // TODO:  create this dynamically
  return "----WebKitFormBoundaryeKz62fMmh9CAxD7I";
}

function body(form, boundary) {
  var body = "";

  // TODO:  validate arguments

  for (var input in form) {
    // TODO:  check hasOwnProperty
    body += "--" + boundary + "\r\n" + "Content-Disposition: form-data; name=\"" + input + "\"\r\n\r\n" + form[input] + "\r\n";
  }

  body += "--" + boundary + "--";
  return body;
}

function length(body) {
  // TODO:  validate argument

  return Buffer.byteLength(body);
}

function contentType(boundary) {
  // TODO:  validate argument

  return "multipart/form-data; boundary=" + boundary;
}

function create(form) {
  // TODO:  generate an object containing the headers and body to pass to request
}
