import fs from 'fs';
import path from 'path';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Images({ images, totalPages }) {
  const router = useRouter();
  const [page, setPage] = useState(1);

  useEffect(() => {
    const { query } = router;
    const currentPage = parseInt(query.page, 10) || 1;
    setPage(currentPage);
  }, [router]);

  const handlePageChange = (pageNumber) => {
    router.push(`/images?page=${pageNumber}`);
  };

  const renderPageNumbers = (currentPage, totalPages) => {
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    return pageNumbers.map((number) => (
      <button
        key={number}
        onClick={() => handlePageChange(number)}
        className={currentPage === number ? 'active' : ''}
      >
        {number}
      </button>
    ));
  };

  return (
    <div className='container'>
      <div className='flex2'>
        <Link href='/'><h1 className='h1'>Back</h1></Link>
        <h1 className='h1'>Uploaded Images</h1>
      </div>
      <div className='flex3'>
        {images.map((image, index) => (
          <div key={index} className='imgbx'>
            <Link href={`/uploads/${image.filename}`}>
              <img
                src={`/uploads/${image.filename}`}
                alt="Uploaded Image"
              />
            </Link>
          </div>

        ))}
      </div>


      <div className="pagination">
        {page > 1 && (
          <button onClick={() => handlePageChange(page - 1)}>Prev</button>
        )}
        {renderPageNumbers(page, totalPages)}
        {page < totalPages && (
          <button onClick={() => handlePageChange(page + 1)}>Next</button>
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps({ query }) {
  const uploadsFolder = path.join(process.cwd(), 'public', 'uploads');
  let uploadedFiles = fs.readdirSync(uploadsFolder);

  uploadedFiles = uploadedFiles.sort((a, b) => {
    const fileA = fs.statSync(path.join(uploadsFolder, a));
    const fileB = fs.statSync(path.join(uploadsFolder, b));
    return fileB.mtime.getTime() - fileA.mtime.getTime();
  });

  const imagesPerPage = 4; // Number of images per page
  const totalPages = Math.ceil(uploadedFiles.length / imagesPerPage);

  const currentPage = parseInt(query.page, 10) || 1;
  const startIndex = (currentPage - 1) * imagesPerPage;
  const endIndex = startIndex + imagesPerPage;

  const images = uploadedFiles
    .slice(startIndex, endIndex)
    .map((filename) => ({ filename }));

  return {
    props: {
      images,
      totalPages,
    },
  };
}

