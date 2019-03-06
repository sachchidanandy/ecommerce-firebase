if (process.env.NODE_ENV === "production") {
    module.exports = require("./FirebaseProdKeys");
  } else {
    module.exports = require("./FirebaseDevKeys");
}