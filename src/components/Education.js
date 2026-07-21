import React, { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import AboutIcon from "./LiIcon";

const Details = ({ type, time, place, info, infoLink }) => {
  const ref = useRef(null);
  return (
    <li
      ref={ref}
      className="my-8 first:mt-0 last:mb-0 w-[60%] mx-auto flex flex-col items-start justify-between md:w-[80%]"
    >
      <AboutIcon reference={ref} />
      <motion.div
        initial={{ y: 50 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        <h3 className="capitalize font-bold text-2xl sm:text-xl xs:text-lg">{type}</h3>
        <span className="capitalize text-dark/75 font-medium dark:text-light/50 xs:text-sm">
          {time} | {place}
        </span>
        <p className="font-medium w-full md:text-sm">
          {info}
          {infoLink && (
            <a href={infoLink} target="_blank" className="text-primary dark:text-primaryDark block mt-2 hover:underline">
              Verify Credential ↗
            </a>
          )}
        </p>
      </motion.div>
    </li>
  );
};

const Education = () => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center start"],
  });

  return (
    <div className="my-64">
      <h2 className="font-bold text-8xl mb-32 w-full text-center md:text-6xl xs:text-4xl md:mb-16">Education</h2>

      <div ref={ref} className="relative w-[75%] mx-auto lg:w-[90%] md:w-full">
        <motion.div
          className="absolute left-9 top-0 w-[4px] md:w-[2px] md:left-[30px] xs:left-[20px] h-full bg-dark  origin-top rounded-full dark:bg-primaryDark dark:shadow-3xl"
          style={{ scaleY: scrollYProgress }}
        />
        <ul className="w-full flex flex-col items-start justify-between ml-4">
          <Details
            type="Computer Systems Engineering and Business Administration"
            time="Jan 2021 - Present"
            place="Pontificia Universidad Javeriana Cali"
            info="Currently studying with a strong focus on Artificial Intelligence, Machine Learning, Data Analytics, and Cloud Computing. Combining technical development expertise with a business-oriented perspective."
          />

          <Details
            type="AI Fundamentals"
            time="DataCamp"
            place="Online"
            infoLink="https://www.datacamp.com/skill-verification/AIF0025709380332"
          />

          <Details
            type="Data Scientist Associate"
            time="DataCamp"
            place="Online"
            infoLink="https://www.datacamp.com/certificate/DSA0019011185486"
          />

          <Details
            type="AWS Academy Graduate"
            time="Credly"
            place="Online"
            infoLink="https://www.credly.com/badges/aa6529e0-7411-4e87-8ed8-674ea7608b60/public_url"
          />

          <Details
            type="Supervised Learning with scikit-learn"
            time="DataCamp"
            place="Online"
            infoLink="https://www.datacamp.com/completed/statement-of-accomplishment/course/68260f7987589ffa0ec5c3a984b82db460f396d7"
          />
        </ul>
      </div>
    </div>
  );
};

export default Education;
