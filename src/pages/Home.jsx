import { useState, useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import Post from '../components/Post'
import { fetchPosts } from '../services/postsController'

function Home() {
  const { searchStr } = useOutletContext()
  const [posts, setPosts] = useState([])
  const [sortBy, setSortBy] = useState('')

  useEffect(() => {
    const getPosts = async () => {
      const data = await fetchPosts()
      setPosts(data)
    }

    getPosts()
  }, [])

  const sortedPosts = [...posts].sort((a, b) => {
    if (sortBy === 'created_at') {
      return new Date(b.created_at) - new Date(a.created_at)
    } else if (sortBy === 'likes') {
      return b.likes - a.likes
    } else {
      // Default sorting logic if no valid sortBy is provided
      return 0 // Keeps the original order
    }
  })

  const filteredPosts = searchStr
    ? sortedPosts.filter((post) =>
        post.name.toLowerCase().includes(searchStr.toLowerCase())
      )
    : sortedPosts

  return (
    <div className="home-feed">
      <div className="home-feed-header">
        <h2>All Posts</h2>
        <div>
          <select
            name="sort-by"
            id="sort-by"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="created_at">Recency</option>
            <option value="likes">Most likes</option>
          </select>
        </div>
      </div>
      {posts && filteredPosts.map((post) => <Post key={post.id} post={post} />)}
    </div>
  )
}

export default Home

// NOTE: Update HOME Page
// --> Move the select to the left
// --> Initially when there are no posts display a message in the dotted box
