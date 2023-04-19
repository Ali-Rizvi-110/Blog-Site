import React, {useState, useEffect} from 'react'
import Logo from '../images/Logo.svg'
import axios from 'axios'
// const posts = [
//     {
//       id: 1,
//       title: "first title",
//       desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis porro fuga eligendi veritatis repudiandae natus quas illo. Doloribus dolore eveniet ea. Tempora id veniam recusandae voluptas deserunt repellendus dignissimos, numquam debitis modi magni earum nam assumenda unde rerum neque officiis distinctio ipsa nulla similique! Harum qui ipsa fugit explicabo voluptas!",
//       Image: Logo,
//     },
//     {
//       id: 2,
//       title: "second title",
//       desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis porro fuga eligendi veritatis repudiandae natus quas illo. Doloribus dolore eveniet ea. Tempora id veniam recusandae voluptas deserunt repellendus dignissimos, numquam debitis modi magni earum nam assumenda unde rerum neque officiis distinctio ipsa nulla similique! Harum qui ipsa fugit explicabo voluptas!",
//       Image: Logo,
//     },
//     {
//         id: 3,
//         title: "Third title",
//         desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis porro fuga eligendi veritatis repudiandae natus quas illo. Doloribus dolore eveniet ea. Tempora id veniam recusandae voluptas deserunt repellendus dignissimos, numquam debitis modi magni earum nam assumenda unde rerum neque officiis distinctio ipsa nulla similique! Harum qui ipsa fugit explicabo voluptas!",
//         Image: Logo,
//     },
  
//   ];

const Menu = ({cat}) => {

  const [posts, setPosts] = useState([])
  useEffect(()=>{
    const fetchData = async() =>{
      try{
        const res = await axios.get(`/api/posts/?cat=${cat}`)
        setPosts(res.data);
      }catch(err){
        console.log(err)
      }
    }
    fetchData();
  }, [cat])


  return (
    <div className="menu">
        <h1>Other blogs you may like</h1>
        {posts.map((post)=>(
            <div className="post" key = {post.id}>
                <h2>{post.title}</h2>
                <img src={post.img} alt="" />
                <button>Read More</button>
            </div>
        ))}
    </div>
  )
}

export default Menu