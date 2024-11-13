"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { categories } from "../../helpers/links";
import scss from "./AdminPage.module.scss";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@mui/material";
import { useGetMeQuery } from "../../redux/api/auth";

export default function AdminPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
    reset,
  } = useForm<IProduct>();
  const router = useRouter();
  const { data: session } = useSession();
  const { data: user = null } = useGetMeQuery();

  const onSubmit: SubmitHandler<IProduct> = async (data) => {
    try {
      const response = await axios.post("/api/v1/create", data);
      reset();
      if (response) return toast.success("Product created successfully!");
    } catch (error) {
      console.error("Create product error:", error);
      toast.error(`Ошибка: ${error.message || "Что-то пошло не так"}`);
    }
  };

  const isAdmin =
    (session && session.user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL) ||
    (user && user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL);

  useEffect(() => {
    if (!isAdmin) {
      router.push("/");
    }
  }, [session, user, router]);

  return (
    <div className={scss.AdminPage}>
      <ToastContainer />
      <div className="container">
        <div className={scss.content}>
          <h1>Create product</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <select {...register("category", { required: true })}>
              {categories.map((c, idx) => (
                <option key={idx} value={c.label}>
                  {c.label}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Product image"
              {...register("image", {
                required: "Пожалуйста, добавьте URL изображения",
              })}
            />
            {errors.image && <span>{errors.image.message}</span>}

            <input
              type="text"
              placeholder="Product name"
              {...register("title", {
                required: "Пожалуйста, добавьте название продукта",
              })}
            />
            {errors.title && <span>{errors.title.message}</span>}

            <input
              type="number"
              placeholder="Product price"
              {...register("price", { required: true, min: 0 })}
            />
            {errors.price && <span>Цена должна быть положительным числом</span>}

            <input
              type="number"
              placeholder="Sale price"
              {...register("salePrice")}
            />

            <input
              type="number"
              placeholder="Count"
              {...register("count", { required: true, min: 1 })}
            />
            {errors.count && <span>Количество должно быть хотя бы 1</span>}

            <textarea
              typeof="text"
              placeholder="Product description"
              rows={4}
              cols={4}
              {...register("description", {
                required: "Пожалуйста, добавьте описание",
              })}
            ></textarea>
            {errors.description && <span>{errors.description.message}</span>}
            {isLoading && <Button disabled>loading...</Button>}
            <Button type="submit" sx={{ color: "#fff", bgcolor: "blue" }}>
              Create
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
