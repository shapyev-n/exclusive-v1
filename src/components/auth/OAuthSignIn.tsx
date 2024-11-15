"use client";

import { Provider } from "@supabase/supabase-js";
import scss from "./Auth.module.scss";
import GoogleIcon from "@mui/icons-material/Google";
import { signInWithOAuth } from "../../app/(root)/api/v1/auth/signInOAuth/actions";

interface ButtonData {
  label: string;
  provider: Provider;
}

const buttons: ButtonData[] = [{ label: "Google", provider: "google" }];

export function OAuthButton() {
  return (
    <div className={scss.social}>
      {buttons.map(({ label, provider }) => (
        <button key={provider} onClick={() => signInWithOAuth(provider)}>
          <GoogleIcon /> Sign in with {label}
        </button>
      ))}
    </div>
  );
}
