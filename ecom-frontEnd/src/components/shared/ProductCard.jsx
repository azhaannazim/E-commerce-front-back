import { useState } from "react"
import { FaShoppingCart } from "react-icons/fa";
import ProductViewModal from "../shared/ProductViewModal";
import { TruncateText } from "../../utils/TruncateText";
import About from "../About";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/action";
import toast from "react-hot-toast";

const ProductCard = (props) => {
    const { productId,productName,image,description
        ,quantity,price,discount,specialPrice} = props

    const[openProductViewModal , setOpenProductViewModal] = useState(false);
    const[selectedViewProduct , setSelectedViewProduct] = useState("");
    const btnLoader = false;
    const isAvailable = quantity && Number(quantity) > 0;
    const dispatch = useDispatch();

    const handleProductView = (product) => {    
        setSelectedViewProduct(product);
        setOpenProductViewModal(true);
    };
    const addToCartHandler = (cartItems) => {
        dispatch(addToCart(cartItems , 1 ,toast));
    }

    return(
        <div className="border rounded-lg shadow-xl overflow-hidden transition-shadow duration-300">
            <div onClick={() => {
                handleProductView({
                    id : productId,productName,image,description
                    ,quantity,price,discount,specialPrice
                })
            }} className="w-full overflow-hidden aspect-[3/2]">
                <img className="w-full h-full cursor-pointer transition-transform duration-300 transform hover:scale-105"
                src={image} alt={productName}>
                </img>
            </div>
            <div className="p-4" >
                <h2 onClick={() => {
                handleProductView({
                    id : productId,productName,image,description
                    ,quantity,price,discount,specialPrice
                })
            }} className="test-lg font-semibold mb-2 cursor-pointer">
                    {TruncateText(productName , 20)}
                </h2>
                <div className="min-h-20 max-h-20">
                    <p className="text-gray-500 text-sm">{TruncateText(description)}</p>
                </div>

                <div className="flex item-center justify-between">
                {specialPrice ? (
                    <div className="flex flex-col">
                        <span className="text-gray-400 line-through">
                            ${Number(price).toFixed(2)}
                        </span>
                        <span className="text-xl font-bold text-slate-700">
                            ${Number(specialPrice).toFixed(2)}
                        </span>
                    </div>
                    
                ) : (
                    <div>
                        <span className="text-xl font-bold text-slate-700">
                            {"  "}
                            ${Number(price).toFixed(2)}
                        </span>
                    </div>
                )}
                <button 
                    disabled = {!isAvailable || btnLoader}
                    onClick={() => addToCartHandler({
                        productId,productName,image,description
                        ,quantity,price,discount,specialPrice
                    })}
                    className={`bg-blue-500 ${isAvailable ? "opacity-100 hover:bg-blue-600" : "opacity-70"}
                    text-white py-2 px-3 rounded-lg items-center transition-colors duration-300 flex w-36 justify-center`}>
                    <FaShoppingCart className="mr-2"/>
                    {isAvailable ? "Add to Cart" : "Out of stock"}
                </button>
                </div>
                
            </div>
            <ProductViewModal 
                open={openProductViewModal}
                setOpen={setOpenProductViewModal}
                product={selectedViewProduct}
                isAvailable={isAvailable}
            />
        </div>
    )
}

export default ProductCard