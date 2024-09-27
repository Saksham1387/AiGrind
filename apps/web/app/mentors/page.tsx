"use client";
import React from "react";
import { BriefcaseBusiness } from "lucide-react";
import { useRouter } from "next/navigation";

const mentors = [
  {
    mentorName: "Malay Kishore Dutta",
    position: "Industry Leader",
    mentorImage: "/dutta-mkc.jpeg",
    linkedInUrl: "https://www.linkedin.com/in/prof-m-k-dutta-75337739/",
    skills: ["AI", "Computer Vision", "Generative AI", "Research"],
    description: `Prof. Malay Kishore Dutta is an AI Scientist recognized among the top 2% of influential AI scientists by Stanford University in 2023. With over 10 years of academic leadership, he is the Director of the Centre for Artificial Intelligence and Dean of Student Research at Amity University. His research focuses on signal processing, AI, and computer vision with a strong emphasis on technology for humanity. He has published 336 documents, garnered 3,950 citations, and holds an h-index of 30. Prof. Dutta is also a Visiting Professor at Brno University of Technology.`,
    companyLogos: [
      { src: "/amity-logo.png", name: "Amity University" },
      { src: "/brno-logo.jpeg", name: "Brno University" },
      { src: "/apj-logo.jpeg", name: "Dr. A.P.J University" },
      { src: "/aktu-logo.jpeg", name: "Centre for Advanced Studies, AKTU" },
    ],
    price: "Rs 249",
    sessionDuration: "15 Mintues session",
    flexibleScheduling: "Wednesday 7-8 PM",
    satisfaction: "1 Free Session",
    experience: "13 years experience",
    cal: "https://cal.com/mkdutta",
  },
  {
    mentorName: "Ayush Singh Rajput",
    position: "Industry Leader",
    mentorImage: "/ayush-img.png",
    linkedInUrl: "https://www.linkedin.com/in/ayush-singh-rajput-160b64220/",
    skills: ["Signal Processing", "DevOps", "Generative AI"],
    description:
      "Ayush Singh Rajput is an AI Engineer at Amity University with over a year of experience in AI, Data Science, and Machine Learning. He holds an M.Tech in Data Science from Amity University (2021-2023) . Ayush specializes in computer vision, medical imaging, and NLP, and is proficient in managing AI infrastructure, manage DGX A100 servers and have conducted research in signal processing and adaptive algorithms.",
    companyLogos: [{ src: "/amity-logo.png", name: "Amity University" }],
    price: "Rs 199",
    sessionDuration: "15 Minutes session",
    flexibleScheduling: "Mon-Fri  7-8:30 PM",
    experience: "2 years experience",
    satisfaction: "1 Free Session",

    cal: "https://cal.com/Ayush007",
  },
  {
    mentorName: "Parth Thirwani",
    position: "Student Mentor",
    mentorImage: "/Path-Mentor.jpg",
    linkedInUrl: "https://www.linkedin.com/in/parth-thirwani-887b26217/",
    githubUrl: "https://github.com/parththirwani",
    skills: ["Machine Learning", "Deep Learning", "Generative AI"],
    description:
      "Parth Thirwani is a dedicated professional with expertise in AI/ML and software engineering, backed by experience from two internships and two published research papers. As a mentor, he focuses on providing top resources for learning and guiding aspiring professionals to secure jobs in machine learning through practical problem-solving and hands-on learning.",
    companyLogos: [
      { src: "/coloressence-parth-mentor.jpeg", name: "Coloressence" },
      { src: "/viralweb_seo_marketing_firm_logo.jpeg", name: "ViralWebz" },
    ],
    price: "Rs 99",
    sessionDuration: "15 Minutes session",
    flexibleScheduling: "Flexible scheduling",
    satisfaction: "1 Free Session",
    experience: "0-1 experience",
    cal: "https://cal.com/parth-thirwani",
  },
  {
    mentorName: "Saksham Chaudhary",
    position: "Student Mentor",
    satisfaction: "1 Free Session",

    mentorImage: "/saksham-img.png",
    linkedInUrl: "https://www.linkedin.com/in/saksham-chaudhary-21564722a/",
    githubUrl: "https://github.com/saksham1387",
    skills: ["Web Development", "DevOps", "Generative AI"],
    description:
      "Saksham Chaudhary is a dedicated mentor in generative AI, web development, and DevOps. With extensive experience, He can guide individuals to master AI creativity, build robust web applications, and streamline development operations.",
    companyLogos: [{ src: "/cncf-logo.png", name: "CNCF New Delhi" }],
    price: "Rs 99",
    sessionDuration: "15 Minutes session",
    flexibleScheduling: "Flexible scheduling",
    experience: "1 years experience",
    cal: "https://cal.com/saksham34",
  },
];
interface MentorCardProps {
  mentorName: string;
  mentorImage: string;
  linkedInUrl?: string;
  position?: string;
  githubUrl?: string;
  skills?: string[];
  description?: string;
  companyLogos?: CompanyLogo[];
  price?: number;
  sessionDuration?: number;
  flexibleScheduling?: boolean;
  satisfaction?: number;
  experience?: number;
  cal?: string;
}
interface CompanyLogo {
  src: string;
  name: string;
}

