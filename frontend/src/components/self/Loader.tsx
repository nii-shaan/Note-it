import { MutatingDots } from "react-loader-spinner";
import { useAppSelector } from "@/hooks/ReduxHooks";

function Loader() {
  const loadingState = useAppSelector((state) => state.loader.loadingState);

  if (!loadingState) {
    return <></>;
  } else {
    return (
      <div className="w-full h-screen bg-[#ffffff27]/[.05] fixed z-50 flex items-center justify-center ">
        <MutatingDots
          visible={true}
          height="100"
          width="100"
          color="#4fa94d"
          secondaryColor="#4fa94d"
          radius="12.5"
          ariaLabel="mutating-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }
}

export default Loader;
