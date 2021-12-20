/* eslint node/no-deprecated-api: 'off' */
import assert from "node:assert";
import getLocFromIndex from "../../../lib/utils/get-loc-from-index.js";

describe("getLocFromIndex()", function () {
  describe("when end-of-file === newline", function () {
    it("should compute the location (simplest case)", function () {
      const index = 6;
      const lines = ["hey\n", "how\n", "are\n", "you\n", ""];

      const { line, column } = getLocFromIndex(index, lines);

      assert.equal(line, 2, "right line");
      assert.equal(column, 2, "right column");
    });

    it("should compute location (on first line)", function () {
      const index = 2;
      const lines = ["hey\n", "how\n", "are\n", "you\n", ""];

      const { line, column } = getLocFromIndex(index, lines);

      assert.equal(line, 1, "right line");
      assert.equal(column, 2, "right column");
    });

    it("should compute location (on first line's newline)", function () {
      const index = 4;
      const lines = ["hey\n", "how\n", "are\n", "you\n", ""];

      const { line, column } = getLocFromIndex(index, lines);

      assert.equal(line, 1, "right line");
      assert.equal(column, 4, "right column");
    });

    it("should compute location (on last line)", function () {
      const index = 13;
      const lines = ["hey\n", "how\n", "are\n", "you\n", ""];

      const { line, column } = getLocFromIndex(index, lines);

      assert.equal(line, 4, "right line");
      assert.equal(column, 1, "right column");
    });

    it("should compute location (on last line's newline)", function () {
      const index = 16;
      const lines = ["hey\n", "how\n", "are\n", "you\n", ""];

      const { line, column } = getLocFromIndex(index, lines);

      assert.equal(line, 4, "right line");
      assert.equal(column, 4, "right column");
    });
  });

  describe("when end-of-file !== newline", function () {
    it("should compute the location (simplest case)", function () {
      const index = 6;
      const lines = ["hey\n", "how\n", "are\n", "you"];

      const { line, column } = getLocFromIndex(index, lines);

      assert.equal(line, 2, "right line");
      assert.equal(column, 2, "right column");
    });

    it("should compute location (on first line)", function () {
      const index = 2;
      const lines = ["hey\n", "how\n", "are\n", "you"];

      const { line, column } = getLocFromIndex(index, lines);

      assert.equal(line, 1, "right line");
      assert.equal(column, 2, "right column");
    });

    it("should compute location (on first line's newline)", function () {
      const index = 4;
      const lines = ["hey\n", "how\n", "are\n", "you"];

      const { line, column } = getLocFromIndex(index, lines);

      assert.equal(line, 1, "right line");
      assert.equal(column, 4, "right column");
    });

    it("should compute location (on last line)", function () {
      const index = 13;
      const lines = ["hey\n", "how\n", "are\n", "you"];

      const { line, column } = getLocFromIndex(index, lines);

      assert.equal(line, 4, "right line");
      assert.equal(column, 1, "right column");
    });

    it("should fallback on last character if index is out of range", function () {
      const index = 50;
      const lines = ["hey\n", "how\n", "are\n", "you"];

      const { line, column } = getLocFromIndex(index, lines);

      assert.equal(line, 4, "right line");
      assert.equal(column, 3, "right column");
    });
  });
});
