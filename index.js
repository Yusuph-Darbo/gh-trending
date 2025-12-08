#!/usr/bin/env node

import { Octokit } from '@octokit/core'

const octokit = new Octokit()

await octokit.request("GET search/repositories?q=stars:>5000&sort=stars&order=desc")

console.log(octokit)