import React, { useState, useEffect } from "react";

import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { withApollo } from "../apollo/client";

import { Input, Button, Card } from "antd";
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
          <Card key={i} style={{ padding: "5px" }}>
            <p>{post.title}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Profile;
