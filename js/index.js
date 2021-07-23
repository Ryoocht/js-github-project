const searchForm = document.querySelector('#github-form')
const searchField = document.getElementById('search');
const userList = document.querySelector('#user-list')
const reposList = document.querySelector('#repos-list')

searchForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    fetch(`https://api.github.com/search/users?q=${searchField.value}`)
    .then(resp => resp.json())
    .then(userData => {
        userInfo(userData); 
    })
    .catch((err)=>{
        console.log(err)
    });
});

function userInfo(userData){
    userList.innerHTML = ''
    reposList.innerHTML = ''
    for (let i = 0; i < userData.items.length; i++) {
    let avatar = userData.items[i].avatar_url;
    let name = userData.items[i].login;
    let li = document.createElement('li')
    let libutton = document.createElement('li')
    libutton.classList.add('flex')
    li.innerHTML = `<div>
    <img src="${avatar}" alt="avatar"><br>
    <h1>${name}</h1>
    </div>`;
    libutton.innerHTML=`<div>
    <a href="${userData.items[i].html_url}">see profile</a><br>
    <button class="btn">User's Repos</button>
  </div>`
    userList.appendChild(li)
    userList.appendChild(libutton)
    let btn = document.querySelectorAll('.btn')
    for (let j = 0; j < btn.length; j++) {
         btn[j].addEventListener('click', ()=>{
            reposList.innerHTML='';
            fetch(`${userData.items[j].repos_url}`)
            .then(response => response.json())
            .then(data => {
                for(let j=0; j<data.length; j++){
                    reposList.insertAdjacentHTML('beforeend',`<li>${data[j].full_name}</li>`);
                } 
            }).catch((err)=>{
                console.log(err)
            }); 
    }) 
    }
    }
}
