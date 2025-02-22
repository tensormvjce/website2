export interface Blog {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  category: string;
  link?: string;
  tags: string[];
}

export const tags = [
  "All",
  "AI Project",
  "AI Research",
  "Machine Learning",
  "Deep Learning",
  "Data Science",
  "Programming",
  "AI Ethics"
];

export const blogs: Blog[] = [
  {
    id: "1",
    title: 'The Future of AI in 2025',
    excerpt: 'Exploring the latest breakthroughs in artificial intelligence and their impact on society.',
    date: '2024-01-16',
    readTime: '5 min read',
    image: 'https://www.logicraysacademy.com/blog/wp-content/uploads/2023/06/AIFI.png',
    category: 'AI Research',
    tags: ['AI Research']
  },
  {
    id: "2",
    title: 'Machine Learning Best Practices',
    excerpt: 'A comprehensive guide to implementing machine learning models effectively.',
    date: '2024-01-15',
    readTime: '7 min read',
    image: 'https://xiengineering.com/wp-content/uploads/2023/10/AdobeStock_519767884-1-scaled.jpeg',
    category: 'Machine Learning',
    tags: ['Machine Learning']
  },
  {
    id: "3",
    title: 'Neural Networks Explained',
    excerpt: 'Understanding the fundamentals of neural networks and deep learning.',
    date: '2024-01-14',
    readTime: '6 min read',
    image: 'https://bernardmarr.com/img/What%20is%20an%20Artificial%20Neural%20Networks.jpg',
    category: 'Deep Learning',
    tags: ['Deep Learning', 'Machine Learning']
  },
  {
    id: "4",
    title: 'Data Science Workflows',
    excerpt: 'Best practices for organizing and managing data science projects effectively.',
    date: '2024-01-13',
    readTime: '4 min read',
    image: 'https://images.squarespace-cdn.com/content/v1/55fdfa38e4b07a55be8680a4/1615903072761-9H9XREOMPJFBGI8QAW1U/Data+Science+Workflow+Image.jpg',
    category: 'Data Science',
    tags: ['Data Science']
  },
  {
    id: "5",
    title: 'Python for AI Development',
    excerpt: 'A comprehensive guide to using Python for artificial intelligence development.',
    date: '2024-01-12',
    readTime: '8 min read',
    image: 'https://www.developernation.net/static/83ec9004ebaf342559098782a7b24598/a764f/Python-for-AI-ML-projects_cover-scaled.jpg',
    category: 'Programming',
    tags: ['Programming', 'AI Research']
  },
  {
    id: "6",
    title: 'Ethics in AI',
    excerpt: 'Exploring the ethical considerations in artificial intelligence development.',
    date: '2024-01-11',
    readTime: '5 min read',
    image: 'https://media.licdn.com/dms/image/C4D12AQFsGnGLkGWzJg/article-cover_image-shrink_600_2000/0/1598527219209?e=2147483647&v=beta&t=x0tBbn-g623Dq5vvsc9ufZbAlIDIRWCWQGymRy_C44g',
    category: 'AI Ethics',
    tags: ['AI Ethics']
  },
  {
    id: "7",
    title: 'Deep Learning Frameworks',
    excerpt: 'Comparing popular deep learning frameworks and their use cases.',
    date: '2024-01-10',
    readTime: '6 min read',
    image: 'https://analyticsindiamag.com/wp-content/uploads/2018/04/all_libraries.png',
    category: 'Deep Learning',
    tags: ['Deep Learning', 'Programming']
  }
];
