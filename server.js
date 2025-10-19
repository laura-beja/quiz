import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => res.render("index"));
app.get("/quiz", (req, res) => res.render("quiz"));
app.get("/profile", (req, res) => res.render("profile"));

app.listen(3000, () => console.log("Running on http://localhost:3000"));
