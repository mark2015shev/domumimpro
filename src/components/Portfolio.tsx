import React, { useState, useRef, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';
import Modal from './Modal';

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<null | typeof projects[0]>(null);
  const [activeIndicator, setActiveIndicator] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const categories = ['All', 'Kitchen', 'Bathroom', 'Closet', 'Office', 'Bedroom'];
  
  const projects = [
    // Kitchen Projects
    {
      image: "https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9",
      title: "Modern Kitchen Renovation",
      description: "Custom walnut cabinets with brass hardware",
      category: "Kitchen",
      tags: ["Kitchen", "Modern", "Custom"],
      details: {
        client: "Private Residence",
        duration: "6 weeks",
        location: "Oak Bay, Victoria",
        services: [
          "Custom cabinet design and manufacturing",
          "Premium hardware installation",
          "Integrated lighting solutions",
          "Countertop installation"
        ]
      }
    },

    // Bathroom Projects
    {
      image: "https://images.unsplash.com/photo-1620626011761-996317b8d101",
      title: "Luxury Bathroom Vanity",
      description: "Floating vanity in rich mahogany finish",
      category: "Bathroom",
      tags: ["Bathroom", "Luxury", "Modern"],
      details: {
        client: "Luxury Condo",
        duration: "3 weeks",
        location: "Downtown Victoria",
        services: [
          "Custom vanity design",
          "Mirror cabinet installation",
          "Under-cabinet lighting",
          "Storage solutions"
        ]
      }
    },

    // Closet Projects
    {
      image: "https://images.unsplash.com/photo-1597218868981-1b68e15f0065",
      title: "Walk-in Closet",
      description: "Custom storage in premium dark oak",
      category: "Closet",
      tags: ["Storage", "Premium", "Custom"],
      details: {
        client: "Private Estate",
        duration: "4 weeks",
        location: "Uplands, Victoria",
        services: [
          "Custom closet system design",
          "LED lighting integration",
          "Drawer and shelf installation",
          "Jewelry and accessory storage"
        ]
      }
    },

    // Office Projects
    {
      image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      title: "Executive Office Suite",
      description: "Built-in cabinets with integrated lighting",
      category: "Office",
      tags: ["Office", "Premium", "Modern"],
      details: {
        client: "Corporate Office",
        duration: "5 weeks",
        location: "Victoria",
        services: [
          "Built-in desk and storage",
          "Cable management solutions",
          "Integrated task lighting",
          "Filing system design"
        ]
      }
    },

    // Bedroom Projects
    {
      image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0",
      title: "Master Bedroom Storage",
      description: "Floor-to-ceiling wardrobe in white oak",
      category: "Bedroom",
      tags: ["Bedroom", "Storage", "Custom"],
      details: {
        client: "Private Residence",
        duration: "4 weeks",
        location: "Gordon Head, Victoria",
        services: [
          "Custom wardrobe design",
          "Soft-close hardware installation",
          "Interior organization systems",
          "Mirror integration"
        ]
      }
    }
  ];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const handleProjectNavigation = (direction: 'prev' | 'next') => {
    if (!selectedProject) return;
    
    const categoryProjects = projects.filter(p => 
      activeFilter === 'All' ? true : p.category === selectedProject.category
    );
    const currentIndex = categoryProjects.findIndex(p => p.title === selectedProject.title);
    
    if (direction === 'prev' && currentIndex > 0) {
      setSelectedProject(categoryProjects[currentIndex - 1]);
    } else if (direction === 'next' && currentIndex < categoryProjects.length - 1) {
      setSelectedProject(categoryProjects[currentIndex + 1]);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollWidth = container.scrollWidth - container.clientWidth;
      const scrollPosition = container.scrollLeft;
      const scrollPercentage = scrollPosition / scrollWidth;
      
      if (scrollPercentage < 0.33) {
        setActiveIndicator(0);
      } else if (scrollPercentage < 0.66) {
        setActiveIndicator(1);
      } else {
        setActiveIndicator(2);
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="portfolio" className="py-20 section-gradient overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold dark:text-white light:text-black text-center mb-6">Our Portfolio</h2>
        <p className="dark:text-gray-400 light:text-gray-600 text-center max-w-2xl mx-auto mb-12">
          Explore our collection of premium cabinetry and renovation projects, each crafted with precision and care.
        </p>
        
        {/* Filter Bar */}
        <div className="flex justify-center mb-12">
          <div className="dark:bg-white/[0.07] light:bg-black/[0.07] backdrop-blur-lg rounded-full 
            dark:border-white/10 light:border-black/10 border p-2 flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300
                  ${activeFilter === category
                    ? 'dark:bg-white dark:text-black light:bg-black light:text-white shadow-lg'
                    : 'dark:text-gray-300 light:text-gray-600 dark:hover:text-white light:hover:text-black dark:hover:bg-white/[0.1] light:hover:bg-black/[0.1]'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Projects Scroll Container - Full Width */}
      <div className="relative w-screen -mx-[calc((100vw-100%)/2)]">
        <div ref={scrollContainerRef} className="overflow-x-auto pb-8 hide-scrollbar">
          <div className="flex gap-6 px-8 md:px-16 min-w-max py-4">
            {filteredProjects.map((project, index) => (
              <div
                key={index}
                onClick={() => setSelectedProject(project)}
                className="group w-[350px] dark:bg-white/[0.07] light:bg-black/[0.07] backdrop-blur-lg rounded-2xl 
                  dark:border-white/10 light:border-black/10 border
                  dark:hover:shadow-[0_15px_30px_-10px_rgba(255,255,255,0.08)] 
                  light:hover:shadow-[0_15px_30px_-10px_rgba(0,0,0,0.08)] 
                  hover:scale-[1.02]
                  transition-all duration-500 ease-out overflow-hidden
                  cursor-pointer select-none"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-black/20 backdrop-blur-xl"
                    style={{
                      backgroundImage: `url(${project.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    onLoad={(e) => {
                      const img = e.target as HTMLImageElement;
                      img.style.opacity = '1';
                    }}
                    className="w-full h-full object-cover transition-all duration-700 opacity-0 group-hover:scale-110"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold dark:text-white light:text-black mb-1.5 
                    dark:group-hover:text-gray-100 light:group-hover:text-gray-900 transition-colors duration-500">
                    {project.title}
                  </h3>
                  <p className="dark:text-gray-400 light:text-gray-600 mb-3 text-sm
                    dark:group-hover:text-gray-200 light:group-hover:text-gray-800 transition-colors duration-500">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="text-xs px-2.5 py-0.5 rounded-full dark:bg-white/[0.05] light:bg-black/[0.05] 
                          dark:text-gray-300 light:text-gray-600 
                          dark:border-white/5 light:border-black/5 border
                          dark:group-hover:bg-white/[0.08] light:group-hover:bg-black/[0.08] 
                          dark:group-hover:text-white light:group-hover:text-black 
                          transition-all duration-500"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div
                    className="inline-flex items-center gap-1.5 dark:text-gray-400 light:text-gray-600 
                      dark:group-hover:text-white light:group-hover:text-black transition-colors duration-300 text-sm"
                  >
                    View Project <ExternalLink className="h-3.5 w-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Scroll Indicators */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className={`w-10 h-1 rounded-full transition-all duration-300 ${
                activeIndicator === index
                  ? 'dark:bg-white light:bg-black'
                  : 'dark:bg-white/30 light:bg-black/30'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Project Modal */}
      <Modal
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
        project={selectedProject!}
        onPrevious={() => handleProjectNavigation('prev')}
        onNext={() => handleProjectNavigation('next')}
        showNavigation={true}
      />
    </section>
  );
}

export default Portfolio;