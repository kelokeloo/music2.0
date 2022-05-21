import { Comment } from "./Comment";
export function Comments(props) {
  const { comments, handleCommentClick } = props;

  return (
    <div>
      {comments.map((comment, index) => {
        const { from, to, content } = comment;
        return (
          <Comment
            key={index}
            from={from}
            to={to}
            content={content}
            handleCommentClick={handleCommentClick}
          ></Comment>
        );
      })}
    </div>
  );
}
