import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserRepos } from "../services/github";
import { FaCodeFork } from "react-icons/fa6";
import { IoStarSharp } from "react-icons/io5";
import { CiBookmark } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa";
import { languages } from "../constants";

function UserRepos() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("");
  const [filter, setFilter] = useState("");
  
  //Lazy Intializing the state to get bookmarks from local Strorage to avoid expensive cal
  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem("bookMarkRepos");
    return saved ? JSON.parse(saved) : {};
  });
  
  const [page, setPage] = useState(1);
  const perPage = 5;

  const { username } = useParams();

  //Get User Repo's
  async function fetchRepos() {
    setLoading(true);
    setError(null);
    try {
      if (!username || !username.trim()) {
        throw new Error("username is required!!!");
      }
      const data = await getUserRepos(username, page, perPage);

      if (!data) {
        setRepos([]);
        return;
      }

      setRepos(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  //Move To Next Page
  function next() {
    setPage((prev) => prev + 1);
  }

  //Move To Previous Page
  function handlePrev() {
    if (page === 1) {
      return;
    }

    setPage((prev) => prev - 1);
  }

  //Sort Repo's By Options
  function handleSort(e) {
    setSortBy(e.target.value);
  }

  //Function to apply Language Filter
  function handleFilter(e) {
    setFilter(e.target.value);
  }

  //Change the order of Repo's based on sort, filter
  const processedRepos = useMemo(() => {
    return [...repos]
      .filter((repo) => {
        if (!filter) return true;
        return repo.language === filter;
      })
      .sort((a, b) => {
        if (sortBy === "stars") {
          return b.stargazers_count - a.stargazers_count;
        }
        if (sortBy === "forks") {
          return b.forks_count - a.forks_count;
        }
        return 0;
      });
  }, [repos, sortBy, filter]);

  //Add or Remove bookmark
  function toggleBookmark(id) {
    setBookmarks((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  //Set the key value pair in the loaclStorage for bookMarks
  useEffect(() => {
    localStorage.setItem("bookMarkRepos", JSON.stringify(bookmarks));
  }, [bookmarks]);

  //On page change or userName change get repective repos of the selected User
  useEffect(() => {
    fetchRepos();
  }, [username, page]);

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      {/* Header */}
      <h1 className="text-2xl font-semibold mb-6">{username}'s Repositories</h1>

      {loading && <p className="text-center">Loading repos...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}
      {!loading && repos.length === 0 && (
        <p className="text-center text-gray-400">No repositories found</p>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <select
          className="border px-3 py-2 rounded-md text-sm"
          onChange={handleSort}
        >
          <option value="">Sort By</option>
          <option value="stars">Stars</option>
          <option value="forks">Forks</option>
        </select>

        <select
          className="border px-3 py-2 rounded-md text-sm"
          onChange={handleFilter}
        >
          {languages.map((op) => (
            <option value={op.value} key={op.label}>
              {op.label}
            </option>
          ))}
        </select>
      </div>

      {/* Repo List */}
      <div className="flex flex-col gap-4">
        {/* Repo's */}
        {processedRepos.map((repo) => (
          <div
            key={repo.id}
            className="border rounded-xl p-5 hover:shadow-md transition bg-white"
          >
            {/* Top Section */}
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-semibold text-blue-600 hover:underline cursor-pointer">
                  <a href={repo.html_url} target="_blank" rel="noreferrer">
                    {repo.name}
                  </a>
                </h2>

                <p className="text-sm text-gray-600 mt-1">
                  {repo.description || "No description provided"}
                </p>
              </div>

              {/* Right side */}
              <div className="flex items-center gap-3">
                {/* Language */}
                {repo.language && (
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded-md">
                    {repo.language}
                  </span>
                )}

                {/* Bookmark */}
                <button onClick={() => toggleBookmark(repo.id)}>
                  {bookmarks[repo.id] ? (
                    <FaBookmark className="text-blue-500 text-lg" />
                  ) : (
                    <CiBookmark className="text-lg" />
                  )}
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 text-sm text-gray-500 mt-4">
              <span>
                <IoStarSharp /> {repo.stargazers_count}
              </span>
              <span className="flex flex-col items-center justify-center">
                <FaCodeFork /> {repo.forks_count}
              </span>
              <span>👀 {repo.watchers_count}</span>
            </div>

            {/* Bottom Section */}
            <div className="flex justify-between items-center mt-4 text-xs text-gray-400">
              <span>
                Updated: {new Date(repo.updated_at).toLocaleDateString()}
              </span>

              {repo.homepage && (
                <a
                  href={repo.homepage}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Live Demo 🚀
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-3 mt-8">
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className="px-4 py-2 border rounded-md text-sm disabled:opacity-50"
        >
          Prev
        </button>

        <span className="px-4 py-2 text-sm">Page {page}</span>

        <button
          onClick={next}
          disabled={repos.length < perPage}
          className="px-4 py-2 border rounded-md text-sm disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default UserRepos;
