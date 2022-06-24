import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CardList from '../components/CardList';

import HomeSubBanner from '../components/HomeSubBanner';
import { __setPost } from '../redux/modules/post';

const Home = (props) => {
    const dispatch = useDispatch();
    const post_list = useSelector((state) => state.post.post_list);

    useEffect(() => {
        dispatch(__setPost());
    }, []);

    return (
        <div>
            <HomeSubBanner />
            <CardList post_list={post_list} />
        </div>
    );
};



export default Home;
