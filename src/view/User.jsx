const React = require("react");
const Layout = require("./Layout");

function User(props) {
  const { userCommentsArr } = props;
  return (
    <>
      <Layout {...props}>
        <div id="userCommentsContainer">
          <h1 id="userCommentsHeader">Ваши комментарии</h1>
          {userCommentsArr.map((comment) => (
            <div key={comment.id} data-commentId={comment.id} className="userOneCommentContainer">
              <p className="oneCommentText">{comment.body}</p>
              <div className="userCommentFooter">
                <span className="commentAuthor">Оставил(а) {comment["User.name"]}</span>
                <a className="postUrl" href={`/details/${comment["Post.id"]}`}>
                  {comment["Post.name"]}
                </a>
                <button className="userBtnDelete" type="button" name="deleteCommentButton">Удалить</button>
              </div>
            </div>
          ))}
        </div>
      </Layout>
      <script src="/js/user.js" />
    </>
  );
}

module.exports = User;
