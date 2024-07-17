# Disclaimer

This is a work in progress project / repository. Right now it is not useful at all. I hope this will change at some point ...

# Goal

Parsing your own notes of udemy, so that you can save/edit them somewhere else - as there are some limitations in the notes at udemy (in my opinion the hardest one is the limit of 1000 characters per note, which can get significantly less because of formating).
In the first run I want to be able to parse the downloaded notes page of a course and display it in a React App.

In the future I also plan to have the possibility to edit the notes in this React App (to finally overcome the 1000 characters limit ;-) ).

## Procedure (Preperation)

1. You have to open the desired course page, select the notes, go to the developer tools of your browser (I use Google Chrome for this, so I know that it works with this browser).
2. In the developer tools select the Elements tab
3. select the html tag, right click, Copy, Copy element
4. Open an editor
5. Paste the content of the html tag here and save it

## Project contents

The project consists of two main parts (at least for the moment):

- a node-js app (the backend)
- the React app (the frontend)

### node-js-app (backend-udemy-course-notes)

The backend provides the following URLs:

#### POST /files

Upload one or more HTML Course files. At the moment there is no checking of the content. The files will be stored in the uploads directory at the server. If the upload was successfull an array with the information about the files will be returned (just the filename, which is prepended with an timestamp, so that you get no problem with uploading the same file multiple times).

#### GET /infos/:filename

Returns the parsed data of the :filename (which you get from the POST /files call).

### React app (frontend-udemy-course-notes)

At the moment it contains three components (beside App).

#### CourseSelect

This component is responsible to select one (ore more) HTML Files with your notes (as described in the Procedure section).

#### CourseOverview

This component can display some information about the course (title and URL).

#### SingleCard

This component is responsible for rendering a single note. In consists of some child components (which only make sense in conjunction with the SingleCard component).
