import React, { useEffect, useMemo, useState } from 'react';
import './styles/App.css';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import PostFilter from './components/PostFilter';
import MyModal from './components/UI/MyModal/MyModal';
import MyButton from './components/UI/button/MyButton';
import { usePosts } from './hooks/usePosts';
import PostService from './API/PostService';
import { Loader } from './components/UI/Loader/Loader';


function App() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: '', query: '' });
  const [modal, setModal] = useState(false);
  const [isPostsLoading, setIsPostsLoading] = useState(false);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  useEffect(() => {
    fetchPosts();
  }, []);

  const createPost = (post) => {
    setPosts([...posts, {...post, id: Date.now()}])
    setModal(false);
  };

  async function fetchPosts() {
    setIsPostsLoading(true);
    setTimeout(async () => {
      const posts = await PostService.getAll();
      setPosts(posts);
      setIsPostsLoading(false);
    }, 5000)
  } 


  const deletePost = (post) => {
    setPosts( posts.filter(p => p.id !== post.id) )
  }


  return (
    <div className="App">
      <button onClick={fetchPosts} >Get Posts!</button>
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
      {isPostsLoading
        ? <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}} ><Loader /></div> 
        : <PostList posts={sortedAndSearchedPosts} remove={deletePost} title={"Posts list 1"} /> 
      } 
    </div>
  );
}

export default App;
