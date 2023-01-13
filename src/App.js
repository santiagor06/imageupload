import style from "./App.module.css";
import Dropzone from "react-dropzone";
import axios from "axios";
import { useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import icon from "./images/icon.png";

function App() {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const name = "dgs9dnzy0";

  const handleOnDrop = async (file) => {
    try {
      console.log(file);
      const formData = new FormData();
      formData.append("file", file[0]);
      formData.append("upload_preset", "preset_upload");
      setLoading(true);
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${name}/image/upload`,
        formData
      );
      setImage(response.data.url);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className={style.container}>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <div className={style.main}>
          {image ? (
            <img src={image} alt="image" />
          ) : (
            <div>
              <div className={style.title}>
                <p>upload your image</p>
              </div>
              <div className={style.subtitle}>
                <p>File should be Jpeg,Png..</p>
              </div>

              <div className={style.drop}>
                <Dropzone onDrop={handleOnDrop}>
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps({ className: "dropzone" })}>
                      <input {...getInputProps()} />
                      <img src={icon} alt="icon" />
                      <p>Drag & Drop your image here</p>
                    </div>
                  )}
                </Dropzone>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
