import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [image, setImage] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!image) return;

    const response = await fetch('/api/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: image }),
    });

    const data = await response.json();

    console.log(data.url); // Display the uploaded image URL

    // Do something with the uploaded image URL, such as displaying it in the UI
  };

  return (<>


    <div className='container'>
      <h1>Image Hosting Website</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {image && <img src={image} alt="Preview" />}
    </div>

    <div>
      <h1>Image Hosting Website</h1>
      {/* ... */}
      <Link href="/gallery" legacyBehavior>
        <a>View Image Gallery</a>
      </Link>
    </div>
  </>

  );
}