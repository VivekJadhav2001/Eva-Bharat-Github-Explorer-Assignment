# GitHub Explorer

A lightweight, React-based web application to search GitHub users and explore their public repositories. Built with **React 19** and **Vite**, it provides a seamless search experience using the GitHub REST API without requiring a backend.

---

## 🚀 Features
* **Live Debounced Search:** Prevents API rate-limiting by waiting 400ms after the last keystroke.
* **Repository Insights:** View stars, forks, and primary languages for any user.
* **Advanced Filtering:** Sort repositories by stars/forks and filter by programming language.
* **Persistent Bookmarks:** Save favorite repositories to `localStorage` to keep them across sessions.
* **Pagination:** Efficiently browse repositories with server-side pagination (5 per page).

---

## 🛠️ Tech Stack
* **Frontend:** React 19, Vite 8, Tailwind CSS 4
* **Routing:** React Router DOM 7
* **Icons:** React Icons 5
* **API:** GitHub REST API

---

## 📂 Project Structure
```text
src/
├── components/   # UI Components (Navbar, Search, Repo List)
├── hooks/        # Custom logic (useDebounce, useGitHubUsers)
├── pages/        # Search and Repo Pages
├── services/     # API logic (github.js)
└── constants.js  # Shared data (language lists)
```

---

## ⚙️ Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd github-explorer
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run Development Server:**
    ```bash
    npm run dev
    ```
    Access the app at `http://localhost:5173`.

4.  **Build for Production:**
    ```bash
    npm run build
    ```

---

## 📝 API Rate Limits
The GitHub public API allows **60 requests per hour** per IP. If you encounter a `403 Forbidden` error, you have reached the limit. To increase this, you can add a Personal Access Token (PAT) to the headers in `src/services/github.js`.

---

## 📜 Available Scripts
| Script | Description |
| :--- | :--- |
| `npm run dev` | Starts Vite dev server with HMR |
| `npm run build` | Bundles the app for production |
| `npm run lint` | Runs ESLint to check for code quality |