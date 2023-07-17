import Link from 'next/link';
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
        <div className='container'>
            <div className='flex2'>
                <Link href='/'>
                    <h1>Back</h1>
                </Link>
                <h1>Image Gallery</h1>
            </div>
            <div className='flex3'>
                {uploadedImages.map((imageUrl, index) => (
                   <Link href={imageUrl}>
                    <img key={index} className='imgbx' src={imageUrl} alt={`Uploaded Image ${index + 1}`} />
                   </Link>
                ))}
            </div>


        </div>
    );
}