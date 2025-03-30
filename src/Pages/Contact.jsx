import React, { useState, useEffect } from "react";
import { Share2, User, Mail, MessageSquare, Send } from "lucide-react";
import { Link } from "react-router-dom";
import SocialLinks from "../components/SocialLinks";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    AOS.init({
      once: false,
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    Swal.fire({
      title: 'Sending Message...',
      html: 'Please wait while we send your message',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      // Get form data
      const form = e.target;
      const formData = new FormData(form);

      // Submit form
      await form.submit();

      // Show success message
      Swal.fire({
        title: 'Success!',
        text: 'Your message has been sent successfully!',
        icon: 'success',
        confirmButtonColor: '#6366f1',
        timer: 2000,
        timerProgressBar: true
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong. Please try again later.',
        icon: 'error',
        confirmButtonColor: '#6366f1'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="h-auto py-10 flex flex-col items-center justify-center px-[5%] md:px-0 text-center" id="Contact">
  <div className="container px-[1%] flex flex-col items-center justify-center max-w-2xl">
    <div
      data-aos="fade-right"
      data-aos-duration="1200"
      className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl p-5 py-10 sm:p-10 w-full max-w-lg text-center"
    >
      <div className="flex flex-col items-center mb-8">
        <h2 className="text-4xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
          Get in Touch
        </h2>
        <p className="text-gray-400">
          Have something to discuss? Send me a message and let's talk.
        </p>
      </div>

      <form
        action="https://formsubmit.co/arjunsabumark32@gmail.com"
        method="POST"
        onSubmit={handleSubmit}
        className="space-y-6 w-full"
      >
        {/* FormSubmit Configuration */}
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="_captcha" value="false" />

        <div data-aos="fade-up" data-aos-delay="100" className="relative group">
          <User className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-[#6366f1] transition-colors" />
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            disabled={isSubmitting}
            className="w-full text-center p-4 pl-12 bg-white/10 rounded-xl border border-white/20 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 transition-all duration-300 hover:border-[#6366f1]/30 disabled:opacity-50"
            required
          />
        </div>
        <div data-aos="fade-up" data-aos-delay="200" className="relative group">
          <Mail className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-[#6366f1] transition-colors" />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            disabled={isSubmitting}
            className="w-full text-center p-4 pl-12 bg-white/10 rounded-xl border border-white/20 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 transition-all duration-300 hover:border-[#6366f1]/30 disabled:opacity-50"
            required
          />
        </div>
        <div data-aos="fade-up" data-aos-delay="300" className="relative group">
          <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-[#6366f1] transition-colors" />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            disabled={isSubmitting}
            className="w-full text-center resize-none p-4 pl-12 bg-white/10 rounded-xl border border-white/20 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 transition-all duration-300 hover:border-[#6366f1]/30 h-[9.9rem] disabled:opacity-50"
            required
          />
        </div>
        <button
          data-aos="fade-up"
          data-aos-delay="400"
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#6366f1]/20 active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          <Send className="w-5 h-5" />
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>

      <div className="mt-10 pt-6 border-t border-white/10 flex justify-center space-x-6">
        <SocialLinks />
      </div>
    </div>
  </div>
</div>

    </>
  );
};

export default ContactPage;