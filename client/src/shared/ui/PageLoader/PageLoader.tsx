import { Loader } from "../Loader/Loader"

export const PageLoader = () => {
  return (
    <div className="z-[1000] fixed top-0 left-0 w-full h-full bg-white flex justify-center items-center">
      <Loader className="!w-[100px] !h-[100px]"/>
    </div>
  )
}
