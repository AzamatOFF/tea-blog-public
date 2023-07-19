const userCommentsContainer = document.getElementById("userCommentsContainer");

userCommentsContainer.addEventListener("click", async (e) => {
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

      parent.remove()
    }
  } catch (error) {
    console.log(error);
  }
});
