const express = require("express");
const app = express();
const mongoose = require("mongoose"); // you have to create a mongodb atlas cluster
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const movieRoute = require("./routes/movies");
const listRoute = require("./routes/lists");

//  to enable process.env variables
dotenv.config();

//  standard connection method from specification
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})
    //  to see that db is connected
    .then(()=> console.log("DB is connected!"))
    .catch((err) => console.log(err))
;

    // to be able to except requests in json. In Postmaster we pick Body-raw-json
app.use(express.json());

//  if you're making a request - use this end point, which leads to this route
app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/movies", movieRoute)
app.use("/api/lists", listRoute)

//  to run the server
app.listen(8000, () => {
    console.log("Back-end server is running")
})


