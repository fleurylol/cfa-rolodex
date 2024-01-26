export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/contacts/new", "/contacts/edit/:id+"],
};
