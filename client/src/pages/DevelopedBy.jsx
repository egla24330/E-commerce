import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Building2, Mail, BadgeCheck, Lightbulb, Rocket, Globe, Handshake, Target, Code } from 'lucide-react';
import { Helmet } from 'react-helmet'
const DevelopedBy = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <>
    <Helmet>
      <title>Developed By | Datora</title>
      <meta name="description" content="Learn about Datora, our mission, vision, core values, and how to collaborate. Built and maintained by Abdi." />
    </Helmet>
      <div className="min-h-screen sm:px-2 sm:py-5 flex items-center justify-center text-gray-800">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl w-full bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          {/* Header with Gradient */}
          <div className="bg-gradient-to-r from-black to-purple-600 sm:py-6 sm:px-6 text-white">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm">
                <Building2 className="w-10 h-10 text-white" />
              </div>
              <div className='text-center'>
                <h1 className="text-2xl font-bold">Datora</h1>
                <p className="text-indigo-200 mt-1 text-sm flex items-center gap-2">
                  <BadgeCheck className="w-4 h-4 text-yellow-300" />
                  Built & Maintained by Abdi
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* About Section */}
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="mb-8"
            >
              <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                <Code className="w-4 h-4 text-indigo-600" />
                About Datora
              </h2>

              <div className="text-gray-700 text-sm leading-relaxed space-y-3 bg-indigo-50 p-5 rounded-xl">
                <p>
                  Datora is a creative software development initiative focused on building modern digital solutions
                  for real-world commerce.
                </p>
                <p>
                  From UI/UX to backend engineering, we strive to deliver clean, scalable,
                  and intuitive experiences.
                </p>
                <p>
                  This platform was crafted with dedication to detail, performance, and a long-term vision of supporting
                  small businesses and online entrepreneurs in emerging markets.
                </p>
              </div>
            </motion.div>

            {/* Mission & Vision */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
              {/* Mission */}
              <motion.div
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-xl border border-blue-100"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Lightbulb className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-base font-semibold text-blue-700">Our Mission</h2>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  To empower individuals and businesses by delivering reliable, smart, and efficient software
                  solutions tailored for impact and usability.
                </p>
              </motion.div>

              {/* Vision */}
              <motion.div
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                className="bg-gradient-to-br from-purple-50 to-indigo-50 p-5 rounded-xl border border-purple-100"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <Rocket className="w-5 h-5 text-purple-600" />
                  </div>
                  <h2 className="text-base font-semibold text-purple-700">Our Vision</h2>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  To become a leading force in the next generation of tech builders in Africa and beyond,
                  committed to innovation, inclusivity, and excellence in digital development.
                </p>
              </motion.div>
            </div>

            {/* Core Values */}
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="mb-8"
            >
              <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                <Target className="w-4 h-4 text-indigo-600" />
                Core Values
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
                    <h3 className="font-semibold text-sm">Innovation</h3>
                  </div>
                  <p className="text-xs text-gray-600">
                    Constantly exploring new technologies to solve problems creatively.
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
                    <h3 className="font-semibold text-sm">Excellence</h3>
                  </div>
                  <p className="text-xs text-gray-600">
                    Committed to high-quality solutions with attention to detail.
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
                    <h3 className="font-semibold text-sm">Impact</h3>
                  </div>
                  <p className="text-xs text-gray-600">
                    Creating solutions that make a meaningful difference.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Contact Section */}
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="bg-gradient-to-r from-indigo-50 to-purple-50 p-5 rounded-xl border border-indigo-100"
            >
              <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                <Handshake className="w-4 h-4 text-indigo-600" />
                Let's Collaborate
              </h2>

              <div className="flex flex-col items-center">
                <p className="text-gray-600 text-sm text-center mb-4 max-w-md">
                  Interested in working together? Reach out to discuss your project.
                </p>

                <a
                  href="mailto:abdidev39@gmail.com"
                  className="flex items-center gap-2 bg-indigo-600 text-white font-medium py-2.5 px-5 rounded-lg hover:bg-indigo-700 transition-all shadow-sm text-sm"
                >
                  <Mail className="w-3 h-3" />
                  <span>contact</span>
                </a>


                <p className="text-xs text-gray-500 mt-3 flex items-center gap-1">
                  <Globe className="w-3 h-3" />
                  Based in Africa • Serving globally
                </p>
              </div>
            </motion.div>
          </div>

        </motion.div>
      </div>
    </>
  );
};

export default DevelopedBy;