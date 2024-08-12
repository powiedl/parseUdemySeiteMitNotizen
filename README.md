# Disclaimer

This is a work in progress project / repository. Right now it is not very useful. I hope this will change at some point ... (by now you can upload a course HTML, you can view the notes, you can edit them - but be aware that you can not save your changes anywhere with the app at the current stage of development!)

# Goal

Parsing your own notes of udemy, so that you can save/edit them somewhere else - as there are some limitations in the notes at udemy (in my opinion the hardest one is the limit of 1000 characters per note, which can get significantly less because of formating).
In the first run I want to be able to parse the downloaded notes page of a course and display it in a React App.

In the future I also plan to have the possibility to edit the notes in this React App (to finally overcome the 1000 characters limit ;-) ).

# Procedure (Preperation)

1. You have to open the desired course page, select the notes, go to the developer tools of your browser (I use Google Chrome for this, so I know that it works with this browser).
2. In the developer tools select the Elements tab
3. select the html tag, right click, Copy, Copy element
4. Open an editor
5. Paste the content of the html tag here and save it

# Alternatives

I found two Google Chrome extensions which extract udemy notes in the browser (to be honest a friend of mine found them) - and they do a better job in extracting the notes than I do at the moment ...

So if you are interested in this functionality give them a try ...
- https://chromewebstore.google.com/detail/udemy-notes-extractor/ldcplnodidjobnjalceieklecgoooebj 
- https://chromewebstore.google.com/detail/udemy-notes-downloader/nfmebebffodanoadjadpjimpkihfeamn 

# Current state
## The backend 
It is "ready" for now. Maybe I should try to improve the parseSingleNote a "little" bit, because I think it "destroys" the note some times. And when you try to edit such a note with Quill it will be destroyed even more. 

## The frontend
Started to experiment with a possibility to edit the notes (Quill and react-quill). This broke the nicely rendering of the notes as HTML elements. Now I'm trying to get the nice rendering back - without loosing the possibility to edit the notes. Succeeded - nice rendering of notes as HTML elements is back and it is also possible to edit the notes. The "changed" is now triggered by an onChange event mit the source of user. Downside with this approach: If you add a character and then remove the same character again (so that the note looks the same at the beginning and after your "changes" it is still treated as "changed"). But for now I will go with this solution.

# Project contents

The project consists of two main parts (at least for the moment):

- a node-js app (the backend)
- the React app (the frontend)

## node-js-app (backend-udemy-course-notes)

The backend provides the following URLs:

### POST /files

Upload one or more HTML Course files. At the moment there is no checking of the content. The files will be stored in the uploads directory at the server. If the upload was successful an array with the information about the files will be returned (just the filename, which is prepended with a timestamp, so that you get no problem with uploading the same file multiple times).

### GET /infos/:filename

Returns the parsed data of the :filename (which you get from the POST /files call).

## React app (frontend-udemy-course-notes)

At the moment it contains three components (beside App).

### CourseSelect

This component is responsible to select one HTML Files with your notes (as described in the Procedure section).

### CourseOverview

This component can display some information about the course (at the moment only the title, but the href is also inside the html - I just can't figure out how to extract it, because it would be a wonderful id of the course).

### SingleCard

This component is responsible for rendering a single note. It consists of some child components (which only make sense in conjunction with the SingleCard component).

# Next steps
* save a changed note at the backend (with this step I will probably add a database to store the information parsed out of the HTML files)
 
# Possible future improvements
## Backend
* Storing the information parsed out of the HTML file in some kind of database (neccessary for all other features).
* Storing the original and the edited version of a note (if it will be possible to edit the notes in the React app), this would be needed to keep the edited version of the notes if you reupload a course HTML.
* Tagging notes (from the backend perspective this means storing the tags to the note and/or the course - depending which elements it will be possible to tag)
## Frontend
* Tagging notes and/or courses (at the moment I think this would be more useful for the notes).
* Possibility to filter notes based on the tags.

##
