import { useState } from "react";
import { API_URL } from "@/config/index";
import styles from "@/styles/Form.module.css";
//import usestate, apiurl, and styles
//pass in evtID, imageUploaded for props
//set image state
//return a form that allows a user to upload a file
//form needs handlesubmit and handlefilechange

//handle file change: console log e.target.files[0] to see values
//instiate a new formData object, append (files, image), (ref, events), (refId, evtid), (fiedl,image)

// make a post request to apiurl/upload
// body is formdata and if res is ok call imageuploaded

//make a request to get a latest image from /events set image preview to the thumbnail set show modal to false to close it

export default function ImageUpload({ evtId, imageUploaded, token }) {
  const [image, setImage] = useState(null);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("files", image);
    formData.append("ref", "events");
    formData.append("refId", evtId);
    formData.append("field", "image");

    const res = await fetch(`${API_URL}/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (res.ok) {
      imageUploaded();
    }
  };

  return (
    <div className={styles.form}>
      <h1>Upload Event Image</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.file}>
          <input type="file" onChange={handleFileChange} />
        </div>
        <input type="submit" value="Upload" className="btn" />
      </form>
    </div>
  );
}
