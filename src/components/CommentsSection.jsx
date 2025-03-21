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
    <div className="bg-[#F8F3FEA6] border-[0.3px] border-[#DDD2FF] py-10 px-[45px] relative">
      <textarea
        className="border-[0.3px] border-[#ADB5BD] pt-7 px-5 pb-[15px] w-[500px] h-[200px] bg-white mb-[66px] rounded-[10px]"
        placeholder="დაამატე კომენტარი"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className=" text-white top-[190px] right-[60px] absolute bg-[#8338EC] rounded-[20px] w-[155px] h-[35px] text-[16px]"
      >
        დააკომენტარე
      </button>

      <h1 className="font-medium flex gap-[7px] items-center">
        კომენტარები{" "}
        <span className="rounded-[30px] bg-[#8338EC] w-[30px] h-[22px] flex items-center justify-center text-white text-[14px] font-medium">
          {commentsList.length}
        </span>
      </h1>

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
