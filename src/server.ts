import app from "./app";
import config from "./config";

const PORT = config.port;

async function main() {
    try{
        app.listen(PORT, () => {
            console.log(`server is running on ${PORT}`)
        })
    }
    catch(err) {
        console.log("server is running on error:", err);
        process.exit(1);
    }
}

main();