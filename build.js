import fs from "node:fs";
import { exec } from "node:child_process";
import process from "node:process";
import esbuild from "esbuild";

/**
 * @type {esbuild.BuildOptions}
 */
const buildOptions = {
  entryPoints: fs
    .readdirSync("./src")
    .filter((f) => fs.statSync(`./src/${f}`).isFile())
    .map((f) => `./src/${f}`),
  bundle: true,
  outdir: "dist",
  platform: "browser",
  target: "esnext",
  format: "esm",
  minify: true,
};

const devMode = process.argv[2] === "--dev";

if (devMode) {
  const ctx = await esbuild.context(buildOptions);
  let { port } = await ctx.serve({ servedir: "." });
  const url = `http://127.0.0.1:${port}`;
  console.log(`Serving on ${url}`);
  const start =
    process.platform == "darwin"
      ? "open"
      : process.platform == "win32"
        ? "start"
        : "xdg-open";
  exec(start + " " + url);
} else {
  await esbuild.build(buildOptions);
  console.log("Build complete.");
}
