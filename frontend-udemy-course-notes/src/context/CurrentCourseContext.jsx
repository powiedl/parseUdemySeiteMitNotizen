import { createContext, useContext, useState } from "react";

const CurrentCourseContext = createContext();

function CurrentCourseProvider({ children }) {
  const [courseInfo, setCourseInfo] = useState({}); // general informations about course
  const [courseNotes, setCourseNotes] = useState([]); // array of notes in this course
  function setCourseTitle(title) {
    setCourseInfo((i) => {
      return { ...i, title: title };
    });
  }
  function setCourseHref(href) {
    setCourseInfo((i) => {
      return { ...i, href: href };
    });
  }

  return (
    <CurrentCourseContext.Provider
      value={{
        courseInfo,
        setCourseInfo,
        courseNotes,
        setCourseNotes,
        setCourseTitle,
        setCourseHref,
      }}
    >
      {children}
    </CurrentCourseContext.Provider>
  );
}

function useCurrentCourse() {
  const context = useContext(CurrentCourseContext);
  if (context === undefined)
    throw new Error(
      "CurrentCourseContext was used outside of DarkModeProvider"
    );
  return context;
}

export { CurrentCourseProvider, useCurrentCourse };
