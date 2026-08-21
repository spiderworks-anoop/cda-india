import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { IoClose } from "react-icons/io5";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import PdfIcon from "../../public/images/pdf-icon.png";
import { ContactApi } from "@/Datas/endpoints/contact";

const MAX_RESUME_BYTES = 10 * 1024 * 1024;

const formatSize = (bytes) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const CareerForm = ({ career, onClose }) => {
  const router = useRouter();
  const fileInputRef = useRef(null);

  const {
    register,
    control,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const [isDragging, setIsDragging] = useState(false);

  // Stop the page behind the popup from scrolling while it is open.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  // The file lives in form state, so RHF's required/validate rules own it the
  // same way they own the phone. Validating straight after a pick means a bad
  // file is called out immediately instead of at submit time.
  const setResume = (onChange, selectedFile) => {
    onChange(selectedFile ?? null);
    trigger("resume");
  };

  const clearResume = (e, onChange) => {
    e.preventDefault();
    e.stopPropagation();
    onChange(null);
    trigger("resume");
    // Clearing the input lets the same file be picked again straight after.
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onSubmit = async (formData) => {
    if (!career) return;

    const formDataToSend = new FormData();
    formDataToSend.append("resume", formData.resume);
    formDataToSend.append("name", formData.name.trim());
    formDataToSend.append("email", formData.email.trim());
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("message", formData.message || "");
    formDataToSend.append("careers_id", career.id);

    formDataToSend.append("utm_source", sessionStorage.getItem("utmSource") || "");
    formDataToSend.append("utm_medium", sessionStorage.getItem("utmMedium") || "");
    formDataToSend.append("utm_campaign", sessionStorage.getItem("utmCampaign") || "");
    formDataToSend.append("source_url", sessionStorage.getItem("source_url") || "");

    try {
      const response = await ContactApi.career(formDataToSend);

      reset();
      if (fileInputRef.current) fileInputRef.current.value = "";

      if (response?.status === 200) {
        router.push("/thank-you");
        return;
      }

      onClose?.();
    } catch (err) {
      console.log("career error", err);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto overscroll-contain career_popup_bg"
      onClick={onClose}
    >
      <div className="flex min-h-full items-center justify-center p-[12px] md:p-[20px]">
        <div
          className="career_popup relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={onClose}
            className="career_popup_close absolute top-[12px] right-[12px] md:top-[18px] md:right-[18px] cursor-pointer z-[2]"
            aria-label="Close"
          >
            <IoClose size={22} />
          </button>

          <h2>Apply for this role</h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-[18px] md:mt-[26px]"
          >
            <div className="grid md:grid-cols-2 gap-[12px] md:gap-x-[28px] md:gap-y-[14px]">
              <div>
                <label>Name <i>*</i></label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className={errors.name ? "has-error" : ""}
                  {...register("name", {
                    required: "Name is required",
                    // required alone passes on "   ", so trim before checking
                    validate: (v) =>
                      (v || "").trim().length > 0 || "Name is required",
                  })}
                />
                {errors.name && (
                  <span className="field_error">{errors.name.message}</span>
                )}
              </div>

              <div>
                <label>Email <i>*</i></label>
                <input
                  type="text"
                  placeholder="Enter your email"
                  className={errors.email ? "has-error" : ""}
                  {...register("email", {
                    required: "Email is required",
                    validate: (v) =>
                      (v || "").trim().length > 0 || "Email is required",
                    pattern: {
                      // needs a dot in the domain - the looser \S+@\S+ accepts
                      // things like "a@b"
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email",
                    },
                  })}
                />
                {errors.email && (
                  <span className="field_error">{errors.email.message}</span>
                )}
              </div>

              <div>
                <label>Number <i>*</i></label>
                <Controller
                  name="phone"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Phone number is required",
                    validate: (value) => {
                      // The input mounts holding the dial code, so anything up
                      // to 3 digits means nothing was actually entered.
                      const digits = (value || "").replace(/\D/g, "").length;
                      if (digits <= 3) return "Phone number is required";
                      if (digits < 5 || digits > 13)
                        return "Enter a valid phone number";
                      return true;
                    },
                  }}
                  render={({ field }) => (
                    <PhoneInput
                      country={"in"}
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      enableSearch
                      inputClass={errors.phone ? "has-error" : ""}
                      inputStyle={{
                        width: "100%",
                        height: "42px",
                        paddingLeft: "48px",
                        background: "#f5f7fa",
                        borderColor: errors.phone ? "#f87171" : "#d1d5db",
                        borderRadius: "4px",
                        fontSize: "14px",
                      }}
                    />
                  )}
                />
                {errors.phone && (
                  <span className="field_error">{errors.phone.message}</span>
                )}
              </div>

              <div>
                <label>Resume <i>*</i></label>

                <Controller
                  name="resume"
                  control={control}
                  defaultValue={null}
                  rules={{
                    required: "Resume is required",
                    validate: (f) => {
                      if (!f) return "Resume is required";
                      if (f.type !== "application/pdf")
                        return "Please upload a valid PDF file";
                      if (f.size > MAX_RESUME_BYTES)
                        return "File size exceeds the 10MB limit";
                      return true;
                    },
                  }}
                  render={({ field }) => (
                    <div
                      className={`resume_drop ${field.value ? "has-file" : ""} ${
                        isDragging ? "is-dragging" : ""
                      } ${errors.resume ? "has-error" : ""}`}
                      onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragging(true);
                      }}
                      onDragLeave={() => setIsDragging(false)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setIsDragging(false);
                        setResume(field.onChange, e.dataTransfer.files?.[0]);
                      }}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="application/pdf"
                        onChange={(e) =>
                          setResume(field.onChange, e.target.files[0])
                        }
                        onBlur={field.onBlur}
                        className="resume_input"
                        aria-label="Upload resume"
                      />

                      <Image src={PdfIcon} alt="" width={22} height={22} />

                      <div className="resume_text">
                        <p className="resume_name">
                          {field.value ? field.value.name : "Upload your resume"}
                        </p>
                      </div>

                      {field.value ? (
                        <>
                          <span className="resume_size">
                            {formatSize(field.value.size)}
                          </span>
                          <button
                            type="button"
                            className="resume_remove"
                            onClick={(e) => clearResume(e, field.onChange)}
                            aria-label="Remove file"
                          >
                            <IoClose size={14} />
                          </button>
                        </>
                      ) : (
                        <span className="resume_browse">Browse</span>
                      )}
                    </div>
                  )}
                />

                <span className="field_hint">
                  Drag &amp; drop or browse &middot; PDF only &middot; up to 10 MB
                </span>

                {errors.resume && (
                  <span className="field_error">{errors.resume.message}</span>
                )}
              </div>

              <div className="md:col-span-2">
                <label>Message</label>
                <textarea
                  rows={3}
                  placeholder="Tell us a little about yourself"
                  {...register("message")}
                />
              </div>
            </div>

            <div className="mt-[18px] md:mt-[26px]">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn ripple-button"
              >
                {isSubmitting ? "Submitting..." : "Submit Now"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CareerForm;
