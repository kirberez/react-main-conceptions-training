import React, { useState } from 'react';
import './styles/App.css';
import PostList from './components/PostList';
import PostForm from './components/PostForm';

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: "JavaScript", body: "Description" },
    { id: 2, title: "JavaScript 2", body: "Description" },
    { id: 3, title: "JavaScript 3", body: "Description" },
  ]);



  const createNewPost = (post) => {
    setPosts([...posts, {...post, id: Date.now()}])
  }

  const deletePost = (post) => {
    setPosts( posts.filter(p => p.id !== post.id) )
  }


  return (
    <div className="App">
      <PostForm create={createNewPost} />
      {posts.length
        ? <PostList posts={posts} remove={deletePost} title={"Posts list 1"} /> 
        : <h1 style={{ textAlign: 'center' }} >There are no posts here!</h1>
      }
    </div>
  );
}

export default App;
