//import React from 'react'
import { useState } from "react";
import axios from "axios";
import styled from "styled-components";

const StyledCourseSelection = styled.header`
  border: 1px solid black;
  border-radius: 0.2rem;
  padding: 0.5rem 0.5rem;
  & form {
    padding: 1rem;
    & label {
      padding: 0.2rem 1rem;
    }
    & button {
      padding: 0.2rem 0.5rem;
      margin: 0.5rem 1.5rem;
    }
  }
  & .light {
    opacity: 0.8;
    font-size: small;
    padding: 0.5rem 1rem;
  }

  & li {
    cursor: pointer;
  }

  & li:hover {
    font-weight: bolder;
    transition: all 0.2s;
  }
`;

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
    <StyledCourseSelection>
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
        <p className='light'>noch kein File hochgeladen ...</p>
      )}
    </StyledCourseSelection>
  );
}

//   return (
//  7   <div>
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
