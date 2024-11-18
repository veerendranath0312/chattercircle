import { useState, useEffect } from 'react'
import supabase from '../services/client'
import Form from '../components/Form'
import Button from '../components/Button'
import Notification from '../components/Notification'

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

  const createPost = async (fromData) => {
    try {
      if (!formData.name) throw new Error('Name is required')
      await supabase.from('posts').insert([formData])
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
    <div className="form-container">
      <h2 className="form-title">Create a post</h2>
      <Form formData={formData} handleFormDataChange={handleFormDataChange} />
      <Button onClick={createPost}>Create Post</Button>
      {notification && <Notification notification={notification} />}
    </div>
  )
}

export default Create
