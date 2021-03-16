
import {addPostActionCreator} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {AppRootStateType} from "../../../redux/redux-store";
import {connect} from "react-redux";


let mapStateToProps = (state: AppRootStateType) => {
    return  {
        postsData: state.profile.postsData,
        profile: state.profile.profile
    }
}
let mapDispatchToProps = (dispatch: any) => {
    return  {
        addPost: (newPostText: string) => {
            dispatch(addPostActionCreator(newPostText))
        }
    }
}
const MyPostsContainer = connect( mapStateToProps, mapDispatchToProps )( MyPosts )

export default MyPostsContainer;