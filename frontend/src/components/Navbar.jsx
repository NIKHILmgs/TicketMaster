import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="flex justify-between items-center px-4 py-3 bg-gray-900 text-white">
      <div className="text-xl font-bold">My App</div>
      <ul className="flex">
        <li className="ml-4">
          <Link className="hover:text-gray-400" to="/">
            Search
          </Link>
        </li>
        <li className="ml-4">
          <Link className="hover:text-gray-400" to="/Favourites">
            Favorites
          </Link>
        </li>
      </ul>
    </div>
  );
}
