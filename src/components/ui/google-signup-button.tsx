"use client";
import { createSupabaseBrowser } from "../../../lib/supabase/client";

export function GoogleButton() {
  const supabase = createSupabaseBrowser();

  const signInWithGooglePopup = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        skipBrowserRedirect: true, // <-- makes it popup-friendly
      },
    });

    if (error) {
      alert(error.message);
      return;
    }

    // Opens the Google popup
    const popup = window.open(
      data.url,
      "supabase-google-oauth",
      "width=500,height=600"
    );

    // Optional: poll until session exists
    const timer = setInterval(async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      if (sessionData.session) {
        clearInterval(timer);
        popup?.close();
        window.location.href = "/";
      }
    }, 500);
  };

  return (
    <button type="button" onClick={signInWithGooglePopup}>
      Continue with Google
    </button>
  );
}
