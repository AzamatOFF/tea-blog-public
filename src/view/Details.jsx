const React = require("react");
const Layout = require("./Layout");

function Details(props) {
  const { oneTea, allCommentsArr, user } = props;
  return (
    <>
      <Layout {...props}>
        <div id="detailsContainer">
          <div id="teaInfoContainer">
            <h3>{oneTea.name}</h3>
            <div>
              <div id="oneTeaInsideContainer">
                <div>
                  <img src={oneTea.photo} />
                </div>
                <div id="oneTeaDescriptionContainer">
                  <span className="placeSpan">
                    Место культивации: {oneTea.address}
                  </span>
                  <span className="descriptionSpan">{oneTea.description}</span>
                </div>
              </div>
            </div>
          </div>
          <div id="allCommentsContainer">
            <div id="onlyCommentsContainer">
              {allCommentsArr.map((comment) => (
                <div className="oneComment" data-commentId={comment.id}>
                  <span className="oneCommentSpan">{comment.body}</span>
                  <div className="oneCommentInfo">
                    <span>Оставлен {comment["User.name"]}</span>
                    {user ? ((user.isAdmin === true  || user.id === comment.userId) ? <button className="userBtnDelete" type="button" name="deleteCommentButton">X</button> :  <></>) :  <></>}
                  </div>
                </div>
              ))}
            </div>
            <div>
              {user?.id ? (
                <form
                  id="addCommentForm"
                  name="addCommentForm"
                  className="addCommentForm"
                >
                  <label htmlFor="newCommentInput">
                    Добавление нового комментария
                  </label>
                  <br />
                  <textarea required id="newCommentInput" name="newComment" />
                  <br></br>
                  <button type="submit" id="addCommentButton">
                    Отправить
                  </button>
                </form>
              ) : (
                <span />
              )}
            </div>
          </div>
        </div>
      </Layout>
      <script src="/js/details.js" />
    </>
  );
}

module.exports = Details;
