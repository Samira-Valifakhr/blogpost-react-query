import React, { useState } from 'react';
import { useQuery } from 'react-query';

async function fetchPosts(title) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  return response.json();
}

export default function(post) {
  const [searchTerm, setSearchTerm] = useState('');

  const { data, isError, error, isLoading } = useQuery(
    ['post', post.title],
    () => fetchPosts(post.title)
  );

  return (
    <div>
      <input
        type='text'
        placeholder='search...'
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
      />
      {data &&
        data
          .filter((post) => {
            if (searchTerm == '') {
              return;
            } else if (
              post.title.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return post;
            }
          })
          .map((post, key) => {
            return (
              <div key={key}>
                <p>{post.title}</p>
              </div>
            );
          })}
    </div>
  );
}
