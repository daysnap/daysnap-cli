export interface Config {
  orgname: string
  username: string
  cache: boolean
  deposit: string
  depositUrls: Record<string, any>
  repoUrls: Record<string, any>
}

export const config: Config = {
  orgname: 'daysnap-templates',
  username: '',
  cache: false,
  deposit: 'github',
  depositUrls: {
    github: `https://api.github.com/users/{username}/repos?page=1&per_page=999`,
    gitee: `https://gitee.com/api/v5/{type}/{username}/repos?page=1&per_page=100`,
  },
  repoUrls: {
    // github: 'github:{username}/{repo}',
    // gitee: 'gitee:{username}/{repo}',
    github: 'https://github.com/{username}/{repo}.git',
    gitee: 'https://gitee.com/{username}/{repo}.git',
  },
}