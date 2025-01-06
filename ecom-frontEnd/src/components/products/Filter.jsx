import { FormControl, InputLabel ,Select ,MenuItem, Tooltip, Button} from "@mui/material";
import { useEffect, useState } from "react";
import { FiArrowDown, FiArrowUp, FiRefreshCcw, FiSearch } from "react-icons/fi";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const Filter = ({categories}) => {

    const [searchParams] = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const pathname = useLocation().pathname;
    const navigate = useNavigate();

    const [category ,setCategory] = useState("all");
    const [sortOrder , setSortOrder] = useState("asc");
    const [searchTerm , setSearchTerm] = useState("");

    useEffect(() => {
        const currentCategory = searchParams.get("category") || "all";
        const currentSortOrder = searchParams.get("sortby") || "asc";
        const currentSearchTerm = searchParams.get("keyword") || "";

        setCategory(currentCategory);
        setSortOrder(currentSortOrder);
        setSearchTerm(currentSearchTerm);
    } ,[searchParams]);
    
    const HandleCategoryChange = (event) => {
        const selectedCategory = event.target.value;
        
        if(selectedCategory === "all"){
            params.delete("category");
        }
        else{
            params.set("category" , selectedCategory);
        }
        navigate(`${pathname}?${params}`);
        setCategory(event.target.value);
    };
    useEffect(() => {
        const handler = setTimeout(() => {
            if(searchTerm){
                searchParams.set("keyword" , searchTerm);
            }
            else{
                searchParams.delete("keyword");
            }
            navigate(`${pathname}?${searchParams.toString()}`);
        } ,700)
        return() => {
            clearTimeout(handler);
        };
    } ,[searchTerm ,searchParams ,navigate ,pathname]);
    const toggleSortOrder = () => {
        setSortOrder((prevOrder) => {
            const newOrder = (prevOrder === "asc") ? "dsc" : "asc";
            params.set("sortby" , newOrder);
            navigate(`${pathname}?${params}`);
            return newOrder;
        })
    };
    const clearFilters = () => {
        params.delete("category");
        params.delete("sortby");
        params.delete("keyword");
    
        navigate(`${pathname}`);
        setCategory("all");
        setSortOrder("asc");
        setSearchTerm("");
    };
    
    return(
        <div className="flex  lg:flex-row flex-col-reverse lg:justify-between justify-center items-center gap-4">
            {/* search bar */}
            <div className="relative flex items-center 2xl:w-[450px] sm:w-[420px] w-full">
                <input 
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    type="text"
                    placeholder="search products"
                    className="border border-gray-400 text-slate-700 rounded-md py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-2"/>
                <FiSearch  className="absolute left-3 text-slate-800 size={20}"/>
            </div>

            {/* category selection */}
            <div className="flex sm:flex-row flex-col gap-4 items-center">
                <FormControl
                    varient="outlined"
                    size="small">
                        <InputLabel id="category-select-lable">Category</InputLabel>
                        <Select
                            labelId="category-select-lable"
                            value={category}
                            onChange={HandleCategoryChange}
                            label="Category"
                            className="min-w-[120px] text-slate-700 "
                        >
                            <MenuItem value="all">All</MenuItem>
                            {categories.map((item) => (
                                <MenuItem key={item.categoryId} value={item.categoryName}>
                                    {item.categoryName}
                                </MenuItem>
                            ))}
                        </Select>
                </FormControl>

                <Tooltip title={`sorted by price: ${sortOrder}`}>
                    <Button 
                        onClick={toggleSortOrder}
                        variant="contained" 
                        color="primary" 
                        className="flex items-center gap-2 h-10"
                    >
                        sort By
                        {sortOrder === "asc" ? (
                            <FiArrowUp size={20} />
                        ) : (
                            <FiArrowDown size={20} />
                        )}
                    </Button>
                </Tooltip>
                <button onClick={clearFilters} className="flex items-center gap-2 bg-rose-800 hover:bg-rose-900 text-white px-3 py-2 rounded-md transition duration-300 ease-in shadow-md focus:outline-none">
                    <FiRefreshCcw  className="font-semibold"size={16}/>
                    <span className="font-semibold">CLEAR FILTER</span>
                </button>
            </div>
        </div>
    )
}

export default Filter;