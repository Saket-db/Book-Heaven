import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { GoHeartFill } from "react-icons/go";
import { GrLanguage } from "react-icons/gr";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Loader from "./Loader";

const ViewBookDetails = () => {
  const { id } = useParams();
  const role = useSelector((state) => state.auth.role);
  const navigate = useNavigate();
  
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const userId = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchBook = async () => {
      try {
        const res = await axios.get(`http://localhost:1000/api/v1/get-book-by-id/${id}`);
        setBook(res.data.data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  const headers = {
    bookid: id,
    id: userId,
    authorization: `Bearer ${token}`,
  };

  const handleApiRequest = async (url, method = "put") => {
    try {
      const response = await axios[method](url, {}, { headers });
      alert(response.data.message);
    } catch (error) {
      console.error("API request failed:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  if (loading) return <Loader />;

  return book ? (
    <div className="bg-zinc-900 px-12 py-8 flex flex-col lg:flex-row gap-8 h-auto">
      <div className="w-full lg:w-3/6">
        <div className="flex flex-col md:flex-row items-start justify-around bg-zinc-800 rounded px-4 py-8 gap-4">
          <img src={book.url} alt="book" className="h-[50vh] md:h-[70vh] rounded" />
          
          {userId && (
            <div className="w-full md:w-auto flex flex-row md:flex-col justify-between md:justify-start items-center mt-4 md:mt-0">
              {role !== "admin" ? (
                <>
                  <button 
                    className="bg-white p-3 rounded md:rounded-full text-2xl font-semibold hover:bg-zinc-200 transition-all duration-300 flex items-center"
                    onClick={() => handleApiRequest("http://localhost:1000/api/v1/add-to-favourite")}
                  >
                    <GoHeartFill />
                  </button>
                  <button 
                    className="mt-0 md:mt-8 bg-blue-500 text-white p-3 rounded md:rounded-full text-2xl font-semibold flex items-center hover:bg-blue-600 transition-all duration-300"
                    onClick={() => handleApiRequest("http://localhost:1000/api/v1/add-to-cart")}
                  >
                    <FaCartShopping className="me-4 md:me-0" /> 
                    <span className="block md:hidden">Add to cart</span>
                  </button>
                </>
              ) : (
                <>
                  <Link to={`/update-book/${id}`} className="bg-white p-3 rounded md:rounded-full text-2xl font-semibold hover:bg-zinc-200 transition-all duration-300 flex items-center">
                    <FaRegEdit />
                  </Link>
                  <button 
                    className="mt-0 md:mt-8 bg-red-500 text-white p-3 rounded md:rounded-full text-2xl font-semibold flex items-center hover:bg-red-600 transition-all duration-300"
                    onClick={async () => {
                      await handleApiRequest("http://localhost:1000/api/v1/delete-book", "delete");
                      navigate("/all-books");
                    }}
                  >
                    <MdDelete className="me-4 md:me-0" />
                    <span className="block md:hidden">Delete book</span>
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="w-full lg:w-3/6 my-8">
        <h1 className="text-4xl text-zinc-300 font-semibold">{book.title}</h1>
        <p className="text-zinc-400 mt-1">by {book.author}</p>
        <p className="text-zinc-500 mt-4 text-xl">{book.desc}</p>
        <p className="flex mt-4 items-center justify-start text-zinc-400">
          <GrLanguage className="me-3" /> {book.language}
        </p>
        <p className="mt-4 text-zinc-100 text-3xl font-semibold">
          Price : ₹ {book.price}
        </p>
      </div>
    </div>
  ) : (
    <p className="text-white text-center text-xl">Book not found.</p>
  );
};

export default ViewBookDetails;
