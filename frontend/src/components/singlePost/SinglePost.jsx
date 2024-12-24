import { Link } from "react-router-dom";
import { useContext, useEffect , useState } from "react";
import { useLocation } from "react-router-dom";
import "./singlePost.css";
import axios from "axios";
import { Context } from "../../context/Context";

export default function SinglePost() {
  const location = useLocation();//useLocation is a hook from react-router-dom that gives us the location of the current page
 // console.log(location);//{pathname: "/post/60f3b3b3b3b3b3b3b3b3b3b3", search: "", hash: "", state: undefined, key: "5v3z9v"}
 // now we will fetch id and based on that we will fetch the post from the backend
 const path = location.pathname.split("/")[2];//splitting the pathname by / and taking the second element from the array which is the id of the post
 const [post, setPost] = useState({});
//  const PF = "http://localhost:5000/images/";
 const {user} =useContext(Context);
 const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
 
 useEffect(() => {
  const getPost = async () => {
    const res = await axios.get("http://localhost:5000/api/posts/" + path);
    //console.log(res);
    setPost(res.data);
    setTitle(res.data.title);
    setDesc(res.data.desc);
  };
  getPost();
}, [path]);//whenever the path changes, fire the useEffect

const handleDelete = async () => {
  try {
    await axios.delete(`http://localhost:5000/api/posts/${post._id}`, {//rem back tick here
      data: { username: user.username },//we write data here because we are sending data in the body??
    });
    window.location.replace("/");
  } catch (err) {console.log(err);}
};

const handleUpdate = async () => {
  try {
    await axios.put(`http://localhost:5000/api/posts/${post._id}`, {
      username: user.username,
      title,
      desc,
    });
    setUpdateMode(false)
  } catch (err) {console.log(err);}
};




  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
        <img
          className="singlePostImg"
          //src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          src={post.photo}
          alt=""
        />
        )}
         {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) :(
        <h1 className="singlePostTitle">
         {title}
         {post.username === user?.username && (
          <div className="singlePostEdit">
            <i className="singlePostIcon far fa-edit" onClick={() => setUpdateMode(true)} ></i>
            <i className="singlePostIcon far fa-trash-alt" onClick={handleDelete}></i>
          </div>
         )}
         </h1>
        )}
        <div className="singlePostInfo">
          <span>
            Author:
            <b className="singlePostAuthor">
             <Link className="link" to={`/?user=${post.username}`}>
                {post.username}
              </Link>
            </b>
          </span>
          <span>{new Date(post.createdAt).toDateString()}</span>
        </div>
        {updateMode ?
        (<textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />) : 
          ( <p className="singlePostDesc">{desc}</p>)}
        
        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}
        
      </div>
    </div>
  );
}