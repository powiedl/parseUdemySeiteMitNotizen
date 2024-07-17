function anyClassStartsWithSelector(searchStr) {
  // der Selector ist "zweigeteilt" - durch , getrennt
  // der erste Teil findet die Elemente, deren class mit dem searchStr beginnt (wo es also die erste Klasse im class String ist)
  // der zweite Teil findet die Elemente, wo searchStr (inkl. führendem Leerzeichen!) irgendwo enthalten ist - und damit wo eine weitere Klasse so heißt

  return `[class^="${searchStr}"],[class*=" ${searchStr}"]`;
}

function parseSingleNote(singleNoteData) {
  // TimeStamp of the note (in the course video)
  const timestampStr = singleNoteData.querySelector(
    `div${anyClassStartsWithSelector("lecture-bookmark-v2--duration--")}>span`
  )?.innerText;

  // Header of the note (Section and Lesson info)
  const headerOfNote = singleNoteData.querySelector(
    `div${anyClassStartsWithSelector("lecture-bookmark-v2--bookmark-header--")}`
  ).childNodes[0];
  // aus irgendeinem Grund, kann ich den Selektor nicht auf den ersten ChildNode bringen
  const sectionHeading = headerOfNote.childNodes[0].innerText;
  const lessonHeading = headerOfNote.childNodes[1].innerText;

  const noteHTML = singleNoteData.querySelector(
    `div${anyClassStartsWithSelector(
      "lecture-bookmark-v2--content-container--"
    )}`
  ).childNodes[0].innerHTML;

  const newNoteEl = document.createElement("div");
  newNoteEl.classList.add("single-note-card");
  const sectionHeadingEl = document.createElement("H4");
  sectionHeadingEl.innerText = sectionHeading;
  const lessonHeadingEl = document.createElement("H5");
  lessonHeadingEl.innerText = lessonHeading;
  const timeStampEl = document.createElement("span");
  timeStampEl.innerText = timestampStr;
  const noteHtmlEl = document.createElement("div");
  noteHtmlEl.innerHTML = noteHTML;
  newNoteEl.append(lessonHeadingEl, sectionHeadingEl, timeStampEl, noteHtmlEl);
  return newNoteEl;
}

function stringToHTML(text) {
  let parser = new DOMParser();
  let doc = parser.parseFromString(text, "text/html");
  return doc;
}

const readUploadedFileAsText = (inputFile) => {
  const temporaryFileReader = new FileReader();

  return new Promise((resolve, reject) => {
    temporaryFileReader.onerror = () => {
      temporaryFileReader.abort();
      reject(new DOMException("Problem parsing input file."));
    };

    temporaryFileReader.onload = () => {
      resolve(temporaryFileReader.result);
    };
    temporaryFileReader.readAsText(inputFile);
  });
};

function doit(htmlText) {
  console.log(`processing ${htmlText.length} bytes ...`);
  let doc = stringToHTML(htmlText);

  //console.dir(doc);

  // Infos zum Kurs
  const body = doc.body;
  const h1 = doc.body.querySelector("h1");

  const titleEl = doc.body.querySelector("h1>a"); // Das Element mit dem Kurstitel (und dem Link zum Kurs)
  const { pathname: href, innerText: title } = titleEl;
  h1El.innerText = title;
  h2El.innerText = href;
  // alle Notizen-Elemente (damit auch die ganzen Meta-Daten)
  const allNotesData = doc.body.querySelectorAll(
    `div${anyClassStartsWithSelector("lecture-bookmark-v2--row--")}`
  );
  h3El.innerText = "" + allNotesData.length + " Notizen";

  for (let singleNoteData of allNotesData) {
    const singleNoteEl = parseSingleNote(singleNoteData);
    notesContainer.appendChild(singleNoteEl);
  }

  //console.log(href, title);
}

const handleUpload = async (event) => {
  console.log("handleUpload");
  const file = event.target.files[0];
  if (!file) {
    buttonEl.disabled = true;
    return;
  }
  //const fileContentDiv = document.querySelector("div#file-content");

  try {
    const fileContents = await readUploadedFileAsText(file);
    htmlEl.value = fileContents;
    buttonEl.disabled = false;
  } catch (e) {
    errorEl.innerHTML = e.message;
    buttonEl.disabled = true;
  }
};

const buttonEl = document.body.querySelector("button");
const filenameEl = document.body.querySelector('input[name="file"]');
const htmlEl = document.body.querySelector("#udemyHtml");
const h1El = document.getElementById("course-title");
const h2El = document.getElementById("course-link");
const h3El = document.getElementById("notes-summary");
const notesContainer = document.getElementById("notes-container");
const errorEl = document.getElementById("error");
filenameEl.addEventListener("change", handleUpload);

buttonEl.addEventListener("click", (e) => {
  console.log("button eventhandler");
  doit(htmlEl.value);
});

// Filename
const courseHtml =
  "C:\\Users\\Roland\\Documents\\udemy-Kurse\\HTML-CSS-Bootcamp-Notizen.html";
