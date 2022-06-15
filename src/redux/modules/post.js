// import 하기
import api from '../../Shared/api';

// import Like from "../../components/Like";
const SET_POST = 'SET_POST';
const SET_BESTPOST = 'SET_BESTPOST';
const SET_MYLIKEPOST = 'SET_MYLIKEPOST';
const SET_MYPOST = 'SET_MYPOST';
const ADD_POST = 'ADD_POST';
const EDIT_POST = 'EDIT_POST';
const LOADING = 'LOADING';
const LIKE_POST = 'LIKE_POST';
const DELETE_POST = 'DELETE_POST';

// load와 add 코드
export const __loadPosts = () => async (dispatch, getState) => {
    const response = await api.get('/posts');
    dispatch(loadPost(response.data));
};
export const __addPost = (payload) => async (dispatch, getState) => {
    const newContent = payload.content.split('\n');
    const request = await api.post('/posts', {
        title: payload.title,
        category: payload.category,
        content: newContent,
        id: payload.id,
    });
    dispatch(addPost(request.data));
};
