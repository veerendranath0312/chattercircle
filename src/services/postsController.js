import supabase from './client'
import { deleteCommentById } from './commentsController'

export const fetchPosts = async () => {
  try {
    const { data } = await supabase.from('posts').select()
    return data
  } catch (error) {
    console.log(`💥 Error: ${error.message}`)
    return []
  }
}

export const insertPost = async (post) => {
  try {
    await supabase.from('posts').insert([post])
  } catch (error) {
    console.log(`💥 Error: ${error.message}`)
  }
}

export const fetchPostByID = async (postId) => {
  try {
    const { data } = await supabase.from('posts').select('*').eq('id', postId)

    return data[0]
  } catch (error) {
    console.log(`💥 Error: ${error.message}`)
    return null
  }
}

export const updatePostById = async (postId, post) => {
  try {
    const { data } = await supabase
      .from('posts')
      .update(post)
      .eq('id', Number(postId))
      .select()
    return data[0]
  } catch (error) {
    console.log(`💥 Error: ${error.message}`)
  }
}

export const deletePostById = async (postId) => {
  try {
    const isCommentsDeleted = await deleteCommentById(postId)
    if (isCommentsDeleted) {
      await supabase.from('posts').delete().eq('id', postId)
      return true
    }
    return false
  } catch (error) {
    console.log(`💥 Error: ${error.message}`)
    return false
  }
}
