import axios from "axios";
import axiosInstance from "./AxiosInstance/AxiosInstance";

export const fetchPosts = async () => {
  try {
    const response = await axiosInstance.get("/posts");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchPostById = async (id:number|string) => {
  try {
    const response = await axiosInstance.get(`/posts/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchPostPaginationImplementation = async (limit:number=10, page:number=1) => {
  try {
    const response = await axiosInstance.get(`/posts?_limit=${limit}&_page=${page}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deletePost = async (id:number) => {
  try {
    const response = await axiosInstance.delete(`/posts/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updatePost = async (id:number, postData:any) => {
  try {
    const response = await axiosInstance.patch(`/posts/${id}`, postData);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// for infinite scroll 
// pageParam is given by react query to fetch the next page data and it is automatically incremented by react query when we call fetchNextPage function and it will be passed to the query function as an argument and we can use it to fetch the next page data this is just page number
export const fetchUsers = async ({ pageParam}: { pageParam: number }) => {
  try {
    // console.log(pageParam,"paghe");
    const res = await axios.get(
      `https://api.github.com/users?per_page=10&page=${pageParam}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};