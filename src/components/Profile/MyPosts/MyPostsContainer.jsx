import MyPosts from './MyPosts'
import { addPost } from '../../../redux/profileReducer'
import { connect } from 'react-redux'
import { getPosts } from '../../../redux/selectors/selectors'

const mapStateToProps = (state) => ({
  data: getPosts(state),
})

const MyPostsContainer = connect(mapStateToProps, { addPost })(MyPosts)

export default MyPostsContainer
