import { useInfiniteQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { fetchUsers } from '../Apis/api'

const InfinteScroll = () => {
    const {data,hasNextPage,fetchNextPage,isLoading,isError,error,isFetchingNextPage}=useInfiniteQuery({
    queryKey:["users"],
    queryFn:fetchUsers,
    initialPageParam: 1,//or we also add default in api 
    getNextPageParam:(lastPage,allPages)=>{
        if(lastPage.length===0){
            return undefined; // if there is no more data to fetch then return undefined to stop fetching more data(lastpage is the data of last page that we have fetched and allpages is the array of all pages data that we have fetched until now) and react query will automatically stop fetching more data when it gets undefined as next page param 
        }
        return allPages.length+1; // next page number will be the length of all pages array + 1 because page number starts from 1 and all pages array length starts from 0 so we need to add 1 to get the correct page number for next page data fetching

    }
    })

    // const handleScroll = () => {
    //   const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    //   if (scrollTop + clientHeight >= scrollHeight - 5) {
    //     // fetchNextPage(); // Fetch the next page when the user scrolls to the bottom
    //   }
    // };
    const handleScroll = () => {
    const isScrolledToBottom=window.innerHeight+window.scrollY >= document.documentElement.scrollHeight -5 //-1 or -5 or  anything means we can get run this before go to the bottom of page for better user experience
    console.log(isScrolledToBottom,"isScrolledToBottom");
    if(isScrolledToBottom && hasNextPage){
        fetchNextPage(); // Fetch the next page when the user scrolls to the bottom given by default from useInfiniteQuery and it will automatically increment the pageParam by 1 when we call fetchNextPage function and it will be passed to the query function as an argument and we can use it to fetch the next page data this is just page number
    };
}
useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, [hasNextPage]);
    
      console.log(data,"datat");
      console.log(hasNextPage,"hasNextPage");

  return (
    <div className="max-w-6xl mx-auto p-4">

      {/* Title */}
      <h1 className="text-3xl font-bold text-center mb-6">
        Infinite Users (React Query)
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
      <div className="h-10 flex items-center justify-center">
        {isFetchingNextPage && (
          <p className="text-gray-400">Loading more...</p>
        )}
      </div>

      {/* No more data */}
      {!hasNextPage && (
        <p className="text-center text-gray-400 mt-4">
          No more users 🚫
        </p>
      )}

    </div>
  );
};

export default InfinteScroll;