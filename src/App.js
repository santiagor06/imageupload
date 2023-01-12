import logo from "./logo.svg";
import { Button } from "react-bootstrap";
import style from "./App.module.css";
import Dropzone from "react-dropzone";

function App() {
  const handleOnDrop = (files) => {
    console.log(files);
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
