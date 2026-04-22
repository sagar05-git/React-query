import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/Layouts/MainLayout";
import Home from "../Pages/Home";
import FetchOld from "../Pages/FetchOld";
import FetchNew from "../Pages/FetchNew";
import FetchIndivdual from "../Pages/FetchIndivdual";
import FetchWithPagination from "../Pages/FetchWithPagination";
import InfinteScroll from "../Pages/InfinteScroll";
import InfiniteScrollByUsingInterseectionObserverLibrary from "../Pages/InfiniteScrollByUsingInterseectionObserverLibrary";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout/>,
        errorElement: <h2>Not Found</h2>,
        children: [
            {
                path: "/",
                element: <Home/>,
            },
            {
                path: "/fetch-old",
                element: <FetchOld/>//by useEffect and old way of fetching data
            },
            {   
                path: "/fetch-react-query",
                element: <FetchNew/>//by react query
            },
            {   
                path: "/fetch-react-query/:id",
                element: <FetchIndivdual/>//by react query
            },
            {   
                path: "/fetch-react-query-pagination",
                element: <FetchWithPagination/>//by react query
            },
            {
                path:"/infinite-scroll",
                element:<InfinteScroll/>
            },
            {
                path:"/infinite-scroll-intersection-observer",
                element:<InfiniteScrollByUsingInterseectionObserverLibrary/>
            }
        ]
    }
])

export default Router;