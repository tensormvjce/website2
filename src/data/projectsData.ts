export interface Project {
  id: string;
  title: string;
  description: string;
  date: string;
  image: string;
  link?: string;
  tags: string[];
}

export const tags = [
  "All",
  "AI Project",
  "Web Development",
  "Machine Learning",
  "Mobile Development",
  "Data Science",
  "Programming"
];

export const projects: Project[] = [
  {
    id: "1",
    title: 'Sirius AI Assistant',
    description: 'An AI Assistant that responds to users voice and finds data based on queries. Built with Flask, HTML, CSS, and JavaScript.',
    date: '2024-01-17',
    image: '/projects/sirius-ai.png',
    link: 'https://sirius-ai-liard.vercel.app/',
    tags: ['AI Project', 'Programming']
  }
];
