import axios from "axios";
const backendBaseUrl = "http://localhost:3000";
export async function uploadCourseHTML({ files }) {
  const formData = new FormData();
  //console.log("apiFiles,uploadCourseHTML,files=", files);
  for (const file of files) {
    formData.append("htmlfiles", file);
  }
  return axios
    .post(`${backendBaseUrl}/files`, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // damit multer "anspringt"
      },
    })
    .then((response) => {
      //console.log("upload sucessful,response.data=", response.data);
      let filenames = [];
      //console.log("response.data.files.length=", response.data.files?.length);
      for (let file of response.data.files) {
        //console.log(file.filename);
        filenames.push(file.filename);
      }
      //console.log("apiFiles,uploadCourseHTML,axios.then,filenames", filenames);
      return filenames;
    })
    .catch((err) => {
      //console.log("error", err.message);
      throw new Error(err.message);
    });
}

export async function parseFile(file) {
  return axios.get(`${backendBaseUrl}/infos/${file}`).then((response) => {
    //console.log("apiFiles,parseFile,response=", response);
    return response;
  });
}
