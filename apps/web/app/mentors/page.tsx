"use client"
import React from 'react';
import { BriefcaseBusiness } from 'lucide-react';
import { useRouter } from 'next/navigation';

const mentors = [
  {
    mentorName: 'Parth Thirwani',
    mentorImage: '/Path-Mentor.jpg',
    linkedInUrl: 'https://www.linkedin.com/in/parth-thirwani-887b26217/',
    githubUrl: 'https://github.com/parththirwani',
    skills: ['Machine Learning', 'Deep Learning', 'Generative AI'],
    description: 'Parth Thirwani is a dedicated professional with expertise in AI/ML and software engineering, backed by experience from two internships and two published research papers. As a mentor, he focuses on providing top resources for learning and guiding aspiring professionals to secure jobs in machine learning through practical problem-solving and hands-on learning.',
    companyLogos: [
      { src: '/coloressence-parth-mentor.jpeg', name: 'Coloressence' },
      { src: '/viralweb_seo_marketing_firm_logo.jpeg', name: 'ViralWebz' },
    ],
    price: 'Rs 500',
    sessionDuration: '1 hour session',
    flexibleScheduling: 'Flexible scheduling',
    satisfaction: 'Guaranteed satisfaction',
    experience: '0-1 experience'
  },
  {
    mentorName: 'John Doe',
    mentorImage: '/john-doe.jpg',
    linkedInUrl: 'https://www.linkedin.com/in/john-doe/',
    githubUrl: 'https://github.com/johndoe',
    skills: ['Web Development', 'JavaScript', 'React'],
    description: 'John Doe is an experienced web developer with a focus on JavaScript and React. He has worked on several high-profile projects and is passionate about mentoring the next generation of developers.',
    companyLogos: [
      { src: '/company1-logo.jpg', name: 'Company1' },
      { src: '/company2-logo.jpg', name: 'Company2' },
    ],
    price: 'Rs 600',
    sessionDuration: '1.5 hour session',
    flexibleScheduling: 'Flexible scheduling',
    satisfaction: 'Guaranteed satisfaction',
    experience: '2-3 years experience'
  }
];

const MentorCard: React.FC<any> = ({
  mentorName,
  mentorImage,
  linkedInUrl,
  githubUrl,
  skills,
  description,
  companyLogos,
  price,
  sessionDuration,
  flexibleScheduling,
  satisfaction,
  experience
}) => {
  const router = useRouter();
  return (
    <div className="rounded-lg border text-card-foreground shadow-sm md:p-1 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
      <div className="flex flex-row gap- 6">   
        <div className='p-3'>
          <img
            src={mentorImage}
            alt={`${mentorName} Image`}
            
            className="object-cover border rounded-lg aspect-square w-[900px] h-[370px]"
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
                <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                  <img
                    src="/github_logo.jpeg"
                    alt="GitHub"
                    width="24"
                    height="24"
                    className="inline"
                  />
                </a>
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill:any, index:any) => (
                  <button
                    key={index}
                    className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-7 rounded-md px-2"
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{description}</p>
            <div className="flex flex-wrap gap-2">
              {companyLogos.map((logo:any, index:any) => (
                <div key={index} className="flex items-center gap-2">
                  <img
                    src={logo.src}
                    alt={`${logo.name} Logo`}
                    width="32"
                    height="32"
                    className="rounded-full"
                    style={{ aspectRatio: '1 / 1', objectFit: 'cover' }}
                  />
                  <span className="text-sm">{logo.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-4 bg-muted/20 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="text-lg font-bold">{price}</div>
              <button 
              onClick={()=>{
                router.push('https://cal.com/saksham34')
              }}
              className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-8 rounded-md px-3">
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
                  className="w-5 h-5 text-muted-foreground"
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
                  className="w-5 h-5 text-muted-foreground"
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
                  className="w-5 h-5 text-muted-foreground"
                />
                <span className="text-sm">{experience}</span>
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
                  className="w-5 h-5 text-muted-foreground"
                >
                  <path d="M20 6 9 17l-5-5"></path>
                </svg>
                <span className="text-sm">{satisfaction}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MentorshipPage: React.FC = () => {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Mentorship Page</h1>
      <p className="text-xl mb-6 text-center">Welcome to the 1:1 Mentorship page. Here you can find mentors to help you with your coding journey.</p>
      <div className="grid gap-6">
        {mentors.map((mentor, index) => (
          <MentorCard key={index} {...mentor} />
        ))}
      </div>
    </div>
  );
};

export default MentorshipPage;
