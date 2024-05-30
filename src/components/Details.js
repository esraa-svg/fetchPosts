import {useParams} from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Home.css';
function Details() {
    // Extract the post ID from the URL parameters
    const {id} = useParams();
    // State to hold the post data
    const [post,setPost] = useState({});
    // State to hold the comments data
    const [comments, setComments] = useState([]);
    // State to handle loading state
    const [loading, setLoading] = useState(true);
    // State to handle any errors during data fetching
    const [error, setError] = useState(null);


// Effect to fetch post and comments data when the component mounts or the ID changes
    useEffect(() => {
        async function fetchData() {
            try {
                // Fetch post data from API using the post ID
                const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
                const postData = await postResponse.json();
                setPost(postData);
// Fetch comments for the post from API
                const commentsResponse = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`);
                const commentsData = await commentsResponse.json();
                setComments(commentsData);

                setLoading(false);// Set loading to false after data is fetched
            } catch (error) {
                setError('Error fetching data');// Set error state if there's an error
                setLoading(false);
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, [id]);// Re-run the effect if the ID changes

// Show loading message if data is being fetched
    if (loading) return <div>Loading...</div>;
    // Show error message if there was an error fetching data
    if (error) return <div>{error}</div>;
    // Render the post and comments

    return (
        <div>
            <h1 className='postTitle'>{ post.title || 'Post not found'}</h1>
            <h3 className='commentsHeader'>Comments Section</h3>
            {comments.map(comment => (
                <div key={comment.id} className='comment'>
                       <h5 className='editTitle'>{comment.name}</h5>
                       <h6 className='commentBody'>{comment.email}</h6>
                        <p className='commentBody'>{comment.body}</p>
                </div>
            ))
            }
       
        </div>
    )
}
export default Details;