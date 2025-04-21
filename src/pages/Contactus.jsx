import React, { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import axios from "axios";
import { toast } from "react-toastify";
import {jwtDecode} from 'jwt-decode';

const Contactus = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [showConfirm, setShowConfirm] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAdmin, setIsAdmin] = useState(false);
  const pageSize = 5;

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const confirmAndSubmit = () => setShowConfirm(true);

  const submitForm = async () => {
    const payload = {
      id: 0,
      userName: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      createdDate: new Date().toISOString(),
    };

    try {
      await axios.post("https://localhost:7237/api/ContactUs", payload);
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setShowConfirm(false);
      fetchContacts();
    } catch (error) {
      toast.error("Failed to send message.");
    }
  };

  const fetchContacts = async () => {
    try {
      const res = await axios.get("https://localhost:7237/api/ContactUs");
      setContacts(res.data.$values || []);
    } catch {
      toast.error("Unable to fetch contact messages.");
    }
  };

  const filteredData = contacts
    .filter(item =>
      item.userName.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => (sortAsc ? a.id - b.id : b.id - a.id));

  const paginated = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.Role === "Admin") {
          setIsAdmin(true);
        }
      } catch (err) {
        console.error("Invalid token:", err);
      }
    }

    fetchContacts();
  }, []);

  return (
    <div className="p-6 space-y-10 font-title3">
      {/* Contact Form + Image */}
      <div className="flex flex-col lg:flex-row items-center gap-10 justify-center">
        {/* Form Section */}
        <div className="max-w-xl w-full bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-3xl font-bold mb-6 text-green-800 text-center">Get in Touch</h2>
          <form onSubmit={(e) => { e.preventDefault(); confirmAndSubmit(); }} className="space-y-5">
            {["name", "email", "subject"].map(field => (
              <div key={field}>
                <label htmlFor={field} className="block font-medium text-gray-700 mb-1 capitalize">{field}</label>
                <input
                  type={field === "email" ? "email" : "text"}
                  id={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                />
              </div>
            ))}
            <div>
              <label htmlFor="message" className="block font-medium text-gray-700 mb-1">Message</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Image Section */}
        <div className="w-full max-w-md">
          <img
            src="/images/customer support.png"
            alt="Customer Support"
            className="w-full h-auto object-cover rounded-2xl shadow-xl transition-transform duration-300 hover:scale-105"
          />
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirm} onClose={() => setShowConfirm(false)} className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen p-4">
          <Dialog.Panel className="bg-white rounded-xl p-6 max-w-sm shadow-lg space-y-4">
            <Dialog.Title className="text-lg font-bold">Confirm Send</Dialog.Title>
            <p>Are you sure you want to send this message?</p>
            <div className="flex justify-end space-x-2">
              <button onClick={() => setShowConfirm(false)} className="px-4 py-2 border rounded-md">Cancel</button>
              <button onClick={submitForm} className="px-4 py-2 bg-green-600 text-white rounded-md">Send</button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Admin Table Grid */}
      {isAdmin && (
        <div className="bg-white p-4 rounded-xl shadow-md overflow-auto max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-3">
            <input
              type="text"
              placeholder="Search by name/email"
              className="border px-3 py-1 rounded-md w-64"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              onClick={() => setSortAsc(!sortAsc)}
              className="px-3 py-1 bg-green-500 text-white rounded-md"
            >
              Sort by ID {sortAsc ? "↑" : "↓"}
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 text-sm text-left">
              <thead className="bg-green-100 text-green-800 font-semibold">
                <tr>
                  <th className="p-2 border">ID</th>
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Email</th>
                  <th className="p-2 border">Subject</th>
                  <th className="p-2 border">Message</th>
                  <th className="p-2 border">Date</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map(item => (
                  <tr key={item.id} className="hover:bg-green-50">
                    <td className="p-2 border">{item.id}</td>
                    <td className="p-2 border">{item.userName}</td>
                    <td className="p-2 border break-all">{item.email}</td>
                    <td className="p-2 border break-words">{item.subject}</td>
                    <td className="p-2 border break-words">{item.message}</td>
                    <td className="p-2 border">{new Date(item.createdDate).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-4 space-x-2">
            {Array.from({ length: Math.ceil(filteredData.length / pageSize) }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded ${currentPage === i + 1 ? "bg-green-600 text-white" : "bg-gray-200"}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Contactus;
