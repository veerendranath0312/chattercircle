import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Form from '../components/Form'
import Button from '../components/Button'
import Notification from '../components/Notification'
import { fetchPostByID, updatePostById } from '../services/postsController'

function Edit() {
  const { postId } = useParams()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    imageUrl: '',
  })
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    const getPost = async () => {
      const data = await fetchPostByID(postId)
      setFormData(data)
    }

    getPost()
  }, [postId])

  const handleFormDataChange = (e) => {
    setFormData((prevFormData) => {
      return { ...prevFormData, [e.target.name]: e.target.value }
    })
  }

  const updatePost = async () => {
    try {
      if (!formData.name) throw new Error('Name is required')

      await updatePostById(postId, formData)

      // Displaying the success notification
      setNotification({
        status: 'success',
        message: 'Updated post successfully!',
      })

      // Hiding it after 4 seconds
      setTimeout(() => {
        setNotification(null)
        navigate(`/posts/${postId}`)
      }, 1000)
    } catch (err) {
      // Displaying the error notification
      setNotification({
        status: 'error',
        message: err.message,
      })

      // Hiding it after 4 seconds and redirecting it to the view page of the post
      setTimeout(() => {
        setNotification(null)
      }, 4000)
    }
  }

  return (
    <div className="form-container fade-in-animation">
      <h2 className="form-title">Edit post</h2>
      <Form formData={formData} handleFormDataChange={handleFormDataChange} />
      <Button onClick={updatePost}>Update Post</Button>
      {notification && <Notification notification={notification} />}
    </div>
  )
}

export default Edit
