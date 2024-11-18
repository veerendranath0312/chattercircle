import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import {
  deletePostById,
  fetchPostByID,
  updatePostById,
} from '../services/postsController'
import {
  fetchCommentsByPostId,
  insertComment,
} from '../services/commentsController'
import { timeSince } from '../utils/timeSince'

function View() {
  const { postId } = useParams()
  const navigate = useNavigate()

  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState('')
  const [showCommentField, setShowCommentField] = useState(false)

  // useEffect to fetch the post by id
  useEffect(() => {
    const getPost = async () => {
      const data = await fetchPostByID(postId)
      setPost(data)
    }

    const getCommentsByPostId = async () => {
      const data = await fetchCommentsByPostId(postId)
      setComments(data)
    }

    getPost()
    getCommentsByPostId()
  }, [postId])

  // Increment the likes count when clicked on the Like button
  const incrementLikes = async () => {
    const newPost = { ...post, likes: post.likes + 1 }

    const updatedPost = await updatePostById(postId, newPost)

    setPost(updatedPost)
  }

  // Post a comment when clicking on the Post button
  const postComment = async () => {
    const commentObj = { comment, post_id: postId }
    const data = await insertComment(commentObj)

    if (data) {
      setComments((prevComments) => [data, ...prevComments])
    }

    setComment('')
    setShowCommentField(false)
  }

  const deletePost = async (postId) => {
    const isDeleted = await deletePostById(postId)

    if (isDeleted) {
      navigate('/')
    }
  }

  return (
    <div className="view-container">
      {post && (
        <div className="post fade-in-animation">
          <div to={`/posts/${post.id}`} className="post-info">
            <p className="posted-at">Posted {timeSince(post.created_at)}</p>
            <p className="name">{post.name}</p>
            <p className="description">{post.description}</p>
            {post.imageUrl && (
              <div className="image-container">
                <img src={post.imageUrl} />
              </div>
            )}
            <div className="stats">
              <p className="likes-count">{post.likes} likes</p>
              <p className="comments-count">{comments.length} comments </p>
            </div>
          </div>

          <div className="action-btns">
            <div>
              <Button onClick={incrementLikes} className="icon-btn like-btn">
                <ion-icon name="heart-outline"></ion-icon> Like
              </Button>
              <Button
                className="icon-btn comment-btn"
                onClick={() => setShowCommentField((prev) => !prev)}
              >
                <ion-icon name="chatbox-outline"></ion-icon> Comment
              </Button>
            </div>
            <div>
              <Link to={`/posts/${postId}/edit`} className="icon-btn edit-btn">
                <ion-icon name="create-outline"></ion-icon> Edit
              </Link>
              {/* <button className="icon-btn delete-btn">
                <ion-icon name="trash-outline"></ion-icon> Delete
              </button> */}
              <Button
                className="icon-btn delete-btn"
                onClick={() => deletePost(postId)}
              >
                <ion-icon name="trash-outline"></ion-icon> Delete
              </Button>
            </div>
          </div>

          {showCommentField && (
            <div className="comment-form fade-in-animation">
              <input
                type="text"
                name="comment"
                id="comment"
                placeholder="Share your thoughts..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                autoComplete="off"
              />
              <Button className="btn-post" onClick={postComment}>
                Post
              </Button>
            </div>
          )}

          {comments.length > 0 && (
            <div className="comments-section fade-in-animation">
              <h3>Comments</h3>
              <ul className="comments">
                {comments.map((item) => (
                  <li key={item.id} className="comment">
                    <p className="posted-at">
                      Commented {timeSince(item.created_at)}
                    </p>
                    <p>{item.comment}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default View
