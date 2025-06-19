import { FormControl, InputLabel, Select, MenuItem, Tooltip, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { FiArrowDown, FiArrowUp, FiRefreshCcw, FiSearch } from "react-icons/fi";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const Filter = ({ categories }) => {
    const [searchParams] = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const pathname = useLocation().pathname;
    const navigate = useNavigate();

    const [category, setCategory] = useState("all");
    const [sortOrder, setSortOrder] = useState("asc");
    const [sortBy, setSortBy] = useState("price");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        setCategory(searchParams.get("category") || "all");
        setSortOrder(searchParams.get("sortby") || "asc");
        setSortBy(searchParams.get("sortBy") || "price");
        setSearchTerm(searchParams.get("keyword") || "");
    }, [searchParams.toString()]);

    const handleCategoryChange = (event) => {
        const selectedCategory = event.target.value;
        if (selectedCategory === "all") {
            params.delete("category");
        } else {
            params.set("category", selectedCategory);
        }
        navigate(`${pathname}?${params.toString()}`);
        setCategory(selectedCategory);
    };

    const handleSortByChange = (event) => {
        const selectedSortBy = event.target.value;
        params.set("sortBy", selectedSortBy);
        navigate(`${pathname}?${params.toString()}`);
        setSortBy(selectedSortBy);
    };

    useEffect(() => {
        const handler = setTimeout(() => {
            if (searchTerm) {
                params.set("keyword", searchTerm);
            } else {
                params.delete("keyword");
            }
            navigate(`${pathname}?${params.toString()}`);
        }, 700);
        return () => clearTimeout(handler);
    }, [searchTerm, params.toString(), navigate, pathname]);

    const toggleSortOrder = () => {
        setSortOrder((prevOrder) => {
            const newOrder = prevOrder === "asc" ? "desc" : "asc";
            params.set("sortby", newOrder);
            navigate(`${pathname}?${params.toString()}`);
            return newOrder;
        });
    };

    const clearFilters = () => {
        params.delete("category");
        params.delete("sortBy");
        params.delete("keyword");
        navigate(`${pathname}?${params.toString()}`);
        setCategory("all");
        setSearchTerm("");
    };

    return (
        <div className="flex lg:flex-row flex-col-reverse lg:justify-between justify-center items-center gap-4">
            {/* Search Bar */}
            <div className="relative flex items-center 2xl:w-[450px] sm:w-[420px] w-full">
                <input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    type="text"
                    placeholder="Search products"
                    className="border border-gray-400 text-slate-700 rounded-md py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-2"
                />
                <FiSearch className="absolute left-3 text-slate-800" size={20} />
            </div>

            {/* Filters */}
            <div className="flex sm:flex-row flex-col gap-4 items-center">
                {/* Category Selection */}
                <FormControl variant="outlined" size="small">
                    <InputLabel id="category-select-label">Category</InputLabel>
                    <Select
                        labelId="category-select-label"
                        value={category}
                        onChange={handleCategoryChange}
                        label="Category"
                        className="min-w-[120px] text-slate-700"
                    >
                        <MenuItem value="all">All</MenuItem>
                        {categories.map((item) => (
                            <MenuItem key={item.categoryId} value={item.categoryName}>
                                {item.categoryName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Sort By Selection */}
                <FormControl variant="outlined" size="small">
                    <InputLabel id="sortBy-select-label">Sort By</InputLabel>
                    <Select
                        labelId="sortBy-select-label"
                        value={sortBy}
                        onChange={handleSortByChange}
                        label="Sort By"
                        className="min-w-[120px] text-slate-700"
                    >
                        <MenuItem value="price">Price</MenuItem>
                        <MenuItem value="returns">Returns</MenuItem>
                        <MenuItem value="averageRating">Rating</MenuItem>
                    </Select>
                </FormControl>

                {/* Sort Button */}
                <Tooltip title={`Sorted by ${sortBy}: ${sortOrder}`}>
                    <Button onClick={toggleSortOrder} variant="contained" color="primary" className="flex items-center gap-2 h-10">
                        Sort Order
                        {sortOrder === "asc" ? <FiArrowUp size={20} /> : <FiArrowDown size={20} />}
                    </Button>
                </Tooltip>

                {/* Clear Filters Button */}
                <button
                    onClick={clearFilters}
                    className="flex items-center gap-2 bg-rose-800 hover:bg-rose-900 text-white px-3 py-2 rounded-md transition duration-300 ease-in shadow-md focus:outline-none"
                >
                    <FiRefreshCcw size={16} />
                    <span className="font-semibold">CLEAR FILTER</span>
                </button>
            </div>
        </div>
    );
};

export default Filter;
