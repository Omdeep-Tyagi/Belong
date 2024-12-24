import { Link } from "react-router-dom";
import "./post.css";

// export default function Post({img}) {
export default function Post({post}) { //{p} is wrong, it should be {post} because we are passing post as a prop in Posts.jsx and not p
  // const PF = "http://localhost:5000/images/";
  return (
    <div className="post">
      {post.photo && (
      <img
        className="postImg"
        // src={img}
        src={post.photo}
        alt=""
      />
      )}
      <div className="postInfo">
        <div className="postCats">
          {post.categories.map((c) => (
            <span className="postCat">{c.name}</span>
          ))}
          {/* <span className="postCat">
            <Link className="link" to="/posts?cat=Music">
              Music
            </Link>
          </span>
          <span className="postCat">
            <Link className="link" to="/posts?cat=Music">
              Life
            </Link>
          </span>*/}
        </div>
        <Link to={`post/${post._id}`} className="link">
          <span className="postTitle">{post.title}</span>
        </Link>
        <hr />
        <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
      </div>
      <p className="postDesc">
        {post.desc}
      </p>
    </div>
  );
}