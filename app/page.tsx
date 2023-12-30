// pages/page.tsx
"use client";
import { useState, FormEvent } from 'react';
import axios from 'axios';

const Page = () => {
  const [bookName, setBookName] = useState('');
  const [whyLiked, setWhyLiked] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/book-suggestions', {
        bookName,
        whyLiked,
      });
      setSuggestions(response.data.suggestions);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  return (
    <div className="container mx-auto mt-8" style={{ backgroundImage: `url('/books.jpg')`, backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <div className="w-full max-w-lg mx-auto p-6">
        <div className="bg-gray-200 rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold mb-4">Book Suggestions</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="bookName" className="block font-semibold mb-1">Book Name:</label>
              <input
                type="text"
                id="bookName"
                value={bookName}
                onChange={(e) => setBookName(e.target.value)}
                className="border p-2 rounded w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="whyLiked" className="block font-semibold mb-1">Why You Like It:</label>
              <textarea
                id="whyLiked"
                value={whyLiked}
                onChange={(e) => setWhyLiked(e.target.value)}
                className="border p-2 rounded w-full"
                required
              ></textarea>
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Get Suggestions
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
