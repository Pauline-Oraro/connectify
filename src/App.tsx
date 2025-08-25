
import { Route, Routes } from "react-router"
import Home from "./pages/Home"
import NavBar from "./components/NavBar"
import CreatePostPage from "./pages/CreatePostPage"
import PostPage from "./pages/PostPage"
import CreateCommunity from "./components/CreateCommunity"

const App = () => {
  return (
    <div className="min-h-screen bg-black text-gray-100 transition-opacity duration-700 pt-20">
      <NavBar />
      <div className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreatePostPage />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/community/create" element={<CreateCommunity />} />
        </Routes>
      </div>
    </div>
  );
}

export default App
