import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import "./App.css";

const MusicLibrary = React.lazy(() => import("remoteApp/MusicLibrary"));
import "./App.css";

function App() {
  //const { count, increment } = useSharedState();
  const { user, login, logout } = useAuth();
  return (
    <>
      <div className="antialiased bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 min-h-screen flex flex-col pb-4">
        <header>
          <nav className="flex items-center justify-between w-full py-4 md:py-0 px-4 text-lg text-gray-700 bg-white h-16">
            <div className="flex items-center">
              <Link
                to="/"
                className="mr-4 text-blue-500 font-bold hover:text-blue-700 cursor-pointer"
              >
                Home
              </Link>
            </div>
            <div className="flex items-center">
              {user ? (
                <>
                  <Link
                    to="/library"
                    className="mr-4 text-blue-500 font-bold hover:text-blue-700 cursor-pointer"
                  >
                    Music Library
                  </Link>
                  <button
                    onClick={logout}
                    className="mr-4 text-blue-500 font-bold hover:text-blue-700 cursor-pointer"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => login({ role: "user" })}
                    className="mr-4 text-blue-500 font-bold hover:text-blue-700 cursor-pointer"
                  >
                    Login as User
                  </button>
                  <button
                    onClick={() => login({ role: "admin" })}
                    className="mr-4 text-blue-500 font-bold hover:text-blue-700 cursor-pointer"
                  >
                    Login as Admin
                  </button>
                </>
              )}
            </div>
          </nav>
        </header>

        <div className="flex-grow flex justify-center items-center px-4">
          <Routes>
            <Route
              path="/"
              element={
                <div className="w-full max-w-2xl bg-white rounded-lg my-16 p-8 md:p-16">
                  <h1 className="text-4xl font-medium text-center p-20">
                    Welcome to Music Library
                  </h1>
                </div>
              }
            />
            <Route
              path="/library"
              element={
                <React.Suspense
                  fallback={
                    <div className="flex items-center justify-center h-full">
                      <div className="w-12 h-12 border-4 border-gray-500 border-dashed rounded-full animate-spin"></div>
                    </div>
                  }
                >
                  <MusicLibrary userRole={user?.role} />
                </React.Suspense>
              }
            />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
