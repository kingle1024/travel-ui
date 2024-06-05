import React from 'react';
import { CommentProps } from "../common/Types";
import { formatDate } from '../common/Utility';

const CommentList: React.FC<CommentProps> = ({comments}) => {    

    return (
        <div>
            <h2>여행톡</h2>
            <ul>
                {comments.map(comment => (
                    <li key={comment.id}>
                        {comment.content}<br/>
                        <small>{comment.author} | {formatDate(comment.insertDts)}</small>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CommentList;
