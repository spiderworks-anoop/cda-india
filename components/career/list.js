import { useState } from "react";

import { CircleArrow2icon } from "../common/svgicon";
import Accordion from "../common/Accordion";
import CareerForm from "./CareerForm";
import { HTMLParser } from "@/utils/HTMLParser";

const CareerList = ({ listdata, data }) => {
  const [openIndex, setOpenIndex] = useState(0); // All closed initially
  const [selectedCareer, setSelectedCareer] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleApplyNow = (career) => {
    setSelectedCareer(career);
  };

  const closeModal = () => {
    setSelectedCareer(null);
  };

  return (
    <section className="Career_List_cntr pt-[20px] md:pt-[80px] pb-[80px]">
      <div className="container">
        <div className="md:flex items-center justify-between Career_List_head">
          <div className="max-w-[450px]">
            <h3>{data?.content?.title_1}</h3>
          </div>
          <div className="max-w-[650px] mt-[15px] md:mt-[0]">
            <div>{HTMLParser(data?.content?.description_1)}</div>
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
                  <div className='h5'>{HTMLParser(item?.short_description)}</div>
                  <div className='h5'>{HTMLParser(item?.last_application_date)}</div>
                  <div className='h5'>{HTMLParser(item?.department)}</div>
                  <div>{HTMLParser(item?.responsibilities)}</div>
                  <div>{HTMLParser(item?.eligibility)}</div>
                  <div>{HTMLParser(item?.skills)}</div>
                  <div className="flex items-center gap-[15px]">
                    <h5>No: of Vacancies:</h5>
                    <div className='h5'>{HTMLParser(item?.vacancies)}</div>
                  </div>
                  <div className="flex items-center gap-[15px]">
                    <h5>Job Locations:</h5>
                    <div className='h5'>{HTMLParser(item?.job_location)}</div>
                  </div>
                  <div className="relative mt-4 md:absolute md:bottom-[20px] md:right-0 md:mt-0">
                    <button
                      className="cursor-pointer btn_blue_1 flex items-center gap-[22px]"
                      onClick={() => handleApplyNow(item)}
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

        {selectedCareer && (
          <CareerForm career={selectedCareer} onClose={closeModal} />
        )}
      </div>
    </section>
  );
};

export default CareerList;
