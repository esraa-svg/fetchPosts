import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts');
                const postsData = await postsResponse.json();

                const postsWithComments = await Promise.all(
                    postsData.map(async (post) => {
                        const commentsResponse = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${post.id}`);
                        const commentsData = await commentsResponse.json();
                        return { ...post, comments: commentsData };
                    })
                );

                setPosts(postsWithComments);
                setLoading(false);
            } catch (error) {
                setError('Error fetching data');
                setLoading(false);
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            {posts.map(post => (
                <div key={post.id}>
                    <Link to='/details' state={post}>{post.title}</Link>
                    
                    
                </div>
            ))}
        </div>
    );
}
export default Home;