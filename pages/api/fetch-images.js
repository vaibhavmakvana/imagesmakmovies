import cloudinary from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

export default async function handler(_, res) {
    try {
        const { resources } = await cloudinary.v2.api.resources({
            type: 'upload',
            prefix: 'image-hosting-website/',
            max_results: 10, // Change this value to the desired maximum number of results
        });

        const urls = resources.map((resource) => resource.secure_url);
        return res.status(200).json({ urls });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Something went wrong' });
    }
}
