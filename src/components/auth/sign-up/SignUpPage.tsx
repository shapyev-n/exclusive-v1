"use client";

import Link from "next/link";
import scss from "./SignUpPage.module.scss";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetMeQuery, useSignupMutation } from "../../../redux/api/auth";
// import { OAuthButton } from "../OAuthSignIn";

const img =
  "https://cdni.iconscout.com/illustration/premium/thumb/sign-up-illustration-download-in-svg-png-gif-file-formats--account-login-miscellaneous-pack-illustrations-5230178.png?f=webp";
const link = "/sign-in";

const SignUpPage = () => {
  const [password, setPassword] = useState<boolean>(false);
  const { register, handleSubmit } = useForm<IUser>();
  const router = useRouter();
  const { data: user = null } = useGetMeQuery();
  const [signup] = useSignupMutation();

  const onSubmit: SubmitHandler<IUser> = async (data) => {
    try {
      signup(data);
      router.push("/");
    } catch (error) {
      toast.error(`Ошибка: ${error.message || "Что-то пошло не так"}`);
    }
  };



  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  return (
    <section className={scss.SignUpPage}>
      <ToastContainer />
      <div className="container">
        <div className={scss.content}>
          <div className={scss.signUp_content}>
            <div className={scss.signUp_image}>
              <Image width={1000} height={1000} src={img} alt="ima" />
            </div>
            <div className={scss.signUp_auth}>
              <div className={scss.signUp_text}>
                <h1>Create an account</h1>
                {/* <OAuthButton />
                <center style={{ width: "100%" }}>or</center> */}

                <span>Enter your details below</span>
              </div>

              <form
                className={scss.signUp_inputs}
                onSubmit={handleSubmit(onSubmit)}
              >
                <input
                  type="text"
                  placeholder="Photo"
                  {...register("image", { required: true })}
                />
                <input
                  type="text"
                  placeholder="Name"
                  {...register("name", {
                    required: true,
                  })}
                />
                <input
                  type="text"
                  placeholder="Email"
                  {...register("email", {
                    required: true,
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Неверный адрес электронной почты",
                    },
                  })}
                />
                <input
                  type={!password ? "password" : "text"}
                  placeholder="Password"
                  {...register("password", {
                    required: "Необходим пароль",
                    minLength: {
                      value: 8,
                      message: "Пароль не совпадает",
                    },
                  })}
                />
                <span
                  style={{
                    opacity: "0.5",
                    fontSize: "12px",
                    cursor: "pointer",
                  }}
                  onClick={() => setPassword(!password)}
                >
                  {password ? "Hide password" : "Show password"}
                </span>

                <button type="submit">Create Account</button>
              </form>
              <Link href={link}>Allready have account?</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUpPage;
