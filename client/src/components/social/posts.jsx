import React from 'react';

// Data object with image URLs
const postData = {
  images: [
    "https://via.placeholder.com/300",
    "https://via.placeholder.com/300",
    "https://via.placeholder.com/300",
    "https://via.placeholder.com/300",
    "https://via.placeholder.com/300",
    "https://via.placeholder.com/300",
    "https://via.placeholder.com/300",
    "https://via.placeholder.com/300",
    // Add more image URLs if needed
  ]
};

const Post = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Image Gallery</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {postData.images.map((url, index) => (
          <div key={index} className="relative group">
            <img
              src={url}
              alt={`Image ${index + 1}`}
              className="w-full h-auto object-cover rounded-lg shadow-md transition-transform transform group-hover:scale-105"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Post;
