import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import gulp from "gulp";
import svgo from "../index.js";

test("Ensure outputs are minified", async () => {
  await new Promise((resolve) => {
    gulp
      .src("test/inputs/*.svg")
      .pipe(svgo())
      .pipe(gulp.dest("test/tmp"))
      .on("end", resolve);
  });

  const svg = readFileSync("test/tmp/example.svg");
  const expectedSvg = readFileSync("test/outputs/example.svg");
  assert.strictEqual(Buffer.compare(svg, expectedSvg), 0);
});
