require("dotenv").config({ path: "../.env.local" });
const SPLUNK = "splunk";
const TOKEN = {
  headers: {
    Authorization: `token ${process.env.REACT_APP_TOKEN}`
  }
};
/**
 * Fetch all repos under Splunk across multiple pages
 */
async function getSplunkRepos(per_page = 100) {
  const pages = await getSplunkRepoPages(per_page);
  const pageList = Array.from({ length: pages }, (_, i) => i + 1);
  const requests = pageList.map(async (page) => {
    const response = await fetch(getGitHubURL(per_page, page), TOKEN);
    return response.json();
  });
  const buffer = await Promise.all(requests);
  return buffer.flat();
}

function getGitHubURL(per_page, page = 1) {
  return `https://api.github.com/orgs/${SPLUNK}/repos?per_page=${per_page}&page=${page}`;
}
/**
 * Get number of page for a given page size
 */
async function getSplunkRepoPages(per_page) {
  const response = await fetch(getGitHubURL(per_page), TOKEN);
  const links = response.headers.get("link");
  const link = links.split(", ").find((link) => link.match(/rel="last"/));
  const matches = link.match(/&page=(\d+)/);
  return matches[1];
}

/**
 * Get a list of repos with additional required fields, time the fetcing
 */
function getGitHubRepoURL(repo) {
  return `https://api.github.com/repos/${SPLUNK}/${repo}/commits/HEAD`;
}
async function listSplunkRepos() {
  const repos = await getSplunkRepos();
  const results = repos.map(async (repo) => {
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
  return Promise.all(results);
}

export default listSplunkRepos;
