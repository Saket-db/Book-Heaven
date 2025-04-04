import axios from "axios";
import React, { useEffect, useState } from "react";
import BookCard from "../components/Books/BookCard";
import Loader from "./Loader";

const Favourite = () => {
  const [FavBooks, setFavBooks] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const headers = {
          id: localStorage.getItem("id"),
          authorization: `Bearer ${localStorage.getItem("token")}`,
        };

        const res = await axios.get(
          "http://localhost:1000/api/v1/get-favourite-books",
          { headers }
        );

        setFavBooks(res.data.data);
      } catch (err) {
        setError("Failed to fetch favourite books.");
        console.error("Error fetching favourites:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavourites();
  }, []); // ✅ Added dependency array to prevent infinite API calls

  if (loading) return <Loader />;
  if (error) return <p className="text-red-500 text-center mt-8">{error}</p>;

  return (
    <div className="min-h-[80vh] p-4 text-zinc-100">
      {FavBooks?.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center">
          <h1 className="text-5xl font-semibold text-zinc-500 mb-8">
            No favourite book
          </h1>
          <img src="./star.png" alt="No Favourites" className="h-[20vh] mb-8" />
        </div>
      ) : (
        <>
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            Favourite Books
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {FavBooks?.map((item) => (
              <BookCard
                key={item._id}
                bookid={item._id}
                image={item.url}
                title={item.title}
                author={item.author}
                price={item.price}
                fav={true}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Favourite;
