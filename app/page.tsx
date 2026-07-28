import { redirect } from "next/navigation";

/**
 * Root URL = Windows 11 desktop shell (project launcher).
 * Classic marketing landing is no longer the entry; use /origin or static hubs.
 */
export default function Home() {
  redirect("/win11/");
}
