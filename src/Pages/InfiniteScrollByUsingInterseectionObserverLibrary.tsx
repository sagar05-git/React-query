import { useInfiniteQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { fetchUsers } from '../Apis/api'
import { useInView } from 'react-intersection-observer';

const InfiniteScrollByUsingInterseectionObserverLibrary = () => {
    const {ref,inView}=useInView({
    threshold:0.1, // it means when 10% of the element is visible in the viewport then it will be considered as in view and it will trigger the fetchNextPage function to fetch the next page data for better user experience we can also use threshold:1 to trigger the fetchNextPage function when the element is fully visible in the viewport but it may cause some delay in fetching the next page data because user have to scroll to the bottom of the page to make the element fully visible in the viewport and then it will trigger the fetchNextPage function to fetch the next page data
    })
    const {data,hasNextPage,fetchNextPage,isLoading,isError,error,isFetchingNextPage}=useInfiniteQuery({
    queryKey:["users"],
    queryFn:fetchUsers,
    initialPageParam: 1,//or we also add default in api 
    getNextPageParam:(lastPage,allPages)=>{
        if(lastPage.length===0){
            return undefined; 
        }
        return allPages.length+1; 

    }
    })

    const handleScroll = () => {

    if(inView && hasNextPage){
        fetchNextPage(); // Fetch the next page when the user scrolls to the bottom given by default from useInfiniteQuery and it will automatically increment the pageParam by 1 when we call fetchNextPage function and it will be passed to the query function as an argument and we can use it to fetch the next page data this is just page number
    };
}
useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, [inView,hasNextPage]);
    


  return (
    <div className="max-w-6xl mx-auto p-4">

      {/* Title */}
      <h1 className="text-3xl font-bold text-center mb-6">
        Infinite Users (React Query) by using react-intersection-observer
      </h1>

      {/* Loading */}
      {isLoading && (
        <p className="text-center text-blue-500">Loading users...</p>
      )}

      {/* Error */}
      {isError && (
        <p className="text-center text-red-500">
          {error instanceof Error ? error.message : "Error"}
        </p>
      )}

      {/* Users Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* we can use map twice or we can flatArray we got in pages[Array(10),Array(10)] ] */}
        { data?.pages.flatMap((page) => page).map((user: any) => (
          <div
            key={user.id}
            className="bg-white shadow-md rounded-lg p-4 flex items-center gap-4 hover:shadow-lg transition"
          >
            
            <img
              src={user.avatar_url}
              alt={user.login}
              className="w-14 h-14 rounded-full"
            />

            
            <div>
              <h2 className="font-semibold">{user.login}</h2>
              <a
                href={user.html_url}
                target="_blank"
                className="text-blue-500 text-sm hover:underline"
              >
                View Profile
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Loader at bottom */}
      <div ref={ref} className="h-10 flex items-center justify-center">
        {isFetchingNextPage && (
          <p className="text-gray-400">Loading more...</p>
        )}
      </div>
       {/* when i react to bottom then this div is visible 10 percentage according to my threshold value then inView become true and then it will trigger the fetchNextPage function to fetch the next page data for better user experience we can also use threshold:1 to trigger the fetchNextPage function when the element is fully visible in the viewport but it may cause some delay in fetching the next page data because user have to scroll to the bottom of the page to make the element fully visible in the viewport and then it will trigger the fetchNextPage function to fetch the next page data  */}

      {/* No more data */}
      {!hasNextPage && (
        <p className="text-center text-gray-400 mt-4">
          No more users 🚫
        </p>
      )}

    </div>
  );
};

export default InfiniteScrollByUsingInterseectionObserverLibrary;