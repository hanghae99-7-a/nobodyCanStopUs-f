// import 하기
import api from '../../Shared/api';
import { deleteCookie, getCookie } from '../../Shared/Cookie';

// import Like from "../../components/Like";
const SET_POST = 'SET_POST'; //
const ADD_POST = 'ADD_POST'; //포스터추가
const EDIT_POST = 'EDIT_POST'; //
const LOAD_POST = 'LOAD_POST'; // 불러오기?
// const LIKE_POST = 'LIKE_POST'; // 좋아요
const DELETE_POST = 'DELETE_POST'; // 삭제

//Call NormalList
const setPost = (payload) => ({ type: SET_POST, payload });
const addPost = (payload) => ({ type: ADD_POST, payload });
const editPost = (payload) => ({ type: EDIT_POST, payload });
const deletepost = (payload) => ({ type: DELETE_POST, payload });
const loadpost = (payload) => ({ type: LOAD_POST, payload });
// const likePost = (payload) => ({ type: LIKE_POST, payload });

const initialState = {
    post_list: [],
    best_list: [],
    my_like_list: [],
    is_loading: false,
};

// load와 add 코드

export const __setPost = (payload) => async (dispatch, getState) => {
    const myToken = getCookie('Authorization');
    try {
        const response = await api.get(
            '/api/post',
            {
                username: username,
                title: title,
                image: image,
                modifiedAt: modifiedAt,
                content: content,
            },
            {
                headers: {
                    Authorization: `Bearer ${myToken}`,
                },
            }
        );
        console.log(response);
        dispatch(setPost(response.data));
    } catch (error) {
        console.log('setpost error');
    }
};

export const __addPost = (payload) => async (dispatch, getState) => {
    const myToken = getCookie('Authorization');

    try {
        alert('소중한 순간이 작성 중입니다! 잠시만 기다려주세요! :)');
        const data = await api.post(
            '/api/post',
            {
                title: payload.title,
                nickname: payload.nickname,
                content: payload.content,
                imageurl: image,
            },
            {
                headers: {
                    Authorization: `Bearer ${myToken}`,
                },
            }
        );
        console.log(data);
        dispatch(addPost(data.data));
    } catch (error) {
        console.log('addpost error');
    }
};

export const __editPost = (payload, index) => async (dispatch, getState) => {
    const myToken = getCookie('Authorization');
    try {
        const data = await api.put(`api/articles/${index}`, payload, {
            headers: {
                Authorization: `Bearer ${myToken}`,
            },
        });
        console.log(data);
        dispatch(editPost(data.data));
    } catch (error) {
        console.log('editPost error');
    }
};

export const __loadpost = (payload) => async (dispatch, getState) => {
    const myToken = getCookie('Authorization');
    try {
        const response = await api.get(`/api/post/show/${payload.text}`, {
            headers: {
                Authorization: `bearer ${myToken}`,
            },
        });
        console.log(response);
        dispatch(loadpost(response.data));
    } catch (error) {
        console.log('loading error');
    }
};

export const __deletepost = (payload) => async (dispatch, getState) => {
    const myToken = deleteCookie('Authorization');
    try {
        const request = await api.delete(`/api/comment/${payload.post_id}`, {
            headers: {
                Authorization: `bearer ${myToken}`,
            },
        });
        console.log(request);
        dispatch(deletepost(request.data));
    } catch (error) {
        console.log('delete error');
    }
};

const postReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_POST:
            return { ...state, list: payload };
        case ADD_POST:
            return { ...state, list: [...state.list, payload] };
        case EDIT_POST:
            const newChangePost = state.list.map((value) => {
                console.log(value.articleId, payload.articleId);
                return value.articleId === Number(payload.articleId) ? payload : state;
            });
            return { ...state, list: newChangePost };
        case LOAD_POST:
            return { ...state, list: payload };
        case DELETE_POST:
            const newDeletePost = state.list.filter((value) => {
                return value.articleId !== Number(payload);
            });
            return { ...state, list: [...newDeletePost] };
        default:
            return state;
    }
};

export default postReducer;
