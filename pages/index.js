import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setUploadSuccess(true);
        setSelectedFile(null); // Reset selectedFile to null
      } else {
        setUploadError(true);
        throw new Error('File upload failed!');
      }
    } catch (error) {
      console.error('An error occurred during file upload:', error);
      setUploadError(true);
    }
  };

  return (
    <div className='container flex'>
      <Link href='/'><h1>Makmovies Image Store</h1></Link>
      {uploadSuccess && (
        <div className="notification">Image uploaded successfully!</div>
      )}
      {uploadError && (
        <div className="notification">File upload failed!</div>
      )}
      <form onSubmit={handleSubmit} className='form'>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit" disabled={!selectedFile}>
          Upload
        </button>
      </form>
      <Link href="/images">View Uploaded Images</Link>
    </div>
  );
}
