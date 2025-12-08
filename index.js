#!/usr/bin/env node

import minimist from "minimist"
import { Octokit } from '@octokit/core'

// Returns a copy of the arguements starting from index 2 (inclusive)
const duration = minimist(process.argv.slice(2), {
    alias : {
        d : "duration",
        l : "limit",
    },

    // If options are omitted
    default : {
        duration : "daily",
        limit : 20,
    },

    unknown: (arg) => {
    if (arg.startsWith("-")) {
      console.error(`❌ Unknown option: ${arg}`)
      process.exit(1)
        }
    }
})
const octokit = new Octokit()
const date = new Date
console.log(date.toLocaleTimeString("en-eu", {timeStyle: "medium"}))

console.log(duration)
getTimeFrame()

// const res = await octokit.request('GET /search/repositories', {
//     q: "stars:>5000 pushed:>2024-01-01",
//     sort: "stars",
//     order: "desc",
//     per_page: duration.limit,
//   headers: {
//     'X-GitHub-Api-Version': '2022-11-28'
//   }
// })

// console.log(res.data)

function getTimeFrame(){
    switch(duration.duration){

         case 'year':
            console.log("year")
            break

        case 'month':
            console.log("month")
            break

        case 'week':
            console.log("week")
            break
        
        case 'day':
            console.log("day")
            break
        
        default:
            console.error("Invalid input. Try again")
            process.exit(2)
    }
}