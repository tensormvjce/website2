import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../services/firebase';
import { 
  collection, 
  addDoc, 
  deleteDoc,
  doc,
  getDocs,
  updateDoc
} from 'firebase/firestore';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { teamData } from '../data/teamData';

const AdminDashboard: React.FC = () => {
  const { currentUser, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState<'blogs' | 'projects' | 'events' | 'posts'>('blogs');
  const [error, setError] = useState<string | null>(null);
  const [newTag, setNewTag] = useState('');
  const [viewMode, setViewMode] = useState<'add' | 'manage'>('add');
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  // State for form inputs
  const [newItem, setNewItem] = useState({
    title: '',
    description: '',
    date: '',
    image: '',
    author: '',
    websiteUrl: '',
    tags: [] as string[],
    content: '',
    bannerImg: '',
    contentWriter: '',
    writerAvatar: '',
    slug: '',
    longDescription: '',
    agenda: [] as { day: string; title: string; details: string[] }[],
    whyAttend: [] as string[],
    venue: '',
    duration: '',
    registrationStatus: 'Open' as 'Open' | 'Closed' | 'Ended',
    speakers: [] as { 
      name: string; 
      role: string; 
      bio: string; 
      avatar: string; 
      linkedin: string; 
    }[],
    socialMedia: {
      instagram: { link: '' },
      linkedin: { link: '' }
    },
    link: '',
    status: 'Open' as 'Open' | 'Closed' | 'Ended',
  });

  // Update the newPost state structure
  const [newPost, setNewPost] = useState({
    title: '',
    description: '',
    date: '',
    image: '',
    designer: '',
    designerLinkedIn: '',
    contentWriter: '',
    contentWriterLinkedIn: '',
    tags: [] as string[],
    socialMedia: {
      instagram: { link: '' },
      linkedin: { link: '' }
    },
  });

  // Get 2024-25 team members
  const currentTeamMembers = useMemo(() => {
    const currentYear = teamData.find(year => year.year === '2024-25');
    return currentYear ? currentYear.members : [];
  }, []);

  useEffect(() => {
    console.log('Current User:', currentUser);
    console.log('Is Admin:', isAdmin);
  }, [currentUser, isAdmin]);

  useEffect(() => {
    console.log('Current User UID:', currentUser?.uid);
    console.log('Is Admin:', isAdmin);
  }, [currentUser, isAdmin]);

  useEffect(() => {
    console.log('Current Team Members:', currentTeamMembers);
  }, [currentTeamMembers]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewItem(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTagChange = (tag: string) => {
    if (activeTab === 'posts') {
      // For posts, remove the tag from newPost
      setNewPost(prev => ({
        ...prev,
        tags: prev.tags.filter(t => t !== tag)
      }));
    } else {
      // For other items, remove the tag from newItem
      setNewItem(prev => ({
        ...prev,
        tags: prev.tags.filter(t => t !== tag)
      }));
    }
  };

  const handleAddNewTag = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    if (newTag.trim()) {
      if (activeTab === 'posts') {
        // For posts, update the newPost state
        setNewPost(prev => ({
          ...prev,
          tags: [...prev.tags, newTag.trim()]
        }));
      } else {
        // For other items, update the newItem state
        setNewItem(prev => ({
          ...prev,
          tags: [...prev.tags, newTag.trim()]
        }));
      }
      setNewTag('');
    }
  };

  const handleAddItem = async () => {
    try {
      if (!isAdmin) {
        setError('You do not have permission to add items.');
        return;
      }

      // Validate input
      if (!newItem.title || !newItem.description || !newItem.date) {
        setError('Please fill in all required fields.');
        return;
      }

      const collectionName = activeTab;
      
      console.log('Adding new item to collection:', collectionName);
      console.log('Item details:', newItem);

      // Add document to Firestore
      const docRef = await addDoc(collection(db, collectionName), {
        ...newItem,
        tags: newItem.tags.map(tag => tag.trim()).filter(tag => tag !== ''),
        slug: newItem.slug || newItem.title.toLowerCase().replace(/\s+/g, '-'),
        socialMedia: {
          ...newItem.socialMedia,
          linkedin: { link: newItem.socialMedia.linkedin.link }
        }
      });

      console.log('Document added with ID:', docRef.id);

      // Reset form with all fields
      setNewItem({
        title: '',
        description: '',
        date: '',
        image: '',
        author: '',
        websiteUrl: '',
        tags: [],
        content: '',
        bannerImg: '',
        contentWriter: '',
        writerAvatar: '',
        slug: '',
        longDescription: '',
        agenda: [],
        whyAttend: [],
        venue: '',
        duration: '',
        registrationStatus: 'Open',
        speakers: [],
        socialMedia: {
          instagram: { link: '' },
          linkedin: { link: '' }
        },
        link: '',
        status: 'Open',
      });
      setError(null);
    } catch (error) {
      console.error('Error adding item', error);
      setError(error instanceof Error 
        ? error.message 
        : 'An unexpected error occurred while adding the item.'
      );
    }
  };

  const handleAgendaChange = (index: number, field: keyof { day: string; title: string; details: string[] }, value: string) => {
    const updatedAgenda = [...newItem.agenda];
    updatedAgenda[index] = {
      ...updatedAgenda[index],
      [field]: value
    };
    setNewItem(prev => ({ ...prev, agenda: updatedAgenda }));
  };

  const addAgendaItem = () => {
    setNewItem(prev => ({
      ...prev,
      agenda: [...prev.agenda, { day: '', title: '', details: [] }]
    }));
  };

  const handleSpeakerChange = (index: number, field: keyof { name: string; role: string; bio: string; avatar: string; linkedin: string }, value: string) => {
    const updatedSpeakers = [...newItem.speakers];
    updatedSpeakers[index] = {
      ...updatedSpeakers[index],
      [field]: value
    };
    setNewItem(prev => ({ ...prev, speakers: updatedSpeakers }));
  };

  const addSpeaker = () => {
    setNewItem(prev => ({
      ...prev,
      speakers: [...prev.speakers, { name: '', role: '', bio: '', avatar: '', linkedin: '' }]
    }));
  };

  // Update the handlePostSubmit function
  const handlePostSubmit = async () => {
    try {
      if (!isAdmin) {
        setError('You do not have permission to add items.');
        return;
      }

      const postData = {
        title: newPost.title,
        description: newPost.description,
        date: newPost.date ? new Date(newPost.date).toISOString() : new Date().toISOString(),
        image: newPost.image,
        designer: newPost.designer,
        designerLinkedIn: newPost.designerLinkedIn,
        contentWriter: newPost.contentWriter,
        contentWriterLinkedIn: newPost.contentWriterLinkedIn,
        tags: newPost.tags,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: currentUser?.uid,
        status: 'active',
        socialMedia: {
          instagram: newPost.socialMedia.instagram.link ? {
            link: newPost.socialMedia.instagram.link,
          } : null,
          linkedin: {
            link: newPost.socialMedia.linkedin.link
          }
        }
      };

      console.log('Post Data being saved:', postData);
      await addDoc(collection(db, 'posts'), postData);
      
      setNewPost({
        title: '',
        description: '',
        date: '',
        image: '',
        designer: '',
        designerLinkedIn: '',
        contentWriter: '',
        contentWriterLinkedIn: '',
        tags: [],
        socialMedia: {
          instagram: { link: '' },
          linkedin: { link: '' }
        }
      });

      toast.success('Post added successfully!');
    } catch (error) {
      console.error('Error adding post:', error);
      setError('Failed to add post. Please try again.');
      toast.error('Failed to add post');
    }
  };

  const fetchItems = async () => {
    setIsLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, activeTab));
      const fetchedItems = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      console.log('Fetched Items:', fetchedItems);
      setItems(fetchedItems);
    } catch (error) {
      console.error('Error fetching items:', error);
      toast.error('Failed to load items');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, [activeTab]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await deleteDoc(doc(db, activeTab, id));
        toast.success('Item deleted successfully');
        fetchItems(); // Refresh the list
      } catch (error) {
        console.error('Error deleting item:', error);
        toast.error('Failed to delete item');
      }
    }
  };

  const handleEdit = (item: any) => {
    if (activeTab === 'posts') {
      setNewPost({
        title: item.title || '',
        description: item.description || '',
        date: item.date ? new Date(item.date).toISOString().split('T')[0] : '',
        image: item.image || '',
        designer: item.designer || '',
        designerLinkedIn: item.designerLinkedIn || '',
        contentWriter: item.contentWriter || '',
        contentWriterLinkedIn: item.contentWriterLinkedIn || '',
        tags: item.tags || [],
        socialMedia: {
          instagram: { link: item.socialMedia?.instagram?.link || '' },
          linkedin: { link: item.socialMedia?.linkedin?.link || '' }
        }
      });
    } else {
      setNewItem({
        ...newItem,
        title: item.title || '',
        description: item.description || '',
        date: item.date ? new Date(item.date).toISOString().split('T')[0] : '',
        image: item.image || '',
        author: item.author || '',
        websiteUrl: item.websiteUrl || '',
        tags: item.tags || [],
        content: item.content || '',
        bannerImg: item.bannerImg || '',
        contentWriter: item.contentWriter || '',
        writerAvatar: item.writerAvatar || '',
        slug: item.slug || '',
        longDescription: item.longDescription || '',
        agenda: item.agenda || [],
        whyAttend: item.whyAttend || [],
        venue: item.venue || '',
        duration: item.duration || '',
        registrationStatus: item.registrationStatus || 'Open',
        speakers: item.speakers || [],
        link: item.link || '',
        status: item.status || 'Open',
      });
    }
    setEditingItem(item);
    setIsEditing(true);
    setViewMode('add');
  };

  const handleUpdate = async () => {
    try {
      if (!isAdmin || !editingItem) {
        return;
      }

      const docRef = doc(db, activeTab, editingItem.id);
      const updateData = activeTab === 'posts' ? {
        ...newPost,
        date: newPost.date ? new Date(newPost.date).toISOString() : new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        designerLinkedIn: newPost.designerLinkedIn,
        contentWriterLinkedIn: newPost.contentWriterLinkedIn
      } : {
        ...newItem,
        date: newItem.date ? new Date(newItem.date).toISOString() : new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        // Ensure both status fields are updated for events
        ...(activeTab === 'events' && {
          status: newItem.registrationStatus,
          registrationStatus: newItem.registrationStatus
        })
      };

      await updateDoc(docRef, updateData);
      
      toast.success('Item updated successfully!');
      setIsEditing(false);
      setEditingItem(null);
      setViewMode('manage');
      fetchItems();
    } catch (error) {
      console.error('Error updating item:', error);
      toast.error('Failed to update item');
    }
  };

  if (!currentUser) {
    return <div className="text-white p-8">Please log in to access this page.</div>;
  }

  if (!isAdmin) {
    return <div className="text-white p-8">Access Denied. You must be an admin to view this page.</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Add background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-transparent to-blue-500/5" />
      <div className="noise" />
      <div className="grid-background fixed inset-0" />

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6 glitch"
            data-text="Admin Dashboard"
          >
            Admin Dashboard
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 terminal-text max-w-2xl mx-auto"
          >
            Manage your website content
          </motion.p>
        </motion.div>

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-300 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('blogs')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'blogs'
                ? 'bg-purple-500 text-white'
                : 'bg-gray-800 text-gray-300'
            }`}
          >
            Blogs
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'projects'
                ? 'bg-purple-500 text-white'
                : 'bg-gray-800 text-gray-300'
            }`}
          >
            Projects
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'events'
                ? 'bg-purple-500 text-white'
                : 'bg-gray-800 text-gray-300'
            }`}
          >
            Events
          </button>
          <button
            onClick={() => setActiveTab('posts')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'posts'
                ? 'bg-purple-500 text-white'
                : 'bg-gray-800 text-gray-300'
            }`}
          >
            Posts
          </button>
        </div>

        <div className="flex justify-between items-center mb-8">
          <div className="flex space-x-4">
            <button
              onClick={() => setViewMode('add')}
              className={`px-4 py-2 rounded-lg ${
                viewMode === 'add'
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-800 text-gray-300'
              }`}
            >
              Add New
            </button>
            <button
              onClick={() => setViewMode('manage')}
              className={`px-4 py-2 rounded-lg ${
                viewMode === 'manage'
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-800 text-gray-300'
              }`}
            >
              Manage Existing
            </button>
          </div>
        </div>

        {viewMode === 'manage' && (
          <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
            <h2 className="text-2xl font-semibold mb-6">Manage {activeTab}</h2>
            
            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
              </div>
            ) : items.length === 0 ? (
              <p className="text-gray-400 text-center py-8">No items found</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-black/50 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden hover:border-purple-500/30 transition-all duration-300"
                  >
                    {/* Post Image */}
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={item.image || 'https://via.placeholder.com/400x225?text=No+Image'}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://via.placeholder.com/400x225?text=No+Image';
                        }}
                      />
                    </div>

                    {/* Post Content */}
                    <div className="p-6 space-y-4">
                      <h3 className="text-xl font-semibold">{item.title}</h3>
                      <p className="text-gray-400">{item.description}</p>

                      {/* Tags */}
                      {item.tags && item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {item.tags.map((tag: string) => (
                            <span
                              key={tag}
                              className="text-xs px-2 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Credits */}
                      <div className="pt-4 border-t border-gray-800 space-y-2">
                        {item.designer && (
                          <div className="flex items-center">
                            <span className="text-gray-400">Designer: </span>
                            <a
                              href={item.designerLinkedIn}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-purple-400 ml-2 hover:text-purple-300"
                            >
                              {item.designer}
                            </a>
                          </div>
                        )}
                        {item.contentWriter && (
                          <div className="flex items-center">
                            <span className="text-gray-400">Content Writer: </span>
                            <a
                              href={item.contentWriterLinkedIn}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-purple-400 ml-2 hover:text-purple-300"
                            >
                              {item.contentWriter}
                            </a>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex justify-end space-x-4 mt-4">
                        <button
                          onClick={() => handleEdit(item)}
                          className="text-blue-400 hover:text-blue-300"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {viewMode === 'add' && (
          <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
            <h2 className="text-2xl font-semibold mb-6">Add New {activeTab.slice(0, -1)}</h2>
            
            <div className="space-y-6">
              {/* General form fields for non-post items */}
              {activeTab !== 'posts' && (
                <>
                  {/* Title */}
                  <div>
                    <label className="block text-gray-300 mb-2">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={newItem.title}
                      onChange={handleInputChange}
                      className="w-full bg-black/50 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                      placeholder="Enter title"
                    />
                  </div>

                  {/* Description with markdown support */}
                  <div>
                    <label className="block text-gray-300 mb-2">Description (supports markdown: **bold**, *italic*)</label>
                    <div className="space-y-2">
                      <textarea
                        name="description"
                        value={newItem.description}
                        onChange={handleInputChange}
                        className="w-full bg-black/50 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500 h-32"
                        placeholder="Enter description (use **text** for bold)"
                      />
                      {newItem.description && (
                        <div className="p-3 bg-gray-800/50 rounded-lg">
                          <p className="text-sm text-gray-400 mb-2">Preview:</p>
                          <ReactMarkdown className="prose prose-invert max-w-none">
                            {newItem.description}
                          </ReactMarkdown>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Date */}
                  <div>
                    <label className="block text-gray-300 mb-2">Date</label>
                    <input
                      type="date"
                      name="date"
                      value={newItem.date}
                      onChange={handleInputChange}
                      className="w-full bg-black/50 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500 [color-scheme:dark]"
                      placeholder="Select date"
                    />
                  </div>

                  {/* Image URL */}
                  <div>
                    <label className="block text-gray-300 mb-2">Image URL</label>
                    <input
                      type="text"
                      name="image"
                      value={newItem.image}
                      onChange={handleInputChange}
                      className="w-full bg-black/50 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                      placeholder="Enter image URL"
                    />
                  </div>

                  {/* Tags Section */}
                  <div className="space-y-2 mb-6">
                    <label className="block text-gray-300 mb-2">Tags</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Add a new tag"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddNewTag(e);
                          }
                        }}
                        className="flex-1 bg-black/50 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                      />
                      <button
                        onClick={handleAddNewTag}
                        className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                      >
                        Add Tag
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {newItem.tags.map((tag) => (
                        <span
                          key={tag}
                          onClick={() => handleTagChange(tag)}
                          className="px-3 py-1 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-full text-sm cursor-pointer hover:bg-purple-500/30"
                        >
                          {tag} ×
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Author (for blogs) */}
              {activeTab === 'blogs' && (
                <div>
                  <label className="block text-gray-300 mb-2">Author</label>
                  <input
                    type="text"
                    name="author"
                    value={newItem.author}
                    onChange={handleInputChange}
                    className="w-full bg-black/50 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                    placeholder="Enter author name"
                  />
                </div>
              )}

              {/* Blog-specific fields */}
              {activeTab === 'blogs' && (
                <>
                  {/* Banner Image */}
                  <div>
                    <label className="block text-gray-300 mb-2">Banner Image URL</label>
                    <input
                      type="text"
                      name="bannerImg"
                      value={newItem.bannerImg}
                      onChange={handleInputChange}
                      className="w-full bg-black/50 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                      placeholder="Enter banner image URL"
                    />
                  </div>

                  {/* Content Writer */}
                  <div>
                    <label className="block text-gray-300 mb-2">Content Writer</label>
                    <select
                      value={newItem.contentWriter}
                      onChange={(e) => {
                        const selectedMember = currentTeamMembers.find(member => member.name === e.target.value);
                        if (selectedMember) {
                          setNewItem(prev => ({
                            ...prev,
                            contentWriter: selectedMember.name,
                            writerAvatar: selectedMember.photo,
                            socialMedia: {
                              ...prev.socialMedia,
                              linkedin: { link: selectedMember.linkedin }
                            }
                          }));
                        }
                      }}
                      className="w-full bg-black/50 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                    >
                      <option value="">Select a content writer</option>
                      {currentTeamMembers.map((member) => (
                        <option 
                          key={member.name} 
                          value={member.name}
                          className="text-black"
                        >
                          {member.name} - {member.role}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Show selected writer's details */}
                  {newItem.contentWriter && (
                    <div className="mt-2 p-4 bg-gray-800/50 rounded-lg">
                      <div className="flex items-center gap-4">
                        {newItem.writerAvatar && (
                          <img 
                            src={newItem.writerAvatar} 
                            alt={newItem.contentWriter}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        )}
                        <div>
                          <p className="text-white">{newItem.contentWriter}</p>
                          {newItem.socialMedia?.linkedin?.link && (
                            <a 
                              href={newItem.socialMedia.linkedin.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:text-blue-300 text-sm"
                            >
                              LinkedIn Profile
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Blog content with markdown support */}
                  <div>
                    <label className="block text-gray-300 mb-2">Content (supports markdown formatting)</label>
                    <textarea
                      name="content"
                      value={newItem.content}
                      onChange={(e) => setNewItem(prev => ({ ...prev, content: e.target.value }))}
                      className="w-full bg-black/50 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500 h-96"
                      placeholder="Enter blog content (use **text** for bold, *text* for italic)"
                    />
                    {newItem.content && (
                      <div className="p-3 bg-gray-800/50 rounded-lg">
                        <p className="text-sm text-gray-400 mb-2">Preview:</p>
                        <ReactMarkdown className="prose prose-invert max-w-none">
                          {newItem.content}
                        </ReactMarkdown>
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* Event-specific fields */}
              {activeTab === 'events' && (
                <>
                  {/* Slug */}
                  <div>
                    <label className="block text-gray-300 mb-2">Slug (URL-friendly name)</label>
                    <input
                      type="text"
                      name="slug"
                      value={newItem.slug}
                      onChange={handleInputChange}
                      className="w-full bg-black/50 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                      placeholder="Optional: will be generated from title if left blank"
                    />
                  </div>

                  {/* Banner Image URL */}
                  <div>
                    <label className="block text-gray-300 mb-2">Banner Image URL</label>
                    <input
                      type="text"
                      name="bannerImg"
                      value={newItem.bannerImg}
                      onChange={handleInputChange}
                      className="w-full bg-black/50 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  {/* Long Description */}
                  <div>
                    <label className="block text-gray-300 mb-2">Long Description</label>
                    <textarea
                      name="longDescription"
                      value={newItem.longDescription}
                      onChange={handleInputChange}
                      className="w-full bg-black/50 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500 h-32"
                      placeholder="Detailed event description"
                    />
                  </div>

                  {/* Venue */}
                  <div>
                    <label className="block text-gray-300 mb-2">Venue</label>
                    <input
                      type="text"
                      name="venue"
                      value={newItem.venue}
                      onChange={handleInputChange}
                      className="w-full bg-black/50 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  {/* Duration */}
                  <div>
                    <label className="block text-gray-300 mb-2">Duration</label>
                    <input
                      type="text"
                      name="duration"
                      value={newItem.duration}
                      onChange={handleInputChange}
                      className="w-full bg-black/50 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                      placeholder="e.g., '2 days', '3 hours'"
                    />
                  </div>

                  {/* Registration Status */}
                  <div>
                    <label className="block text-gray-300 mb-2">Registration Status</label>
                    <select
                      name="registrationStatus"
                      value={newItem.registrationStatus}
                      onChange={(e) => setNewItem(prev => ({
                        ...prev,
                        registrationStatus: e.target.value as 'Open' | 'Closed' | 'Ended'
                      }))}
                      className="w-full bg-black/50 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                    >
                      <option value="Open">Open</option>
                      <option value="Closed">Closed</option>
                      <option value="Ended">Ended</option>
                    </select>
                  </div>

                  {/* Agenda */}
                  <div>
                    <label className="block text-gray-300 mb-2">Event Agenda</label>
                    {newItem.agenda.map((agendaItem, index) => (
                      <div key={index} className="mb-4 p-4 bg-gray-800 rounded">
                        <input
                          type="text"
                          placeholder="Day"
                          value={agendaItem.day}
                          onChange={(e) => handleAgendaChange(index, 'day', e.target.value)}
                          className="w-full bg-black/50 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                        />
                        <input
                          type="text"
                          placeholder="Title"
                          value={agendaItem.title}
                          onChange={(e) => handleAgendaChange(index, 'title', e.target.value)}
                          className="w-full bg-black/50 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                        />
                        <textarea
                          placeholder="Details (one per line)"
                          value={agendaItem.details.join('\n')}
                          onChange={(e) => {
                            const details = e.target.value.split('\n').filter(d => d.trim() !== '');
                            const updatedAgenda = [...newItem.agenda];
                            updatedAgenda[index] = {
                              ...updatedAgenda[index],
                              details
                            };
                            setNewItem(prev => ({ ...prev, agenda: updatedAgenda }));
                          }}
                          className="w-full bg-black/50 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500 h-32"
                        />
                      </div>
                    ))}
                    <button
                      onClick={addAgendaItem}
                      className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded mt-2"
                    >
                      Add Agenda Item
                    </button>
                  </div>

                  {/* Why Attend */}
                  <div>
                    <label className="block text-gray-300 mb-2">Why Attend (one per line)</label>
                    <textarea
                      value={newItem.whyAttend.join('\n')}
                      onChange={(e) => {
                        const whyAttend = e.target.value.split('\n').filter(r => r.trim() !== '');
                        setNewItem(prev => ({ ...prev, whyAttend }));
                      }}
                      className="w-full bg-black/50 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500 h-32"
                      placeholder="Enter reasons to attend, one per line"
                    />
                  </div>

                  {/* Speakers */}
                  <div>
                    <label className="block text-gray-300 mb-2">Speakers</label>
                    {newItem.speakers.map((speaker, index) => (
                      <div key={index} className="mb-4 p-4 bg-gray-800 rounded">
                        <input
                          type="text"
                          placeholder="Name"
                          value={speaker.name}
                          onChange={(e) => handleSpeakerChange(index, 'name', e.target.value)}
                          className="w-full bg-black/50 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                        />
                        <input
                          type="text"
                          placeholder="Role"
                          value={speaker.role}
                          onChange={(e) => handleSpeakerChange(index, 'role', e.target.value)}
                          className="w-full bg-black/50 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                        />
                        <textarea
                          placeholder="Bio"
                          value={speaker.bio}
                          onChange={(e) => handleSpeakerChange(index, 'bio', e.target.value)}
                          className="w-full bg-black/50 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500 h-32"
                        />
                        <input
                          type="text"
                          placeholder="Avatar URL"
                          value={speaker.avatar}
                          onChange={(e) => handleSpeakerChange(index, 'avatar', e.target.value)}
                          className="w-full bg-black/50 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                        />
                        <input
                          type="text"
                          placeholder="LinkedIn Profile URL"
                          value={speaker.linkedin}
                          onChange={(e) => handleSpeakerChange(index, 'linkedin', e.target.value)}
                          className="w-full bg-black/50 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                        />
                      </div>
                    ))}
                    <button
                      onClick={addSpeaker}
                      className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded mt-2"
                    >
                      Add Speaker
                    </button>
                  </div>
                </>
              )}

              {/* Post-specific fields */}
              {activeTab === 'posts' && (
                <div className="space-y-8">
                  {/* Main Post Details */}
                  <div className="space-y-4 bg-gray-900/30 p-6 rounded-xl border border-gray-800">
                    <h3 className="text-xl font-semibold text-purple-400 mb-4">Post Details</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Post Title"
                        value={newPost.title}
                        onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full bg-black/50 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                      />
                      <input
                        type="date"
                        value={newPost.date}
                        onChange={(e) => setNewPost(prev => ({ ...prev, date: e.target.value }))}
                        className="w-full bg-black/50 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500 [color-scheme:dark]"
                      />
                    </div>
                    <textarea
                      placeholder="Post Description"
                      value={newPost.description}
                      onChange={(e) => setNewPost(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full bg-black/50 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500 h-32"
                    />
                    <input
                      type="text"
                      placeholder="Thumbnail Image URL"
                      value={newPost.image}
                      onChange={(e) => setNewPost(prev => ({ ...prev, image: e.target.value }))}
                      className="w-full bg-black/50 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                    />
                    
                    {/* Designer Dropdown */}
                    <div>
                      <label className="block text-gray-300 mb-2">Designer</label>
                      <select
                        value={newPost.designer}
                        onChange={(e) => {
                          const selectedMember = currentTeamMembers.find(member => member.name === e.target.value);
                          if (selectedMember) {
                            setNewPost(prev => ({
                              ...prev,
                              designer: selectedMember.name,
                              designerLinkedIn: selectedMember.linkedin
                            }));
                          }
                        }}
                        className="w-full bg-black/50 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                      >
                        <option value="">Select a designer</option>
                        {currentTeamMembers.map((member) => (
                          <option key={member.name} value={member.name}>
                            {member.name} - {member.role}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Content Writer Dropdown */}
                    <div>
                      <label className="block text-gray-300 mb-2">Content Writer</label>
                      <select
                        value={newPost.contentWriter}
                        onChange={(e) => {
                          const selectedMember = currentTeamMembers.find(member => member.name === e.target.value);
                          if (selectedMember) {
                            setNewPost(prev => ({
                              ...prev,
                              contentWriter: selectedMember.name,
                              contentWriterLinkedIn: selectedMember.linkedin
                            }));
                          }
                        }}
                        className="w-full bg-black/50 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                      >
                        <option value="">Select a content writer</option>
                        {currentTeamMembers.map((member) => (
                          <option key={member.name} value={member.name}>
                            {member.name} - {member.role}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Display Selected Designer and Content Writer */}
                    <div className="mt-4">
                      {newPost.designer && newPost.designerLinkedIn && (
                        <div className="flex items-center">
                          <span className="text-gray-400">Designer: </span>
                          <a 
                            href={newPost.designerLinkedIn} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-purple-400 ml-2 hover:text-purple-300"
                          >
                            {newPost.designer}
                          </a>
                        </div>
                      )}
                      {newPost.contentWriter && newPost.contentWriterLinkedIn && (
                        <div className="flex items-center">
                          <span className="text-gray-400">Content Writer: </span>
                          <a 
                            href={newPost.contentWriterLinkedIn} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-purple-400 ml-2 hover:text-purple-300"
                          >
                            {newPost.contentWriter}
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Tags Section */}
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Add a new tag"
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddNewTag(e);
                            }
                          }}
                          className="flex-1 bg-black/50 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                        />
                        <button
                          onClick={handleAddNewTag}
                          className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                        >
                          Add Tag
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {newPost.tags.map((tag) => (
                          <span
                            key={tag}
                            onClick={() => handleTagChange(tag)}
                            className="px-3 py-1 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-full text-sm cursor-pointer hover:bg-purple-500/30"
                          >
                            {tag} ×
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Social Media Links */}
                  <div className="grid grid-cols-2 gap-6">
                    {/* Instagram Section */}
                    <div className="space-y-4 bg-pink-500/5 p-6 rounded-xl border border-pink-500/20">
                      <h3 className="text-xl font-semibold text-pink-400">Instagram Post</h3>
                      <input
                        type="text"
                        placeholder="Post Link"
                        value={newPost.socialMedia.instagram.link}
                        onChange={(e) => setNewPost(prev => ({
                          ...prev,
                          socialMedia: {
                            ...prev.socialMedia,
                            instagram: { link: e.target.value }
                          }
                        }))}
                        className="w-full bg-black/50 border border-pink-500/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-pink-500"
                      />
                    </div>

                    {/* LinkedIn Section */}
                    <div className="space-y-4 bg-blue-500/5 p-6 rounded-xl border border-blue-500/20">
                      <h3 className="text-xl font-semibold text-blue-400">LinkedIn Post</h3>
                      <input
                        type="text"
                        placeholder="Post Link"
                        value={newPost.socialMedia.linkedin.link}
                        onChange={(e) => setNewPost(prev => ({
                          ...prev,
                          socialMedia: {
                            ...prev.socialMedia,
                            linkedin: { link: e.target.value }
                          }
                        }))}
                        className="w-full bg-black/50 border border-blue-500/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <button
                    onClick={isEditing ? handleUpdate : handlePostSubmit}
                    className="w-full bg-gradient-to-r from-pink-500 to-blue-500 text-white py-3 rounded-lg hover:from-pink-600 hover:to-blue-600 transition-all duration-300"
                  >
                    {isEditing ? 'Update Post' : 'Add Post'}
                  </button>
                </div>
              )}

              {/* Project-specific fields */}
              {activeTab === 'projects' && (
                <>
                  <div>
                    <label className="block text-gray-300 mb-2">Project URL</label>
                    <input
                      type="text"
                      name="websiteUrl"
                      value={newItem.websiteUrl}
                      onChange={handleInputChange}
                      className="w-full bg-black/50 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                      placeholder="Enter project website URL"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">Project Author/Team</label>
                    <input
                      type="text"
                      name="author"
                      value={newItem.author}
                      onChange={handleInputChange}
                      className="w-full bg-black/50 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                      placeholder="Enter project author or team name"
                    />
                  </div>
                </>
              )}

              {/* Submit Button */}
              <button
                onClick={isEditing ? handleUpdate : handleAddItem}
                className="w-full bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600 transition-colors"
              >
                {isEditing ? `Update ${activeTab.slice(0, -1)}` : `Add ${activeTab.slice(0, -1)}`}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


export default AdminDashboard;
