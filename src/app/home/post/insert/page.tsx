"use client";
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Section } from '../../about/section';
export default function Page() {
  const router = useRouter()
  const PROMPT = "You are a creative blog writer. write a 50-word blog post about the title below. You can write anything you want, but it must be at least 50 words long. The title is: "
  const [generating, setGenerating] = useState(false);
  const [content, setContent] = useState('');
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    author: '',
    content: '',
    date: new Date().toLocaleDateString('en-US').slice(0, 10)
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
    const uuid = uuidv4();
    fetch(`/api/handlers?id=${uuid}&title=${formData.title}&author=${formData.author}&content=${content || formData.content}&date=${formData.date}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...formData, id: uuid })
    }).then(() => {
      // Clear form fields
      setFormData({
        id: '',
        title: '',
        author: '',
        content: '',
        date: ''
      });
      router.push('/home/blog');
    }).catch(console.error)
  }

  const generateContent = () => {
    setGenerating(true);
    if (!formData?.title) { return false }
    const requestParams = {
      model: "gpt-4o-mini",
      messages: [{ "role": "system", "content": PROMPT + formData?.title },
      { "role": "user", "content": formData?.title },]

    }
    fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify(requestParams)
    }).then(response => response.json())
      .then(data => {
        setContent(data.choices[0].message.content);
        console.log(data.choices[0].message.content);
        setGenerating(false);
      }).catch(console.error);
  }

  useEffect(() => {
    console.log('useEffect called', process.env.OPENAI_API_KEY);
  }, [router]);

  const postContent = useMemo(() => {
    return content || formData.content;
 
  }, [content, formData.content]);

  return (
    <div className="container mx-auto px-4 md:px-8 pb-16">
            <header className="text-center py-8">
                <h1 className="text-4xl md:text-3xl font-extrabold text-gray-800">Create a New Blog Post</h1>
                <p className="mt-2 text-lg text-gray-400">Share your latest thoughts and ideas.</p>
            </header>
            <Section title="New Post Details">
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label htmlFor="title" className="block font-medium">Title:</label>
          <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} className="w-full border-2 bg-white text-black border-purple-100 p-2 rounded-md focus:border-purple-200 focus:outline-none" />
        </div>
        <div>
          <label htmlFor="content" className="block font-medium">Content:</label>
          <textarea id="content" name="content" rows={4} value={postContent} onChange={handleChange} className="w-full border-2 bg-white text-black border-purple-100 p-2 rounded-md focus:border-purple-200 focus:outline-none"></textarea>
          {generating && <p className='text-gray-800/60 my-1'>Generating content...</p>}
          <button onClick={generateContent} type="button" className="bg-gray-800/60 text-white px-4 py-2 rounded-md bg-gray-600  hover:bg-gray-800">Generate Content</button>
        </div>
        <div>
          <label htmlFor="date" className="block font-medium">Date:</label>
          <input type="text" id="date" name="date" value={formData.date} readOnly className="w-full border-2 text-black border-purple-100 p-2 rounded-md focus:border-purple-200 focus:outline-none" />

        </div>
        <div>
          <button type="submit" className="bg-gray-800/60 text-white px-4 py-2 rounded-md bg-gray-600  hover:bg-gray-800">Submit</button>
        </div>
      </form>
      </Section>
    </div>
  );
}