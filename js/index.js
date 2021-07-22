const searchForm = document.querySelector("#github-form");
const searchField = document.querySelector("#search");
const userList = document.querySelector("#user-list");
const reposList = document.querySelector("#repos-list");

searchForm.addEventListener("submit", e => {
    e.preventDefault();
    if(searchField.value !== ""){
    fetchUsers(searchField.value);
    };
});

function fetchUsers(users){
    const url = `https://api.github.com/search/users?q=${users}`;

    fetch(url, {headers:{'Accept': 'application/vnd.github.v3+json'}})
    .then(resp => resp.json)
    .then(resultObj => {
        resultObj.items.forEach(user => renderUser(user));
    })
    .catch(err => console.error(err));
}

function renderUser(user){
    const li = document.createElement("li");
    li.innerHTML = `<strong>${user.login}:</strong> Github: ${user.url}`;
    li.style.cursor = "pointer";
    const avatar =document.createElement("img");
    avatar.src = user.avatar_url;
    avatar.style.width = "20px";
    li.appendChild(avatar);
    userList.appendChild(li);
    li.addEventListener("click", fetchRepos(user.login));
}

function fetchRepos(userlogin){
    const url = `https://api.github.com/users/${userlogin}/repos`;
    fetch(url, {headers:{'Accept': 'application/vnd.github.v3+json'}})
    .then(resp => resp.json)
    .then(resultObj => {
        resultObj.forEach(repo => renderRepo(repo));
    })
    .catch(err => console.error(err));
}

function renderRepo(repo){
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = repo.html_url;
    a.target = "_blank";
    a.innerHTML = "Link";
    li.innerHTML = repo.name + " - ";
    li.appendChild(a);
    reposList.appendChild(li);
}