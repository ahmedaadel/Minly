"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const db_1 = require("./db");
const cors_1 = __importDefault(require("cors")); // Import the cors middleware
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(body_parser_1.default.json({ limit: '100mb' }));
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)()); // Use the cors middleware to handle CORS
app.use((0, cors_1.default)({
    origin: 'http://localhost:3001' // Allow requests only from this origin
}));
// Upload media content
app.post("/media", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { content, media_type } = req.body;
        const decodedContent = Buffer.from(content, 'base64');
        yield db_1.pool.query("INSERT INTO media (content, media_type) VALUES (?, ?)", [
            decodedContent,
            media_type,
        ]);
        res.status(201).send("Media content uploaded successfully");
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}));
//List all media content
app.get("/media", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield db_1.pool.query("SELECT * FROM media");
        res.json(rows);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}));
// // get specific media content
app.get("/media/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const rows = yield db_1.pool.query("SELECT * FROM media where id = ?", [id]);
        res.json(rows[0]);
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}));
// Like/unlike media content
app.put("/media/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { isliked } = req.body;
        yield db_1.pool.query("UPDATE media SET isliked = ? WHERE id = ?", [
            isliked,
            id,
        ]);
        res.status(200).send("Media content liked/unliked successfully");
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}));
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
