"use client";

import scss from "./Contact.module.scss";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { SubmitHandler, useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

interface ISendMessage {
  name: string;
  email: string;
  phone: number;
  message: string;
}
const TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_TOKEN;
const CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<ISendMessage>({
    mode: "onChange",
  });

  const messageModel = (data: ISendMessage) => {
    let messageTG = `Username: <b>${data.name}</b>\n`;
    messageTG += `Email: <b>${data.email}</b>\n`;
    messageTG += `Phone: <b>${data.phone}</b>\n`;
    messageTG += `Message: <b>${data.message}</b>`;
    return messageTG;
  };

  const onSubmit: SubmitHandler<ISendMessage> = async (data) => {
    await axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      parse_mode: "html",
      text: messageModel(data),
    });

    toast.success("Your message has been sent successfully!");
    reset();
  };

  return (
    <section className={scss.Contact}>
      <ToastContainer />
      <div className="container">
        <div className={scss.content}>
          <div className={scss.adres}>
            <div className={scss.top}>
              <h3>
                <span className={scss.icons}>
                  <PhoneIcon />
                </span>
                Call To Us
              </h3>
              <p>We are available 24/7, 7 days a week.</p>
              <p>Phone: +996504446200</p>
            </div>
            <hr />
            <div className={scss.bottom}>
              <h3>
                <span className={scss.icons}>
                  <EmailIcon />
                </span>
                Write To US
              </h3>
              <p>Fill out our form and we will contact you within 24 hours.</p>
              <p>Emails: n89006404879@gmail.com</p>
            </div>
          </div>
          <form className={scss.contact} onSubmit={handleSubmit(onSubmit)}>
            <div className={scss.inputs}>
              <input
                type="text"
                placeholder="Your Name *"
                {...register("name", {
                  required: true,
                })}
              />
              <input
                type="text"
                placeholder="Your Email *"
                {...register("email", {
                  required: true,
                })}
              />

              <input
                type="number"
                placeholder="Your Phone *"
                {...register("phone", {
                  required: true,
                })}
              />
            </div>
            <textarea
              cols={30}
              rows={10}
              placeholder="Your Massage"
              {...register("message", {
                required: true,
              })}
            ></textarea>
            {isSubmitting ? (
              <button disabled type="button">
                Send...
              </button>
            ) : (
              <button type="submit">Send Massage</button>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
