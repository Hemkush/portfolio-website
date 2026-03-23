"use client";
import { v4 as uuidv4 } from 'uuid';
import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Section } from '../../about/section';
import { User } from '@/app/lib/definition';
import { getSession } from 'next-auth/react';
export default function Page() {
  const router = useRouter()
  const [generating, setGenerating] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [content, setContent] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    author: '',
    content: '',
    date: new Date().toISOString().slice(0, 10)
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');
    const uuid = uuidv4();
    fetch('/api/handlers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...formData,
        id: uuid,
        author: user?.name || '',
        content: content || formData.content,
      })
    }).then(async (response) => {
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data?.message || 'Unable to create blog post.');
      }
      // Clear form fields
      setFormData({
        id: '',
        title: '',
        author: '',
        content: '',
        date: ''
      });
      router.push('/home/blog');
    }).catch((error: Error) => {
      setErrorMessage(error.message || 'Unable to create blog post.');
    })
  }

  const generateContent = () => {
    setGenerating(true);
    if (!formData?.title) {
      setGenerating(false);
      return false
    }
    fetch('/api/ai/generate-blog', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: formData.title })
    }).then(response => response.json())
      .then(data => {
        if (data?.error) {
          setErrorMessage(data.error);
          setGenerating(false);
          return;
        }
        setContent(data.content || '');
        setGenerating(false);
      }).catch(() => {
        setErrorMessage('Failed to generate content.');
        setGenerating(false);
      });
  }

   useEffect(() => {
    getSession().then((session) => {
      setUser(session?.user as User | null);
      if (!session?.user) {
        router.push('/home/blog');
      }
    })
  }, [router]);

  const postContent = useMemo(() => {
    return content || formData.content;
 
  }, [content, formData.content]);

  return (
    <div className="page-shell">
            <header className="page-header">
                <h1 className="page-title">Create a New Blog Post</h1>
                <p className="page-subtitle">Share your latest thoughts and ideas.</p>
            </header>
            <Section title="New Post Details">
      <form onSubmit={handleSubmit} className="space-y-4">
        {errorMessage && <p className="text-red-400 text-sm">{errorMessage}</p>}

        <div>
          <label htmlFor="title" className="block font-medium text-slate-200">Title:</label>
          <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} className="input-dark mt-1" />
        </div>
        <div>
          <label htmlFor="content" className="block font-medium text-slate-200">Content:</label>
          <textarea id="content" name="content" rows={4} value={postContent} onChange={handleChange} className="input-dark mt-1"></textarea>
          {generating && <p className='text-gray-400 my-1'>Generating content...</p>}
          <button onClick={generateContent} type="button" className="btn-secondary-dark mt-1">Generate Content</button>
        </div>
        <div>
          <label htmlFor="date" className="block font-medium text-slate-200">Date:</label>
          <input type="text" id="date" name="date" value={formData.date} readOnly className="input-dark mt-1" />

        </div>
        <div>
          <button type="submit" className="btn-secondary-dark">Submit</button>
        </div>
      </form>
      </Section>
    </div>
  );
}

