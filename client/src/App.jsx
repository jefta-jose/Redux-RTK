import PostsList from './features/posts/PostLists'
import CreatePost from './features/posts/CreatePost'
import './App.css'
import UpdatePost from './features/posts/UpdatePost'

function App() {

  return (
    <>
      <CreatePost />
      <PostsList />
      <UpdatePost />
    </>
  )
}

export default App
