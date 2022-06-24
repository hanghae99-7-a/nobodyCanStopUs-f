import axios from 'axios';
import api from '../../Shared/api';
import { getCookie } from '../../Shared/Cookie';

// const SET_COMMENT = 'SET_COMMENT'
const ADD_COMMENT = 'ADD_COMMENT';
const EDIT_COMMENT = 'EDIT_COMMENT'; //
const DELETE_COMMENT = 'DELETE_COMMENT';

const addComment = (payload) => ({ type: ADD_COMMENT, payload });
const editComment = (payload) => ({ type: EDIT_COMMENT, payload });
const deleteComment = (payload) => ({ type: DELETE_COMMENT, payload });

const initialState = {
    list: [],
};

export const __addComment = (payload) => async (dispatch, getState) => {
    const myToken = getCookie('Authorization');
    try {
        const data = await api.post(
            `/api/${post_id}/comment`,
            {
                nickname: payload.nickname,
                comment: payload.comment,
            },
            {
                headers: {
                    Authorization: `Bearer ${myToken}`,
                },
            }
        );
        dispatch(addComment(data.data));
    } catch (error) {
        console.log('addComment error');
    }
};

export const __editComment = () => async (dispatch, getState) => {
    const myToken = setCookie('Authorization');
    try {
        const data = await api.delete(`api/post/comment/${id}`, {
            Authorization: `Bearer ${myToken}`,
        });
        dispatch(editComment(data.data));
    } catch (error) {
        console.log('editComment error');
    }
};

export const __deleteComment = () => async (dispatch, getState) => {
    const myToken = deleteCookie('Authorization');
    try {
        const request = await api.delete(`api/post/comment/${id}`, {
            Authorization: `Bearer ${myToken}`,
        });
        dispatch(deleteComment(request.data));
    } catch (error) {
        console.log('deleteComment error');
    }
};

const commentReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ADD_COMMENT:
            return { ...state, list: payload };
        case DELETE_COMMENT:
            const newChangePost = state.list.map((value) => {
                console.log(value.articleId, payload.articleId);
                return value.articleId === Number(payload.articleId) ? payload : value;
            });
            return { ...state, list: newChangePost };
        case EDIT_COMMENT:
            const newChangeComment = state.list.map((value) => {
                console.log(value.articleId, payload.articleId);
                return value.articleId === Number(payload.articleId) ? payload : state;
            });
            return { ...state, list: newChangeComment };
        default:
            return state;
    }
};

export default commentReducer;
