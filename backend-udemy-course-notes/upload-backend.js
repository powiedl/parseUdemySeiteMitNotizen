const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { getCourseNotes } = require("./parseUdemyHTML");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.cwd() + "/uploads");
  },
  filename: (req, file, cb) => {
    //console.log("multer,req=", req);
    cb(null, Date.now() + path.basename(file.originalname));
    // falls zwei Dateien in der selben Sekunde hochgeladen werden (in einem Upload ist das durchaus wahrscheinlich) auch noch den Originalnamen anhängen
    // path.basename = voller Dateiname ohne Pfad (aber mit Extension!)
  },
});
const upload = multer({ storage });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(process.cwd() + "/uploads"));

app.post("/files", upload.array("htmlfiles"), (req, res) => {
  //"photos" muss gleich sein, wie im Frontend bei formData.append
  res.json({ files: req.files });
});

app.get("/infos/:htmlfile", (req, res) => {
  const fullFilename = process.cwd() + "/uploads" + "/" + req.params.htmlfile;
  const infos = {
    ...getCourseNotes(fullFilename),
    id: req.params.htmlfile.replace(/\.html?/, ""), // als id wird der Dateiname ohne Extension (.htm[l]) genommen - solange bis ich was besseres finde
  };
  res.json(infos);
});

app.listen(3000, () => {
  console.log(`Server is running, listening to port 3000 ...`);
});
