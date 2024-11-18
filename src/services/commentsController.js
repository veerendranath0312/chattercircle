import supabase from './client'

export const fetchCommentsByPostId = async (postId) => {
  try {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', postId)
      .order('created_at', { ascending: false })

    if (error) throw new Error(error)
    return data
  } catch (error) {
    console.log(`💥 Error: ${error.message}`)
    return null
  }
}

export const insertComment = async (commentObj) => {
  try {
    const { data, error } = await supabase
      .from('comments')
      .insert([commentObj])
      .select('*')

    if (error) throw new Error(error)
    return data[0]
  } catch (error) {
    console.log(`💥 Error: ${error.message}`)
    return null
  }
}

export const deleteCommentById = async (postId) => {
  try {
    await supabase.from('comments').delete().eq('post_id', postId)
    return true
  } catch (error) {
    console.log(`💥 Error: ${error.message}`)
  }
}
