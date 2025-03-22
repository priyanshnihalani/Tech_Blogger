import express, { response } from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import fs from 'fs'
import { fileURLToPath } from 'url';

const app = express();

const jsonsecretkey = "webstoresecret";
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: uploadDir,
    filename: (request, file, cb) => {
        const timestamp = Date.now();
        const ext = path.extname(file.originalname);
        const name = path.basename(file.originalname, ext);

        cb(null, `${name}-${timestamp}${ext}`);
    }
});

const upload = multer({ storage });

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175", "http://localhost:5176"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true
}));

app.use("/uploads", express.static(uploadDir));

const url = 'mongodb://127.0.0.1:27017/';
const dbName = 'TechBlogger';
const client = new MongoClient(url);

const connectDB = async () => {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Connection to MongoDB failed:', error);
        process.exit(1);
    }
};
connectDB();

app.post('/signup', async (request, response) => {
    try {
        const { name, email, password } = request.body;

        const db = client.db(dbName);
        const existingAdmin = await db.collection("users").findOne({ email });

        if (existingAdmin) {
            return response.status(400).send({ message: "User Already Exists!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await db.collection("users").insertOne({ name, email, password: hashedPassword });

        const accesstoken = jwt.sign({ id: result.insertedId.toString() }, jsonsecretkey, { expiresIn: '30d' });

        response.status(200).send({ message: "Success!", accesstoken, id: result.insertedId.toString(), name });

    } catch (error) {
        console.error(error);
        response.status(500).send({ message: "Internal Server Error" });
    }
});

app.post('/signin', async (request, response) => {
    try {
        const { email, password } = request.body;

        const db = client.db(dbName);
        const user = await db.collection("users").findOne({ email });

        console.log(user);
        if (!user) {
            return response.status(400).send({ message: "User Does Not Exist" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return response.status(400).send({ message: "Invalid password" });
        }

        const accesstoken = jwt.sign({ id: user._id.toString() }, jsonsecretkey, { expiresIn: '30d' });

        response.status(200).send({ message: "Success!", name: user.name, accesstoken, id: user._id.toString() });

    } catch (error) {
        console.error(error);
        response.status(500).send({ message: "Internal Server Error" });
    }
});

app.post('/adminsignin', async (request, response) => {
    try {
        const { email, password } = request.body;

        const db = client.db(dbName);
        const user = await db.collection("admin").findOne({ email });

        console.log(user);
        if (!user) {
            return response.status(400).send({ message: "User Does Not Exist" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return response.status(400).send({ message: "Invalid password" });
        }

        const accesstoken = jwt.sign({ id: user._id.toString() }, jsonsecretkey, { expiresIn: '30d' });

        response.status(200).send({ message: "Success!", name: user.name, accesstoken, id: user._id.toString() });

    } catch (error) {
        console.error(error);
        response.status(500).send({ message: "Internal Server Error" });
    }
});

app.post('/adminsignup', async (request, response) => {
    try {
        const { name, email, password } = request.body;

        const db = client.db(dbName);
        const existingAdmin = await db.collection("admin").findOne({ email });

        if (existingAdmin) {
            return response.status(400).send({ message: "User Already Exists!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await db.collection("users").insertOne({ name, email, password: hashedPassword });

        const accesstoken = jwt.sign({ id: result.insertedId.toString() }, jsonsecretkey, { expiresIn: '30d' });

        response.status(200).send({ message: "Success!", accesstoken, id: result.insertedId.toString(), name });

    } catch (error) {
        console.error(error);
        response.status(500).send({ message: "Internal Server Error" });
    }
});

app.post('/uploadlink', async (request, response) => {
    const { title, url, description, timeStamp, name } = request.body;
    const db = client.db(dbName);

    const result = await db.collection("techtutorials").insertOne({
        title, url, description, timeStamp, name
    })

    if (!result.insertedId) {
        return response.status(500).send({ message: "Internal Server Error" });
    }

    response.status(200).send({ message: "Success!" });
})

app.get('/techtutorials', async (request, response) => {
    const db = client.db(dbName);

    try {
        const result = await db.collection("techtutorials").find().sort({ timeStamp: -1 }).toArray();

        return response.status(200).send({ message: "Success!", data: result });
    }

    catch (error) {
        console.log(error)
        return response.status(500).send({ message: "Internal Server Error" });

    }

})

app.post('/contactus', async (request, response) => {
    const { name, email, message } = request.body;

    const db = client.db(dbName);

    const result = await db.collection("contactmessages").insertOne({ name, email, message });

    if (!result.insertedId) {
        return response.status(500).send({ message: "Internal Server Error" });
    }

    response.status(200).send({ message: "Success!" });

})

app.get('/contactusmessages', async (request, response) => {
    const db = client.db(dbName);

    try {

        const result = await db.collection("contactmessages").find().toArray();
        response.status(200).send({ message: "Success!", result });
    }
    catch (error) {
        response.status(500).json({ message: "Internal Server Error" });
    }

})
app.get("/techvideos", async (request, response) => {
    try {
        const db = client.db(dbName);
        const data = await db.collection("techVideos").find().sort({ createdAt: -1 }).toArray();

        const videos = data.map((item) => {
            const filePath = path.join(uploadDir, item.filename);
            if (!fs.existsSync(filePath)) {
                return null;
            }

            return { id: item._id, url: `http://localhost:3000/uploads/${item.filename}`, name: item.name, title: item.title, description: item.description };

        }).filter(Boolean);

        if (videos.length === 0) {
            return response.status(404).json({ message: "No videos found" });
        }

        response.json({ videos });
    } catch (error) {
        response.status(500).json({ message: "Internal Server Error", error });
    }
});

app.get('/techposts', async (request, response) => {
    const db = client.db(dbName);
    try {

        const techVideos = await db.collection("techPosts").find().sort({ timeStamp: 1 }).toArray();
        if (!techVideos) {
            return response.status(404).send({ message: "No posts found" });
        }
        const imageswithandwithout = techVideos.map((item) => {
            if ('fileName' in item) {
                return { id: item._id, url: `http://localhost:3000/uploads/${item.fileName}`, name: item.name, title: item.title, description: item.description };
            }
            else {
                return { id: item._id, article: item.article, name: item.name, title: item.title, description: item.description, bgColor: item.bgColor };
            }
        })
        response.status(200).send({ data: imageswithandwithout });

    } catch (error) {
        console.error(error);
        response.status(500).send({ message: "Internal Server Error" });
    }
});

app.delete('/deletepost', async (request, response) => {
    const { id } = request.body;
    const db = client.db(dbName);
    try {

        const techVideos = await db.collection("techPosts").deleteOne({ _id: new ObjectId(id) })

        if (techVideos.deletedCount > 0) {
            response.status(200).send({ message: "Success!" });
        }
        else {
            response.status(404).send({ message: "Id not Found" });
        }
    }
    catch (error) {
        console.error(error);
        response.status(500).send({ message: "Internal Server Error" });
    }
})

app.delete('/deletetutorial', async (request, response) => {
    const { timeStamp } = request.body;
    const db = client.db(dbName);
    try {

        const techTutorials = await db.collection("techTutorials").deleteOne({ timeStamp })

        if (techTutorials.deletedCount > 0) {
            response.status(200).send({ message: "Success!" });
        }
        else {
            response.status(404).send({ message: "Id not Found" });
        }

    }
    catch (error) {
        console.error(error);
        response.status(500).send({ message: "Internal Server Error" });
    }
})

app.delete('/deletevideo', async (request, response) => {
    const { id } = request.body;
    const db = client.db(dbName);
    try {

        const techVideos = await db.collection("techVideos").deleteOne({ _id: new ObjectId(id) })

        if (techVideos.deletedCount > 0) {
            response.status(200).send({ message: "Success!" });
        }
        else {
            response.status(404).send({ message: "Id not Found" });
        }

    }
    catch (error) {
        console.error(error);
        response.status(500).send({ message: "Internal Server Error" });
    }

})

app.post('/uploadvideos', upload.single("videoChunk"), async (request, response) => {
    try {
        const { chunkIndex, totalChunks, fileName, title, description, name } = request.body;

        const chunk = request.file.path;
        const ext = path.extname(fileName);
        const baseName = path.basename(fileName, ext);


        const filename = `${baseName}-final${ext}`;
        const finalFilePath = path.join(uploadDir, filename);

        const data = await fs.promises.readFile(chunk).catch(err => {
            console.error("Error reading chunk:", err);
            return response.status(500).send({ message: "Failed to read video chunk." });
        });

        await fs.promises.appendFile(finalFilePath, data).catch(err => {
            console.error("Error appending chunk:", err);
            return response.status(500).send({ message: "Failed to append video chunk." });
        });

        await fs.promises.unlink(chunk).catch(err => {
            console.error("Error deleting chunk:", err);
        });

        if (parseInt(chunkIndex) === parseInt(totalChunks) - 1) {
            console.log("Upload completed for:", filename);

            const db = client.db(dbName);
            const storeVideoInfo = await db.collection("techVideos").insertOne({
                title, description, name, filename, createdAt: Date.now()
            });

            if (storeVideoInfo.acknowledged) {
                return response.status(200).send({ message: "Video Posted!" });
            }
        } else {
            return response.status(200).send({
                progress: Math.round(((parseInt(chunkIndex) + 1) / parseInt(totalChunks)) * 100)
            });
        }
    }
    catch (error) {
        console.error(error);
        response.status(500).send({ message: "Internal Server Error" });
    }
})

app.post('/uploadpost', upload.single('postImage'), async (request, response) => {
    const db = client.db(dbName);
    const { title, description, timeStamp, article, name, bgColor } = request.body;
    const fileName = request?.file?.filename

    console.log(request.body)
    try {

        if (article == null || article == undefined) {

            const result = await db.collection("techPosts").insertOne({ title, description, timeStamp, name, fileName })

            if (result.acknowledged) {
                response.status(200).send({ message: "Posted!" })
            }
        }
        else {
            const result = await db.collection("techPosts").insertOne({ title, description, article, timeStamp, name, bgColor })
            if (result.acknowledged) {
                response.status(200).send({ message: "Posted!" })
            }
        }

    }
    catch (error) {
        response.status(500).send({ message: "Internal Server Error" })
    }
})

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});