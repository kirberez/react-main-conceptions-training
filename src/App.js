import React, { useMemo, useState } from 'react';
import './styles/App.css';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import PostFilter from './components/PostFilter';

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: "JavaScript", body: "b" },
    { id: 2, title: "React", body: "aaa" },
    { id: 3, title: "Python", body: "sss" },
  ]);
  const [filter, setFilter] = useState({ sort: '', query: '' });


  const sortedPosts = useMemo(() => {
    if (filter.sort) {
      return [...posts].sort( (a, b) => a[filter.sort].localeCompare(b[filter.sort]) );
    }
    return posts;
  }, [filter.sort, posts]);

  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query.toLowerCase()))
  }, [sortedPosts, filter.query]);

  const createPost = (post) => {
    setPosts([...posts, {...post, id: Date.now()}])
  }

  const deletePost = (post) => {
    setPosts( posts.filter(p => p.id !== post.id) )
  }


  return (
    <div className="App">
      <PostForm create={createPost} />
      <hr style={{marginTop: "15px"}} />
      <PostFilter filter={filter} setFilter={setFilter} />
      {sortedAndSearchedPosts.length
        ? <PostList posts={sortedAndSearchedPosts} remove={deletePost} title={"Posts list 1"} /> 
        : <h1 style={{ textAlign: 'center' }} >There are no posts here!</h1>
      }
    </div>
  );
}

export default App;
