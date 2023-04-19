import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { AuthContext } from '../context/authContext.jsx';
import Menu from './Menu.jsx';
import Logo from '../images/logo.svg';
import Edit from '../images/edit.png';
import Delete from '../images/delete.jpeg';

const Single = () => {
  const { currentUser } = useContext(AuthContext);
  const [post, setPost] = useState({});
  const location = useLocation();
  const postId = location.pathname.split('/')[2];
  const navigate = useNavigate();

  const handleDelete = async () => {
    try{
      await axios.delete(`/api/posts/${postId}`)
      navigate("/");
    }catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/posts/${postId}`);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  const getText = (html) => {
    const data = new DOMParser().parseFromString(html, "text/html")
    return data.body.textContent
  }

  return (
    <div className='single'>
      <div className='content'>
        <img src={post.img ? post.img : Logo} alt='' />
        <div className='user'>
          {post.userImg && <img src={post.userImg} alt='' /> }
          {currentUser === post.username && (
            <div className='info'>
              <span>{post.username}</span>
              <p>Posted {moment(post.date).fromNow()}</p>
            </div>
          )}
          <div className='edit'>
            {/* {console.log(post)} */}
            <Link to={`/write?edit=${postId}`} state={post}>
              <img src={Edit} alt='' />
            </Link>
            <img onClick={handleDelete} src={Delete} alt='' />
          </div>
        </div>
        <h1>{post.title}</h1>
        <p>{getText(post.desc)}</p>
      </div>
      { post.category && <Menu cat = {post.category} /> }
    </div>
  );
};

export default Single;
