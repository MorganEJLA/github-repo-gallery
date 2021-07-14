const overview = document.querySelector(".overview");
const username = "MorganEJLA";
const repoList = document.querySelector(".repo-list");
const repoClass = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");
const backButton = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");



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

const displayRepo = function (repos){
    filterInput.classList.remove("hide");
    for (const repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(repoItem);
        
    }
};

repoList.addEventListener("click", function (e){
    if (e.target.matches("h3")){
        const repoName = e.target.innerText;
        getRepoInfo(repoName);
    }
});

const getRepoInfo = async function (repoName){
    const infoData = await fetch (
        `https://api.github.com/repos/${username}/${repoName}`
    );
    const repoInfo = await infoData.json();
    console.log(repoInfo);

    const fetchLanguages = await fetch (repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    console.log(languageData);
    const languages = []; 

    for (const language in languageData){
        languages.push(language);
        console.log(languages);
    }
    displayRepoInfo(repoInfo, languages);
};


const displayRepoInfo = function (repoInfo, languages){
    repoData.innerHTML = "";
    repoData.classList.remove("hide");
    repoClass.classList.add("hide");
    const div = document.createElement("div");
    div.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
    repoData.append(div);
    // backButton.classList.remove("hide");


};


backButton.addEventListener("click",function(){
    repoClass.classList.remove("hide");
    repoData.classList.add("hide");
    backButton.classList.add("hide");

});

filterInput.addEventListener("input", function(e){
    const searchText = e.target.value;
    const repos = document.querySelectorAll(".repo");
    const searchLowerCase  = searchText.toLowerCase();

    for (const repo of repos) {
        const lowerCaseVal = repo.innerText.toLowerCase();
        if (lowerCaseVal.includes(searchLowerCase)){
        repo.classList.remove("hide");

        } else {
        repo.classList.add("hide");
      }

    }

});