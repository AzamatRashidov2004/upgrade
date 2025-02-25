// src/api/email.ts
import apiClient from "./client";
interface ContactEmailRequest {
  name: string;
  email: string;
  message: string;
}

export const sendContactEmail = async (
  data: ContactEmailRequest
): Promise<void> => {
  return apiClient("/email/contact", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
