import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom"
import { fetchProducts } from "../store/action";

const useProductFilter = () => {
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();

    useEffect(() => {
        const params = new URLSearchParams();

        const currentPage = searchParams.get("page")
            ? Number(searchParams.get("page"))
            : 1;
        params.set("pageNumber" , currentPage - 1);
        
        const sortOrder = searchParams.get("sortby") || "asc";
        const sortBy = searchParams.get("sortBy") || "price";
        const currentCategory = searchParams.get("category") || null;
        const currentKeyWord = searchParams.get("keyword") || null;

        params.set('sortBy' , sortBy);
        params.set("sortOrder" , sortOrder);

        if(currentCategory){
            params.set("category" , currentCategory);
        }
        if(currentKeyWord){
            params.set("keyword" , currentKeyWord);
        }
        const qString = params.toString();
        console.log("q string " ,qString );

        dispatch(fetchProducts(qString));

    } ,[dispatch , searchParams]);
};

export default useProductFilter;