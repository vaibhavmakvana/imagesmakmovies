import { useEffect, useState } from 'react';

export default function Gallery() {
    const [uploadedImages, setUploadedImages] = useState([]);

    useEffect(() => {
        fetchUploadedImages();
    }, []);

    const fetchUploadedImages = async () => {
        try {
            const response = await fetch('/api/fetch-images');
            const data = await response.json();
            setUploadedImages(data.urls);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Image Gallery</h1>
            {uploadedImages.map((imageUrl, index) => (
                <img key={index} src={imageUrl} alt={`Uploaded Image ${index + 1}`} />
            ))}
        </div>
    );
}
