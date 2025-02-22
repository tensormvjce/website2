export interface Speaker {
  name: string;
  role: string;
  bio: string;
  avatar: string;
  linkedin: string;
}

export interface Tag {
  name: string;
  color?: string;
}

export interface Event {
  title: string;
  date: string;
  description: string;
  tags: string[];
  link?: string;
  image: string;
  slug: string;
  bannerImg: string;
  longDescription: string;
  agenda: {
    day: string;
    title: string;
    details: string[];
  }[];
  whyAttend: string[];
  venue: string;
  duration: string;
  registrationStatus: "Open" | "Closed" | "Ended";
  speakers: Speaker[];
}

export const tags = [
  "All", "Android", "AI", "Blockchain", "Cloud", "Compose", "CSS", 
  "Dart", "Design", "Firebase", "Figma", "Flutter", "Git", "GitHub", 
  "HTML", "Info", "Javascript", "Kaggle", "Kotlin", "ML", 
  "Solution Challenge", "TailwindCSS", "TensorFlow", "UI/UX", "Web",
  "NLP", "Computer Vision", "Deep Learning", "Neural Networks", 
  "Machine Learning", "GenAI", "LLM", "OpenAI", "Data Science"
];

export const events: Event[] = [
  {
    title: "Build With AI",
    date: "6 May 2024",
    description: "Join us for an immersive journey into the world of artificial intelligence (AI) with our exclusive Gen AI Study Jams! This one-month-long study jam is designed to equip you with essential knowledge, p...",
    tags: ["Info", "AI", "GenAI"],
    image: "https://media.konfhub.com/event_poster/2024/March/06/1709735034946-BWAI%20Banner%20copy.jpg",
    slug: "build-with-ai-2024",
    bannerImg: "https://media.konfhub.com/event_poster/2024/March/06/1709735034946-BWAI%20Banner%20copy.jpg",
    longDescription: "Join us for an immersive journey into the world of artificial intelligence (AI) with our exclusive Gen AI Study Jams! This comprehensive one-month program is designed to equip participants with essential knowledge and practical skills in generative AI. From fundamental concepts to advanced applications, you'll explore the cutting-edge developments in AI technology.",
    agenda: [
      {
        day: "Week 1",
        title: "Foundations of Generative AI",
        details: [
          "Introduction to AI and Machine Learning",
          "Understanding Generative Models",
          "Basic Neural Network Architectures"
        ]
      },
      {
        day: "Week 2",
        title: "Practical Applications",
        details: [
          "Working with Large Language Models",
          "Image Generation and Manipulation",
          "Text-to-Speech Applications"
        ]
      }
    ],
    whyAttend: [
      "Gain hands-on experience with state-of-the-art AI tools",
      "Learn from industry experts and AI practitioners",
      "Build practical projects for your portfolio",
      "Network with fellow AI enthusiasts"
    ],
    venue: "Virtual Event",
    duration: "4 weeks",
    registrationStatus: "Open",
    speakers: [
      {
        name: "Dr. Sarah Chen",
        role: "AI Research Lead",
        bio: "Leading AI researcher with 10+ years of experience in machine learning and neural networks",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
        linkedin: "https://linkedin.com/in/sarah-chen-ai"
      }
    ]
  },
  {
    title: "Machine Learning with TensorFlow Workshop",
    date: "15 Apr 2024",
    description: "Deep dive into machine learning with TensorFlow! Learn to build, train, and deploy ML models. Topics include neural networks, computer vision, and natural language processing. Perfect for beginners and intermediate developers.",
    tags: ["AI", "ML", "TensorFlow", "Neural Networks"],
    image: "https://media.licdn.com/dms/image/v2/D5612AQESLc1j4WNEHA/article-inline_image-shrink_400_744/article-inline_image-shrink_400_744/0/1726234184999?e=2147483647&v=beta&t=-JskGoLza9vkvqUw-J3L5ESUiOs_knv3jGissNp-nDU",
    slug: "machine-learning-with-tensorflow-workshop",
    bannerImg: "https://media.licdn.com/dms/image/v2/D5612AQESLc1j4WNEHA/article-inline_image-shrink_400_744/article-inline_image-shrink_400_744/0/1726234184999?e=2147483647&v=beta&t=-JskGoLza9vkvqUw-J3L5ESUiOs_knv3jGissNp-nDU",
    longDescription: "Deep dive into machine learning with TensorFlow! Learn to build, train, and deploy ML models. Topics include neural networks, computer vision, and natural language processing. Perfect for beginners and intermediate developers.",
    agenda: [
      {
        day: "Day 1",
        title: "Introduction to TensorFlow",
        details: [
          "TensorFlow Basics",
          "Building and Training Models",
          "Model Evaluation and Optimization"
        ]
      },
      {
        day: "Day 2",
        title: "Advanced Topics",
        details: [
          "Neural Networks and Deep Learning",
          "Computer Vision and Image Processing",
          "Natural Language Processing and Text Analysis"
        ]
      }
    ],
    whyAttend: [
      "Learn TensorFlow from industry experts",
      "Gain hands-on experience with ML projects",
      "Network with fellow developers and researchers",
      "Take home practical skills and knowledge"
    ],
    venue: "Virtual Event",
    duration: "2 days",
    registrationStatus: "Open",
    speakers: [
      {
        name: "Dr. John Lee",
        role: "TensorFlow Engineer",
        bio: "TensorFlow engineer with 5+ years of experience in machine learning and deep learning",
        avatar: "https://randomuser.me/api/portraits/men/2.jpg",
        linkedin: "https://linkedin.com/in/john-lee-tensorflow"
      }
    ]
  },
  {
    title: "AI in Web Development: Next.js & OpenAI",
    date: "28 Mar 2024",
    description: "Explore the integration of AI in modern web applications. Learn to build AI-powered features using Next.js and OpenAI's APIs. Create chatbots, content generators, and intelligent search systems.",
    tags: ["AI", "Web", "Javascript", "OpenAI"],
    image: "https://www.paktolus.com/wp-content/uploads/2024/07/Next_OpenAI.jpg",
    slug: "ai-in-web-development-nextjs-openai",
    bannerImg: "https://www.paktolus.com/wp-content/uploads/2024/07/Next_OpenAI.jpg",
    longDescription: "Explore the integration of AI in modern web applications. Learn to build AI-powered features using Next.js and OpenAI's APIs. Create chatbots, content generators, and intelligent search systems.",
    agenda: [
      {
        day: "Day 1",
        title: "Introduction to Next.js and OpenAI",
        details: [
          "Next.js Basics",
          "OpenAI API Overview",
          "Building AI-Powered Features"
        ]
      },
      {
        day: "Day 2",
        title: "Advanced Topics",
        details: [
          "Chatbot Development",
          "Content Generation and Text Analysis",
          "Intelligent Search Systems"
        ]
      }
    ],
    whyAttend: [
      "Learn Next.js and OpenAI from industry experts",
      "Gain hands-on experience with AI-powered web development",
      "Network with fellow developers and researchers",
      "Take home practical skills and knowledge"
    ],
    venue: "Virtual Event",
    duration: "2 days",
    registrationStatus: "Open",
    speakers: [
      {
        name: "Dr. Emily Kim",
        role: "AI Researcher",
        bio: "AI researcher with 5+ years of experience in natural language processing and machine learning",
        avatar: "https://randomuser.me/api/portraits/women/3.jpg",
        linkedin: "https://linkedin.com/in/emily-kim-ai"
      }
    ]
  },
  {
    title: "Computer Vision Workshop Series",
    date: "10 Mar 2024",
    description: "Three-day intensive workshop on computer vision applications. Learn object detection, facial recognition, and image segmentation using modern AI frameworks. Hands-on projects included.",
    tags: ["AI", "ML", "TensorFlow", "Computer Vision"],
    image: "https://brainalyst.in/wp-content/uploads/2022/10/What-is-Computer-Vision-How-does-it-Works.jpg",
    slug: "computer-vision-workshop-series",
    bannerImg: "https://brainalyst.in/wp-content/uploads/2022/10/What-is-Computer-Vision-How-does-it-Works.jpg",
    longDescription: "Three-day intensive workshop on computer vision applications. Learn object detection, facial recognition, and image segmentation using modern AI frameworks. Hands-on projects included.",
    agenda: [
      {
        day: "Day 1",
        title: "Introduction to Computer Vision",
        details: [
          "Computer Vision Basics",
          "Image Processing and Analysis",
          "Object Detection and Recognition"
        ]
      },
      {
        day: "Day 2",
        title: "Advanced Topics",
        details: [
          "Facial Recognition and Image Segmentation",
          "Deep Learning for Computer Vision",
          "Hands-on Projects and Applications"
        ]
      }
    ],
    whyAttend: [
      "Learn computer vision from industry experts",
      "Gain hands-on experience with AI-powered computer vision projects",
      "Network with fellow developers and researchers",
      "Take home practical skills and knowledge"
    ],
    venue: "Virtual Event",
    duration: "3 days",
    registrationStatus: "Open",
    speakers: [
      {
        name: "Dr. David Lee",
        role: "Computer Vision Engineer",
        bio: "Computer vision engineer with 5+ years of experience in image processing and analysis",
        avatar: "https://randomuser.me/api/portraits/men/4.jpg",
        linkedin: "https://linkedin.com/in/david-lee-cv"
      }
    ]
  },
  {
    title: "Natural Language Processing Bootcamp",
    date: "20 Feb 2024",
    description: "Master NLP techniques in this comprehensive bootcamp. Topics include text classification, sentiment analysis, chatbots, and large language models. Build practical applications using transformers.",
    tags: ["AI", "ML", "NLP", "LLM"],
    image: "https://media.geeksforgeeks.org/wp-content/uploads/20240822171337/The-Role-of-NLP-.webp",
    slug: "natural-language-processing-bootcamp",
    bannerImg: "https://media.geeksforgeeks.org/wp-content/uploads/20240822171337/The-Role-of-NLP-.webp",
    longDescription: "Master NLP techniques in this comprehensive bootcamp. Topics include text classification, sentiment analysis, chatbots, and large language models. Build practical applications using transformers.",
    agenda: [
      {
        day: "Day 1",
        title: "Introduction to NLP",
        details: [
          "NLP Basics",
          "Text Preprocessing and Tokenization",
          "Text Classification and Sentiment Analysis"
        ]
      },
      {
        day: "Day 2",
        title: "Advanced Topics",
        details: [
          "Chatbot Development",
          "Large Language Models and Transformers",
          "Hands-on Projects and Applications"
        ]
      }
    ],
    whyAttend: [
      "Learn NLP from industry experts",
      "Gain hands-on experience with AI-powered NLP projects",
      "Network with fellow developers and researchers",
      "Take home practical skills and knowledge"
    ],
    venue: "Virtual Event",
    duration: "2 days",
    registrationStatus: "Open",
    speakers: [
      {
        name: "Dr. Sophia Patel",
        role: "NLP Researcher",
        bio: "NLP researcher with 5+ years of experience in text analysis and machine learning",
        avatar: "https://randomuser.me/api/portraits/women/5.jpg",
        linkedin: "https://linkedin.com/in/sophia-patel-nlp"
      }
    ]
  },
  {
    title: "AI Ethics and Responsible Development",
    date: "5 Feb 2024",
    description: "Critical discussion on AI ethics, bias in machine learning, and responsible AI development. Learn best practices for building fair and transparent AI systems. Case studies and group discussions included.",
    tags: ["AI", "Info", "Machine Learning"],
    image: "https://jaro-website.s3.ap-south-1.amazonaws.com/2024/08/What-are-AI-ethics.webp",
    slug: "ai-ethics-and-responsible-development",
    bannerImg: "https://jaro-website.s3.ap-south-1.amazonaws.com/2024/08/What-are-AI-ethics.webp",
    longDescription: "Critical discussion on AI ethics, bias in machine learning, and responsible AI development. Learn best practices for building fair and transparent AI systems. Case studies and group discussions included.",
    agenda: [
      {
        day: "Day 1",
        title: "Introduction to AI Ethics",
        details: [
          "AI Ethics Basics",
          "Bias in Machine Learning",
          "Responsible AI Development"
        ]
      },
      {
        day: "Day 2",
        title: "Advanced Topics",
        details: [
          "Fairness and Transparency in AI",
          "Case Studies and Group Discussions",
          "Best Practices for Responsible AI Development"
        ]
      }
    ],
    whyAttend: [
      "Learn AI ethics from industry experts",
      "Gain insights into responsible AI development",
      "Network with fellow developers and researchers",
      "Take home practical knowledge and best practices"
    ],
    venue: "Virtual Event",
    duration: "2 days",
    registrationStatus: "Open",
    speakers: [
      {
        name: "Dr. Rachel Kim",
        role: "AI Ethics Researcher",
        bio: "AI ethics researcher with 5+ years of experience in machine learning and fairness",
        avatar: "https://randomuser.me/api/portraits/women/6.jpg",
        linkedin: "https://linkedin.com/in/rachel-kim-ethics"
      }
    ]
  }
];