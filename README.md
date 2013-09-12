Ever need to submit a form that uses multipart form data, only to see that the form could very easily have been URL encoded because there are no file uploads?  This module creates the form body and necessary headers for you, which can easily be passed to `request`.

Example:
```
var multipart = require("trivial-multipart");
var request = require("request");

// form inputs
var inputs = {
  foo: "bar"
};
var form = multipart.create(inputs);

request({
  uri: "http://www.coolsite.com",
  method: "POST",
  headers: {
    "Content-Type": form.contentType,
    "Content-Length": form.contentLength
  },
  body: form.body
}, function(error, response, body) {
  // do cool stuff
});
```