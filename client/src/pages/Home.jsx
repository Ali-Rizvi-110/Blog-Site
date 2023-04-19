import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import Logo from '../images/logo.svg'
import axios from "axios"
// const posts = [
//   {
//     id: 1,
//     title: "first title",
//     desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis porro fuga eligendi veritatis repudiandae natus quas illo. Doloribus dolore eveniet ea. Tempora id veniam recusandae voluptas deserunt repellendus dignissimos, numquam debitis modi magni earum nam assumenda unde rerum neque officiis distinctio ipsa nulla similique! Harum qui ipsa fugit explicabo voluptas!",
//     Image: Logo,
//   },
//   {
//     id: 2,
//     title: "second title",
//     desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis porro fuga eligendi veritatis repudiandae natus quas illo. Doloribus dolore eveniet ea. Tempora id veniam recusandae voluptas deserunt repellendus dignissimos, numquam debitis modi magni earum nam assumenda unde rerum neque officiis distinctio ipsa nulla similique! Harum qui ipsa fugit explicabo voluptas!",
//   }

// ];


function Home() {

  const [posts, setPosts] = useState([])
  const location = useLocation();
  // console.log(location)
  const cat = location.search;
  

  useEffect(()=>{
    const fetchData = async() =>{
      try{
        const res = await axios.get(`api/posts/${cat}`)
        setPosts(res.data);
      }catch(err){
        console.log(err)
      }
    }
    fetchData();
  }, [cat])

  const getText = (html) => {
    const data = new DOMParser().parseFromString(html, "text/html")
    return data.body.textContent
  }

  return (
    <div className="home">
      <div className="posts">
        {posts.map((post)=>(
          <div className="post" key={post.id} >
            <div className="img">
              <img src={post.img} alt="" />
            </div>
            <div className="content">
              <Link className='link' to={`/single/${post.id}`}><h1>{post.title}</h1></Link>
              <p>{getText(post.desc)}</p>
              <Link className='link' to={`/single/${post.id}`}><button>Read More</button></Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home