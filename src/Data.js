require("dotenv").config({ path: "../.env.local" });
const SPLUNK = "splunk";
const TOKEN = {
  headers: {
    Authorization: `token ${process.env.REACT_APP_TOKEN}`
  }
};
/**
 * A function to cache call to GitHub API
 */
async function getSplunkRepos(per_page = 100) {
  const pages = await getSplunkRepoPages(per_page);
  const pageList = Array.from({ length: pages }, (v, i) => i + 1);
  const requests = pageList.map(async (page) => {
    const response = await fetch(getGitHubURL(per_page, page));
    return await response.json();
  });
  const buffer = await Promise.all(requests);
  return buffer.flat();
}

function getGitHubURL(per_page, page = 1) {
  return `https://api.github.com/orgs/${SPLUNK}/repos?per_page=${per_page}&page=${page}`;
}

async function getSplunkRepoPages(per_page = 100) {
  const response = await fetch(getGitHubURL(per_page));
  const links = response.headers.get("link");
  const link = links.split(", ").find((link) => link.match(/rel="last"/));
  const matches = link.match(/&page=(\d+)/);
  return matches[1];
}

/**
 * get list of repos with required fields
 */
function getGitHubRepoURL(repo) {
  return `https://api.github.com/repos/${SPLUNK}/${repo}/commits/HEAD`;
}
async function listSplunkRepos() {
  const t0 = performance.now();
  const data = await getSplunkRepos();
  const t1 = performance.now();
  const results = data.map(async (repo) => {
    const response = await fetch(getGitHubRepoURL(repo.name), TOKEN);
    const json = await response.json();
    return {
      key: repo.id,
      name: repo.name,
      author: json.author?.id ?? 0,
      forks: repo.forks,
      stars: repo.watchers
    };
  });
  const t2 = performance.now();
  const splunkRepos = await Promise.all(results);
  const t3 = performance.now();
  console.log(`all repos: ${t1 - t0}, map: ${t2 - t0}, collect: ${t3 - t0}`);
  return splunkRepos;
}

export default listSplunkRepos;
