/*
JSON is automatically included with each app.

Use the $fh.ready() (http://docs.feedhenry.com/wiki/Ready) function to trigger
loading the local config and binding a click event to invoke the cloud action
call which will return the remote config.
*/

$fh.ready(function() {
  // The local config variable from config.js can be accessed directly
  document.getElementById('localConfig').innerHTML = "<p>" + JSON.stringify(config) + "</p>";

  document.getElementById('run_button').onclick = function() {
    var user = document.getElementById('username').value;
    var pass = document.getElementById('password').value;

    document.getElementById('cloudConfig').innerHTML = "<p>called auth with: " + JSON.stringify({u: user, p: pass}) + "</p>";
    auth(user, pass, function (err, res) {
      var authMessage = "<p>called auth with: " + JSON.stringify({u: user, p: pass}) + "</p>" +
        "<p>returned with: ";
      if (err) {
        authMessage += "Error: " + err;
      } else {
        authMessage += "Success - session: " + res;
      }
      authMessage +=  "</p>";
      document.getElementById('cloudConfig').innerHTML = authMessage;
    });
  };
});

function auth(user, pass, cb) {
  $fh.auth({
    "policyId": "EC2LDAP",
    "clientToken": "0CnwYKgpGI33wtpMAW4iD4ys", // Your App GUID
    "endRedirectUrl": window.location.href,
    "params": {
      "userId": user,
      "password": pass
    }
  }, function(res) {
    return cb(undefined, res.sessionToken);
  }, function(msg, err) {
    var errorMsg = err.message;
    return cb(errorMsg, null);
  });
}
