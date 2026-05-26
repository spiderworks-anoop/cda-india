import { useEffect, useState } from "react";
import Image from "next/image";

import Blog1 from "../../public/images/pros3.png";
import { Backicon, Shareicon } from "../common/svgicon";

const ContactList = ({ data }) => {
  return (
    <section className="contact_list_sec pt-[50px] pb-[50px]">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-[25px]">
          <div className="cont_list">
            <h4> {data?.content?.title_1} </h4>
            <iframe
              src={data?.content?.corporate_address_map}
              width="100%"
              frameborder="0"
              allowfullscreen=""
            ></iframe>

            <p> {data?.content?.corporate_address}</p>
            <a href={`mailto:${data?.content?.corporate_email}`}>
              {data?.content?.corporate_email}
            </a>

            <div className="flex gap-[5px] flex-wrap mt-[15px]">
              <a href={`tel:${data?.content?.corporate_phone_number_1}`}>
                {data?.content?.corporate_phone_number_1},{" "}
              </a>
              <a href={`tel:${data?.content?.corporate_phone_number_2}`}>
                {data?.content?.corporate_phone_number_2},
              </a>
              <a href={`tel:${data?.content?.corporate_phone_number_3}`}>
                {data?.content?.corporate_phone_number_3}
              </a>
            </div>
          </div>

          <div className="cont_list">
            <h4> {data?.content?.title_5} </h4>
            <iframe
              src={data?.content?.registered_address_map}
              width="100%"
              frameborder="0"
              allowfullscreen=""
            ></iframe>

            <p> {data?.content?.registered_address}</p>
            <a href={`mailto:${data?.content?.registered_email}`}>
              {data?.content?.registered_email}
            </a>

            <div className="flex gap-[5px] flex-wrap mt-[15px]">
              <a href={`tel:${data?.content?.registered_phone_number_1}`}>
                {data?.content?.registered_phone_number_1},
              </a>
              <a href={`tel:${data?.content?.registered_phone_number_2}`}>
                {data?.content?.registered_phone_number_2},
              </a>
              <a href={`tel:${data?.content?.registered_phone_number_3}`}>
                {data?.content?.registered_phone_number_3}
              </a>
            </div>
          </div>

          <div className="cont_list">
            <h4> {data?.content?.title_6} </h4>
            <iframe
              src={data?.content?.abudhabi_registered_address_map}
              width="100%"
              frameborder="0"
              allowfullscreen=""
            ></iframe>

            <p> {data?.content?.abudhabi_registered_address}</p>
            <a href={`mailto:${data?.content?.abudhabi_registered_email}`}>{data?.content?.abudhabi_registered_email}</a>
            <div className="flex gap-[5px] flex-wrap mt-[15px]">
              <a href={`tel:${data?.content?.abudhabi_registered_phone_number_1}`}> {data?.content?.abudhabi_registered_phone_number_1}, </a>
              <a href={`tel:${data?.content?.abudhabi_registered_phone_number_2}`}>{data?.content?.abudhabi_registered_phone_number_2},</a>
              <a href={`tel:${data?.content?.abudhabi_registered_phone_number_3}`}> {data?.content?.abudhabi_registered_phone_number_3}</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactList;
