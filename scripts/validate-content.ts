import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");
const REQUIRED_FIELDS = ["title", "slug", "category", "description"] as const;

let totalFiles = 0;
let totalErrors = 0;

function validateFile(filePath: string) {
  totalFiles += 1;
  const relativePath = path.relative(CONTENT_DIR, filePath);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  let fileErrors = 0;

  for (const field of REQUIRED_FIELDS) {
    if (!data[field]) {
      console.error(`❌ [${relativePath}] missing required field: ${field}`);
      fileErrors += 1;
      totalErrors += 1;
    }
  }

  if (!content.includes("<Mermaid>") || !content.includes("</Mermaid>")) {
    console.error(`❌ [${relativePath}] missing <Mermaid> block`);
    fileErrors += 1;
    totalErrors += 1;
  }

  if (!content.includes("<Explain>") || !content.includes("</Explain>")) {
    console.error(`❌ [${relativePath}] missing <Explain> block`);
    fileErrors += 1;
    totalErrors += 1;
  }

  const expectedSlug = path.basename(filePath, ".mdx");
  if (data.slug && data.slug !== expectedSlug) {
    console.error(`❌ [${relativePath}] slug "${data.slug}" must match filename "${expectedSlug}"`);
    fileErrors += 1;
    totalErrors += 1;
  }

  const expectedCategory = path.basename(path.dirname(filePath));
  if (data.category && data.category !== expectedCategory) {
    console.error(
      `❌ [${relativePath}] category "${data.category}" must match directory "${expectedCategory}"`,
    );
    fileErrors += 1;
    totalErrors += 1;
  }

  if (fileErrors === 0) {
    console.log(`✅ [${relativePath}]`);
  }
}

function walk(dirPath: string) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
      continue;
    }

    if (entry.isFile() && entry.name.endsWith(".mdx")) {
      validateFile(fullPath);
    }
  }
}

if (!fs.existsSync(CONTENT_DIR)) {
  console.error(`❌ content directory not found: ${CONTENT_DIR}`);
  process.exit(1);
}

console.log("🔍 validating content directory...\n");
walk(CONTENT_DIR);

console.log(`\n📊 result: ${totalFiles} files, ${totalErrors} errors`);
if (totalErrors > 0) {
  console.error("\n❌ validation failed.");
  process.exit(1);
}

console.log("\n✅ all checks passed.");
