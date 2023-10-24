import React from 'react';
import MyInput from './UI/input/MyInput';
import MySelect from './UI/select/MySelect';


const PostFilter = ({ filter, setFilter }) => {



  return (
    <div>
      <MyInput 
        value={filter.query}
        placeholder="Search..."
        onChange={e => setFilter({...filter, query: e.target.value})}
      />
      <MySelect 
        defaultValue={"Sort "}
        value={filter.sort}
        onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
        options={[
          {value: "title", name: "by name" },
          {value: "body", name: "by description" },
        ]}
      />
    </div>
  );
};

export default PostFilter;