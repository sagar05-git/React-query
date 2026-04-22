import React, { useEffect, useState } from 'react';
import { fetchPosts } from '../Apis/api';

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

const FetchOld = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetchPosts();
      setPosts(response);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4">
      
      {/* Title */}
      <h1 className="text-3xl font-bold mb-6 text-center">
        Fetch Old (useEffect)
      </h1>

      {/* Loading */}
      {isLoading && (
        <p className="text-center text-blue-500 font-semibold">
          Loading posts...
        </p>
      )}

      {/* Error */}
      {error && (
        <p className="text-center text-red-500 font-semibold">
          {error}
        </p>
      )}

      {/* Posts Grid */}
      {!isLoading && !error && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
            >
              <h2 className="text-lg font-semibold mb-2">
                {post.title}
              </h2>
              <p className="text-gray-600 text-sm mb-3">
                {post.body}
              </p>
              <span className="text-xs text-gray-400">
                User ID: {post.userId}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Reload Button */}
      <div className="flex justify-center mt-6">
        <button
          onClick={fetchData}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Reload Posts
        </button>
      </div>

    </div>
  );
};

export default FetchOld;