import { describe, expect, test } from "vitest";

import { calculatePercentage, roundTo2Digits } from "./number.utils";

describe("number.utils", () => {
  describe("roundTo2Digits", () => {
    test("should round positive numbers correctly", () => {
      const num = 123.456;
      const result = roundTo2Digits(num);
      expect(result).toBe(123.46);
    });

    test("should round negative numbers correctly", () => {
      const num = -123.456;
      const result = roundTo2Digits(num);
      expect(result).toBe(-123.46);
    });

    test("should handle numbers with less than 2 decimal places correctly", () => {
      const num = 123.4;
      const result = roundTo2Digits(num);
      expect(result).toBe(123.4);
    });

    test("should handle numbers with no decimal places correctly", () => {
      const num = 123;
      const result = roundTo2Digits(num);
      expect(result).toBe(123);
    });
  });

  describe("calculatePercentage", () => {
    test("should calculate percentage correctly for positive numbers", () => {
      const result = calculatePercentage(50, 200);
      expect(result).toBe(25);
    });

    test("should calculate percentage correctly when num1 is 0", () => {
      const result = calculatePercentage(0, 200);
      expect(result).toBe(0);
    });

    test("should throw an error when num2 is 0", () => {
      expect(() => calculatePercentage(50, 0)).toThrowError("Cannot divide by zero");
    });
  });
});
