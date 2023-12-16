import { useMemo } from "react";
import { useCallback } from "react";
import { createContext, useReducer } from "react";

export const PostList = createContext({
  postList: [],
  addPost: () => {},
  deletePost: () => {},
});

const postListReducer = (currentPostList, action) => {
  let newPostList = currentPostList;
  if (action.type === "DELETE_POST") {
    newPostList = currentPostList.filter(
      (post) => post.id !== action.payload.postId
    );
  } else if (action.type === "ADD_POST") {
    newPostList = [action.payload, ...currentPostList];
  }

  return newPostList;
};

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(
    postListReducer,
    DEFAULT_POST_LIST
  );

  const addPost = useCallback(
    (userId, postTitle, postBody, reactions, tags) => {
      dispatchPostList({
        type: "ADD_POST",
        payload: {
          id: Date.now(),
          title: postTitle,
          body: postBody,
          reactions: reactions,
          userId: userId,
          tags: tags,
        },
      });
    },
    [dispatchPostList]
  );

  const deletePost = useCallback(
    (postId) => {
      dispatchPostList({
        type: "DELETE_POST",
        payload: {
          postId,
        },
      });
    },
    [dispatchPostList]
  );
  return (
    <PostList.Provider value={{ postList, addPost, deletePost }}>
      {children}
    </PostList.Provider>
  );
};

const DEFAULT_POST_LIST = [
  {
    id: "1",
    title: "Going to Mumbai",
    body: "Hi Friends, I am going to Mumbai for my vacations. Hope to enjoy a lot. Peace out.",
    reactions: 2,
    userId: "user-9",
    tags: ["vacations", "Mumbai", "Enjoying"],
  },
  {
    id: "2",
    title: "Pass hogay Bhai",
    body: "4 saal ki masti k baad bhi ho gaye hain pass. Hard to believe",
    reactions: 15,
    userId: "user-15",
    tags: ["Graduating", "Unbelievable"],
  },
];

export default PostListProvider;
