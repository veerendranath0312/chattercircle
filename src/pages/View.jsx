import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

function View() {
  const { postId } = useParams()

  return <div>Viewing the post with id {postId}</div>
}

export default View
