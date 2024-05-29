import {useParams} from 'react-router-dom';
import { useState, useEffect } from 'react';

function Details() {
    const {id} = useParams();
    const [post,setPost] = useState({})
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);



    useEffect(() => {
        async function fetchData() {
            try {
                const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
                const postData = await postResponse.json();
                setPost(postData);

                const commentsResponse = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`);
                const commentsData = await commentsResponse.json();
                setComments(commentsData);

                setLoading(false);
            } catch (error) {
                setError('Error fetching data');
                setLoading(false);
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, [id]);


    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    return (
        <div>
            <h1>{post.title}</h1>
            <h2>Comments Section</h2>
            {comments.map(comment => (
                <div key={comment.id}>
                    <h6 >{comment.body}</h6>
                    
                    
                </div>
            ))}
       
        </div>
    )
}
export default Details;