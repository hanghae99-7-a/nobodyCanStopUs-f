import { combineReducers } from 'redux';
import User from './user';
import postReducer from './post';
import Image from './image';
import commentReducer from './comment';

// counter, todo reducer들을 이렇게 합친다.
const rootReducer = combineReducers({
    postReducer,
    commentReducer,

    // 여기에는 새롭게 추가하고싶은 reducer를 가져온다
});

export default rootReducer;
