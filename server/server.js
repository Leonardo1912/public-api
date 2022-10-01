import mongoose from "mongoose";
import express from "express"
import http from "http";
import cors from "cors"
import fetch from "node-fetch";

const PORT = 8000;

const app = express();
app.use(cors());
const server = http.createServer(app);

const publicAPISchema = new mongoose.Schema({
    API: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    Auth: {
        type: String,
        required: false
    },
    HTTPS: {
        type: Boolean,
        required: true
    },
    Cors: {
        type: String,
        required: true
    },
    Link: {
        type: String,
        required: true
    },
    Category: {
        type: String,
        required: true
    },

})


const PublicAPI = mongoose.model("API", publicAPISchema)

async function getPublicAPI() {
    const myPublicAPI = await fetch("https://api.publicapis.org/entries")
    const response = await myPublicAPI.json()
    const data = response.entries
    for (let i = 0; i < data.length; i++) {
        const publicAPI = new PublicAPI({
            API: data[i]["API"],
            Description: data[i]["Description"],
            Auth: data[i]["Auth"],
            HTTPS: data[i]["HTTPS"],
            Cors: data[i]["Cors"],
            Link: data[i]["Link"],
            Category: data[i]["Category"]
        });
        await publicAPI.save();
    }
}

const start = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/PMS")

        await getPublicAPI()

        app.listen(() => {
            console.log("Server started on PORT", PORT)
        })
    } catch (e) {

    }
}

app.get('/public-api', (req, res) => {
    PublicAPI.find(req.query.search ? {API: req.query.search}: {})
        .then((result) => {
        res.send(result);
        }).catch((err) => {
        console.log(err);
    })
})

server.listen(PORT, () => {
    console.log(`Streaming service is running on http://localhost:${PORT}`);
});

start()
