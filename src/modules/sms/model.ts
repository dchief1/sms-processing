import { faker } from "@faker-js/faker";
import { ISms } from "./type";

export const generateMockSMS = (count: number = 10): ISms[] => {
  return Array.from({ length: count }, () => ({
    phoneNumber: faker.helpers.replaceSymbols("+234-###-###-####"), // Replaces # with random digits
    message: faker.lorem.sentence(),
    sentAt: new Date(),
  }));
};
