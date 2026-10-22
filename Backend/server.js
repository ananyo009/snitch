import server from "./src/app.js";
import connectDB from "./src/config/database.js";


connectDB();

server.listen(3000, () => {
    console.log("Server is running on port 3000");
});