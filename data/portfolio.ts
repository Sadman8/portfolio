import type { Project, Experience, Skill, Service, Testimonial, BlogPost } from '@/types';

export const personalInfo = {
  name: 'Shadman Hussain Shahib',
  title: 'Software Engineer & Creative Developer',
  subtitle: 'Building digital experiences that leave a lasting impression.',
  location: 'Daffodil Smart City, Savar, Dhaka',
  email: 'shahib242-35-430@diu.edu.bd',
  university: 'Daffodil International University',
  degree: 'B.Sc. in Software Engineering',
  bio: 'Passionate and motivated Software Engineering student with a drive for building elegant digital experiences. Skilled in video editing, graphic design, event management, and software development. I blend technical precision with creative vision to craft products people love.',
  shortBio: 'SWE Student · Creative Developer · Event Organizer · Code Club Leader',
  stats: [
    { label: 'Projects Completed', value: '12+' },
    { label: 'Events Organized', value: '5+' },
    { label: 'Students Mentored', value: '30+' },
    { label: 'Certifications', value: '2' },
  ],
  social: {
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    instagram: 'https://instagram.com',
  },
  availability: true,
};

export const projects: Project[] = [
  {
    id: '1',
    title: 'CodeBridge Learning Platform',
    description: 'An interactive coding education platform for beginners.',
    longDescription:
      'A full-stack learning management system built for coding workshops, inspired by my British Council Code Club experience. Features lesson tracking, live code editors, and progress dashboards.',
    image: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    techStack: ['Python', 'React', 'Node.js', 'PostgreSQL'],
    category: 'Web App',
    featured: true,
    github: '#',
    liveDemo: '#',
  },
  {
    id: '2',
    title: 'EventFlow Dashboard',
    description: 'A smart event management and coordination platform.',
    longDescription:
      'Built from real-world experience managing career fairs like DIU Job Utsob 2024. Handles event logistics, attendee management, and communication workflows between participants and organizers.',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    techStack: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS'],
    category: 'Dashboard',
    featured: true,
    github: '#',
    liveDemo: '#',
  },
  {
    id: '3',
    title: 'MotionReel Editor',
    description: 'A browser-based video editing tool with timeline controls.',
    longDescription:
      'A lightweight web video editor prototype leveraging canvas APIs and FFmpeg.wasm, inspired by my expertise in Adobe Premiere Pro and After Effects workflows.',
    image: 'https://images.pexels.com/photos/2510428/pexels-photo-2510428.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    techStack: ['React', 'WebAssembly', 'Canvas API', 'TypeScript'],
    category: 'Creative Tool',
    featured: true,
    github: '#',
    liveDemo: '#',
  },
  {
    id: '4',
    title: 'ML Sentiment Analyzer',
    description: 'Python-based NLP tool for social media sentiment analysis.',
    longDescription:
      'A machine learning pipeline that ingests social media posts and classifies sentiment using scikit-learn and NLTK. Part of my ongoing research interest in AI and machine learning.',
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    techStack: ['Python', 'scikit-learn', 'NLTK', 'Pandas'],
    category: 'AI / ML',
    featured: false,
    github: '#',
  },
  {
    id: '5',
    title: 'Portfolio Design System',
    description: 'A reusable UI component library with dark-mode first design.',
    longDescription:
      'A personal design system built with Storybook, featuring accessible components, consistent tokens, and motion-first interactions for rapid portfolio and landing page builds.',
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    techStack: ['React', 'Storybook', 'Figma', 'Tailwind CSS'],
    category: 'Design System',
    featured: false,
    github: '#',
    liveDemo: '#',
  },
  {
    id: '6',
    title: 'Social Content Scheduler',
    description: 'Automate and schedule social media content across platforms.',
    longDescription:
      'A social media management tool that leverages my content creation expertise, enabling scheduling, analytics, and AI-assisted caption generation across Instagram, Twitter, and LinkedIn.',
    image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    techStack: ['Next.js', 'OpenAI API', 'MongoDB', 'Tailwind CSS'],
    category: 'Web App',
    featured: false,
    github: '#',
    liveDemo: '#',
  },
];

