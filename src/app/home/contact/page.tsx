'use client';
import { useState } from 'react';
import React from 'react';
import { Section } from '../about/section';
import { ImageSlideshow } from './imageSlideshow';
import { CONTACT_DETAILS, SOCIAL_LINKS, SOCIAL_LIFE_IMAGES } from '../constant';
import { v4 as uuidv4 } from 'uuid';
import { CtaButton } from '@/app/ui/components/cta-button';

//  const ContactPage: React.FC = () => {
//     return (
//         <div className="container mx-auto px-4 md:px-8 pb-16">
//             <header className="text-center py-8">
//                 <h1 className="text-4xl md:text-3xl font-extrabold text-gray-800">Get In Touch</h1>
//                 <p className="mt-2 text-lg text-gray-400">I am always open to discussing new projects, creative ideas, or opportunities to connect.</p>
//             </header>
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 space-y-12">
//                 {/* LEFT COLUMN */}
//                 <div className="flex flex-col gap-8">
                    
//                     <Section title="Find Me On Social Media">
//                         <div className="grid grid-cols-2 gap-4">
//                             {SOCIAL_LINKS.map(link => (
//                                 <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="bg-gray-900/50 p-4 rounded-lg flex items-center gap-4 transition-all duration-300 hover:bg-gray-700/50 hover:text-cyan-400 group">
//                                     <div className="text-cyan-500 group-hover:text-cyan-400 transition-colors">{link.icon}</div>
//                                     <span className="font-semibold text-white">{link.name}</span>
//                                 </a>
//                             ))}
//                         </div>
//                     </Section>

//                     <Section title="Send a Message">
//                         <form className="space-y-4">
//                             <div>
//                                 <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Name</label>
//                                 <input type="text" id="name" name="name" className="w-full bg-gray-700/50 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500" />
//                             </div>
//                             <div>
//                                 <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
//                                 <input type="email" id="email" name="email" className="w-full bg-gray-700/50 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500" />
//                             </div>
//                             <div>
//                                 <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Message</label>
//                                 <textarea id="message" name="message" rows={4} className="w-full bg-gray-700/50 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"></textarea>
//                             </div>
//                             <button type="submit" className="w-full bg-cyan-500 text-white font-bold py-2.5 px-4 rounded-lg hover:bg-cyan-600 transition-colors duration-300 flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20">
//                                 Send Message
//                             </button>
//                         </form>
//                     </Section>
//                 </div>

//                 {/* RIGHT COLUMN */}
//                 <div className="flex flex-col gap-8">
//                     <Section title="Contact Information">
//                         <div className="space-y-4">
//                             <div className="flex items-center gap-4">
//                                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
//                                 <a href={`mailto:${CONTACT_DETAILS.email}`} className="text-gray-300 hover:text-cyan-400 transition-colors">{CONTACT_DETAILS.email}</a>
//                             </div>
//                             <div className="flex items-center gap-4">
//                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
//                                 <span className="text-gray-300">{CONTACT_DETAILS.location}</span>
//                             </div>
//                         </div>
//                     </Section>

//                     <Section title="A Glimpse Into My Life">
//                       <div className='w-full' style={{ height: '450px' }}>
//                         <ImageSlideshow images={SOCIAL_LIFE_IMAGES} />
//                         </div>
//                     </Section>
//                 </div>
//             </div>
//         </div>
//     );
// };
// export default ContactPage;


type SubmissionStatus = 'idle' | 'sending' | 'success' | 'error';

