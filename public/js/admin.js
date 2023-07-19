const teaList = document.getElementsByTagName("ul");
const { addTeaForm, addAdminForm } = document.forms;
const imgNameInput = document.getElementById("imgNameInput");
const teaPhotoInput = document.getElementById("teaPhotoInput");

imgNameInput.value = teaPhotoInput.value;

teaPhotoInput.addEventListener("change", () => {
  imgNameInput.value = teaPhotoInput.value;
  imgNameInput.style.display = "block";
});

teaList[0].addEventListener("click", async (e) => {
  if (e.target.name === "deleteTeaButton") {
    const parent = e.target.closest("[data-teaId]");
    const id = parent.dataset.teaid;
    const imgPath = e.target.dataset.imgname

    const res = await fetch("/api/onetea", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, imgPath }),
    });
    parent.remove();
  }
});

addTeaForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    const input = new FormData(addTeaForm);
    const res = await fetch("/api/onetea", {
      method: "POST",
      body: input,
    });
    const { teaId, teaName, teaPhoto } = await res.json();
    const str = `<li data-teaId=${teaId}>
    <a class="liDitailsA" href=/details/${teaId}> ${teaName}</a>
    <button type="button" name="deleteTeaButton" class="adminBtnDelete" data-imgName=${teaPhoto}>
      Удалить
    </button>
  </li>`;
    teaList[0].insertAdjacentHTML("beforeend", str);
    imgNameInput.style.display = "none";
    imgNameInput.value = "";
    addTeaForm.reset();
  } catch (error) {
    console.log(error);
  }
});

addAdminForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    const input = Object.fromEntries(new FormData(addAdminForm));
    const res = await fetch("/api/admin", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });
    addAdminForm.reset();
  } catch (error) {
    console.log(error);
  }
});
