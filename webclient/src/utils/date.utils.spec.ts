import { describe, expect, test } from "vitest";

import { formatDate, toLocalizedDateString } from "./date.utils";

describe("date.utils", () => {
  describe("formatDate", () => {
    test("should format date correctly when month and day are less than 10", () => {
      const date = new Date(2022, 0, 1); // January is 0 in JavaScript Date
      const result = formatDate(date);
      expect(result).toBe("2022-01-01");
    });

    test("should format date correctly when month and day are greater than or equal to 10", () => {
      const date = new Date(2022, 10, 10); // November is 10 in JavaScript Date
      const result = formatDate(date);
      expect(result).toBe("2022-11-10");
    });

    test("should format date correctly when month is less than 10 and day is greater than or equal to 10", () => {
      const date = new Date(2022, 0, 10); // January is 0 in JavaScript Date
      const result = formatDate(date);
      expect(result).toBe("2022-01-10");
    });

    test("should format date correctly when month is greater than or equal to 10 and day is less than 10", () => {
      const date = new Date(2022, 10, 1); // November is 10 in JavaScript Date
      const result = formatDate(date);
      expect(result).toBe("2022-11-01");
    });
  });

  describe("toGermanDateString", () => {
    test("should format date correctly in German format", () => {
      const date = "2022-01-01";
      const result = toLocalizedDateString(date);
      expect(result).toBe("1.1.2022");
    });

    test("should handle invalid date string", () => {
      const date = "invalid-date";
      const result = toLocalizedDateString(date);
      expect(result).toBe("Invalid Date");
    });
  });
});
