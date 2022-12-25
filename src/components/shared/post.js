import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    root: {
        width: '100%',
        margin: '12px 0'
    },
    post: {
      color: 'white !important',
      fontSize: '16px'
    },
    comments: {
        width: '90%',
        marginLeft: '5%'
    }
});


export const Post=({post})=> {
     const classes = useStyles();
    return <div className={classes.root}>
        <Card className={classes.post}>
         {post.message}
    </Card>
       {post.comments.map((comment)=> <div  key={comment.id} className={classes.comments}>
            {comment.message}  
       </div>)}
    </div>
}
