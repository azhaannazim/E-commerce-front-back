import { ThreeCircles } from "react-loader-spinner"

const Loader = ({text}) => {
    return(
        <div className="flex justify-center items-center w-full h-[450px]">
            <div className="flex flex-col items-center gap-1">
                <ThreeCircles
                    className="flex justify-center items-center"
                    visible={true}
                    height="100"
                    width="100"
                    color="#87CEEB"
                    ariaLabel="three-circles-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    />
                <p className="text-slate-600">
                    {text ? text : "Please Wait...."}
                </p>
            </div>
        </div>
    )
}
export default Loader;