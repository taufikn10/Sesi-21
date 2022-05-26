import React from "react";
import Header from "./components/Header";
import Posts from "./components/Posts";
import { NativeBaseProvider } from "native-base";

export default function App() {
  return (
    <NativeBaseProvider>
      <Header />
      <Posts />
    </NativeBaseProvider>
  );
}
