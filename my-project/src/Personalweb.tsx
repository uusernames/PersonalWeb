
/*imports*/
import React, { useRef, useState, useEffect } from "react";  // stores values when accessing elements| manages state | DOM maniplulation\
import "./App.css";  // styles for the app
import { images } from "./assets/images"; // import images from assets
import { files } from "./assets/files";// import files for assets
import useScrollPosition from "./Tracking"; // custom hook to track scroll position


/* manages header of the app */
export default function App() {
  const [showBar, setShowBar] = useState(false); // controls visibility of the scroll bar
  const [menuOpen, setMenuOpen] = useState(false); // controls visibility of the menu
  const hasLogged = useRef(false); // tracks if the user has logged the console message
//debugg issue
  const homeRef = useRef<HTMLElement | null>(null); // reference to the home section
  const aboutMeRef = useRef<HTMLElement | null>(null); // reference to the about me section
  const technicalRef = useRef<HTMLElement | null>(null);// reference to the about me section
  const projectRef = useRef<HTMLElement | null>(null);// reference to the project section
  const contactRef = useRef<HTMLElement | null>(null); // reference to the contact section 

/* menu animation section*/
  const scrollToSection = (ref: React.RefObject<HTMLElement | null>,  offset = 100) => { //scroll animation for menu gets REFERENCE POINT AND OFFSET (100) VALUE
    if (ref.current) { // chekcs ref section exists [error checks] page needs to render before going to it
      const y = ref.current.getBoundingClientRect().top + window.pageYOffset - offset; // gets users current viewpoint + amount they scrolled = y position of the ref element
      window.scrollTo({ top: y, behavior: "smooth" }); //scrolls to the y position
    }
    setMenuOpen(false); // closes menu bar
  };
/*header scrollbar*/  
  useEffect(() => { //when user scrolls down, the scroll bar appears
    const handleScroll = () => setShowBar(window.scrollY > 100);// show the scroll bar to true if scrolled more than 100px
    window.addEventListener("scroll", handleScroll); // checks if how much user has scrolled when user scrolls
    return () => window.removeEventListener("scroll", handleScroll); // does not run handle scroll function when component is removed
  }, []);
/*console comment*/ 
  useEffect(() => { //when user opens the app, a message is logged to the console
    const timeout = setTimeout(() => { 
      if (!hasLogged.current) { //check if even has event has already happened
        hasLogged.current = true; 
        console.log( // logs a message to the console
          "%c👀 Looking at my code, you are?",
          "color: rgb(233, 199, 149); font-size: 30px; font-weight: bold;"
        );
        console.log(
          "%cCheck out my other GitHub projects:\nhttps://github.com/uusernames",
          "color: rgb(192, 178, 140); font-size: 20px; font-weight: bold;"
        );
        console.log(
          "%c📫 Contact me at: owin.workspace@gmail.com",
          "color: rgb(168, 144, 93); font-size: 20px;"
        );
      }
    }, 1000); // runs the function after 1 second
    return () => clearTimeout(timeout);
  }, []);
// header bar if else statement if show css is add else adds nothing
  return (
    <>
  {/*header scrollbar css*/}
      <div className={`scroll-bar ${showBar ? "show" : ""}`}></div>{/* adds scrollbar css and show if showbar true and nothing if false */}
      <div className="fixed top-0 left-0 w-full z-50"> 
        <header>
          <div className="flex justify-between items-center h-16 sm:h-20 px-4">
            <div className="menu-wrapper relative">
              <div className="menu-wrapper relative group">
  {/*menu*/}
  <div 
    className="menu-button cursor-pointer" //menu button when mouse hovers on button set mouse to cursor
    onMouseEnter={() => setMenuOpen(true)}
  >
    ☰ Menu
  </div>
  <ul 
    className={`menu-dropdown absolute mt-2 rounded-md ${menuOpen ? "block" : "hidden"}`}
    onMouseEnter={() => setMenuOpen(true)} //when mouse hovers on menu opens menu
    onMouseLeave={() => setMenuOpen(false)}// closes menu
  >
    {/*Pages index*/}
    {/*array for menu element + index*/}
    {["Home", "About Me","Technical Skills", "Projects", "Contact Me"].map((label, idx) => (
      <li 
        key={idx} 
        className="px-4 py-2 cursor-pointer text-black hover:text-[#616161] transition-colors"
      >
        {label === "Home" ? (
          <a 
            onClick={() => {
              scrollToSection(homeRef);
              setMenuOpen(false);
            }} 
            className="text-black font-medium block hover:text-[#5e5e5e]"
          >
            {label}
          </a>
        ) : label === "About Me" ? (
          <a 
            onClick={() => {
              scrollToSection(aboutMeRef, 100);
              setMenuOpen(false);
            }} 
            className="text-black font-medium block hover:text-[#5e5e5e]"
          >
            {label}
          </a>
        ) : label === "Technical Skills" ? (
          <a 
            onClick={() => {
              scrollToSection(technicalRef, 310);
              setMenuOpen(false);
            }} 
            className="text-black font-medium block hover:text-[#5e5e5e]"
          >
            {label}
          </a>
        ) : label === "Projects" ? (
          <a 
            onClick={() => {
              scrollToSection(projectRef, 100);
              setMenuOpen(false);
            }} 
            className="text-black font-medium block hover:text-[#5e5e5e]"
          >
            {label}
          </a>
        ) : label === "Contact Me" ? (
          <a 
            onClick={() => {
              scrollToSection(contactRef, 100);
              setMenuOpen(false);
            }} 
            className="text-black font-medium block hover:text-[#5e5e5e]"
          >
            {label}
          </a>
        ) : null}
      </li>
    ))}
  </ul>
  </div>
</div>
            <div className="flex items-center space-x-5">
              <a href="https://github.com/uusernames" target="_blank" rel="noopener noreferrer">
                <img src={images.Git} alt="Github" className="h-6" />
              </a>
              <a href="https://linkedin.com/in/owin-tao-3b6620201" target="_blank" rel="noopener noreferrer">
                <img src={images.linked} alt="LinkedIn" className="h-6" />
              </a>
              <a href={files.resume} download="Owin_Tao_Resume.pdf">
              <img src={images.logo} alt="Download Resume" className="h-6" />
              </a>
              <div className="flex items-end space-x-1">
                <img src={images.catImage} alt="Cat" className="h-10" />
                <img src={images.sig} alt="sig" className="h-12 translate-y-1" />
              </div>
            </div>
          </div>
        </header>
        <img src={images.boarder} alt="boarder" className="boarder" />
        <img src={images.boarder2} alt="boarder2" className="boarder2" />
      </div>

      {/* Pass refs to Personalwebsite */}
      <Personalwebsite homeRef={homeRef} aboutMeRef={aboutMeRef} technicalRef={technicalRef} projectRef={projectRef} contactRef={contactRef}/>
    </>
  );
}

