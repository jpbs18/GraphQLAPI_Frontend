import React from "react";
import "./Post.css";
import { gql, useMutation } from "@apollo/client"
import { useState } from "react";

const PUBLISH_POST = gql`
  mutation PublishPost($postId: ID!) {
    postPublish(postId: $postId) {
      userErrors {
        message
      }
      post {
        title
      }
    }
  }
`;

const UNPUBLISH_POST = gql`
  mutation UnpublishPost($postId: ID!) {
    postUnpublish(postId: $postId) {
      userErrors {
        message
      }
      post {
        title
      }
    }
  }
`;

export default function Post({
  title,
  content,
  date,
  user,
  published,
  id,
  isMyProfile,
}) {
  const [publishPost, { data, loading }] = useMutation(PUBLISH_POST);
  const [unpublishPost, { data2, loading2 }] = useMutation(UNPUBLISH_POST);
  const [isPublished, setIsPublished] = useState(published)

  const formatedDate = new Date(Number(date));
  return (
    <div
      className="Post"
      style={isPublished === false ? { backgroundColor: "hotpink" } : {}}
    >
      {isMyProfile && isPublished === false && (
        <p
          className="Post__publish"
          onClick={() => {
            publishPost({ variables: { postId: id } });
            setIsPublished(!isPublished);
          }}
        >
          publish
        </p>
      )}
      {isMyProfile && isPublished === true && (
        <p
          className="Post__publish"
          onClick={() => {
            unpublishPost({ variables: { postId: id } });
            setIsPublished(!isPublished);
          }}
        >
          unpublish
        </p>
      )}
      <div className="Post__header-container">
        <h2>{title}</h2>
        <h4>
          Created At {`${formatedDate}`.split(" ").splice(0, 3).join(" ")} by{" "}
          {user}
        </h4>
      </div>
      <p>{content}</p>
    </div>
  );
}
