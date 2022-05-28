import { Button, ScrollView, View, TextInput, StyleSheet } from "react-native";
import { Modal, FormControl, Input } from "native-base";
import React, { useState, useEffect } from "react";
import Post from "./Post";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [modalKey, setModalKey] = useState("");
  const [modalIndex, setModalIndex] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalDesc, setModalDesc] = useState("");

  const addPost = () => {
    fetch("http://192.168.1.153:4000/posts", {
      method: "POST",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify({ id: `${posts.length + 1}`, title, description }),
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

  const updateDataModal = (id, idx) => {
    setModalKey(id);
    setModalIndex(idx);
    setModalTitle(posts[idx].title);
    setModalDesc(posts[idx].description);
    setShowModal(true);
  };

  const updateFromState = () => {
    let data = [...posts];
    data[modalIndex].title = modalTitle;
    data[modalIndex].description = modalDesc;
    setPosts(data);
  };

  const updateDataJson = () => {
    fetch(`http://192.168.1.153:4000/posts/${modalKey}`, {
      method: "PUT",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify({
        id: `${modalKey}`,
        title: `${modalTitle}`,
        description: `${modalDesc}`,
      }),
    })
      .then(() => updateFromState())
      .catch((err) => console.log(err));
    setShowModal(false);
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
            updateDataModal={updateDataModal}
          />
        ))}
      </ScrollView>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>
            {modalIndex === "" ? `Update` : `Update ${posts[modalIndex].title}`}
          </Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Title</FormControl.Label>
              <Input
                value={modalTitle}
                onChangeText={(text) => setModalTitle(text)}
              />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Description</FormControl.Label>
              <Input
                value={modalDesc}
                onChangeText={(text) => setModalDesc(text)}
              />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button
              color="red"
              title="Cancel"
              onPress={() => {
                setShowModal(false);
              }}
            />
            <Button
              color="blue"
              title="Save"
              onPress={() => {
                updateDataJson();
              }}
            />
          </Modal.Footer>
        </Modal.Content>
      </Modal>
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