const MentorCard: React.FC<MentorCardProps> = ({
  mentorName,
  mentorImage,
  linkedInUrl,
  githubUrl,
  position,
  skills,
  description,
  companyLogos,
  price,
  sessionDuration,
  flexibleScheduling,
  satisfaction,
  experience,
  cal,
}) => {
  const router = useRouter();

  return (
    <div className="rounded-lg border-gray-700 text-white bg-mediumgray shadow-sm md:p-4 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg ">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="p-3">
          <img
            src={mentorImage}
            alt={`${mentorName} Image`}
            className="object-cover rounded-lg w-full h-auto"
          />
        </div>

        <div className="grid gap-4">
          <div className="grid gap-3">
            <div className="grid gap-2">
              <h3 className="text-xl font-bold flex items-center gap-4 mt-3">
                {mentorName}
                <a href={linkedInUrl} target="_blank" rel="noopener noreferrer">
                  <img
                    src="/linkedin_logo.jpeg"
                    alt="LinkedIn"
                    width="24"
                    height="24"
                    className="inline"
                  />
                </a>
                {githubUrl && (
                  <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                    <img
                      src="/github_logo.jpeg"
                      alt="GitHub"
                      width="24"
                      height="24"
                      className="inline"
                    />
                  </a>
                )}
              </h3>
              <div>
                <h2 className="text-pretty font-semibold text-gray-300">
                  {position}
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills &&
                  skills.map((skill, index) => (
                    <button
                      key={index}
                      className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium bg-darkgray text-white ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-7 rounded-md px-2"
                    >
                      {skill}
                    </button>
                  ))}
              </div>
            </div>
            <p className="text-sm text-gray-400">{description}</p>
            <div className="flex flex-wrap gap-2">
              {companyLogos &&
                companyLogos.map((logo, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <img
                      //@ts-ignore
                      src={logo.src}
                      //@ts-ignore

                      alt={`${logo.name} Logo`}
                      width="32"
                      height="32"
                      className="rounded-full"
                      style={{ aspectRatio: "1 / 1", objectFit: "cover" }}
                    />

                    <span className="text-sm">{logo.name}</span>
                  </div>
                ))}
            </div>
          </div>
          <div className="grid gap-4 bg-lightgray p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="text-lg font-bold">{price}</div>
              <button
                onClick={() => {
                  window.open(`${cal}`, "_blank");
                }}
                className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-black  h-8 rounded-md px-3"
              >
                Get a free session
              </button>
            </div>
            <div className="grid gap-2">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5 text-gray-400"
                >
                  <path d="M8 2v4"></path>
                  <path d="M16 2v4"></path>
                  <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                  <path d="M3 10h18"></path>
                </svg>
                <span className="text-sm">{sessionDuration}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5 text-gray-400"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span className="text-sm">{flexibleScheduling}</span>
              </div>
              <div className="flex items-center gap-2">
                <BriefcaseBusiness
                  width={24}
                  height={24}
                  className="w-5 h-5 text-gray-400"
                />
                <span className="text-sm">{experience}</span>
              </div>
              <div className="flex items-center gap-2">
                {satisfaction && (
                  <div className="flex flex-row">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-5 h-5 text-gray-400"
                    >
                      <path d="M20 6 9 17l-5-5"></path>
                    </svg>
                    <span className="text-sm ml-2">{satisfaction}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MentorshipPage = () => {
  return (
    <div className="bg-darkgray min-h-screen">
      <div className="container mx-auto py-6 px-4">
        <h1 className="text-3xl font-bold mb-4 text-center text-white">
          Mentorship Page
        </h1>
        <p className="text-xl mb-6 text-center text-white">
          Welcome to the 1:1 Mentorship page. Here you can find mentors to help
          you with your coding journey.
        </p>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          {mentors.map((mentor, index) => (
            //@ts-ignore
            <MentorCard key={index} {...mentor} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MentorshipPage;
