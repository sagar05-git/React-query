import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchPostById } from '../Apis/api';
import { useParams } from 'react-router-dom';


const FetchIndivdual = () => {
  const {id}=useParams()
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['post', id],
    queryFn: () => fetchPostById(Number(id)),
    enabled: !!id,//if id is present then only fetch data otherwise do not fetch data
  });

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (isError) return <p className="text-red-500 text-center">{(error as Error).message}</p>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-6 max-w-md w-full border">
        
        <h2 className="text-xl font-bold mb-2 text-gray-800">
          {data?.title}
        </h2>

        <p className="text-gray-600 mb-4">
          {data?.body}
        </p>

        <div className="text-sm text-gray-400">
          Post ID: {data?.id}
        </div>

      </div>
    </div>
  );
};

export default FetchIndivdual;