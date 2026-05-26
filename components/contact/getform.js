import { useEffect, useState } from "react";
import Image from "next/image";

import Contact1 from "../../public/images/contact.jpg";
import { Backicon, Shareicon } from "../common/svgicon";
import { ContactApi } from "@/Datas/endpoints/contact";
import { useRouter } from "next/router";

import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const ContactForm = ({ data, contact, blog }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const router = useRouter();

  const [successMessage, setSuccessMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(false);

  const onPhoneChange = (value) => {
    setPhone(value);
    const numericLength = value.replace(/\D/g, "").length;

    if (numericLength >= 5 && numericLength <= 13) {
      setPhoneError(false);
    } else {
      setPhoneError(true);
    }
  };

  const onSubmit = async (data) => {
    const phoneLength = phone.replace(/\D/g, "").length;
    if (!phone || phoneLength < 5 || phoneLength > 13) {
      setPhoneError(true);
      return;
    } else {
      setPhoneError(false);
    }

    try {
      const payload = {
        ...data,
        phone_number: `+${phone}`,
        utm_source: sessionStorage.getItem("utmSource") || "",
        utm_medium: sessionStorage.getItem("utmMedium") || "",
        utm_campaign: sessionStorage.getItem("utmCampaign") || "",
        source_url: sessionStorage.getItem("source_url") || "",
        ...(blog?{lead_type: `Blog Details`} :{}) 
      };
      const response = await ContactApi.contact(payload); // Make sure ContactApi.career supports JSON
      console.log("Submitted:", response);
      reset();
      if (response?.status === 200) {
        router.push("/thank-you");
      }
      setSuccessMessage("Your message has been submitted successfully! ✅");
      setTimeout(() => setSuccessMessage(""), 5000);
    } catch (err) {
      console.error("Submission error:", err);
    }
  };

  return (
    <section className=" pt-[50px] pb-[50px]">
      <div className="container">
        <div className="contact_form_sec">
          <div className="grid md:grid-cols-2 gap-[100px] items-center">
            <div>
              <Image src={Contact1} alt="" width={600} height={600} />
            </div>

            <div>
              <h4
                dangerouslySetInnerHTML={{ __html: data?.content?.title_7 }}
              />
              <p> {data?.content?.description}</p>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid md:grid-cols-2 gap-[25px] mt-[15px]">
                  <div>
                    <label>Name</label>
                    <input
                      type="text"
                      {...register("name", { required: "Name is required" })}
                      placeholder="Enter your Name"
                      className={errors.name && "border border-red-500"}
                    />
                  </div>

                  <div>
                    <label>Email ID</label>
                    <input
                      type="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: "Enter a valid email",
                        },
                      })}
                      placeholder="Enter your Email"
                      className={errors.email && "border border-red-500"}
                    />
                  </div>

                  <div>
                    <label>Phone Number</label>
                    <PhoneInput
                      country={"sa"}
                      value={phone}
                      onChange={onPhoneChange}
                      enableSearch
                      inputClass={`w-full ${
                        phoneError ? "border-red-500" : "border-gray-300"
                      }`}
                      inputStyle={{
                        width: "100%",
                        height: "54px",
                        paddingLeft: "48px",
                        borderColor: phoneError ? "#f87171" : "#d1d5db",
                        borderRadius: "8px",
                        fontSize: "14px",
                      }}
                    />
                  </div>

                  <div>
                    <label>Location</label>
                    <input
                      type="text"
                      {...register("location", {
                        required: "location is required",
                      })}
                      placeholder="Enter your Location"
                      className={errors.location && "border border-red-500"}
                    />
                  </div>
                </div>

                <div className="py-[25px]">
                  <label>Message</label>
                  <textarea
                    {...register("message")}
                    placeholder="Please describe your Enquiry"
                  />
                </div>

                {successMessage && (
                  <div className="mb-4 text-green-600">{successMessage}</div>
                )}

                <div className="flex items-center justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`btn ripple-button z-0 ${
                      isSubmitting ? "bg-gray-400" : "bg-black"
                    }`}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Now"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
