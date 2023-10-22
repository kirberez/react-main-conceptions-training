import React from 'react';
import MyButton from './UI/button/MyButton';

const PostItem = ({ post, remove }) => {


  return (
    <div className="post">
      <div className="post__content">
        <strong>{post.title}</strong>
        <div>
          {post.body}
        </div>
      </div>
      <div className="post__btn">
        <MyButton onClick={() => remove(post)} >
          Delete
        </MyButton>
      </div>
    </div>
  );
};

export default PostItem;