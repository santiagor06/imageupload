import style from "./App.module.css";
import Dropzone from "react-dropzone";
import axios from "axios";

function App() {
  const key = "598862248635565";
  const name = "dgs9dnzy0";

  const handleOnDrop = async (file) => {
    try {
      console.log(file);
      const formData = new FormData();
      formData.append("file", file[0]);
      formData.append("upload_preset", "preset_upload");

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${name}/image/upload`,
        formData
      );
      console.log(response.data.url);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className={style.container}>
      <Dropzone className={style.drop} onDrop={handleOnDrop}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
          </div>
        )}
      </Dropzone>
    </div>
  );
}

export default App;
