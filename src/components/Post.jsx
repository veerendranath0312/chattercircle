import { Link } from 'react-router-dom'
import { timeSince } from '../utils/timeSince'

function Post({ post }) {
  return (
    <div className="post fade-in-animation">
      <Link to={`/posts/${post.id}`} className="post-info">
        <p className="posted-at">Posted {timeSince(post.created_at)}</p>
        <p className="name">{post.name}</p>
        <p className="likes-count">{post.likes} likes</p>
      </Link>
    </div>
  )
}

export default Post
