import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "flowbite-react";
import OAuth from "../Components/OAuth";
function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("All fields are required .");
    }

    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data =await res.json();
      if (data.success === false) {
        setLoading(false);
        setErrorMessage(data.message);
        return;
      }

      setLoading(false);
      setErrorMessage(null);
      
      if (res.ok) {
        navigate("/sign-in");
      }
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      <div className=" p-3 max-w-lg mx-auto   ">
        <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
        <form
          action=""
          className="flex flex-col gap-4 "
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="username"
            className="border p-3 rounded-lg"
            id="username"
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="email"
            className="border p-3 rounded-lg"
            id="email"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="password"
            className="border p-3 rounded-lg"
            id="password"
            onChange={handleChange}
          />
          <button
            disabled={loading}
            className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
            type="submit"
          >
            {loading ? "loading..." : "Sign Up"}
          </button>
          <OAuth/>
        </form>
        
        <div className="flex gap-2 mt-5 ">
          <p>Have an account ?</p>
          <Link to="/sign-in" className="text-blue-700 ">
            Sign in
          </Link>
        </div>
        {errorMessage && (
            <Alert className="mt-5 text-red-600">
              {errorMessage}
            </Alert>
          )}
      </div>
    </>
  );
}

export default SignUp;
