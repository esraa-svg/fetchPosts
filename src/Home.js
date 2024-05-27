import { useEffect, useState } from "react"
function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            // console.log(data);
            setPosts(data);
          });
      }, []);

    return (

        <div>
      
        {posts.map((post) => (
          <h1>{post.title}</h1>
        ))
        }
      </div>
        
    )
  }
export default Home;