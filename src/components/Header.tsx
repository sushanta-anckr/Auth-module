import { Link } from "react-router-dom";
import store from "../app/store";
import { logoutUser } from "../features/users/userSlice";

const Header = () => {
 

    const handleLogout = async()=>{

     store.dispatch(logoutUser())
    }
    return (
        <header className="bg-gray-800 text-white shadow-md">
          <div className="container mx-auto flex justify-between items-center p-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold">Authentication</h1>
            </div>
            <nav>
            <ul className="flex space-x-4">
            <li>
              <Link to="/" className="hover:text-gray-300">Home</Link>
            </li>
            <li>
              <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>
            </li>
            <li>
              <Link to="/notification" className="hover:text-gray-300">Notification</Link>
            </li>
            <li>
              <Link to="/image-picker" className="hover:text-gray-300">Image_Picker</Link>
            </li>
            <li>
              <Link to="/payment" className="hover:text-gray-300">Payment</Link>
            </li>
            <li>
            <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
            </nav>
          </div>
        </header>
      );
    };
export default Header