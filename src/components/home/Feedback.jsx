import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toastr from 'toastr';
import {jwtDecode} from 'jwt-decode';
import 'toastr/build/toastr.min.css';

const Feedback = () => {
  const [feedback, setFeedback] = useState('');
  const [feedbacks, setFeedbacks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('desc');
  const [isAdmin, setIsAdmin] = useState(false);

  const itemsPerPage = 5;

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setIsAdmin(decoded.Role === 'Admin');
      } catch (err) {
        console.error('Invalid token', err);
      }
    }

    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get('https://localhost:7237/api/FeedBacks');
      const data = response.data?.$values || [];
      setFeedbacks(data);
    } catch (error) {
      toastr.error('Failed to load feedbacks');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!feedback.trim()) return toastr.warning('Please enter some feedback.');

    if (window.confirm('Are you sure you want to submit this feedback?')) {
      try {
        await axios.post(`https://localhost:7237/api/FeedBacks?feedBack=${encodeURIComponent(feedback)}`);
        toastr.success('Feedback submitted!');
        setFeedback('');
        fetchFeedbacks();
      } catch (error) {
        toastr.error('Failed to submit feedback');
      }
    }
  };

  const sortedFeedbacks = [...feedbacks].sort((a, b) => {
    return sortOrder === 'asc' ? a.id - b.id : b.id - a.id;
  });

  const totalPages = Math.ceil(sortedFeedbacks.length / itemsPerPage);
  const paginatedFeedbacks = sortedFeedbacks.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  return (
    <div className="max-w-3xl mx-auto mt-5 font-title">
      {/* Feedback Form */}
      <div className="p-6 bg-green-50 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-bold mb-4 text-green-800">Any Feedback?</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full p-3 mb-4 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            rows="4"
            placeholder="Please enter your feedback here..."
          />
          <button
            type="submit"
            className="w-full bg-[#4CAF50] hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
          >
            Submit Feedback
          </button>
        </form>
      </div>

      {/* Admin Feedback List */}
      {isAdmin && (
        <div className="p-6 bg-white rounded-lg shadow-md max-h-80 overflow-y-auto">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-xl font-semibold text-gray-700">Previous Feedback</h3>
            <button
              onClick={toggleSortOrder}
              className="text-sm text-blue-600 underline hover:text-blue-800"
            >
              Sort by ID: {sortOrder === 'asc' ? 'Ascending ↑' : 'Descending ↓'}
            </button>
          </div>
          {paginatedFeedbacks.length > 0 ? (
            paginatedFeedbacks.map((fb) => (
              <div
                key={fb.id}
                className="border-b border-gray-200 py-2 text-gray-800"
              >
                <p><strong>#{fb.id}</strong>: {fb.messagae}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No feedback available.</p>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-4 space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
              >
                Previous
              </button>
              <span className="text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Feedback;
