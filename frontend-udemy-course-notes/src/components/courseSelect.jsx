//import React from 'react'

import { useState } from "react";
import axios from "axios";

export default function CourseSelect({ onCourseSelected }) {
  const [files, setFiles] = useState([]);
  const [htmlfiles, setHtmlfiles] = useState([]);
  const changeFiles = (e) => {
    setFiles(e.target.files);
  };
  console.log("onCourseSelected=", onCourseSelected);
  const uploadFiles = (e) => {
    e.preventDefault();
    console.log("uploadFiles", files);
    const formData = new FormData();
    for (const file of files) {
      formData.append("htmlfiles", file);
    }
    axios
      .post("http://localhost:3000/files", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // damit multer "anspringt"
        },
      })
      .then((response) => {
        console.log("response", response.data);
        const filenames = response.data.files.map((file) => file.filename);
        setHtmlfiles(filenames);
        console.log("htmlfiles=", htmlfiles);
      });
  };

  function handleSelectCourse(htmlfile) {
    console.log("Course selected:", htmlfile);
    onCourseSelected(htmlfile);
  }
  return (
    <div>
      <p>
        Hier kann die Datei vom gewünschten Kurs ausgewählt und hochgeladen
        werden
      </p>
      <form onSubmit={uploadFiles}>
        <label htmlFor='fileSelector'>course HTML file</label>
        <input id='fileSelector' type='file' multiple onChange={changeFiles} />
        <button type='submit'>Upload files</button>
      </form>
      {htmlfiles?.length > 0 ? (
        <ul>
          {htmlfiles.map((h) => {
            return (
              <li key={h} onClick={() => handleSelectCourse(h)}>
                {h}
              </li>
            );
          })}
        </ul>
      ) : (
        <p>noch kein File hochgeladen ...</p>
      )}
    </div>
  );
}

//   return (
//     <div>
//       <p>
//         Hier kann die Datei vom gewünschten Kurs ausgewählt und hochgeladen
//         werden
//       </p>
//       <form onSubmit={handleSubmit}>
//         <label htmlFor='fileSelector'>course HTML file</label>
//         <input type='file' onChange={onFileChange} id='fileSelector' />
//         <button type='submit' disabled={btnDisabled}>
//           upload
//         </button>
//       </form>
//     </div>
//   );
// }
