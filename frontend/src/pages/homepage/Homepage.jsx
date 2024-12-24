import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./homepage.css";
import axios from "axios";
import { useLocation } from "react-router";

export default function Homepage() {
    const [posts, setPosts] = useState([]);
    const { search } = useLocation();//useLocation is a hook from react-router-dom that gives us the location of the current page// its also have search property which gives us the query string
  
    useEffect(() => {
      const fetchPosts = async () => {
        const res = await axios.get("http://localhost:5000/api/posts" + search);
        setPosts(res.data);
      };
      fetchPosts();
    }, [search]);//whenever the search changes, fire the useEffect

  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts} />
        {/* <Sidebar /> */}
      </div>
    </>
  );
}