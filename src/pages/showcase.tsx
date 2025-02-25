import React, { useState, useEffect } from 'react';
import Showcase from '../components/Showcase';
import { Template } from '../types';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';

const ShowcasePage: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTemplates() {
      try {
        const querySnapshot = await getDocs(collection(db, 'templates'));
        const templatesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Template[];
        setTemplates(templatesData);
      } catch (error) {
        console.error("Error fetching templates: ", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTemplates();
  }, []);

  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;

  return <Showcase templates={templates} />;
};

export default ShowcasePage;
