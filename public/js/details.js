const { addCommentForm } = document.forms;
const allCommentsContainer = document.getElementById("allCommentsContainer");
const onlyCommentsContainer = document.getElementById("onlyCommentsContainer");

addCommentForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    const input = Object.fromEntries(new FormData(addCommentForm));
    const str = window.location.pathname
    const postId = str.slice(9)
    const res = await fetch("/api/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({input, postId}),
    });
    const resJSON = await res.json()
    const {newComment, userName} = resJSON
    const html = `<div class="oneComment" data-commentId=${newComment.id}>
    <span class="oneCommentSpan">${newComment.body}</span>
    <div class="oneCommentInfo">
    <span>${userName}</span>
    <button class="userBtnDelete" type="button" name="deleteCommentButton">X</button>
    </div>
  </div>`
  onlyCommentsContainer.insertAdjacentHTML("afterbegin", html)
  addCommentForm.reset()
  } catch (error) {
    console.log(error);
  }
});


allCommentsContainer.addEventListener("click", async (e) => {
  try {
    if (e.target.name === "deleteCommentButton") {
      const parent = e.target.closest("[data-commentId]");
      const id = parent.dataset.commentid;

      const res = await fetch("/api/comment", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      parent.remove();
    }
  } catch (error) {
    console.log(error);
  }
});
