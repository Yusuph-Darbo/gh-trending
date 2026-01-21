#!/usr/bin/env node

import minimist from "minimist";
import { Octokit } from "@octokit/core";
import { RequestError } from "@octokit/request-error";

// Returns a copy of the arguements starting from index 2 (inclusive)
const duration = minimist(process.argv.slice(2), {
  alias: {
    d: "duration",
    l: "limit",
  },

  // If options are omitted
  default: {
    duration: "daily",
    limit: 20,
  },

  unknown: (arg: string): boolean => {
    if (arg.startsWith("-")) {
      console.error(`❌ Unknown option: ${arg}`);
      process.exit(1);
    }
    return true;
  },
});
const octokit: Octokit = new Octokit();
const date: Date = new Date();

try {
  const res = await octokit.request("GET /search/repositories", {
    q: `stars:>5000 pushed:>${getTimeFrame()}`,
    sort: "stars",
    order: "desc",
    per_page: duration.limit,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  console.log(
    `The top ${duration.limit} repos in the last ${duration.duration}:`,
  );
  res.data.items.forEach((repo) => {
    console.log(`Name: ${repo.name}`);
    console.log(`Description: ${repo.description}`);
    console.log(`Stars: ${repo.stargazers_count}`);
    console.log(`Language: ${repo.language}`);
    console.log("");
  });
} catch (error: unknown) {
  if (error instanceof RequestError) {
    if (error.status === 404) {
      console.log("Github repo not found");
    } else if (error.status === 403) {
      console.log("Rate limit exceeded — try again later");
    } else {
      console.log("Unexpected error please try again");
      console.error(error);
    }
  } else {
    console.log("Network error: Check your internet connection");
  }
}

function getTimeFrame(): string {
  switch (duration.duration) {
    case "year":
      date.setDate(date.getDate() - 365);
      return date.toISOString();

    case "month":
      date.setDate(date.getDate() - 30);
      return date.toISOString();

    case "week":
      date.setDate(date.getDate() - 7);
      return date.toISOString();

    case "day":
      date.setDate(date.getDate() - 1);
      return date.toISOString();

    default:
      console.error("Invalid input. Try again");
      process.exit(2);
  }
}
