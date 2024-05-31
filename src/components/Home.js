import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Home.css';
function Home() {
       // State to hold the list of posts
    const [posts, setPosts] = useState([]);
     // State to hold the input text for filtering posts
    const [inputText, setInputText] = useState(" ");
    // State to handle loading state
    const navigate = useNavigate();
    // State to handle any errors during data fetching
    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);
   

// Effect to fetch posts data when the component mounts
    useEffect(() => {
        async function fetchData() {
            try {
                // Fetch posts from API
                const postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts');
                const postsData = await postsResponse.json();
// Fetch comments for each post and attach to respective post
                const postsWithComments = await Promise.all(
                    postsData.map(async (post) => {
                        const commentsResponse = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${post.id}`);
                        const commentsData = await commentsResponse.json();
                        return { ...post, comments: commentsData };
                    })
                );
// Update state with posts and comments
                setPosts(postsWithComments);
                setLoading(false);
            } catch (error) {
                setError('Error fetching data');// Set error state if there's an error
                setLoading(false); 
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);
// Handler for input text change to filter posts
  let inputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);// Update state with lowercase input text
  };
  // Filter posts based on input text
  const filteredData = posts.filter((el) => {
    if (inputText === '') {
        return el;// Return all posts if input text is empty
    }
   
    else {
        return el.title.toLowerCase().includes(inputText) // Filter posts based on title
    }
})
  
    if (loading) return <div>Loading...</div>;    // Show loading message if data is being fetched

    if (error) return <div>{error}</div>;    // Show error message if there was an error fetching data

  // Render the component
    return (
        <div className="container">
            
            <div className="input-container">
            <h2 className="top">Search</h2>
                <input
                id="outlined-basic"
                onChange={inputHandler}  // Call input handler on input change
                variant="outlined"
                fullWidth
                label="Search"
                type="text"
                
                />
                </div>
                <div className="bg-gray-100">
        <h1 className="top">Posts</h1>
        <div className="container" >
            
          {filteredData.map(post => (
            <div key={post.id} className="item" onClick={() => {
                          navigate(`/${post.id}` , {state: post.id})
         
            }}
            
            >
            
            
              <div className="item-info">
              <h2>{post.title}</h2>
              <p>{post.body}</p>
              <h6>{post.comments.length} Commented on This Post Tab To<br/><span class="know-more">Know More</span></h6>
  
                </div>
            </div>
          ))}
        </div>
          
      </div>
 
      

        </div>
    );
}
export default Home;