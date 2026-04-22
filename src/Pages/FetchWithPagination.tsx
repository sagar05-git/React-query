import React, { useState } from 'react';
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { deletePost, fetchPostPaginationImplementation, updatePost } from '../Apis/api';

const FetchWithPagination = () => {
  const [page, setPage] = useState(1);
  const [limit,setLimit ]= useState<number>(10); // Number of posts per page
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isPending, isError, error, isFetching } = useQuery({
    queryKey: ['posts', { page, limit }],
    queryFn: () => fetchPostPaginationImplementation(limit, page),
    placeholderData: keepPreviousData, // placeholderData:keepPreviousData to keep the previous data until the new data is fetched and then it will update the data with new data for smooth ux
  }); 

//   mutation for delete post
  const deleteMutaion=useMutation({
    mutationFn:(id:number)=>deletePost(id),
    

    onSuccess:(data,id)=>{
        // Invalidate and refetch
        console.log(data,"data");
        queryClient.setQueriesData(['posts', { page, limit }], (oldData: any) => {
            if (!oldData) return oldData; // If there's no old data, return it as is
            return oldData.filter((post: any) => post.id !== id); // Filter out the deleted post
        });
    }
  })

  const updateMutation=useMutation({
    mutationFn:({ id, postData }: { id: number; postData: any })=>updatePost(id,postData),
    
    onSuccess:(data,variables)=>{
        console.log(data,"data",variables);
        queryClient.setQueriesData(['posts', { page, limit }], (oldData: any) => {
            if (!oldData) return oldData; // If there's no old data, return it as is
             return oldData.map((post: any) => post.id === variables.id ? variables.postData : post); // Update the post with new data
        });
    }
  });

  const handleNext = () => {
    setPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const handleClick = (id: number) => {
    navigate(`/fetch-react-query/${id}`);
  };

  const handleLimitChange=(e:React.ChangeEvent<HTMLSelectElement>)=>{
    setLimit(Number(e.target.value));
    setPage(1);
  }

  const handleDelete=(e:React.MouseEvent<HTMLButtonElement>,id:number)=>{
    e.stopPropagation()
    console.log(id);
    deleteMutaion.mutate(id)
  }
  const handleUpdate=(e:React.MouseEvent<HTMLButtonElement>,id:number,postData:any)=>{
    e.stopPropagation()
    const updatedData={...postData,title:"Updated Title"}
    console.log(updatedData,"updatedData");
    updateMutation.mutate({ id, postData: updatedData })
  }
  return (
    <div className="max-w-6xl mx-auto p-4">

      {/* Title */}
      <h1 className="text-3xl font-bold mb-6 text-center">
        Pagination with React Query
      </h1>

 {/* 🔽 Limit Dropdown */}
      <div className="flex justify-end mb-4">
        <select
          value={limit}
          onChange={handleLimitChange}
          className="border px-3 py-2 rounded-md"
        >
          <option value={5}>5 per page</option>
          <option value={10}>10 per page</option>
          <option value={20}>20 per page</option>
          <option value={100}>100 per page</option>
        </select>
      </div>
      {/* Loading */}
      {isPending && <p className="text-center text-blue-500">Loading...</p>}

      {/* Error */}
      {isError && (
        <p className="text-center text-red-500">
          {error instanceof Error ? error.message : 'Error'}
        </p>
      )}

      {/* Posts Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((post: any) => (
          <div
            key={post.id}
            onClick={() => handleClick(post.id)}
            className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition cursor-pointer"
          >
            <h2 className="text-lg font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-600 text-sm mb-3">{post.body}</p>
            <span className="text-xs text-gray-400">
              User ID: {post.userId}
            </span>
            <br/>
            <button onClick={(e)=>handleDelete(e,post.id)} className='bg-red-500 text-white px-1 rounded-md'>Delete</button>
            <button onClick={(e) => handleUpdate(e,post.id, post)} className='bg-blue-500 text-white px-1 rounded-md ml-2'>Update</button>
          </div>
        ))}
      </div>

      {/* Fetching Indicator (background loading) */}
      {isFetching && (
        <p className="text-center text-gray-400 mt-2">Updating...</p>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mt-8">
        
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span className="font-semibold">
          Page: {page}
        </span>

        <button
          onClick={handleNext}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Next
        </button>

      </div>
    </div>
  );
};

export default FetchWithPagination;