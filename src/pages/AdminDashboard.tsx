import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../services/firebase';
import { 
  collection, 
  addDoc, 
  getDocs
} from 'firebase/firestore';

const AdminDashboard: React.FC = () => {
  const { currentUser, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState<'blogs' | 'projects' | 'events'>('blogs');
  const [error, setError] = useState<string | null>(null);
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');

  // State for form inputs
  const [newItem, setNewItem] = useState({
    title: '',
    description: '',
    date: '',
    image: '',
    author: '',
    websiteUrl: '',
    tags: [] as string[],
    // New event-specific fields
    slug: '',
    bannerImg: '',
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
      linkedin: string 
    }[],
  });

  useEffect(() => {
    console.log('Current User:', currentUser);
    console.log('Is Admin:', isAdmin);
  }, [currentUser, isAdmin]);

  useEffect(() => {
    // Fetch existing tags from Firebase
    const fetchTags = async () => {
      try {
        const collectionRef = collection(db, activeTab);
        const snapshot = await getDocs(collectionRef);
        const tags = new Set<string>();
        
        snapshot.forEach((doc) => {
          const data = doc.data();
          if (data.tags && Array.isArray(data.tags)) {
            data.tags.forEach((tag: string) => tags.add(tag));
          }
        });
        
        setAvailableTags(Array.from(tags).sort());
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };

    fetchTags();
  }, [activeTab]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewItem(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTagChange = (selectedTag: string) => {
    setNewItem(prev => {
      const currentTags = new Set(prev.tags);
      if (currentTags.has(selectedTag)) {
        currentTags.delete(selectedTag);
      } else {
        currentTags.add(selectedTag);
      }
      return { ...prev, tags: Array.from(currentTags) };
    });
  };

  const handleAddNewTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTag.trim()) {
      const trimmedTag = newTag.trim();
      if (!availableTags.includes(trimmedTag)) {
        setAvailableTags(prev => [...prev, trimmedTag].sort());
      }
      setNewItem(prev => ({
        ...prev,
        tags: [...new Set([...prev.tags, trimmedTag])]
      }));
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
        // Ensure tags is an array and trim whitespace
        tags: newItem.tags.map(tag => tag.trim()).filter(tag => tag !== ''),
        // Generate slug if not provided
        slug: newItem.slug || newItem.title.toLowerCase().replace(/\s+/g, '-')
      });

      console.log('Document added with ID:', docRef.id);

      // Reset form and show success message
      setNewItem({
        title: '',
        description: '',
        date: '',
        image: '',
        author: '',
        websiteUrl: '',
        tags: [],
        slug: '',
        bannerImg: '',
        longDescription: '',
        agenda: [],
        whyAttend: [],
        venue: '',
        duration: '',
        registrationStatus: 'Open',
        speakers: [],
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

  if (!currentUser) {
    return <div className="text-white p-8">Please log in to access this page.</div>;
  }

  if (!isAdmin) {
    return <div className="text-white p-8">Access Denied. You must be an admin to view this page.</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

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
      </div>

      <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
        <h2 className="text-2xl font-semibold mb-6">Add New {activeTab.slice(0, -1)}</h2>
        
        <div className="space-y-6">
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

          {/* Description */}
          <div>
            <label className="block text-gray-300 mb-2">Description</label>
            <textarea
              name="description"
              value={newItem.description}
              onChange={handleInputChange}
              className="w-full bg-black/50 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500 h-32"
              placeholder="Enter description"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-gray-300 mb-2">Date</label>
            <input
              type="date"
              name="date"
              value={newItem.date}
              onChange={handleInputChange}
              className="w-full bg-black/50 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
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

          {/* Tags */}
          <div>
            <label className="block text-gray-300 mb-2">Tags</label>
            <div className="space-y-4">
              {/* Selected Tags */}
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

              {/* Add New Tag */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddNewTag(e);
                    }
                  }}
                  className="flex-1 bg-black/50 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                  placeholder="Add a new tag"
                />
                <button
                  onClick={handleAddNewTag}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                >
                  Add Tag
                </button>
              </div>

              {/* Available Tags */}
              {availableTags.length > 0 && (
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Available Tags:</label>
                  <div className="flex flex-wrap gap-2">
                    {availableTags.map((tag) => (
                      <span
                        key={tag}
                        onClick={() => handleTagChange(tag)}
                        className={`px-3 py-1 rounded-full text-sm cursor-pointer ${
                          newItem.tags.includes(tag)
                            ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                            : 'bg-gray-800/50 text-gray-400 border border-gray-700 hover:border-purple-500/30'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

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
          <button
            onClick={handleAddItem}
            className="w-full bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600 transition-colors"
          >
            Add {activeTab.slice(0, -1)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
