"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import scss from "./LoginPage.module.scss";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetMeQuery, useLoginMutation } from "../../../redux/api/auth";

interface IUser {
  email: string;
  password: string;
}

const img =
  "https://cdni.iconscout.com/illustration/premium/thumb/sign-up-illustration-download-in-svg-png-gif-file-formats--account-login-miscellaneous-pack-illustrations-5230178.png?f=webp";
const link = "/sign-up";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>();
  const router = useRouter();
  const { data: user = null } = useGetMeQuery();
  const [login] = useLoginMutation();

  const onSubmit: SubmitHandler<IUser> = async (data) => {
    try {
      login(data);
      router.push("/");
    } catch (error) {
      toast.error(error);
    }
  };
  const signInOAuthHandler = async () => {
    try {
      const response = await fetch("/api/v1/auth/signInOAuth", {
        method: "POST",
      });
      const data = await response.json();
      if (data.url) {
        router.push(data.url);
      }
    } catch (error) {
      toast.error("Ошибка авторизации через OAuth", error);
      toast.error("Ошибка аутентификации через Google");
    }
  };
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  return (
    <section className={scss.LoginPage}>
      <ToastContainer />
      <div className="container">
        <div className={scss.content}>
          <div className={scss.signUp_content}>
            <div className={scss.signUp_image}>
              <Image
                width={1000}
                height={1000}
                src={img}
                alt="Login illustration"
              />
            </div>
            <div className={scss.signUp_auth}>
              <div className={scss.signUp_text}>
                <h1>Login</h1>
                <span>Enter your details below</span>
              </div>
              <form
                className={scss.signUp_inputs}
                onSubmit={handleSubmit(onSubmit)}
              >
                <input
                  type="text"
                  placeholder="Email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && <span>{errors.email.message}</span>}

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                />
                {errors.password && <span>{errors.password.message}</span>}

                <span
                  style={{
                    opacity: "0.5",
                    fontSize: "12px",
                    cursor: "pointer",
                  }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide password" : "Show password"}
                </span>

                <button type="submit">Login</button>
                <center style={{ width: "100%" }}>or</center>
                <button onClick={() => signInOAuthHandler()}>
                  SIGN IN WITH GOOGLE
                </button>

                <Link href={link}>{`Don't`} have an account? Sign up</Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
