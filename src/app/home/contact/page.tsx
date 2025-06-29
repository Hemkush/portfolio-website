import React from "react";

const contactInfo = [
  {
    type: "Email",
    value: "contact@mywebsite.com",
    icon: "📧",
    link: "mailto:contact@mywebsite.com",
  },
  {
    type: "Phone",
    value: "+1 (555) 123-4567",
    icon: "📞",
    link: "tel:+15551234567",
  },
  {
    type: "Location",
    value: "123 Main St, Springfield, USA",
    icon: "📍",
    link: "https://goo.gl/maps/xyz123",
  },
];

export default function ContactPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-gray-800 p-6">
      <section className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4 text-gray-800 text-center">
          Get in Touch
        </h1>
        <p className="mb-6 text-gray-600 text-center">
          We’d love to hear from you! Reach out using any of the methods below.
        </p>
        <ul className="space-y-4">
          {contactInfo.map((info) => (
            <li key={info.type} className="flex items-center gap-4">
              <span className="text-2xl">{info.icon}</span>
              <a
                href={info.link}
                className="text-blue-600 hover:underline font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                {info.value}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}