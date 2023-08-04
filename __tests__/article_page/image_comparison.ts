import path from "node:path";
import {toMatchImageSnapshot} from "jest-image-snapshot"
const TARGET_PATH = path.resolve(__dirname, "../../docs/article.html");
expect.extend({ toMatchImageSnapshot });
describe("article page", () => {
  beforeEach(async () => {
    await page.goto(`file://${TARGET_PATH}`);
  });

  describe("viewport width >= 768px", () => {
    test("screenshot should match expected image", async () => {
      await page.setViewport({ width: 768, height: 1024 });
      const image = await page.screenshot({
        path: path.resolve(__dirname, "__image_snapshots__", "actual_large.png"),
        fullPage: true,
      });

      expect(image).toMatchImageSnapshot({
        comparisonMethod: "ssim",
        customSnapshotIdentifier: "expected_large",
        allowSizeMismatch: true,
        failureThreshold: 0.16,
        failureThresholdType: "percent",
      });
    });
  });
  describe("viewport width < 768px", () => {
    test("screenshot should match expected image", async () => {
      await page.setViewport({ width: 767, height: 1024 });
      const image = await page.screenshot({
        path: path.resolve(__dirname, "__image_snapshots__", "actual_small.png"),
        fullPage: true,
      });

      expect(image).toMatchImageSnapshot({
        comparisonMethod: "ssim",
        customSnapshotIdentifier: "expected_small",
        allowSizeMismatch: true,
        failureThreshold: 0.16,
        failureThresholdType: "percent",
      });
    });
  });
});