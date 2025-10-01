import { useState } from "react";
import { uploadFile } from "../api";

function UploadBox({ setContent }) {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    const res = await uploadFile(file);
    setContent(res.data.content);
  };

  return (
    <div className="mb-4">
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
} 

export default UploadBox;