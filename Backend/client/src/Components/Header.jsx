import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    /*window.location.search is a property in web browsers that returns the query string portion of the current URL.
The window.location object provides information about the current URL and allows you to navigate to a new URL. The search property specifically returns the query string, which is the part of the URL that comes after the ? character and contains key-value pairs of parameters.*/
    const urlParams = new URLSearchParams(window.location.search);
    //the 'searchTerm' is the searchTerm is the key or parameter name that you want to set or update in the query string.
    urlParams.set("searchTerm", searchTerm);
    //in the below code we convert the params to string format
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  //If you simply type location.search in the browser's console or in a JavaScript file, it will return the query string portion of the current URL, including the leading ? character.
  //For example, if the current URL in the browser is https://example.com/search?query=javascript&filter=popular, then location.search would return the following string:
  //"?query=javascript&filter=popular"
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <>
      <header className="bg-slate-200 shadow-md ">
        <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
          <Link to="/">
            <h1 className="font-bold text-sm sm:text-xl flex flex-wrap ">
              <span className="text-slate-500 ">Rohit's</span>
              <span className="text-slate-700">Estate</span>
            </h1>
          </Link>
          <form
            onSubmit={handleSubmit}
            className="bg-slate-100 flex items-center  p-3 rounded-lg  "
          >
            <input
              type="text"
              placeholder="Search... "
              className="bg-transparent focus:outline-none w-24 sm:w-64  "
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button>
              <FaSearch className="text-slate-600  " />
            </button>
          </form>
          <ul className="flex gap-4 ">
            <Link to="/">
              <li className="hidden sm:inline text-slate-700 hover:underline cursor-pointer">
                Home
              </li>
            </Link>
            <Link to="/about">
              <li className="hidden sm:inline text-slate-700 hover:underline cursor-pointer">
                About
              </li>
            </Link>
            <Link to="/profile">
              {currentUser ? (
                <img
                  className="rounded-full h-7 w-7 object-cover "
                  src={currentUser.avatar}
                  alt="profilePicture"
                />
              ) : (
                <li className="text-slate-700 hover:underline cursor-pointer">
                  Sign in
                </li>
              )}
            </Link>
          </ul>
        </div>
      </header>
    </>
  );
}

export default Header;
