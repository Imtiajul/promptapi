'use client'

import { useState, useEffect } from 'react'
import PromptCard from './PromptCard'


//PromptCard Component
const PromptCardList = ({ data, handleTagClick }) => {

  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState([])
  const [searchTimeout, setSearchTimeout] = useState(null)
  const [searchResult, setSearchResult] = useState([])

  const filteredPosts = (text) => {
    const regex = new RegExp(text, "i");

    return posts.filter(
      (post) =>
      regex.test(post.prompt) ||
      regex.test(post.creator.useername) ||
      regex.test(post.tag)
    );
  }
  

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
       const searchResult = filteredPosts(e.target.value);
       setSearchResult(searchResult);
      }, 500)
    );
  }

  const handleTagClick = (tag) => {
    console.log(tag);
    const regex = new RegExp(tag, 'i');

    const filterdTagPosts = posts.filter(post => regex.test(post.tag));
    
    setSearchResult(filterdTagPosts);
  }

  useEffect(() => {
    (async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();

      setPosts(data);
    })();
  }, [])

  return (
    <article className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList
        data={searchResult.length? searchResult:posts}
        handleTagClick={handleTagClick}
      />
    </article>
  )
}
export default Feed;
