import { HashLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black opacity-70'>
      <HashLoader color='#7336d6' size={80} speedMultiplier={1.5} />
    </div>
  );
};

export default Loader;
