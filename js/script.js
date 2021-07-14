const overview = document.querySelector(".overview");
const username = "MorganEJLA";
const repoList = document.querySelector(".repo-list");


const users = async function(){
    const res = await fetch(
        `https://api.github.com/users/${username}`);
    const data = await res.json();

    userInfo(data);
    
};

users();

const userInfo = function (data){
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `<figure>
    <img alt="user avatar" src=${data.avatar_url} />
  </figure>
  <div>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Bio:</strong> ${data.bio}</p>
    <p><strong>Location:</strong> ${data.location}</p>
    <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
  </div>`;
  

  overview.append(div);

};

const gitRepos = async function (){
    const listOfRepos = await fetch (
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`)
    const repoData = await listOfRepos.json();
    
    // console.log(repoData);
    displayRepo(repoData);
    
};
gitRepos();

displayRepo = function (repos){
    for (const repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(repoItem);
        
    }
};