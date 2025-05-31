/**
 * AdminMessagesPage component displays and manages user messages in the admin dashboard.
 *
 * Features:
 * - Fetches messages from the backend API on mount.
 * - Displays a loading indicator while fetching.
 * - Renders a list of messages with sender details and message content.
 * - Allows admin to delete individual messages.
 * - Shows appropriate notifications on fetch or delete errors.
 *
 * Context:
 * - Uses `AdminContext` for backend URL and authentication token.
 *
 * UI:
 * - Responsive, scrollable container with styled message cards.
 * - Includes icons for user, email, and message.
 * - Displays message creation date.
 *
 * @component
 * @returns {JSX.Element} The rendered admin messages page.
 */

import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Trash2, Mail, MailOpen, User, Loader2 } from 'lucide-react';
import { AdminContext } from '../context/admincontext';
const AdminMessagesPage = () => {
  const { backendurl,token } = useContext(AdminContext);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
     const res = await axios.get(`${backendurl}/api/message`, {
          headers: { token },
        });
        setMessages(res.data.messages);
    } catch (err) {
      toast.error('Failed to fetch messages.');
      console.log(err)
    } finally {
      setLoading(false);
    }
  };

  const deleteMessage = async (id) => {
  //  if (!window.confirm('Delete this message?')) return;
    try {
      await axios.delete(`${backendurl}/api/message/${id}`,{
          headers: { token },
        });
      setMessages(messages.filter((msg) => msg._id !== id));
      toast.success('Message deleted.');
    } catch (err) {
      toast.error('Failed to delete message.');
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <>
      <head>
        <title>Admin Messages | Dashboard</title>
        <meta name="description" content="View and manage user messages in the admin dashboard." />
      </head>
      <div className="p-6 bg-white rounded-xl shadow space-y-6 text-sm h-[100vh] overflow-y-scroll">
     

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="animate-spin text-blue-500" size={28} />
        </div>
      ) : messages.length === 0 ? (
        <div className="text-center text-gray-500">No messages yet.</div>
      ) : (
        <div className="grid gap-4">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 relative hover:shadow-md transition"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-gray-700 font-medium">
                    <User size={18} className="text-blue-500" />
                    {msg.name}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail size={16} className="text-green-500" />
                    {msg.email}
                  </div>
                  <div className="flex items-start gap-2 text-gray-600">
                    <MailOpen size={16} className="text-purple-500 mt-1" />
                    <span className="whitespace-pre-line">{msg.message}</span>
                  </div>
                </div>
                <button
                  onClick={() => deleteMessage(msg._id)}
                  className="text-red-500 hover:text-red-700"
                  title="Delete Message"
                >
                  <Trash2 size={20} />
                </button>
              </div>

              <div className="text-xs text-gray-400 text-right mt-2">
                {new Date(msg.createdAt).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
      </div>
    </>
  );
};

export default AdminMessagesPage;
