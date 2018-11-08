import { S_IRUSR, S_IWUSR } from "constants";
import { ensureDir, pathExists, readFile, writeFile } from "fs-extra";
import { homedir } from "os";
import { dirname, join } from "path";

export async function storeToken(token: string) {
  const config = await readConfig();
  config.githubToken = token;
  await writeConfig(config);
}

export async function readConfig(): Promise<SerializedConfig> {
  const configPath = getConfigPath();
  if (!(await pathExists(configPath))) {
    return {};
  }
  return JSON.parse(await readFile(configPath, "utf8")) as SerializedConfig;
}

export async function writeConfig(config: SerializedConfig) {
  const configPath = getConfigPath();
  await ensureDir(dirname(configPath));
  await writeFile(configPath, JSON.stringify(config, null, 2), {
    encoding: "utf8",
    mode: S_IRUSR | S_IWUSR
  });
}

function getConfigPath() {
  return join(homedir(), ".config", "prstats", "config.json");
}

interface SerializedConfig {
  githubToken?: string;
}
