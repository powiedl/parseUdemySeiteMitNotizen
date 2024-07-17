import React, { useState } from "react";
import axios from "axios";
import SingleCard from "./components/singleCard";
import CourseSelect from "./components/courseSelect";
import CourseOverview from "./components/courseOverview";

export default function App() {
  const [course, setCourse] = useState();
  function handleSelectCourse(htmlfile) {
    console.log("handleSelectCourse htmlfile=", htmlfile);
    const url = `http://localhost:3000/infos/${htmlfile}`;
    console.log(`requesting ${url}'`);
    axios.get(url).then((response) => {
      console.log("Antwort vom Backend!");
      console.log(response.data);
      console.log(
        "=================================================================="
      );
    });
    // axios
    //   .post("http://localhost:3000/files", formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data", // damit multer "anspringt"
    //     },
    //   })
    //   .then((response) => {
    //     console.log("response", response.data);
    //     const filenames = response.data.files.map((file) => file.filename);
    //     setHtmlfiles(filenames);
    //     console.log("htmlfiles=", htmlfiles);
    //   });
  }

  return (
    <>
      <CourseSelect onCourseSelected={handleSelectCourse} />
      {course && <CourseOverview />}
      <SingleCard>
        <SingleCard.Section>Section</SingleCard.Section>
        <SingleCard.Lesson>Lesson</SingleCard.Lesson>
        <SingleCard.TimeStamp>TimeStamp</SingleCard.TimeStamp>
        <SingleCard.Note>Hello React</SingleCard.Note>
      </SingleCard>
    </>
  );
}