export const experiences: Experience[] = [
  {
    id: '1',
    role: 'Senior Associate',
    company: 'Daffodil International University',
    period: '2025 – 2026',
    description: [
      'Promoted from Student Associate based on demonstrated leadership and impact.',
      'Lead university initiatives, mentor junior associates, and coordinate high-stakes events.',
      'Represent the student body in strategic academic and industry forums.',
    ],
    type: 'work',
  },
  {
    id: '2',
    role: 'Student Associate',
    company: 'Daffodil International University',
    period: '2024 – 2025',
    description: [
      'Selected as Student Associate in 1st year, overseeing peer support and campus activities.',
      'Actively contributed to organizing career fairs and networking events.',
      'Managed communication between students and corporate representatives.',
    ],
    type: 'work',
  },
  {
    id: '3',
    role: 'Volunteer Organizer',
    company: 'DIU Job Utsob 2024',
    period: 'Nov 2024',
    description: [
      'Contributed to one of the largest university career fairs at Daffodil International University.',
      'Coordinated event logistics and facilitated student participation.',
      'Bridged communication between students and corporate recruiters.',
    ],
    type: 'volunteer',
  },
  {
    id: '4',
    role: 'B.Sc. in Software Engineering',
    company: 'Daffodil International University',
    period: '2024 – Present',
    description: [
      'Pursuing a Bachelor of Science in Software Engineering (3rd Semester).',
      'Developing expertise in algorithms, data structures, and software design patterns.',
      'Collaborating in agile team projects with real-world development lifecycles.',
    ],
    type: 'education',
  },
  {
    id: '5',
    role: 'Code Club Leader',
    company: 'British Council Code Club',
    period: '2019 – 2020',
    description: [
      'Led coding workshops at the District/Divisional Government Public Library, Gazipur.',
      'Mentored 30+ students in programming fundamentals and problem-solving.',
      'Coordinated events to promote coding and digital skills in the community.',
      'Awarded Certificate of Appreciation for outstanding contribution.',
    ],
    type: 'work',
  },
];

export const skills: Skill[] = [
  { name: 'Python', level: 75, category: 'backend', icon: '🐍' },
  { name: 'JavaScript', level: 70, category: 'frontend', icon: '⚡' },
  { name: 'TypeScript', level: 60, category: 'frontend', icon: '🔷' },
  { name: 'React', level: 65, category: 'frontend', icon: '⚛️' },
  { name: 'Next.js', level: 60, category: 'frontend', icon: '▲' },
  { name: 'Node.js', level: 58, category: 'backend', icon: '🟢' },
  { name: 'Tailwind CSS', level: 80, category: 'frontend', icon: '🎨' },
  { name: 'Machine Learning', level: 50, category: 'ai', icon: '🤖' },
  { name: 'Adobe Premiere', level: 85, category: 'design', icon: '🎬' },
  { name: 'After Effects', level: 80, category: 'design', icon: '✨' },
  { name: 'Photoshop', level: 82, category: 'design', icon: '🖼️' },
  { name: 'Canva', level: 90, category: 'design', icon: '🎭' },
  { name: 'Figma', level: 70, category: 'design', icon: '💜' },
  { name: 'Git & GitHub', level: 72, category: 'tools', icon: '🔧' },
  { name: 'PostgreSQL', level: 55, category: 'backend', icon: '🐘' },
  { name: 'Public Speaking', level: 92, category: 'soft', icon: '🎤' },
  { name: 'Event Management', level: 88, category: 'soft', icon: '📅' },
  { name: 'Leadership', level: 85, category: 'soft', icon: '🌟' },
];

export const services: Service[] = [
  {
    icon: 'Code2',
    title: 'Web Development',
    description: 'Clean, performant, and scalable web applications built with modern technologies.',
    features: ['React / Next.js', 'TypeScript', 'REST APIs', 'Responsive Design'],
  },
  {
    icon: 'Video',
    title: 'Video Production',
    description: 'Professional video editing, motion graphics, and visual storytelling.',
    features: ['Adobe Premiere Pro', 'After Effects', 'Color Grading', 'Motion Graphics'],
  },
  {
    icon: 'Palette',
    title: 'Graphic Design',
    description: 'Eye-catching visual design for brands, events, and social media.',
    features: ['Brand Identity', 'Social Media Graphics', 'Photoshop', 'Canva'],
  },
  {
    icon: 'CalendarCheck',
    title: 'Event Coordination',
    description: 'End-to-end event planning and execution for career fairs and workshops.',
    features: ['Logistics Management', 'Stakeholder Communication', 'Student Engagement'],
  },
  {
    icon: 'Brain',
    title: 'ML & AI Projects',
    description: 'Python-based machine learning solutions and data-driven applications.',
    features: ['scikit-learn', 'NLP', 'Data Analysis', 'Research Papers'],
  },
  {
    icon: 'Megaphone',
    title: 'Content Creation',
    description: 'Compelling content strategies and social media management for growth.',
    features: ['Social Media', 'Short Videos', 'Copywriting', 'Audience Growth'],
  },
];

export const processSteps = [
  {
    step: '01',
    title: 'Discovery',
    description: 'Deep dive into your goals, audience, and project requirements through detailed consultation.',
    icon: 'Search',
  },
  {
    step: '02',
    title: 'Planning',
    description: 'Strategic roadmap with milestones, tech stack selection, and resource allocation.',
    icon: 'Map',
  },
  {
    step: '03',
    title: 'Design',
    description: 'Wireframes, prototypes, and high-fidelity designs with iterative feedback loops.',
    icon: 'Pencil',
  },
  {
    step: '04',
    title: 'Development',
    description: 'Clean, well-documented code following best practices and agile sprint methodology.',
    icon: 'Code2',
  },
  {
    step: '05',
    title: 'Testing',
    description: 'Rigorous QA testing across devices, browsers, and edge cases to ensure quality.',
    icon: 'CheckCircle',
  },
  {
    step: '06',
    title: 'Deployment',
    description: 'Seamless launch with CI/CD pipelines, monitoring, and performance optimization.',
    icon: 'Rocket',
  },
  {
    step: '07',
    title: 'Maintenance',
    description: 'Ongoing support, updates, and feature enhancements post-launch.',
    icon: 'Wrench',
  },
];

