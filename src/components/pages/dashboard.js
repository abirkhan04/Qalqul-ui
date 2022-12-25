import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import Card  from '@material-ui/core/Card';
import { getPosts } from '../../actions/posts-action';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Post } from '../shared/post';

const useStyles = makeStyles({
    wrapper: {
        width: '80%',
        margin: 'auto',
        // marginBottom: '6px'
    },
});

const Dashboard = () => {
   const dispatch = useDispatch();
   const {posts} = useSelector((state)=> state.postReducers);

   useEffect(()=> {
     dispatch(getPosts());
    // eslint-disable-next-line react-hooks/exhaustive-deps 
   }, []);

   const classes = useStyles();
    return (<>
        <div className={classes.wrapper}>
           {posts.map((post)=> <Post key={post.id} post={post}/>)}
        </div>
        </>)
}

export default Dashboard;
