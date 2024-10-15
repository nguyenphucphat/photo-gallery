import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bg-orange-400 text-white shadow-md py-4 px-10 z-50 mb-6">
      <div className="flex items-center justify-center">
        <Link to="/photos" className="">
          <h1 className="text-2xl font-bold">Photo Gallery</h1>
        </Link>
      </div>
    </div>
  );
};

export default Header;
