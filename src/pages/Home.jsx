import { useState, useEffect } from 'react'
import supabase from '../services/client'
import Post from '../components/Post'

function Home() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const getPosts = async () => {
      const { data, error } = await supabase.from('posts').select('*')

      if (error) {
        console.log(error.message)
        return
      }

      setPosts(data)
    }

    getPosts()
  }, [])

  return (
    <div className="home-feed">
      {posts && posts.map((post) => <Post key={post.id} post={post} />)}
    </div>
  )
}

export default Home
