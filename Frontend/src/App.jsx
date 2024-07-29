import { useEffect, useState } from "react";
import PostForm from "./components/PostForm";
import { Posts } from "./components/Posts";

const App = () => {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const response = await fetch("http://localhost:3000/posts");
    const posts = await response.json();
    setPosts(posts);
  };

  useEffect(() => {
    getPosts();
  }, []);

  const addPost = async (titulo, img, descripcion) => {
    const response = await fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ titulo, img, descripcion, likes: 0 }),
    });
    const post = await response.json();
    setPosts([...posts, post]);
  };

  const removePost = async (id) => {
    const response = await fetch(`http://localhost:3000/posts/${id}`, {
      method: "DELETE",
    });
    if (response.status !== 200) {
      return alert("Something went wrong");
    }
    setPosts(posts.filter((post) => post.id !== id));
  };

  const updatePostLikes = async (id) => {
    const post = posts.find((post) => post.id === id);
    const updatedPost = { ...post, likes: post.likes + 1 };

    const response = await fetch(`http://localhost:3000/posts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedPost),
    });

    if (response.status !== 200) {
      return alert("Something went wrong");
    }

    setPosts(
      posts.map((post) => (post.id === id ? updatedPost : post))
    );
  };

  return (
    <div className="container">
      <h1 className="">Like Me App</h1>
      <PostForm addPost={addPost} />
      <Posts posts={posts} removePost={removePost} updatePostLikes={updatePostLikes} />
    </div>
  );
};

export default App;
