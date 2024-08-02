'use client';

import {useState, useEffect } from 'react'
import EventCard from './EventCard';

const EventCardList = ({data, handleTagClick}) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <EventCard
        key={post._id}
        post={post}
        handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async() => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      
      setPosts(data);
    }

    fetchPosts();
  }, []);

  return (
    <section className='feed'>
      <h1 className='text-left head_text -mt-8 text-left'>
        <span className='text-left'>Recent Posts...
      </span>
      <hr></hr>
      </h1>
      <EventCardList
        data={posts}
        handleTagClick={() => {}}
      />
    </section>
  )
}

export default Feed