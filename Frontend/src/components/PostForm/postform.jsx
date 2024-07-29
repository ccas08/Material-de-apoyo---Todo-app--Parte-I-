import { useState } from "react";

const PostForm = ({ addPost }) => {
  const [titulo, setTitulo] = useState("");
  const [img, setImg] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addPost(titulo, img, descripcion);
    setTitulo("");
    setImg("");
    setDescripcion("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        placeholder="Title"
        required
      />
      <input
        type="text"
        value={img}
        onChange={(e) => setImg(e.target.value)}
        placeholder="Image URL"
        required
      />
      <input
        type="text"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        placeholder="Description"
        required
      />
      <button type="submit">Create Post</button>
    </form>
  );
};

export default PostForm;
