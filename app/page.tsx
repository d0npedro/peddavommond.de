import { redirect } from "next/navigation";

/**
 * vinext-only fallback. Production static root is public/index.html (hub).
 * Desktop remains at /win11/.
 */
export default function Home() {
  redirect("/win11/");
}