export default function ContactPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<SubmissionStatus>('idle');
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    const messageLength = message.trim().length;
    const messageMinLength = 20;
    const messageMaxLength = 1200;
    const messageTooShort = message.length > 0 && messageLength < messageMinLength;
    const messageTooLong = messageLength > messageMaxLength;
    const formIsValid = name.trim().length > 0 && emailIsValid && messageLength >= messageMinLength && !messageTooLong;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formIsValid) {
          setStatus('error');
          setFeedbackMessage('Please fix the highlighted fields before sending your message.');
          return;
        }
        setStatus('sending');
        setFeedbackMessage('');

  const formData = {
    id: uuidv4(),
    name,
    email,
    message,
  };

  fetch('/api/contactApi', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
    .then(async (response) => {
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data?.message || 'Error sending message. Please try again.');
      }
      return data;
    })
    .then(() => {
      setStatus('success');
      setFeedbackMessage('Thank you for your message! I will get back to you soon.');
      setName('');
      setEmail('');
      setMessage('');
    })
    .catch((error: Error) => {
      setStatus('error');
      setFeedbackMessage(error.message || 'Error sending message. Please try again.');
    })
    .finally(() => {
      setTimeout(() => setStatus('idle'), 5000);
    });
};

        

        // Simulate an API call
    //     setTimeout(() => {
    //         // Simulate a successful submission
    //         setStatus('success');
    //         setFeedbackMessage('Thank you for your message! I will get back to you soon.');
    //         setName('');
    //         setEmail('');
    //         setMessage('');

    //         // Reset form status after a few seconds
    //         setTimeout(() => setStatus('idle'), 5000);
    //     }, 2000);
    // };


    return (
        <div className="container mx-auto px-4 md:px-8 pb-16">
            <header className="text-center py-8">
                <h1 className="text-4xl md:text-3xl font-extrabold text-gray-100">Get In Touch</h1>
                <p className="mt-2 text-lg text-gray-300">I am always open to discussing new projects, creative ideas, or opportunities to connect.</p>
                <p className="mt-2 text-sm text-cyan-300">Usually replies within 24-48 hours.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">
                {/* LEFT COLUMN */}
                <div className="flex flex-col gap-8">
                    <Section title="Contact Information">
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                <a href={`mailto:${CONTACT_DETAILS.email}`} className="text-gray-300 hover:text-cyan-400 transition-colors">{CONTACT_DETAILS.email}</a>
                            </div>
                            <div className="flex items-center gap-4">
                                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                <span className="text-gray-300">{CONTACT_DETAILS.location}</span>
                            </div>
                        </div>
                    </Section>

                    <Section title="Send a Message">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                                <input 
                                    type="text" 
                                    id="name" 
                                    name="name" 
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    disabled={status === 'sending'}
                                    className="w-full bg-gray-700/50 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 disabled:opacity-50" 
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    name="email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    disabled={status === 'sending'}
                                    className={`w-full bg-gray-700/50 border rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 disabled:opacity-50 ${email.length > 0 && !emailIsValid ? 'border-red-500' : 'border-gray-600'}`}
                                />
                                {email.length > 0 && !emailIsValid && (
                                  <p className="mt-1 text-xs text-red-400">Please enter a valid email address.</p>
                                )}
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                                <textarea 
                                    id="message" 
                                    name="message" 
                                    rows={4} 
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    required
                                    disabled={status === 'sending'}
                                    className={`w-full bg-gray-700/50 border rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 disabled:opacity-50 ${messageTooShort || messageTooLong ? 'border-red-500' : 'border-gray-600'}`}
                                ></textarea>
                                <div className="mt-1 flex items-center justify-between">
                                  <p className={`text-xs ${messageTooShort || messageTooLong ? 'text-red-400' : 'text-gray-400'}`}>
                                    {messageTooShort
                                      ? `Message should be at least ${messageMinLength} characters.`
                                      : messageTooLong
                                        ? `Message should be at most ${messageMaxLength} characters.`
                                        : `Please include enough detail (${messageMinLength}+ characters).`}
                                  </p>
                                  <p className={`text-xs ${messageTooLong ? 'text-red-400' : 'text-gray-500'}`}>
                                    {messageLength}/{messageMaxLength}
                                  </p>
                                </div>
                            </div>
                            <div className="pt-1">
                                <CtaButton
                                    type="submit" 
                                    variant="primary"
                                    size="lg"
                                    fullWidth
                                    disabled={status === 'sending' || !formIsValid}
                                    className="shadow-lg shadow-cyan-500/20 disabled:bg-gray-600 disabled:shadow-none normal-case tracking-normal text-sm rounded-lg"
                                >
                                    {status === 'sending' ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Sending...
                                        </>
                                    ) : 'Send Message'}
                                </CtaButton>
                                {status === 'success' && <p className="text-green-400 text-sm mt-3 text-center">{feedbackMessage}</p>}
                                {status === 'error' && <p className="text-red-400 text-sm mt-3 text-center">{feedbackMessage}</p>}
                            </div>
                        </form>
                    </Section>
                </div>

                {/* RIGHT COLUMN */}
                <div className="flex flex-col gap-8">
                    <Section title="Find Me On Social Media">
                        <div className="grid grid-cols-2 gap-4">
                            {SOCIAL_LINKS.map(link => (
                                <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="bg-gray-900/50 p-4 rounded-lg flex items-center gap-4 transition-all duration-300 hover:bg-gray-700/50 hover:text-cyan-400 group">
                                    <div className="text-cyan-500 group-hover:text-cyan-400 transition-colors">{link.icon}</div>
                                    <span className="font-semibold text-white">{link.name}</span>
                                </a>
                            ))}
                        </div>
                    </Section>
                     <Section title="A Glimpse Into My Life">
                       <div className='w-full' style={{ height: '450px' }}>
                         <ImageSlideshow images={SOCIAL_LIFE_IMAGES} />
                        </div>
                     </Section>
                </div>
            </div>
        </div>
    );
}

