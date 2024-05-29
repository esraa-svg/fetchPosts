import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import './Home.css'
function Home() {
    const [posts, setPosts] = useState([]);
    const [inputText, setInputText] = useState("");
    const navigate = useNavigate();
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

  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };
  const filteredData = posts.filter((el) => {
    //if no input the return the original
    if (inputText === '') {
        return el;
    }
    //return the item which contains the user input
    else {
        return el.title.toLowerCase().includes(inputText)
    }
})

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="container">
            <div className="input-container">
                <input
                id="outlined-basic"
                onChange={inputHandler}
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
            }}>
              <div className="item-info">
              <h2>{post.title}</h2>
              <p>{post.body}</p>
              <h6>{post.comments.length} Commented on This Post Tab To Know More</h6>
                </div>
            </div>
          ))}
        </div>
      </div>
    
        </div>
    );
}
export default Home;