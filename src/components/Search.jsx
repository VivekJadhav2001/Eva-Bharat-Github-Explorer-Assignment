import React, { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { useGitHubUsers } from "../hooks/useGitHubUsers";
import { useNavigate } from "react-router-dom";

function Search() {
  const [query, setQuery] = useState("");
  const { users, loading, error } = useGitHubUsers(query);

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto pt-16 px-4">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center mb-8 flex items-center justify-center gap-3">
          <FaGithub className="text-4xl" />
          GitHub Explorer
        </h1>

        {/* Search Box */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search GitHub users..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
          />

          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-3 text-gray-400 hover:text-black"
            >
              ✕
            </button>
          )}
        </div>

        {/* States */}
        {loading && (
          <p className="text-center text-gray-500 mt-6 animate-pulse">
            Searching users...
          </p>
        )}

        {error && (
          <p className="text-center text-red-500 mt-6">Something went wrong</p>
        )}

        {/* Users List */}
        <ul className="mt-4 flex flex-col gap-4">
          {users.map((user) => (
            <li
              key={user.id}
              onClick={() => navigate(`/user/${user.login}`)}
              className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <img
                  src={user.avatar_url}
                  alt={user.login}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-semibold">{user.login}</p>
                  <p className="text-xs text-gray-500">View Profile</p>
                </div>
              </div>

              <span className="text-sm text-gray-400">→</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Search;
