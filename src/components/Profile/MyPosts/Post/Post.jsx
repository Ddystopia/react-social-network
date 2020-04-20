import React from "react";
import classNames from "./Post.module.css";

const Post = (props) => {
  return (
    <article className={classNames.post}>
      <img
        src="https://66.media.tumblr.com/0275b304a43db7298da2fb7d84fded83/tumblr_nacu2a5MJE1r1y69ho3_500.jpg"
        alt="avatar"
      />
      <div className={classNames.messageObj}>
        <h4> {props.header} </h4>
        <p> {props.message} </p>
      </div>
    </article>
  );
}
export default Post;

