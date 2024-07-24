import { BotMessageSquare } from "lucide-react";
import { Crown } from "lucide-react";
import { BookOpenCheck } from "lucide-react";
import { ListTodo } from "lucide-react";
import { Flame } from "lucide-react";
import { Code } from "lucide-react";

import user1 from "../../../public/assets/profile-pictures/user1.jpg";
import user2 from "../../../public/assets/profile-pictures/user2.jpg";
import user3 from "../../../public/assets/profile-pictures/user3.jpg";
import user4 from "../../../public/assets/profile-pictures/user4.jpg";
import user5 from "../../../public/assets/profile-pictures/user5.jpg";
import user6 from "../../../public/assets/profile-pictures/user6.jpg";

export const navItems = [
  { label: "Features", href: "#", id:"features" },
  { label: "Playground", href: "#" },
];

export const testimonials = [
  {
    user: "John Doe",
    company: "Stellar Solutions",
    image: user1,
    text: "I am extremely satisfied with the services provided. The team was responsive, professional, and delivered results beyond my expectations.",
  },
  {
    user: "Jane Smith",
    company: "Blue Horizon Technologies",
    image: user2,
    text: "I couldn't be happier with the outcome of our project. The team's creativity and problem-solving skills were instrumental in bringing our vision to life",
  },
  {
    user: "David Johnson",
    company: "Quantum Innovations",
    image: user3,
    text: "Working with this company was a pleasure. Their attention to detail and commitment to excellence are commendable. I would highly recommend them to anyone looking for top-notch service.",
  },
  {
    user: "Ronee Brown",
    company: "Fusion Dynamics",
    image: user4,
    text: "Working with the team at XYZ Company was a game-changer for our project. Their attention to detail and innovative solutions helped us achieve our goals faster than we thought possible. We are grateful for their expertise and professionalism!",
  },
  {
    user: "Michael Wilson",
    company: "Visionary Creations",
    image: user5,
    text: "I am amazed by the level of professionalism and dedication shown by the team. They were able to exceed our expectations and deliver outstanding results.",
  },
  {
    user: "Emily Davis",
    company: "Synergy Systems",
    image: user6,
    text: "The team went above and beyond to ensure our project was a success. Their expertise and dedication are unmatched. I look forward to working with them again in the future.",
  },
];

export const features = [
  {
    icon: <BotMessageSquare />,
    text: "Comprehensive AI & ML Practice",
    description:
      "Engage with a vast array of coding and theoretical questions focused on AI and ML. Designed to enhance your skills and knowledge for real-world applications.",
  },
  {
    icon: <BookOpenCheck />,
    text: "Expert Mentorship",
    description:
      "Gain insights and guidance from industry and research leaders in AI and ML. Personalized mentorship to accelerate your learning and career growth.",
  },
  {
    icon: <ListTodo />,
    text: "Job Interview Preparation",
    description:
      "Prepare effectively with questions sourced directly from actual job interviews. Tailored to help you excel in your ML job interviews.",
  },
  {
    icon: <Crown />,
    text: "Regular Contests and Rankings",
    description:
      "Participate in weekly and monthly contests to test your skills and compete with peers. Track your progress with detailed standings and performance metrics.",
  },
  {
    icon: <Flame />,
    text: "Streak Incentives",
    description:
      "Stay motivated with streak incentives for regular practice. Build consistent habits and see continuous improvement in your AI and ML expertise.",
  },
  {
    icon: <Code />,
    text: "Dual Language Support",
    description:
      "Practice coding in both R and Python, the leading languages in AI and ML. Flexible language support to cater to your preferred coding environment.",
  },
];

export const checklistItems = [
  {
    title: "Robust Testing Environment",
    description:
      "Our coding space provides a robust environment to write and test your code. Each solution is evaluated against a variety of test cases to ensure accuracy and efficiency.",
  },
  {
    title: "Extensive Test Case Coverage",
    description:
      "We offer extensive test case coverage for each problem, including edge cases and large data sets. This helps you understand how your solution performs under different conditions.",
  },
  {
    title: "Real-Time Feedback",
    description:
      "Receive real-time feedback on your code submissions. Instant validation helps you identify and correct errors quickly, fostering a deeper understanding of problem-solving techniques.",
  },
  {
    title: "Detailed Performance Analysis",
    description:
      "Our platform checks the correctness of your answers and provides a detailed performance analysis. This includes time complexity and memory usage, ensuring your code is not only correct but also optimal.",
  },
];

// export const pricingOptions = [
//   {
//     title: "Free",
//     price: "$0",
//     features: [
//       "Private board sharing",
//       "5 Gb Storage",
//       "Web Analytics",
//       "Private Mode",
//     ],
//   },
//   {
//     title: "Pro",
//     price: "$10",
//     features: [
//       "Private board sharing",
//       "10 Gb Storage",
//       "Web Analytics (Advance)",
//       "Private Mode",
//     ],
//   },
//   {
//     title: "Enterprise",
//     price: "$200",
//     features: [
//       "Private board sharing",
//       "Unlimited Storage",
//       "High Performance Network",
//       "Private Mode",
//     ],
//   },
// ];

export const resourcesLinks = [
  { href: "#", text: "Getting Started" },
  { href: "#", text: "Documentation" },
  { href: "#", text: "Tutorials" },
  { href: "#", text: "API Reference" },
  { href: "#", text: "Community Forums" },
];

export const platformLinks = [
  { href: "#", text: "Features" },
  { href: "#", text: "Supported Devices" },
  { href: "#", text: "System Requirements" },
  { href: "#", text: "Downloads" },
  { href: "#", text: "Release Notes" },
];

export const communityLinks = [
  { href: "#", text: "Events" },
  { href: "#", text: "Meetups" },
  { href: "#", text: "Conferences" },
  { href: "#", text: "Hackathons" },
  { href: "#", text: "Jobs" },
];
