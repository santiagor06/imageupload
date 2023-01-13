import style from "./App.module.css";
import Dropzone from "react-dropzone";
import axios from "axios";
import { useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import icon from "./images/icon1.jpg";
import succes from "./images/succes.png";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Toaster, toast } from "react-hot-toast";
import { useDropzone } from "react-dropzone";
function App() {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");

  const name = "dgs9dnzy0";

  const handleCopy = () => {
    navigator.clipboard.writeText(image);
    toast.success("Copied");
  };

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
        <div className={style.load}>
          <div className={style.spin}>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
          <div className={style.up}>
            <p>Uploading...</p>
          </div>
        </div>
      ) : (
        <div className={style.main}>
          {image ? (
            <div className={style.succes}>
              <img className={style.check} src={succes} alt="icon" />
              <p className={style.title}>Uploaded Successfully!</p>
              <div>
                <img className={style.ima} src={image} alt="icon" />
              </div>
              <div className={style.copy}>
                <InputGroup value={image} className="mb-3">
                  <Form.Control value={image} aria-describedby="basic-addon2" />
                  <Button
                    onClick={handleCopy}
                    variant="primary"
                    id="button-addon2"
                  >
                    Copy Link
                  </Button>
                </InputGroup>
              </div>
              <Toaster position="top-center" />
            </div>
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
                      <div className={style.indrop}>
                        <img className={style.iconm} src={icon} alt="icon" />

                        <p>Drag & Drop your image here</p>
                      </div>
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
