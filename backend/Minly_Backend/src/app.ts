import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { pool } from "./db";
import cors from "cors"; // Import the cors middleware

const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.json());
app.use(cors()); // Use the cors middleware to handle CORS
app.use(cors({
  origin: 'http://localhost:3001' // Allow requests only from this origin
}));
// Upload media content
app.post("/media", async (req: Request, res: Response) => {
  try {

    const { content, media_type } = req.body;
    const decodedContent = Buffer.from(content, 'base64');
    await pool.query("INSERT INTO media (content, media_type) VALUES (?, ?)", [
      decodedContent,
      media_type,
    ]);
    res.status(201).send("Media content uploaded successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});



//List all media content
app.get("/media", async (req: Request, res: Response) => {
  try {
    
    const [rows] = await pool.query("SELECT * FROM media");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// // get specific media content
app.get("/media/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const rows = await pool.query("SELECT * FROM media where id = ?", [id]);

    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Like/unlike media content
app.put("/media/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { isliked } = req.body;
    await pool.query("UPDATE media SET isliked = ? WHERE id = ?", [
      isliked,
      id,
    ]);
    res.status(200).send("Media content liked/unliked successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

