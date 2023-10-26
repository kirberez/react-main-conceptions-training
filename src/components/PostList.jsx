import React from 'react';
import PostItem from './PostItem';

const PostList = ({ posts, remove, title }) => {
  if (!posts.length) return (
    <h1 style={{ textAlign: 'center' }} >There are no posts here!</h1>
  )

  return (
    <div>
      <h1 style={{textAlign: "center"}}>
        Список постов
      </h1>
      {posts.map(post => 
        <PostItem key={post.id} post={post} remove={remove} />  
      )}
    </div>
  );
};

export default PostList;