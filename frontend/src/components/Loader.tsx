import { MutatingDots } from "react-loader-spinner";

function Loader() {
  return (
    <div className="w-full h-screen bg-[#ffffff27] fixed z-50 flex items-center justify-center">
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

export default Loader;
