# GitHub Trending CLI

A simple command-line tool that fetches the **most starred GitHub repositories** within a given time frame (day, week, month, or year).
Perfect for exploring trending open-source projects directly from your terminal.

---

## Features

* Fetches trending repositories using the GitHub Search API
* Supports custom time ranges:

  * `--duration day`
  * `--duration week`
  * `--duration month`
  * `--duration year`
* Control the number of results with `--limit`
* Human-readable output with repository name, description, stars, and language
* Graceful handling of unknown CLI options

---

## Installation

Install globally using npm:

```bash
npm install -g <your-package-name>
```

> Replace `<your-package-name>` with the name you published to npm.

---

## Usage

Run the CLI with optional flags:

```bash
gh-trending --duration <time> --limit <number>
```

### **Examples**

Get top 20 repositories from the last day:

```bash
gh-trending --duration day
```

Get top 10 repositories from the past week:

```bash
gh-trending --duration week --limit 10
```

Get monthly trending repos:

```bash
gh-trending -d month
```

Short flags:

* `-d` → `--duration`
* `-l` → `--limit`

---

## Duration Options

| Duration | Meaning                                       |
| -------- | --------------------------------------------- |
| `day`    | Repositories updated within the last 24 hours |
| `week`   | Updated within the last 7 days                |
| `month`  | Updated within the last 30 days               |
| `year`   | Updated within the last 365 days              |

Default values if omitted:

* `duration`: **daily**
* `limit`: **20**

---

## Output Example

```
The top 10 repos in the last week:
Name: awesome-project
Description: A cool project trending this week
Stars: 15400
Language: TypeScript
```

---

## How It Works

* Parses CLI options using **minimist**
* Calculates a timestamp based on `--duration`
* Uses **GitHub Search API** to fetch repositories with:

  * `stars:>5000`
  * `pushed:>timestamp`
* Sorts by stars in descending order
