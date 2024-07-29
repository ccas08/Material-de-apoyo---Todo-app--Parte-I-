import React from "react";

export const Posts = ({ posts, removePost, updatePostLikes }) => {
  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} className="post">
          <h2>{post.titulo}</h2>
          <img src={post.img} alt={post.titulo} />
          <p>{post.descripcion}</p>
          <p>Likes: {post.likes}</p>
          <button onClick={() => updatePostLikes(post.id)}>Like</button>
          <button onClick={() => removePost(post.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};
