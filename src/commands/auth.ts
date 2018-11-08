import { Command, flags } from "@oclif/command";
import Octokit, { ReposGetResponse, Response } from "@octokit/rest";
import { prompt } from "inquirer";
import { storeToken } from "../config/store";

const TOKEN_PROMPT_LABEL = "GitHub authentication token";

export default class Authenticate extends Command {
  static description = "authenticates your GitHub account";

  static flags = {
    help: flags.help({ char: "h" }),
    token: flags.string({
      char: "t",
      description: "GitHub authentication token"
    })
  };

  async run() {
    const { args, flags } = this.parse(Authenticate);
    let { token } = flags;
    if (!token) {
      token = (await prompt<{ [key in typeof TOKEN_PROMPT_LABEL]: string }>({
        name: TOKEN_PROMPT_LABEL,
        type: "string"
      }))[TOKEN_PROMPT_LABEL];
    }
    if (!token) {
      this.error(`Please enter a GitHub authentication token.`);
      this.exit(1);
    }
    const octokit = new Octokit();
    await octokit.authenticate({
      type: "token",
      token
    });
    try {
      const repos = await fetchAllRepos(octokit);
      if (repos.length > 0) {
        const privateReposCount = repos.filter(r => r.private).length;
        const publicReposCount = repos.length - privateReposCount;
        this.log(
          `Found ${publicReposCount} public repo${
            publicReposCount !== 1 ? "s" : ""
          } and ${privateReposCount} private repo${
            privateReposCount !== 1 ? "s" : ""
          }.`
        );
        if (privateReposCount === 0) {
          this.warn(
            `No private repos found. If you'd like to gather stats about private repos, please grant the private "repo" permission.`
          );
        }
      } else {
        this.warn(
          `GitHub authentication token looks valid, but no repos were found. Did you mean to grant the private "repo" permission?`
        );
      }
    } catch (e) {
      this.error(
        `Invalid GitHub authentication token. Make sure to grant the "repo" permission.`
      );
      this.exit(1);
    }
    await storeToken(token);
    this.log(`GitHub authentication token stored.`);
  }
}

async function fetchAllRepos(octokit: Octokit): Promise<ReposGetResponse[]> {
  const reposList = [];
  let response = (await octokit.repos.getAll({})) as Response<
    ReposGetResponse[]
  >;
  reposList.push(...response.data);
  while (octokit.hasNextPage(response)) {
    response = await octokit.getNextPage(response);
    reposList.push(...response.data);
  }
  return reposList;
}
