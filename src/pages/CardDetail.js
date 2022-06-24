import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

const CardDetail = (props) => {
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const post_list = useSelector((state) => state.post.post_list);
    const user_id = localStorage.getItem('user');
    console.log(user_id);

    const id = params.id;
    console.log(id);
    let idx = post_list.findIndex((a) => parseInt(a.postId) === parseInt(id)); //data 내 key 값 찾기 (=idx)
    const post = post_list[idx];
    console.log(post);

    const deletePost = () => {
        dispatch(deletePost(id));
    };

    return (
        <Container>
            {post && (
                <div className="detail-wrap">
                    <h3 className="detail-title">{post.title}</h3>
                    <div className="detail-title-sub">
                        <div className="detail-sub-info">
                            <div className="detail-writer">
                                <span>by.</span>
                                <span>{post.nickname}</span>
                            </div>
                            <div className="detail-date">
                                {post.createdAt.slice(2, 10)} {post.createdAt.slice(11, 16)}
                            </div>
                        </div>
                    </div>
                    <div className="detail-image">
                        <img src={post.imageUrl} alt="" />
                    </div>
                    <div className="detail-contents">{post.content}</div>
                    <div className="detail-hot">
                        <div className="comment-count">댓글 수 {post.commentCount}개 </div>
                    </div>
                </div>
            )}

            <CommentWrite post_id={id} />
            <CommentList post_id={id} />
        </Container>
    );
};

const Container = styled.div`
    padding: 3rem 14rem;
    transition: 0.3s;
    .detail-wrap {
        margin-bottom: 4rem;
        .detail-btn-group {
            display: flex;
            justify-content: flex-end;
        }
        .detail-title {
            margin-bottom: 2rem;
            font-size: 3.2rem;
            font-weight: 700;
        }
        .detail-title-sub {
            margin-bottom: 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            .detail-sub-info {
                display: flex;
                align-items: center;
                color: rgba(0, 0, 0, 0.44);
                .detail-writer {
                    display: flex;
                    align-items: center;
                    span {
                        &:first-child {
                            margin-right: 0.6rem;
                            font-size: 1.2rem;
                        }
                    }
                    &:after {
                        content: '';
                        margin: 0 1rem;
                        display: block;
                        width: 1px;
                        height: 1.6rem;
                        background-color: rgba(0, 0, 0, 0.44);
                    }
                }
            }
        }
        .detail-image {
            margin-bottom: 2rem;
        }
        .detail-contents {
            padding: 1.4rem;
            min-height: 20rem;
            border: 1px solid #e2e2e2;
            border-radius: 0.5rem;
        }
        .detail-hot {
            margin: 1rem 0 2rem 0;
            display: flex;
            justify-content: flex-start;
            align-items: center;
        }

        .comment-count {
            margin-left: 1rem;
        }
    }
    @media screen and (max-width: 1280px) {
        padding: 3rem 4rem;
        width: 100%;
        transition: 0.3s;
    }
`;

export default CardDetail;
