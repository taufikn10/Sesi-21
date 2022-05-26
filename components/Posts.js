import React from "react";
import { Button, ScrollView, View, TextInput, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import Post from "./Post";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const addPost = () => {
    fetch("http://192.168.1.153:4000/posts", {
      method: "POST",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify({ title, description }),
    })
      .then((res) => res.json())
      .then((data) => setPosts([...posts, data]))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetch("http://192.168.1.153:4000/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  const deleteFromState = (id) => {
    let tmp = [...posts];
    tmp.splice(id, 1);
    setPosts(tmp);
  };

  return (
    <>
      <View style={styles.scroll}>
        <TextInput
          placeholder="Title"
          placeholderTextColor="#ffffff"
          style={styles.txtInput}
          onChangeText={(text) => setTitle(text)}
          defaultValue={title}
        />
        <TextInput
          placeholder="Description"
          placeholderTextColor="#ffffff"
          style={styles.txtInput}
          onChangeText={(text) => setDescription(text)}
          defaultValue={description}
        />
        <Button color="blue" title="Save" onPress={addPost} />
      </View>
      <ScrollView style={styles.scroll}>
        {posts.map((post, idx) => (
          <Post
            key={post.id}
            post={post}
            idx={idx}
            deleteFromState={deleteFromState}
          />
        ))}
      </ScrollView>
    </>
  );
}

// Stylesheet
const styles = StyleSheet.create({
  scroll: {
    backgroundColor: "#7C9473",
    padding: 10,
  },
  txtInput: {
    color: "#ffffff",
    padding: 5,
    borderWidth: 1,
    borderColor: "#ffffff",
    marginBottom: 5,
  },
});