export const testimonials: Testimonial[] = [
  {
    name: 'Sha Imtiaj Ahamed',
    role: 'DIU Senior Assosite',
    company: 'Daffodil International University',
    content:
      "Shadman consistently demonstrates remarkable initiative and leadership. His transition from Student Associate to Senior Associate reflects a maturity and dedication rarely seen at this stage.",
    avatar: 'https://scontent.fdac5-2.fna.fbcdn.net/v/t39.30808-6/557958269_2184293305387318_4389698766151170773_n.jpg?stp=dst-jpg_tt6&cstp=mx1411x1436&ctp=s1411x1436&_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=m7vT_SJoBHAQ7kNvwHS-p6y&_nc_oc=AdozZ7p_piEbAVtNs3_26oAGUCntz0LF9TRb-mziW0iRWvIqcAO0ZQx0bYdeKNffe90&_nc_zt=23&_nc_ht=scontent.fdac5-2.fna&_nc_gid=okOuiYlqj-LBjH3d1cTwfQ&_nc_ss=7b2a8&oh=00_AQDEFiOt7Da_gfSkzYQYkWB5CyO0nFkhwmwgrPoqEDmM9A&oe=6A6848A4',
  },
  {
    name: 'Hassanuzzaman',
    role: 'CDC Officer',
    company: 'DIU CDC',
    content:
      'Shadman was instrumental in making Job Utsob 2024 a success. His ability to manage communication between students and corporate representatives was exceptional.',
    avatar: 'https://scontent.fdac5-2.fna.fbcdn.net/v/t39.30808-6/574304727_3154874311352529_5077814364372894428_n.jpg?stp=dst-jpg_tt6&cstp=mx1392x1404&ctp=s1392x1404&_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=A7MIQqJFxbYQ7kNvwFK9WgE&_nc_oc=Adp0_Q8b0n6WTm9ZUc8tTprewvuljiZbo7W_OubJDG9kxyzlJBcbS0uJ54W7eM1CLrU&_nc_zt=23&_nc_ht=scontent.fdac5-2.fna&_nc_gid=rVLdeM1w3vTjDOA4ubsXGQ&_nc_ss=7b2a8&oh=00_AQDmSCanlSbLuDpSBKboHoBkIY5P2gCLCl_VeuzKE2j3pQ&oe=6A68391C',
  },
  {
    name: 'Farhana Akter',
    role: 'Workshop Coordinator',
    company: 'British Council Code Club',
    content:
      'As a Code Club Leader, Shadman had a gift for making complex programming concepts accessible. His students showed measurable improvement and genuine enthusiasm.',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8cAvvpNrNm9hii54lxgTYWZ0w0M4XKKfXvMLAdtIsgGoqd6T5YoU8vryU&s=10',
  },
  {
    name: 'Nayeem Bepari',
    role: 'CDC Advisor officer',
    company: 'DIU CDC',
    content:
      'Working with Shadman on group projects is always a great experience. He balances creative design thinking with solid technical problem-solving skills.',
    avatar: 'https://scontent.fdac5-1.fna.fbcdn.net/v/t39.30808-6/470164911_2357655181238442_8746095594878656900_n.jpg?stp=dst-jpg_tt6&cstp=mx953x960&ctp=s953x960&_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=5ZU_ZjNG2cMQ7kNvwE_Aadq&_nc_oc=AdowhQG512Fhyv2-3SGq9NDx7hDEa371biqa31jZUPMqi9JPyyAWZSuTqZpnra7dnlc&_nc_zt=23&_nc_ht=scontent.fdac5-1.fna&_nc_gid=73--3jom-LYqJJNj5ZwzkQ&_nc_ss=7b2a8&oh=00_AQDswguc3LDBIUqKPvXUO7cXRS6hBlB5SC5mYa0cXP-2yQ&oe=6A6837F0',
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'From Code Club to Senior Associate: My Journey in Tech Leadership',
    excerpt:
      'How leading coding workshops at age 15 shaped my approach to teamwork, mentoring, and building communities around technology.',
    date: 'July 2025',
    readTime: '5 min read',
    tags: ['Leadership', 'Career', 'Community'],
    featured: true,
    image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: '2',
    title: 'Building a Career in Software Engineering as a 3rd Semester Student',
    excerpt:
      'Practical strategies for landing opportunities, building a portfolio, and standing out while still in your first two years of university.',
    date: 'June 2025',
    readTime: '7 min read',
    tags: ['Career', 'Students', 'Software Engineering'],
    featured: false,
    image: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: '3',
    title: 'Why Every Developer Should Learn Video Editing',
    excerpt:
      'The surprising ways that skills like storytelling, pacing, and visual composition from video editing make you a better software engineer.',
    date: 'May 2025',
    readTime: '4 min read',
    tags: ['Design', 'Development', 'Creativity'],
    featured: false,
    image: 'https://images.pexels.com/photos/2510428/pexels-photo-2510428.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];
