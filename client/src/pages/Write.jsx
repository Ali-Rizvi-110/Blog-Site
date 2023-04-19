import React from 'react'
import { useState } from 'react';
import ReactQuill from 'react-quill';
import axios from 'axios'
import 'react-quill/dist/quill.snow.css';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import Logo from '../images/logo1.svg'

const Write = () => {

  const state = useLocation().state;
  const [value, setValue] = useState(state?.desc || "");
  const [title, setTitle] = useState(state?.title || "");
  const [img, setImg] = useState(state?.img || "");
  const [cat, setCat] = useState(state?.category || "");
  const [showImgInput, setShowImgInput] = useState(false)
  // const upload = async ()=>{
  //   try{
  //     const formData = new FormData();
  //     formData.append("file", file);
  //     console.log(formData)
  //     const res = await axios.post("/api/upload/", formData)
  //     return res.data;
  //   }catch(err){
  //     console.log(err);
  //   }
  // }
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      // console.log(state.id)
      state ? await axios.put(`/api/posts/${state.id}`, {
        title, desc: value, cat, img: img==""? Logo : img,
      }): await axios.post(`/api/posts/`, {
        title, desc: value, cat, img: img==""? Logo : img, date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
      })
      if(state)
        navigate(`/single/${state.id}`)
      else navigate(`/`)
    }catch(err){
      console.log(err)
    }

  }

  return (
    <div className="add">
      <div className="content">
        {/* { state.title? <h1>{state.title}</h1> : <h1>Your Title</h1> } */}
        <input type="text" value={title} placeholder='Enter you Title' onChange={e=>setTitle(e.target.value)} />
        <div className="editorContainer">
          <ReactQuill className='editor' theme="snow" value={value} onChange={setValue} />
        </div>
      </div>
        <div className="menu">
          <div className="item">
            <h1>Publish</h1>
            <span>
              <b>Status: </b> Draft
            </span>
            <span>
              <b>Visibility: </b> Public
            </span>
            {/* <input style={{display: "none"}} type="file" id = "file" onChange={e=>setFile(e.target.files[0])} /> */}
            <label onClick={()=>setShowImgInput(true)} className='file' htmlFor="file">Enter Image Link</label>
            { showImgInput &&  <input type="text" value={img} id = "file" placeholder='Enter image link' onChange={e=>setImg(e.target.value)} /> }
            <div className="buttons">
              <button>Save as a Draft</button>
              <button onClick={handleSubmit} >Publish</button>
            </div>
          </div>
          <div className="item">
            <h2>Category</h2>
            <div className="cat">
              <input type="radio" checked = {cat === "art"} name="btn" value = "art" id="art" onChange={e=>setCat(e.target.value)} />
              <label htmlFor="art">Art</label>
            </div>
            <div className="cat">
              <input type="radio" checked = {cat === "science"} name="btn" value = "science" id="science" onChange={e=>setCat(e.target.value)} />
              <label htmlFor="science">Science</label>
            </div>
            <div className="cat">
              <input type="radio" checked = {cat === "math"} name="btn" value = "math" id="math" onChange={e=>setCat(e.target.value)} />
              <label htmlFor="math">Math</label>
            </div>
            <div className="cat">
              <input type="radio" checked = {cat === "technology"} name="btn" value = "technology" id="technology" onChange={e=>setCat(e.target.value)} />
              <label htmlFor="technology">Technology</label>
            </div>
            <div className="cat">
              <input type="radio" checked = {cat === "food"} name="btn" value = "food" id="food" onChange={e=>setCat(e.target.value)} />
              <label htmlFor="food">Food</label>
            </div>
            <div className="cat">
              <input type="radio" checked = {cat === "design"} name="btn" value = "design" id="design" onChange={e=>setCat(e.target.value)} />
              <label htmlFor="design">Design</label>
            </div>
            <div className="cat">
              <input type="radio" checked = {cat === "cinema"} name="btn" value = "cinema" id="cinema" onChange={e=>setCat(e.target.value)} />
              <label htmlFor="Cinema">Cinema</label>
            </div>
            <div className="cat">
              <input type="radio" checked = {cat === "programming "} name="btn" value = "programming" id="programming" onChange={e=>setCat(e.target.value)} />
              <label htmlFor="programming">Programming</label>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Write