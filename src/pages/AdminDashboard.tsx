import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc 
} from 'firebase/firestore';
import { db } from '../services/firebase';

const AdminDashboard: React.FC = () => {
  const { currentUser, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'blogs' | 'projects' | 'events'>('blogs');
  const [error, setError] = useState<string | null>(null);

  // State for form inputs
  const [newItem, setNewItem] = useState({
    title: '',
    description: '',
    date: '',
    image: '',
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
    websiteUrl: '', // Add this line
  });

  useEffect(() => {
    console.log('Current User:', currentUser);
    console.log('Is Admin:', isAdmin);
  }, [currentUser, isAdmin]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewItem(prev => ({
      ...prev,
      [name]: value
    }));
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
        websiteUrl: '', // Reset this field
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
      <h1 className="text-4xl mb-8">Admin Dashboard</h1>

      {error && (
        <div className="bg-red-500/20 border border-red-500 p-4 rounded-lg mb-4">
          {error}
        </div>
      )}

      {/* Tabs */}
      <div className="flex mb-8">
        {['blogs', 'projects', 'events'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-4 py-2 ${activeTab === tab ? 'bg-purple-500' : 'bg-gray-800'}`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Content Management Form */}
      <form className="bg-gray-900 p-6 rounded-lg">
        <div className="mb-4">
          <label className="block mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={newItem.title}
            onChange={handleInputChange}
            className="w-full bg-gray-800 p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Description</label>
          <textarea
            name="description"
            value={newItem.description}
            onChange={handleInputChange}
            className="w-full bg-gray-800 p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Date</label>
          <input
            type="date"
            name="date"
            value={newItem.date}
            onChange={handleInputChange}
            className="w-full bg-gray-800 p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Image URL</label>
          <input
            type="text"
            name="image"
            value={newItem.image}
            onChange={handleInputChange}
            className="w-full bg-gray-800 p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Tags (comma-separated)</label>
          <input
            type="text"
            value={newItem.tags.join(', ')}
            onChange={(e) => {
              // Split input by comma, trim whitespace, and filter out empty tags
              const tags = e.target.value
                .split(',')
                .map(tag => tag.trim())
                .filter(tag => tag !== '');
              
              setNewItem(prev => ({
                ...prev,
                tags: tags
              }));
            }}
            className="w-full bg-gray-800 p-2 rounded"
            placeholder="Enter tags separated by commas"
          />
        </div>

        {/* Event-specific fields */}
        {activeTab === 'events' && (
          <>
            <div className="mb-4">
              <label className="block mb-2">Slug (URL-friendly name)</label>
              <input
                type="text"
                name="slug"
                value={newItem.slug}
                onChange={handleInputChange}
                className="w-full bg-gray-800 p-2 rounded"
                placeholder="Optional: will be generated from title if left blank"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Banner Image URL</label>
              <input
                type="text"
                name="bannerImg"
                value={newItem.bannerImg}
                onChange={handleInputChange}
                className="w-full bg-gray-800 p-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Long Description</label>
              <textarea
                name="longDescription"
                value={newItem.longDescription}
                onChange={handleInputChange}
                className="w-full bg-gray-800 p-2 rounded"
                placeholder="Detailed event description"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Venue</label>
              <input
                type="text"
                name="venue"
                value={newItem.venue}
                onChange={handleInputChange}
                className="w-full bg-gray-800 p-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Duration</label>
              <input
                type="text"
                name="duration"
                value={newItem.duration}
                onChange={handleInputChange}
                className="w-full bg-gray-800 p-2 rounded"
                placeholder="e.g., '2 days', '3 hours'"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Registration Status</label>
              <select
                name="registrationStatus"
                value={newItem.registrationStatus}
                onChange={(e) => setNewItem(prev => ({
                  ...prev,
                  registrationStatus: e.target.value as 'Open' | 'Closed' | 'Ended'
                }))}
                className="w-full bg-gray-800 p-2 rounded"
              >
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
                <option value="Ended">Ended</option>
              </select>
            </div>

            {/* Agenda Section */}
            <div className="mb-4">
              <label className="block mb-2">Event Agenda</label>
              {newItem.agenda.map((agendaItem, index) => (
                <div key={index} className="mb-4 p-4 bg-gray-800 rounded">
                  <input
                    type="text"
                    placeholder="Day"
                    value={agendaItem.day}
                    onChange={(e) => handleAgendaChange(index, 'day', e.target.value)}
                    className="w-full bg-gray-700 p-2 rounded mb-2"
                  />
                  <input
                    type="text"
                    placeholder="Title"
                    value={agendaItem.title}
                    onChange={(e) => handleAgendaChange(index, 'title', e.target.value)}
                    className="w-full bg-gray-700 p-2 rounded mb-2"
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
                    className="w-full bg-gray-700 p-2 rounded"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={addAgendaItem}
                className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded mt-2"
              >
                Add Agenda Item
              </button>
            </div>

            {/* Why Attend Section */}
            <div className="mb-4">
              <label className="block mb-2">Why Attend (one per line)</label>
              <textarea
                value={newItem.whyAttend.join('\n')}
                onChange={(e) => {
                  const whyAttend = e.target.value.split('\n').filter(r => r.trim() !== '');
                  setNewItem(prev => ({ ...prev, whyAttend }));
                }}
                className="w-full bg-gray-800 p-2 rounded"
                placeholder="Enter reasons to attend, one per line"
              />
            </div>

            {/* Speakers Section */}
            <div className="mb-4">
              <label className="block mb-2">Speakers</label>
              {newItem.speakers.map((speaker, index) => (
                <div key={index} className="mb-4 p-4 bg-gray-800 rounded">
                  <input
                    type="text"
                    placeholder="Name"
                    value={speaker.name}
                    onChange={(e) => handleSpeakerChange(index, 'name', e.target.value)}
                    className="w-full bg-gray-700 p-2 rounded mb-2"
                  />
                  <input
                    type="text"
                    placeholder="Role"
                    value={speaker.role}
                    onChange={(e) => handleSpeakerChange(index, 'role', e.target.value)}
                    className="w-full bg-gray-700 p-2 rounded mb-2"
                  />
                  <textarea
                    placeholder="Bio"
                    value={speaker.bio}
                    onChange={(e) => handleSpeakerChange(index, 'bio', e.target.value)}
                    className="w-full bg-gray-700 p-2 rounded mb-2"
                  />
                  <input
                    type="text"
                    placeholder="Avatar URL"
                    value={speaker.avatar}
                    onChange={(e) => handleSpeakerChange(index, 'avatar', e.target.value)}
                    className="w-full bg-gray-700 p-2 rounded mb-2"
                  />
                  <input
                    type="text"
                    placeholder="LinkedIn Profile URL"
                    value={speaker.linkedin}
                    onChange={(e) => handleSpeakerChange(index, 'linkedin', e.target.value)}
                    className="w-full bg-gray-700 p-2 rounded"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={addSpeaker}
                className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded mt-2"
              >
                Add Speaker
              </button>
            </div>
          </>
        )}
        {activeTab === 'projects' && (
          <div className="mb-4">
            <label className="block mb-2">Project Website URL (optional)</label>
            <input
              type="text"
              value={newItem.websiteUrl}
              onChange={(e) => setNewItem(prev => ({ ...prev, websiteUrl: e.target.value }))}
              className="w-full bg-gray-800 p-2 rounded"
            />
          </div>
        )}
        <button
          type="button"
          onClick={handleAddItem}
          className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded"
        >
          Add {activeTab.slice(0, -1)}
        </button>
      </form>
    </div>
  );
};

export default AdminDashboard;
