import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { db } from '../services/firebase';
import { useFirestoreCollection, FirestoreItem } from '../hooks/useFirestoreCollection';
import ContentLoader from '../components/ContentLoader'; // Import the ContentLoader component

interface Project extends FirestoreItem {
  title: string;
  description: string;
  image: string;
  tags?: string[];
  websiteUrl?: string;
  author: string;
  date: string;
}

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  websiteUrl?: string;
  author: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  title, 
  description, 
  image, 
  tags = [], 
  websiteUrl,
  author 
}) => {
  const handleVisitWebsite = useCallback((): void => {
    if (websiteUrl) {
      window.open(websiteUrl, '_blank', 'noopener,noreferrer');
    }
  }, [websiteUrl]);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative group cursor-pointer h-[450px] w-full"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative p-6 bg-black/50 backdrop-blur-sm border border-gray-800 rounded-lg hover-glow h-full flex flex-col">
        <div className="aspect-video mb-4 overflow-hidden rounded-lg h-48 flex-shrink-0">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
            onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
              const target = e.currentTarget;
              target.src = 'https://via.placeholder.com/800x400?text=Project+Image';
            }}
          />
        </div>
        <div className="flex items-center space-x-2 flex-wrap gap-2 mb-3 flex-shrink-0">
          {tags.map((tag: string) => (
            <span 
              key={tag} 
              className="text-xs text-purple-400 terminal-text px-2 py-1 rounded-full border border-purple-400/30"
            >
              {tag}
            </span>
          ))}
        </div>
        <h2 className="text-xl font-semibold mb-2 glow-text group-hover:text-purple-400 transition-colors line-clamp-2 flex-shrink-0">
          {title}
        </h2>
        <p className="text-sm text-purple-400 mb-2 flex-shrink-0">by {author}</p>
        <p className="text-gray-400 terminal-text text-sm mb-4 line-clamp-3 flex-grow">
          {description}
        </p>
        <div className="flex items-center justify-between text-sm text-gray-500 mt-auto flex-shrink-0">
          {websiteUrl && (
            <button 
              onClick={handleVisitWebsite}
              className="flex items-center text-purple-400 hover:text-purple-300 group"
            >
              Visit Website
              <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          )}
          <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.article>
  );
};

const Projects: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [visibleProjects, setVisibleProjects] = useState<number>(3);
  const [uniqueTags, setUniqueTags] = useState<string[]>(["All"]);
  const { items: projects, loading, error } = useFirestoreCollection<Project>(db, 'projects');

  useEffect(() => {
    const allTags = projects.reduce((acc: string[], project) => {
      if (project.tags && Array.isArray(project.tags)) {
        const normalizedTags = project.tags.map(tag => tag.trim().toLowerCase());
        acc.push(...normalizedTags);
      }
      return acc;
    }, []);

    const uniqueTagsSet = new Set(["All", ...allTags]);
    
    const sortedTags = Array.from(uniqueTagsSet).sort((a, b) => {
      if (a === "All") return -1;
      if (b === "All") return 1;
      return a.localeCompare(b);
    });

    setUniqueTags(sortedTags);
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects
      .filter(project => {
        const matchesTag = selectedTag === "All" || 
          (project.tags && project.tags.map(tag => tag.toLowerCase()).includes(selectedTag.toLowerCase()));
        const matchesSearch = 
          project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTag && matchesSearch;
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [projects, selectedTag, searchQuery]);

  const handleLoadMore = useCallback((): void => {
    setVisibleProjects(prev => Math.min(prev + 3, filteredProjects.length));
  }, [filteredProjects.length]);

  if (loading) {
    return <ContentLoader type="project" />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-red-500 text-xl p-4 bg-red-500/10 rounded-lg border border-red-500/20">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 glow-text">Projects</h1>
        
        {/* Search and Filter Section */}
        <div className="mb-8 space-y-4">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          
          <div className="flex flex-wrap gap-2">
            {uniqueTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  selectedTag.toLowerCase() === tag.toLowerCase()
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {tag === "All" ? tag : tag.charAt(0).toUpperCase() + tag.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="wait">
            {filteredProjects.slice(0, visibleProjects).map((project) => (
              <ProjectCard 
                key={project.id || project.title}
                title={project.title}
                description={project.description}
                image={project.image || ''}
                tags={project.tags || []}
                websiteUrl={project.websiteUrl}
                author={project.author}
              />
            ))}
          </AnimatePresence>
        </div>

        {visibleProjects < filteredProjects.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center"
          >
            <button
              onClick={handleLoadMore}
              className="px-8 py-3 mt-12 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/50 
                       rounded-lg text-white font-medium transition-all duration-300 hover:scale-105"
            >
              Load More
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Projects;
