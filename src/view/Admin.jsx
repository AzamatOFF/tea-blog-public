const React = require("react");
const Layout = require("./Layout");

function Admin(props) {
  const { allTeaArr } = props;
  return (
    <>
      <Layout {...props}>
        <div id="adminContentContainer">
          <div id="allTeaContainer">
            <h3>Все сорта чая</h3>
            <ul>
              {allTeaArr.map((tea) => (
               <li data-teaId={tea.id}>
                  <a className="liDitailsA" href={`/details/${tea.id}`}> {tea.name}{" "}</a>
                  <button type="button" name="deleteTeaButton" className="adminBtnDelete" data-imgName={tea.photo}>
                    Удалить
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Добавление нового чая</h3>
            <form id="addTeaForm" name="addTeaForm" className="adminForm">
              <label htmlFor="teaNamelInput">Название чая</label>
              <br></br>
              <input required id="teaNamelInput" name="name" />
              <br></br>
              <label htmlFor="teaAddresslInput">Место произрастания</label>
              <br></br>
              <input required id="teaAddresslInput" name="address" />
              <br></br>
              <label htmlFor="teaDescriptionlInput">Описание чая</label>
              <br></br>
              <textarea required id="teaDescriptionlInput" name="description" />
              <br></br>
              <label className="uploadPhoto" htmlFor="teaPhotoInput">Файл фото</label>
              <br></br>
              <input required type="file" id="teaPhotoInput" name="teaImg" />
              <br></br>
              <input id="imgNameInput" name="imgNameInput" readOnly />
              <br></br>
              <button type="submit" id="addTeaButton" className="adminPageButtons">
                Добавить чай
              </button>
            </form>
          </div>
          <div className="divNewAdmin">
            {" "}
            <h3>Назначить администратора</h3>
            <form id="addAdminForm" name="addAdminForm" className="adminForm">
              <br></br>
              <input
                required
                id="newAdminInput"
                name="newAdmin"
                placeholder="Почта нового админа"
              />
              <br></br>
              <button type="submit" id="addAdminButton" className="adminPageButtons">
                Добавить
              </button>
            </form>
          </div>
        </div>
      </Layout>
      <script src="/js/admin.js" />
    </>
  );
}

module.exports = Admin;
