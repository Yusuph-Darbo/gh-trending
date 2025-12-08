#!/usr/bin/env node

import { Octokit } from '@octokit/core'

const duration = require('minimist')(process.argv.slice(2))
console.log(duration)


console.log(duration)

const octokit = new Octokit()

// const res = await octokit.request('GET /search/repositoriesq=stars:>10000&sort=stars&order=desc', {
//   headers: {
//     'X-GitHub-Api-Version': '2022-11-28'
//   }
// })

// console.log(res.data)