import React, { useEffect, useState } from "react";
import BookCard from "../components/Books/BookCard";
import axios from "axios";
import Loader from "./Loader";

const AllBooks = () => {
  const [Books, setBooks] = useState();

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:1000/api/v1/get-all-books"
      );
      setBooks(response.data.data);
    };
    fetch();
  }, []);

  return (
    <>
      {!Books && <Loader />}
      {Books && (
        <div className="h-auto px-12 py-8 bg-gradient-to-r from-gray-900 to-black">
          <h1 className="text-center text-4xl font-bold text-white mb-8">
            Explore Our Collection 📚
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {Books.map((items, i) => (
              <div
                key={i}
                className="transform transition duration-300 hover:scale-105 hover:shadow-2xl p-4 bg-gray-800 rounded-xl shadow-lg"
              >
                <BookCard
                  bookid={items._id}
                  image={items.url}
                  title={items.title}
                  author={items.author}
                  price={items.price}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default AllBooks;
