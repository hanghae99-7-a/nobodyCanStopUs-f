import { combineReducers } from 'redux';
import User from './user';
import Post from './post';
import Image from './image';
import Comment from './comment';

// counter, todo reducer들을 이렇게 합친다.
const rootReducer = combineReducers({
    user: User,
    post: Post,
    image: Image,
    comment: Comment,
    // 여기에는 새롭게 추가하고싶은 reducer를 가져온다
});

export default rootReducer;
