import { exec } from "child_process";

const ATLAS_ENV = process.env?.ATLAS_ENV || "production";

console.log("ATLAS_ENV", ATLAS_ENV);

let child;

if (ATLAS_ENV === "development") {
  console.log("Running in development mode nothing to build");
} else {
  console.log("Running in production, building Gatsby site.");
  child = exec("npm run build", []);

  child.stdout.pipe(process.stdout);
  child.stderr.pipe(process.stderr);
}
