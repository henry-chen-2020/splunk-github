/**
 * Welcome to the coding example!
 *
 * As a data-to-everything platform, Splunk helps users make insightful decisions about every aspect of their business with the power of data.
 * As part of the Cloud Platform UI experience team, you are assigned to write software to help better understand Splunk’s public Github repositories.
 * Your software should meet the following feature requests:
 *
 * 1.As a user of your software, I want to be able to list top 5 repositories sorted by three different criteria. The three criteria are: alphabetical order by repo name, number of forks and number of watchers.
 * 2.As a user of your software, I want to be able to get the ID of the person who committed last on the most recently updated repository.
 *
 * Requirements:
 *
 * 1. Each of these features will be implemented as separate functions in Javascript (code skeleton provided below), but feel free modify or define your own if needed.
 * 2. Pagination support is not required.
 * 3. Feel free to use any 3rd party libraries and tools.
 * 4. No UI needs to be built. Simply make sure your code compiles and print results to console (click Console on the right bottom)
 * 5. Feel free to refer to the Github API (https://docs.github.com/en/rest) doc at any time.
 *
 * Submission Instructions:
 *
 * 1. Make sure your code compiles and runs as expected.
 * 2. Save your code changes (File -> Save or Command + S on Mac). This will automatically generate a forked Codesandbox link (no account needed)
 * 3. Send an email to ssg-icx-frontend-interview@splunk.com with your name, position to apply and your Codesandbox link generated from step 2.
 *
 * Happy coding and we are looking forward to meeting you.
 */
import ReactDOM from "react-dom";
import React, { useEffect, useState } from "react";
import SplunkRepos from "./Demo";
import listSplunkRepos from "./Data";

/**
 * IIFE to enable async/await to ensure calls in predefined order
 */
// (async function () {
//   const list = await listSplunkRepos();
//   ReactDOM.render(<SplunkRepos data={list} />, document.getElementById("app"));
// })();

const SplunkList = () => {
  const [list, setList] = useState([]);
  useEffect(() => listSplunkRepos().then((data) => setList(data)));
  return <SplunkRepos data={list} />;
};

ReactDOM.render(<SplunkList />, document.getElementById("app"));
