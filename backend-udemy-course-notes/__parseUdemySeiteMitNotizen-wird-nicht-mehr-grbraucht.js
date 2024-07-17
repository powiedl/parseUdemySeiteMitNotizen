//npm i mongoose express cors body-parser uuid multer
//npm i node-html-parser

const courseHtml =
  "C:\\Users\\Roland\\Documents\\udemy-Kurse\\HTML-CSS-Bootcamp-Notizen.html";
const PORT = 3000;

//const jsdom = require("jsdom");
const parse = require("node-html-parser").parse;
const path = require("path");
const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

function getCourseNotes(courseHtml) {
  function getFirstTag(html, tag = "body") {
    // findet das ERSTE Tag im übergebenen HTML (das von node-html-parser.parse() erzeugt wurde)
    // uebergibt das korrespondierende Element (weil auf der Rückgabe von parse querySelector noch nicht existiert)
    //  console.log(html.rawTagName);
    if (html?.rawTagName?.toLowerCase() === tag) return html;
    if (!("childNodes" in html)) return;
    for (let c of html.childNodes) {
      let h = getFirstTag(c);
      if (h && h.rawTagName.toLowerCase() === tag) return h;
    }
  }

  function anyClassStartsWithSelector(searchStr) {
    // der Selector ist "zweigeteilt" - durch , getrennt
    // der erste Teil findet die Elemente, deren class mit dem searchStr beginnt (wo es also die erste Klasse im class String ist)
    // der zweite Teil findet die Elemente, wo searchStr (inkl. führendem Leerzeichen!) irgendwo enthalten ist - und damit wo eine weitere Klasse so heißt

    return `[class^="${searchStr}"],[class*=" ${searchStr}"]`;
  }

  function parseSingleNote(singleNoteEl) {
    // TimeStamp of the note (in the course video)
    const timestampStr = singleNoteEl.querySelector(
      `div${anyClassStartsWithSelector("lecture-bookmark-v2--duration--")}>span`
    )?.textContent;

    // Header of the note (Section and Lesson info)
    const headerOfNote = singleNoteEl.querySelector(
      `div${anyClassStartsWithSelector(
        "lecture-bookmark-v2--bookmark-header--"
      )}`
    ).childNodes[0];
    // aus irgendeinem Grund, kann ich den Selektor nicht auf den ersten ChildNode bringen
    const sectionHeading = headerOfNote.childNodes[0].textContent;
    const lessonHeading = headerOfNote.childNodes[1].textContent;

    const noteHTML = singleNoteEl.querySelector(
      `div${anyClassStartsWithSelector(
        "lecture-bookmark-v2--content-container--"
      )}`
    ).childNodes[0].innerHTML;

    key = `${sectionHeading.split(".")[0]}-${
      lessonHeading.split(".")[0]
    }-${timestampStr}`;
    return { key, lessonHeading, sectionHeading, timestampStr, noteHTML };
  }

  // Filename
  let fileContent = fs.readFileSync(courseHtml, "utf-8");
  //const dom = new jsdom.JSDOM(fileContent);
  const body = parse(fileContent);

  // Infos zum Kurs
  const titleEl = body.querySelector("h1>a"); // Das Element mit dem Kurstitel (und dem Link zum Kurs)
  //const { href } = titleEl;
  //const { nodeValue: title } = titleEl.childNodes[0]; // ich hätte das gerne in das Destructuring oben integriert, habe es aber nicht geschafft
  const { href, textContent: title } = titleEl; // in jsdom wird scheinbar aus innerText textContent

  // alle Notizen-Elemente (damit auch die ganzen Meta-Daten)
  const allNotesEl = body.querySelectorAll(
    `div${anyClassStartsWithSelector("lecture-bookmark-v2--row--")}`
  );
  const allNotesData = [];
  for (let singleNoteEl of allNotesEl) {
    allNotesData.push(parseSingleNote(singleNoteEl));
  }

  const erg = { title, href, notes: allNotesData };
  return erg;
}

app.use(bodyParser.json());

app.get("/notes/:filename", (req, res) => {
  const filename = req.params.filename;
  //res.send(`Processing: "${filename}"`);
  const erg = getCourseNotes(filename);
  res.json(erg);
});
app.post("/notes", (req, res) => {
  const filename = req?.body?.filename;
  if (!filename) res.redirect("/");
  const erg = getCourseNotes(filename);
  res.json(erg);
});

app.get("/", (req, res) => {
  const html = `
  <HTML>
    <HEAD>
      <TITLE>Backend Udemy Course notes</TITLE>
    </HEAD>
    <BODY>
      <H1>Backend Udemy Course notes</H1>
      <H2>Usage</H2>
      <P>GET host:${PORT}/notes/fullfilename
      <P>Example: GET host:${PORT}/notes/c%3A%5C%5Ctemp%5C%5Chtml-bootcamp.html
      <H3>or use a POST request, as the fullfilename may be hard to write in urlencoded form ;-)</H3>
      <P>POST host:${PORT}/notes, Body: { filename: fullfilename}, Header: { content-type: "application/json"}
      <P>Exampe: POST host:${PORT}/notes, Body: { "filename": "c:\\temp\\html-bootcamp.html"}, Header: { "Content-Type" : "applicaton/json"}
    </BODY>
  </HTML>`;

  res.send(html);
});
app.listen(PORT, () => {
  console.log(`backend-udemy-course-notes: Serving on port ${PORT}`);
});
