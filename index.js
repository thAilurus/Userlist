const BASE_URL = "https://lighthouse-user-api.herokuapp.com";
const INDEX_URL = BASE_URL + "/api/v1/users/";

const userList = [];
const dataPanel = document.querySelector("#data-panel");

// 1.渲染userList: 函式renderUserList
function renderUserList(data) {
  let rawHTML = "";

  data.forEach((item) => {
    // name+surname, avatar
    rawHTML += `
    <div class="col-sm-3">
      <div class="mb-2 ms-3">
        <div class="card">
          <img class="show-user-image" src="${item.avatar}" class="card-img-top" alt="User Avatar" data-bs-toggle="modal" data-bs-target="#user-modal" data-id="${item.id}">
          <div class="card-footer">
            <h5 class="user-name text-center">${item.name} ${item.surname}</h5>
          </div>
        </div>
      </div>
    </div>
    `;
  });
  dataPanel.innerHTML = rawHTML;
}

// 2.showUserModal 函式
function showUserModal(id) {
  // name, avatar, gender, age, birthday, region, email
  const modalName = document.querySelector("#user-modal-name");
  const modalAvatar = document.querySelector("#user-modal-avatar");
  const modalInfo = document.querySelector("#user-modal-info");

  // 請求資料 show api: https://lighthouse-user-api.herokuapp.com/api/v1/users/:id
  axios.get(INDEX_URL + id).then((response) => {
    const data = response.data;

    modalName.innerHTML = data.name + " " + data.surname;
    modalAvatar.src = data.avatar;
    modalInfo.innerHTML = `
      <p id="user-modal-gender">Gender: ${data.gender} </p>
      <p id="user-modal-age">Age: ${data.age} </p>
      <p id="user-modal-birthday">Birthday: ${data.birthday}</p>
      <p id="user-modal-region">Region: ${data.region} </p>
      <p id="user-modal-email">Email: ${data.email}</p>
    `;
  });
}

// 3. 對dataPanel綁監聽器
dataPanel.addEventListener("click", function onPanelClicked(event) {
  if (event.target.matches(".show-user-image")) {
    showUserModal(event.target.dataset.id);
  }
});

// 4.send request to index api
axios
  .get(INDEX_URL)
  .then((response) => {
    userList.push(...response.data.results);
    renderUserList(userList);
  })
  .catch((err) => console.log(err));
