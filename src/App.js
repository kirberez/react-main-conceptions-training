import React, { useMemo, useState } from 'react';
import './styles/App.css';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import PostFilter from './components/PostFilter';
import MyModal from './components/UI/MyModal/MyModal';
import MyButton from './components/UI/button/MyButton';

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: "JavaScript", body: "b" },
    { id: 2, title: "React", body: "aaa" },
    { id: 3, title: "Python", body: "sss" },
  ]);
  const [filter, setFilter] = useState({ sort: '', query: '' });
  const [modal, setModal] = useState(false);


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
    setModal(false);
  }

  const deletePost = (post) => {
    setPosts( posts.filter(p => p.id !== post.id) )
  }


  return (
    <div className="App">
      <MyButton style={{marginTop: 30}} onClick={() => setModal(true)} >
        Create new..
      </MyButton>
      <MyModal
        visible={modal}
        setVisible={setModal}
      >
        <PostForm create={createPost} />
      </MyModal>
      <hr style={{marginTop: "15px"}} />
      <PostFilter filter={filter} setFilter={setFilter} />
      <PostList posts={sortedAndSearchedPosts} remove={deletePost} title={"Posts list 1"} /> 
    </div>
  );
}

export default App;
