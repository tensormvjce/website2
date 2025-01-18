import React, { useState, useEffect, useCallback} from 'react';
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
}

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  websiteUrl?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  title, 
  description, 
  image, 
  tags = [], 
  websiteUrl 
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
      className="relative group cursor-pointer"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative p-6 bg-black/50 backdrop-blur-sm border border-gray-800 rounded-lg hover-glow">
        <div className="aspect-video mb-4 overflow-hidden rounded-lg">
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
        <div className="flex items-center space-x-4 mb-3">
          {tags.map((tag: string) => (
            <span 
              key={tag} 
              className="text-xs text-purple-400 terminal-text px-2 py-1 rounded-full border border-purple-400/30"
            >
              {tag}
            </span>
          ))}
        </div>
        <h2 className="text-xl font-semibold mb-2 glow-text group-hover:text-purple-400 transition-colors">
          {title}
        </h2>
        <p className="text-gray-400 terminal-text text-sm mb-4">
          {description}
        </p>
        <div className="flex items-center justify-between text-sm text-gray-500">
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
  const { items: projects, loading, error } = useFirestoreCollection<Project>(db, 'projects');

  const tags = React.useMemo(() => {
    const allTags = projects.reduce<string[]>((acc, project) => {
      if (project.tags && Array.isArray(project.tags)) {
        acc.push(...project.tags);
      }
      return acc;
    }, []);
    return ["All", ...new Set(allTags)];
  }, [projects]);

  const filteredProjects = React.useMemo(() => {
    return projects.filter(project => {
      const projectTags = project.tags || [];
      const matchesSearch = 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        projectTags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesTag = selectedTag === "All" || projectTags.includes(selectedTag);
      return matchesSearch && matchesTag;
    });
  }, [projects, searchQuery, selectedTag]);

  useEffect(() => {
    setVisibleProjects(3);
  }, [searchQuery, selectedTag]);

  const handleLoadMore = useCallback((): void => {
    setVisibleProjects(prev => Math.min(prev + 3, filteredProjects.length));
  }, [filteredProjects.length]);

  const handleTagSelect = useCallback((tag: string) => {
    setSelectedTag(tag);
  }, []);

  const visibleProjectPosts = filteredProjects.slice(0, visibleProjects);
  const hasMoreProjects = visibleProjects < filteredProjects.length;

  if (loading) {
    return <ContentLoader type="project" />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-red-500 text-2xl">Error loading projects: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="noise" />
      <div className="grid-background fixed inset-0" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6 glitch"
            data-text="Our Projects"
          >
            Our Projects
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 terminal-text max-w-2xl mx-auto"
          >
            Innovative Solutions Transforming Tomorrow
          </motion.p>
        </div>

        <div className="max-w-xl mx-auto mb-12">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-900/50 border border-gray-800 focus:border-purple-500/50 
                     focus:outline-none focus:ring-2 focus:ring-purple-500/20 backdrop-blur-sm text-white 
                     placeholder-gray-400 transition-all duration-300"
          />
        </div>

        <div className="mb-12 flex flex-wrap justify-center gap-2">
          {tags.map((tag) => (
            <motion.button
              key={tag}
              onClick={() => handleTagSelect(tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedTag === tag
                  ? 'bg-purple-500/20 text-purple-300 border-purple-500/50'
                  : 'bg-gray-900/50 text-gray-400 border-gray-800 hover:border-purple-500/30 hover:text-purple-400'
              } border backdrop-blur-sm`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tag}
            </motion.button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {visibleProjectPosts.map((project) => (
              <ProjectCard 
                key={project.id || project.title}
                title={project.title}
                description={project.description}
                image={project.image || ''}
                tags={project.tags || []}
                websiteUrl={project.websiteUrl}
              />
            ))}
          </AnimatePresence>
        </div>

        {hasMoreProjects && (
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
