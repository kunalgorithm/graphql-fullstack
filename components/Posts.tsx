import React, { useState, useEffect } from "react";

import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { withApollo } from "../apollo/client";

import { Input, Button } from "antd";
import Link from "next/link";
import Field from "./Field";

const Profile = () => {
  const { loading, error, data, client } = useQuery(
    gql`
      query {
        me {
          id
          name
          email
          posts {
            id
            title
          }
        }
      }
    `
  );

  useEffect(() => {
    if (data) setPosts(data.me.posts);
  }, [data]);

  const [posts, setPosts] = useState([]);
  const [input, setInput] = useState("");

  const [createPost] = useMutation(gql`
  mutation createPost($title: String!) {
    createPost(title: $title) {
      title
    }
  }

  `);
  if (loading) return <div>Loading...</div>;
  if (!data || !data.me) return <div>Something went wrong...</div>;
  return (
    <div>
      <h1>Posts</h1>

      <form
        noValidate
        onSubmit={async (e) => {
          e.preventDefault();
          setPosts([...posts, { title: input }]);
          await createPost({ variables: { title: input } });
          setInput("");
        }}
      >
        <Field
          name="post"
          type="post"
          autoComplete="post"
          required
          placeholder="Post something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </form>
      <div>
        {posts.map((post, i) => (
          <div key={i}>{post.title}</div>
        ))}
      </div>
    </div>
  );
};

export default withApollo(Profile);
