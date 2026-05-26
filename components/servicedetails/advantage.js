import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { BlueBtn, Eye2icon, Eyeicon } from "../common/svgicon";
import Popup from "../common/Popup";

const ToggleItem = ({ capt, title, text, isOpen, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      viewport={{ once: true }}
      className="account_list"
    >
      <div className="flex items-center gap-[30px] w-full">
        <h5>{capt}</h5>
        <div className="w-full">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={onClick}
          >
            <h4>{title}</h4>
            {isOpen ? <Eye2icon /> : <Eyeicon />}
          </div>
          {isOpen && <p>{text}</p>}
        </div>
      </div>
    </motion.div>
  );
};

const SerDetAdvantage = ({ data }) => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);

  return (
    data?.services_key_advantages?.length > 0 && (
      <>
        {isPopupOpen && (
          <Popup isOpen={isPopupOpen} onClose={() => setPopupOpen(false)} />
        )}

        <section className="ser-det-advantage pt-[50px]">
          <div className="container relative z-[1]">
            <div className="max-w-[425px]">
              <h2
                dangerouslySetInnerHTML={{ __html: data?.content?.title_3 }}
              />
            </div>

            <div className="advantage_bg">
              <div className="md:flex">
                <div className="w-full max-w-[720px] advantage_left">
                  <div className="w-full advantage_left_scroll flex flex-col gap-[28px]">
                    {data?.services_key_advantages?.map((items, index) => (
                      <ToggleItem
                        key={index}
                        capt={index + 1}
                        title={items?.title}
                        text={items?.short_description}
                        isOpen={openIndex === index}
                        onClick={() =>
                          setOpenIndex(openIndex === index ? null : index)
                        }
                      />
                    ))}
                  </div>
                </div>

                <div className="advantage_right w-full">
                  <div className="max-w-[285px] ml-auto mr-auto h-full flex flex-col items-center justify-between">
                    <div className="mb-[25px]">
                      <h4>{data?.static_page_content?.title_4}</h4>
                      <h5>{data?.static_page_content?.short_description}</h5>
                      <div
                        className="flex items-center w-full justify-center cursor-pointer"
                        onClick={() => setPopupOpen(true)}
                      >
                        <BlueBtn
                          btntext={data?.static_page_content?.button_text_4}
                        />
                      </div>
                    </div>

                    <Image
                      src={data?.static_page_content?.media?.file_path}
                      alt=""
                      width={447}
                      height={300}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  );
};

export default SerDetAdvantage;
