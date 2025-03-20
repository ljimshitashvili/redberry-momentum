import { useState } from "react";
import { addComment } from "../services/post";
import { getComments } from "../services/get";

const CommentsSection = ({ commentsList, taskId, setCommentsList }) => {
  const [comment, setComment] = useState("");

  const handleSubmit = async () => {
    if (!comment.trim()) return;

    try {
      await addComment(taskId, comment);
      console.log("Comment added successfully!");

      const updatedComments = await getComments(taskId);
      setCommentsList(updatedComments);
      console.log(commentsList.text);
      setComment("");
    } catch (error) {
      console.error("Failed to add comment.");
      console.log(error);
    }
  };

  return (
    <div>
      <textarea
        className="border-[1px] w-[500px] h-[200px]"
        placeholder="დაამატე კომენტარი"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white p-2 mt-2"
      >
        Submit
      </button>

      <h1>
        {commentsList.map((comment) => (
          <div key={comment.id}>
            <h1>{comment.name}</h1>
          </div>
        ))}
      </h1>
    </div>
  );
};

export default CommentsSection;
