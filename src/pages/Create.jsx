import { useState } from 'react'
import Form from '../components/Form'
import Button from '../components/Button'
import Notification from '../components/Notification'
import { insertPost } from '../services/postsController'

function Create() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    imageUrl: '',
  })
  const [notification, setNotification] = useState(null)

  const handleFormDataChange = (e) => {
    setFormData((prevFormData) => {
      return { ...prevFormData, [e.target.name]: e.target.value }
    })
  }

  const createPost = async () => {
    try {
      if (!formData.name) throw new Error('Name is required')

      await insertPost(formData)

      setFormData({
        name: '',
        description: '',
        imageUrl: '',
      })

      // Displaying the success notification
      setNotification({
        status: 'success',
        message: 'Created post successfully!',
      })

      // Hiding it after 4 seconds
      setTimeout(() => {
        setNotification(null)
      }, 4000)
    } catch (err) {
      // Displaying the error notification
      setNotification({
        status: 'error',
        message: err.message,
      })

      // Hiding it after 4 seconds
      setTimeout(() => {
        setNotification(null)
      }, 4000)
    }
  }

  return (
    <div className="form-container fade-in-animation">
      <h2 className="form-title">Create a post</h2>
      <Form formData={formData} handleFormDataChange={handleFormDataChange} />
      <Button onClick={createPost}>Create Post</Button>
      {notification && <Notification notification={notification} />}
    </div>
  )
}

export default Create
