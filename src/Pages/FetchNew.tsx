import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { fetchPosts } from '../Apis/api';
import {  useNavigate } from 'react-router-dom';

const FetchNew = () => {
  const navigate=useNavigate()
  const fetchData = async () => {
    // setIsLoading(true);
    try {
      const response = await fetchPosts();
      // setPosts(response);
      return response;
    } catch (error: any) {
      // setError(error.message);
      throw error;
    } finally {
      // setIsLoading(false);
    }
  };
  const{data,isPending,isError,error,refetch} = useQuery({
    queryKey:['posts'],
    queryFn:fetchPosts,//directly use api fucntion here no need of fetchData and then return again
    // staleTime:5000,
    // cacheTime:10000,
    refetchInterval:1000,//it will refetch the data every 1 seconds
    refetchIntervalInBackground:true,//it will refetch the data even when the window is not in focus
    // refetchOnWindowFocus:false,
    retry:2,
  })

  // refetch is used to manually refetch the data when we want to refetch the data on button click or any other event

  const handleLink=(id:number)=>{
   navigate(`/fetch-react-query/${id}`)
  }
   
  return (
        <div className="max-w-6xl mx-auto p-4">
      
      {/* Title */}
      <h1 className="text-3xl font-bold mb-6 text-center">
        Fetch New react with React Query
      </h1>

      {/* Loading */}
      {isPending && (
        <p className="text-center text-blue-500 font-semibold">
          Loading posts...
        </p>
      )}

      {/* Error */}
      {error && (
        <p className="text-center text-red-500 font-semibold">
          {error instanceof Error ? error.message : 'An error occurred'}
        </p>
      )}

      {/* Posts Grid */}
      {!isPending && !error && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.map((post) => (
            <div
              key={post.id}
              className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
              onClick={()=>handleLink(post.id)}
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
  )
}

export default FetchNew

// import { useQuery } from '@tanstack/react-query';
// import React from 'react'
// import { fetchPosts } from '../Apis/api';

// const FetchNew = () => {

//   const dd= useQuery({
//     queryKey:['posts'],
//     queryFn:fetchPosts,//directly use api fucntion here no need of fetchData and then return again
//     staleTime:5000,
//     cacheTime:10000,
//     refetchOnWindowFocus:false,
//     retry:2,
//   })

//   console.log(dd,"ffff");

//   {
//     "status": "pending",
//     "fetchStatus": "fetching",
//     "isPending": true,
//     "isSuccess": false,
//     "isError": false,
//     "isInitialLoading": true,
//     "isLoading": true,
//     "dataUpdatedAt": 0,
//     "error": null,
//     "errorUpdatedAt": 0,
//     "failureCount": 0,
//     "failureReason": null,
//     "errorUpdateCount": 0,
//     "isFetched": false,
//     "isFetchedAfterMount": false,
//     "isFetching": true,
//     "isRefetching": false,
//     "isLoadingError": false,
//     "isPaused": false,
//     "isPlaceholderData": false,
//     "isRefetchError": false,
//     "isStale": true,
//     "promise": {
//         "status": "rejected",
//         "reason": {}
//     },
//     "isEnabled": true
// }
//   refetch is used to manually refetch the data when we want to refetch the data on button click or any other event


   
//   return (
//         <div className="max-w-6xl mx-auto p-4">
      
//       <h1 className="text-3xl font-bold mb-6 text-center">
//         Fetch New react with React Query
//       </h1>
//     </div>
//   )
// }

// export default FetchNew