import { useEffect, useState } from "react";
import Image from "next/image";
import Logo1 from "../../public/images/logo.svg";
import Logo2 from "../../public/images/cl1.png";
import Logo3 from "../../public/images/cl2.png";
import Logo4 from "../../public/images/cl3.png";
import Logo5 from "../../public/images/cl4.png";
import PdfIcon from "../../public/images/pdf-icon.png";
import { IoClose } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import {
  BlueBtn,
  CircleArrow2icon,
  LargeArrowicon,
  Lineicon,
  Medalicon,
} from "../common/svgicon";
import Accordion from "../common/Accordion";
import { ContactApi } from "@/Datas/endpoints/contact";

const CareerList = ({ listdata, data }) => {
  const [openIndex, setOpenIndex] = useState(null); // All closed initially
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCareer, setSelectedCareer] = useState(null);
  const router = useRouter();

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
    clearErrors,
  } = useForm();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      if (selectedFile.size <= 10 * 1024 * 1024) {
        setFile(selectedFile);
        clearErrors("resume");
      } else {
        setError("resume", {
          type: "manual",
          message: "File size exceeds 10MB limit",
        });
        setFile(null);
      }
    } else {
      setError("resume", {
        type: "manual",
        message: "Please upload a valid PDF file",
      });
      setFile(null);
    }
  };

  const onSubmit = async (formData) => {
    if (!file || !selectedCareer) {
      if (!file) {
        setError("resume", {
          type: "manual",
          message: "Resume is required",
        });
      }
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("resume", file);
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("careers_id", selectedCareer.id);

    const utm_source = sessionStorage.getItem("utmSource") || "";
    const utm_medium = sessionStorage.getItem("utmMedium") || "";
    const utm_campaign = sessionStorage.getItem("utmCampaign") || "";
    const source_url = sessionStorage.getItem("source_url") || "";

    formDataToSend.append("utm_source", utm_source);
    formDataToSend.append("utm_medium", utm_medium);
    formDataToSend.append("utm_campaign", utm_campaign);
    formDataToSend.append("source_url", source_url);

    try {
      setLoading(true);
      const response = await ContactApi.career(formDataToSend);

      reset();
      if (response?.status === 200) {
        router.push("/thank-you");
      }
      setFile(null);
      setSuccessMessage("Your resume has been submitted successfully! ✅");
      setIsModalOpen(false);
      setSelectedCareer(null);
      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
    } catch (err) {
      console.log("career error", err);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFile(null);
    setSelectedCareer(null);
    reset();
    clearErrors("resume");
  };

  const handleApplyNow = (career) => {
    setSelectedCareer(career);
    setIsModalOpen(true);
  };

  return (
    <section className="Career_List_cntr pt-[20px] md:pt-[80px] pb-[80px]">
      <div className="container">
        <div className="md:flex items-center justify-between Career_List_head">
          <div className="max-w-[450px]">
            <h3>{data?.content?.title_1}</h3>
          </div>
          <div className="max-w-[650px] mt-[15px] md:mt-[0]">
            <div
              dangerouslySetInnerHTML={{ __html: data?.content?.description_1 }}
            />
          </div>
        </div>

        <hr />

        <div className="career_data w-full flex flex-col gap-[20px]">
          {listdata?.map((item, index) => (
            <Accordion
              key={index}
              title={item?.title}
              content={
                <div className="relative">
                  <h5
                    dangerouslySetInnerHTML={{
                      __html: item?.short_description,
                    }}
                  />
                  <h5
                    dangerouslySetInnerHTML={{
                      __html: item?.last_application_date,
                    }}
                  />
                  <h5
                    dangerouslySetInnerHTML={{
                      __html: item?.department,
                    }}
                  />
                  <div
                    dangerouslySetInnerHTML={{
                      __html: item?.responsibilities,
                    }}
                  />
                  <div
                    dangerouslySetInnerHTML={{ __html: item?.eligibility }}
                  />
                  <div dangerouslySetInnerHTML={{ __html: item?.skills }} />
                  <div className="flex items-center gap-[15px]">
                    <h5>No: of Vacancies:</h5>
                    <h5 dangerouslySetInnerHTML={{ __html: item?.vacancies }} />
                  </div>
                  <div className="flex items-center gap-[15px]">
                    <h5>Job Locations:</h5>
                    <h5
                      dangerouslySetInnerHTML={{
                        __html: item?.job_location,
                      }}
                    />
                  </div>
                  <div className="relative mt-4 md:absolute md:bottom-[20px] md:right-0 md:mt-0">
                    <button
                      className="cursor-pointer btn_blue_1 flex items-center gap-[22px]"
                      onClick={() => handleApplyNow(item)}
                      disabled={loading}
                    >
                      APPLY NOW <CircleArrow2icon />
                    </button>
                  </div>
                </div>
              }
              isOpen={openIndex === index}
              onToggle={() => toggleAccordion(index)}
            />
          ))}
        </div>

        {isModalOpen && selectedCareer && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            onClick={closeModal}
          >
            <div className="absolute inset-0 bg-gray-500 opacity-50"></div>
            <div
              className="bg-white p-8 rounded-lg shadow-lg z-10 animate-fadeIn max-w-lg w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-600 cursor-pointer"
              >
                <IoClose size={24} />
              </button>
              <h3 className="text-2xl font-bold mb-6 text-center">
                {selectedCareer.title}
              </h3>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                      {...register("name", { required: "Name is required" })}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Invalid email address",
                        },
                      })}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Resume
                  </label>
                  <div className="relative flex items-center justify-center border-2 border-dashed border-blue-500 p-6 rounded-md">
                    <input
                      type="file"
                      accept="application/pdf"
                      {...register("resume", {
                        required: "Resume is required",
                      })}
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <div className="flex items-center space-x-4">
                      <Image
                        src={PdfIcon}
                        alt="PDF Icon"
                        width={46}
                        height={46}
                      />
                      <div>
                        {file ? (
                          <p className="text-sm font-medium">{file.name}</p>
                        ) : (
                          <>
                            <p className="text-sm font-medium">Upload Resume</p>
                            <p className="text-xs text-gray-500">
                              Max 10 MB files are allowed
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  {errors.resume && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.resume.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="bg-blue-600 text-white py-3 px-6 mx-auto rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit Now"}
                </button>
              </form>
            </div>
          </div>
        )}

        {successMessage && (
          <div className="alert_sucess_bg">
            <div className="alert_sucess flex justify-center items-center">
              {successMessage}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CareerList;