interface PersonalwebsiteProps {
  homeRef: React.RefObject<HTMLElement | null>;
  aboutMeRef: React.RefObject<HTMLElement | null>;
  technicalRef: React.RefObject<HTMLElement | null>;
  projectRef: React.RefObject<HTMLElement | null>;
  contactRef: React.RefObject<HTMLElement | null>;
}

function Personalwebsite({ homeRef, aboutMeRef, technicalRef , projectRef , contactRef }: PersonalwebsiteProps) {
  const scrollY = useScrollPosition();
  const scaleFactor = Math.max(0.7, 1 - scrollY / 1000);
  const topOffset = Math.max(window.innerHeight * 0.015, window.innerHeight * 0.45 - scrollY);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (aboutMeRef.current) observer.observe(aboutMeRef.current);
    return () => {
      if (aboutMeRef.current) observer.unobserve(aboutMeRef.current);
    };
  }, [aboutMeRef]);

  return (
    <>
      <main ref={homeRef} className="h-screen flex flex-col justify-center items-center relative">
        <h1
          id="scrolling-title"
          className="typing-effect"
          style={{
            position: "fixed",
            left: "50%",
            top: `${topOffset}px`,
            transform: `translateX(-50%) scale(${scaleFactor})`,
            zIndex: 1000,
            transition: "transform 0.3s ease-out",
          }}
        >
          I'm Owin Tao!
        </h1>

        <h1 className="pretitle mt-8 text-center">3rd year Accounting at YORK University</h1>
        <h1 className="pretitle2 text-center max-w-xl px-4">
          Tech-Savvy Accounting Student | Skilled in MySQL, Python, Excel & AHK Automation
        </h1>
      </main>

      <main
        id="aboutme"
        ref={aboutMeRef}
        className={`max-w-3xl mx-auto px-6 py-12 fade-in-section pretitle2 ${isVisible ? "visible" : ""}`}
      >
        <img src={images.boarders} alt="boarders" className="h-10" />
        <h2 className="text-3xl mb-6 text-center font-bold" style={{ color: "#4f392b" }}>
          About Me
        </h2>
        <p className="pretitle2 text-lg sm:text-xl text-gray-700 mb-6 text-center">
          Hey there! I'm <strong>Owin Tao</strong>, a third-year Accounting student at York University who's passionate about merging finance with technology.
        </p>
        <p className="pretitle2 text-base sm:text-lg text-gray-600 mb-4">
          While studying accounting, I've developed strong technical skills that go beyond spreadsheets. I'm proficient in:
        </p>
        <ul className="list-disc list-inside text-gray-600 text-base sm:text-lg mb-6">
          <li>📊 Excel (Advanced formulas, dashboards, automation)</li>
          <li>🐍 Python (Data analysis, automation)</li>
          <li>🗃️ MySQL (Database design, queries)</li>
          <li>⚙️ AutoHotKey (AHK) for macros and task automation</li>
        </ul>
        <p className="text-base sm:text-lg text-gray-600 mb-6">
          I'm constantly learning, building side projects, and exploring how automation can improve business efficiency. Outside of tech and finance, I enjoy skateboarding, skating and design.
        </p>
        <p className="text-base sm:text-lg text-gray-600 mb-10">
          📫 You can reach me at{" "}
          <a href="mailto:owin.workspace@gmail.com" className="underline">
            owin.workspace@gmail.com
          </a>{" "}
          or connect with me on{" "}
          <a href="https://linkedin.com/in/owin-tao-3b6620201" className="underline" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          .
        </p>
        <img src={images.boarders2} alt="boarders2" className="h-10 ml-auto block mb-20" />
      </main >
      {/* technical skill Section */}

<main ref={technicalRef} className={`px-6 py-12 fade-in-section pretitle ${isVisible ? "visible" : ""}`}>
  <img src={images.boarders} alt="boarders" className="h-10" />
  <div className="text-lg">
    <h2 className="text-3xl mb-10 text-center font-bold" style={{ color: "#4f392b" }}>
      Technical skills
    </h2>

    <div className="container">
      <div className="flex flex-wrap justify-center gap-4">
        {[
          "HTML/CSS", "JavaScript", "React", "HTMLKTailwind CSS",
          "Node.js", "Python", "AHK Automation", "SQL", "Excel"
        ].map((skill) => (
          <div
            key={skill}
            className="flex items-center justify-center h-40 w-40 rounded-lg shadow-[0_0_0_3px_#4f392b] p-4"
          >
            <p className="text-xl font-semibold">{skill}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
  <img src={images.boarders2} alt="boarders2" className="h-10 ml-auto block mb-20" />
</main>

        
      {/* Projects Section */}
      <img src={images.boarders} alt="boarders" className="h-10" />
      <main ref={projectRef}> 
      <Projects />
      </main>
      <img src={images.boarders2} alt="boarders2" className="h-10 ml-auto block mb-20" />

      {/* Contact Section */}
<main ref={contactRef} className="pretitle2 px-6 py-12 max-w-3xl mx-auto">
  <h2 className="text-3xl font-bold mb-6 text-center" style={{ color: "#4f392b" }}>Contact Me</h2>
  
  <div className="grid md:grid-cols-2 gap-8">
    {/* Formspree Form */}
    <form 
      action="https://formspree.io/f/xzzvpqqp" 
      method="POST"
      className="space-y-4"
    >
      <div>
        <label htmlFor="name" className="block text-gray-700 mb-1">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7e6a53]"
          required
        />
      </div>
      
      <div>
        <label htmlFor="email" className="block text-gray-700 mb-1">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7e6a53]"
          required
        />
      </div>
      
      <div>
        <label htmlFor="message" className="block text-gray-700 mb-1">Message</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7e6a53]"
          required
        ></textarea>
      </div>
      
      {/* Hidden Formspree fields */}
      <input type="hidden" name="_subject" value="New message from portfolio!" />
      <input type="text" name="_gotcha" style={{display: "none"}} /> 
      
      <button
        type="submit"
        className="px-6 py-2 bg-[#7e6a53] text-white rounded-md hover:bg-[#5a4936] transition-colors"
      >
        Send Message
      </button>
    </form>

    {/* Contact Info */}
    <div className="space-y-6">
      <div className="flex items-start space-x-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mt-1" fill="none" viewBox="0 0 24 24" stroke="#5a4936">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        <div>
          <h3 className="font-bold text-lg">Email</h3>
          <a 
            href="mailto:owin.workspace@gmail.com" 
            className="text-[#5a4936] hover:underline"
          >
            owin.workspace@gmail.com
          </a>
        </div>
      </div>
      
      <div className="flex items-start space-x-4">
        <img src={images.linked} alt="LinkedIn" className="h-6 mt-1" />
        <div>
          <h3 className="font-bold text-lg">LinkedIn</h3>
          <a 
            href="https://linkedin.com/in/owin-tao-3b6620201" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#5a4936] hover:underline"
          >
            linkedin.com/in/owin-tao
          </a>
        </div>
      </div>
      
      <div className="flex items-start space-x-4">
        <img src={images.Git} alt="GitHub" className="h-6 mt-1" />
        <div>
          <h3 className="font-bold text-lg">GitHub</h3>
          <a 
            href="https://github.com/uusernames" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#5a4936] hover:underline"
          >
            github.com/uusernames
          </a>
        </div>
      </div>
    </div>
  </div>
  
</main>

      <footer> {/*add something for the footer*/}
        <div className= "footerscroll-bar"></div>
      </footer>
      <img src={images.boarderdown} alt="boarderdown" className="boarderdown mb-10 " />
      <img src={images.boarderdown2} alt="boarderdown2" className="boarderdown2 mb-10" />
      <div className= "mb-20"></div>
    </>

  );
}


 function Projects() { 
  const cardsRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (cardsRef.current) {
      observer.observe(cardsRef.current);
    }

    return () => {
      if (cardsRef.current) {
        observer.unobserve(cardsRef.current);
      }
    };
  }, []);

  const projects = [
  {
    title: "Monthly Financial Summary",
    description: [
  "Automated CSV processing using Python",
  "Categorized spending and stored in SQLite",
  "Summarized monthly totals with SQL queries",
  "Exported final results to Excel report",
    ],
    tech: "Python, Pandas, SQLite",
    downloadFile: files.budget,
    downloadName: "Accounting_Shortcut_Suite.txt"
  },
    {
      title: "AutoHotkey for User Data Entry into Excel",
      description: [
        "AutoHotkey GUI to collect user data",
        "Creates an Excel file with headers",
        "Appends submitted data as a new row in Excel",
        "Automates data entry without manual interaction",
      ],
      tech: "Python",
       downloadFile: files.data, 
       downloadName: "Financial_Data_Analyzer.txt"
    },
    {
      title: " File Organizer with Sorting and Backup",
      description: [
        "Built an AutoHotkey GUI to sort files by size or name",
        "Includes optional ZIP backup functionality",
        "Auto-creates folders and organizes files accordingly",
        "Compresses source folder to streamline backups",
              ],
      tech: "MySQL/Flask",
       downloadFile: files.file,  
       downloadName: "Inventory_System.txt"
    },
    {
      title: "Portfolio Website",
      description: [
        "Responsive React/Tailwind CSS design",
        "Showcases My projects",
        "Interactive UI with smooth animations",
        "Optimized for all device sizes"
      ],
      tech: "React/Tailwind"
    }
  ];

  const cards = projects.map((project, idx) => (
    <section 
      key={`card-${idx}`} 
      className="project-card p-4 shadow-md m-4 hover:scale-[1.02] transition-transform"
      style={{ 
        minWidth: "280px",
        height: "400px",
        borderRadius: "19px",
        backgroundColor: "rgb(236, 229, 217)",
        flex: "0 0 auto"
      }}
    >
      <div className="pretitle card-content h-full px-5 pt-5 flex flex-col">
        <h3 className="project-title text-lg font-bold mb-3 text-[#4f392b]">
          {project.title}
        </h3>
        
        <ul className="project-description space-y-2 pl-4 text-sm">
          {project.description.map((line, i) => (
            <li key={i} className="pretitle-small">
              {line}
            </li>
          ))}
        </ul>

        <div className="flex justify-between items-end mt-auto">
          <span className="tech-badge inline-block bg-[#4f392b] text-white px-3 py-1 rounded-full text-xs">
            {project.tech}
          </span>
          
          {project.downloadFile && (
            <a 
              href={project.downloadFile} 
              download={project.downloadName || `${project.title.replace(/\s+/g, '_')}.txt`}
              className="text-xs bg-[#7e6a53] text-white px-2 py-1 rounded hover:bg-[#5a4936]"
              onClick={(e) => {
                if (!project.downloadFile) {
                  e.preventDefault();
                  console.error('Download file not available');
                }
              }}
            >
              Download
            </a>
          )}
        </div>
      </div>
    </section>
  ));

  return (
    <main 
      id="projects" 
      ref={cardsRef} 
      className="project-section w-full px-6 py-12 overflow-hidden relative"
    >
      <h2 className="pretitle mb-6 text-center font-bold" style={{ color: "#4f392b" }}>
        Projects
      </h2>
      
      <div 
        ref={containerRef}
        className={`cards-container ${isVisible ? 'animate-scroll-horizontal' : ''}`}
        style={{
          display: 'flex',
          width: 'max-content',
          willChange: 'transform',
          padding: '0 6rem 3rem'
        }}
      >
        {cards}
        {cards} 
      </div>
    </main>
  );
}