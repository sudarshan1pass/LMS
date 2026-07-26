const dns = require("dns");
const mongoose=require("mongoose")
require("dotenv").config();

const configureDnsForSrv = (mongoUrl) => {
    if (!mongoUrl.startsWith("mongodb+srv://")) {
        return;
    }

    const configuredServers = (process.env.MONGO_DNS_SERVERS || "")
        .split(",")
        .map((server) => server.trim())
        .filter(Boolean);

    if (configuredServers.length > 0) {
        dns.setServers(configuredServers);
        return;
    }

    const currentServers = dns.getServers();
    const isLocalResolver = currentServers.length > 0 && currentServers.every((server) => {
        return server === "127.0.0.1" || server === "::1" || server === "localhost";
    });

    if (isLocalResolver) {
        dns.setServers(["8.8.8.8", "1.1.1.1"]);
    }
};

exports.connect=()=>{
    const mongoUrl = process.env.DATABASE_URL || process.env.MONGODB_URL || process.env.MONGO_URL;

    if (!mongoUrl) {
        console.error("MongoDB connection string missing. Set DATABASE_URL, MONGODB_URL, or MONGO_URL in environment variables.");
        process.exit(1);
    }

    configureDnsForSrv(mongoUrl);

    mongoose.connect(mongoUrl,{
    })
    .then(()=>console.log("db connected successfully"))
    .catch(err=>{console.log("db connection failed")
        console.error(err)
        process.exit(1)
    } )
}
