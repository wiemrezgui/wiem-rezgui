
(function () {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function (direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function () {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function (filters) {
      filters.addEventListener('click', function () {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();

// Certificate Modal Functions
function openCertificateModal(imageSrc) {
  const modal = document.getElementById('certificateModal');
  const modalImg = document.getElementById('modalCertImage');

  modal.classList.add('active');
  modalImg.src = imageSrc;

  // Prevent body scroll when modal is open
  document.body.style.overflow = 'hidden';
}

function closeCertificateModal() {
  const modal = document.getElementById('certificateModal');
  modal.classList.remove('active');

  // Restore body scroll
  document.body.style.overflow = 'auto';
}

// Close modal with ESC key
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    closeCertificateModal();
  }
});

// Prevent modal close when clicking on image
document.getElementById('modalCertImage').addEventListener('click', function (event) {
  event.stopPropagation();
});
// Project Data
const projectsData = {
    'eop': {
        title: 'Enterprise Operations Platform (EOP)',
        date: '',
        badge: 'fullstack',
        media: {
            images: [],
            videos: []
        },
        description: [
            'Built core microservices using Spring Boot, integrated with Kafka for asynchronous messaging',
            'Implemented Redis for caching performance optimization',
            'Developed business logic for HR workflows, client management (CRM), and contract/onboarding flows',
            'Implemented a modular and scalable architecture using RESTful APIs for inter-service communication',
            'Connected services to BI dashboards for executive-level decision support'
        ],
        technologies: ['Spring Boot', 'Kafka', 'Redis', 'Microservices', 'REST APIs', 'BI Integration',]
    },
    'loyalty': {
        title: 'Loyalty Application',
        date: '',
        badge: 'fullstack',
        media: {
            images: [],
            videos: ['assets/img/projects/loyalty/video.mp4']
        },
        description: [
            'Led a team of two developers to design and implement a loyalty application in Flutter',
            'Enabled users to accumulate stamp points while equipping businesses with advanced tools for user management',
            'Implemented personalized notifications system for enhanced user engagement',
            'Contributed as a full-stack developer to develop admin and user-side features',
            'Incorporated ChartJS for comprehensive data visualization',
            'Developed the backend for the loyalty mobile application using Spring Boot'
        ],
        technologies: ['Flutter', 'Angular', 'Spring Boot', 'ChartJS', 'MySQL', 'REST APIs','PrimeNG']
    },
    'training': {
        title: 'Training Center Management System',
        date: '',
        badge: 'fullstack',
        media: {
            images: [],
            videos: ['assets/img/projects/training/video.mp4']
        },
        description: [
            'Comprehensive platform for managing participants, trainers, and enrollments',
            'Multi-role system with access control: participants, trainers, admin, and manager roles',
            'Enrollment management functionality with automated workflows',
            'Complete user management and authentication system',
            'Built with Angular for frontend and Spring Boot for backend',
            'Implemented role-based permissions and security features'
        ],
        technologies: ['Angular', 'Spring Boot', 'MySQL', 'JWT', 'Role-Based Access Control','PrimeNG']
    },
    'playlist-ai': {
        title: 'Playlist AI Generator',
        date: '',
        badge: 'ai',
        media: {
            images: [],
            videos: ['assets/img/projects/playlist-ai/video.mp4']
        },
        description: [
            'Emotion detection and music generation system with three operational modes',
            'Text input mode: Analyzes text to detect emotions using DistilRoBERTa',
            'Direct emotion selection mode: Users can manually select their current emotion',
            'Combined mode: Merges text analysis with manual emotion selection',
            'Generates personalized music playlists based on detected emotions',
            'Uses MusicGen for AI-powered music generation',
            'Built with Streamlit for an interactive and user-friendly interface'
        ],
        technologies: ['🤖 DistilRoBERTa', '🎵 MusicGen', '🎨 Streamlit', 'Python',]
    },
    'coworking': {
        title: 'Co-Working Space Mobile App',
        date: '',
        badge: 'uiux',
        media: {
            images: ['assets/img/projects/coworking/image1.jpg', 'assets/img/projects/coworking/image2.jpg'],
            videos: ['assets/img/projects/coworking/video.mp4']
        },
        description: [
            'Designed a mobile application for WeStudy using Figma for managing a co-studying space',
            'Achieved 100+ downloads on app stores',
            'Created comprehensive user flows and wireframes for optimal user experience',
            'Designed interactive prototypes for user testing and feedback',
            'Collaborated closely with mobile developers to ensure design consistency',
            'Ensured seamless user experience across all application features'
        ],
        technologies: ['Figma', 'Mobile Design', 'User Research', 'Prototyping', 'UI/UX', 'Wireframing']
    },
    'quiz': {
        title: 'Medical Quiz App for Tunisian Students',
        date: '',
        badge: 'uiux',
        media: {
            images: ['assets/img/projects/quiz/mockup1.jpg', 'assets/img/projects/quiz/mockup2.jpg', 'assets/img/projects/quiz/mockup3.jpg'],
            videos: []
        },
        description: [
            'Created a quiz app specifically designed for Tunisian medical students',
            'Designed more than 80 screens in Figma covering all application flows',
            'Developed intuitive question interface with timer and progress tracking',
            'Designed detailed statistics and performance tracking screens',
            'Created comprehensive design system for visual consistency',
            'Focused on accessibility and ease of use for medical students'
        ],
        technologies: ['Figma', 'Educational Design','Prototyping', 'User Testing' ,'UI/UX']
    },
    'teachmart': {
        title: 'TeachMart - Online Courses Platform',
        date: '',
        badge: 'uiux',
        media: {
            images: ['assets/img/projects/teachmart/screen1.jpg', 'assets/img/projects/teachmart/screen2.jpg', 'assets/img/projects/teachmart/screen3.jpg'],
            videos: []
        },
        description: [
            'Designed comprehensive web application for online course management',
            'Created intuitive interface for both instructors and students',
            'Designed course creation and management workflows for instructors',
            'Built student dashboard with progress tracking and personalized recommendations',
            'Implemented video player interface with integrated note-taking capabilities',
            'Focused on engagement metrics and learning effectiveness'
        ],
        technologies: ['Figma', 'Web Design', 'Learning Platform', 'User Experience', 'Dashboard Design']
    }
};

// Video hover effects
document.addEventListener('DOMContentLoaded', function() {
    const portfolioVideos = document.querySelectorAll('.portfolio-video');
    
    portfolioVideos.forEach(video => {
        const card = video.closest('.portfolio-card');
        
        card.addEventListener('mouseenter', function() {
            video.play();
        });
        
        card.addEventListener('mouseleave', function() {
            video.pause();
            video.currentTime = 0;
        });
    });
});

// Open Project Modal
function openProjectModal(projectKey) {
    const project = projectsData[projectKey];
    if (!project) return;

    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('projectModalBody');

    // Build media grid
    let mediaHTML = '';
    if (project.media.images.length > 0 || project.media.videos.length > 0) {
        mediaHTML = '<div class="modal-media-grid">';
        
        project.media.videos.forEach(video => {
            mediaHTML += `
                <video controls>
                    <source src="${video}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            `;
        });
        
        project.media.images.forEach(img => {
            mediaHTML += `<img src="${img}" alt="${project.title}">`;
        });
        
        mediaHTML += '</div>';
    }

    // Build description list
    const descriptionHTML = project.description.map(item => `<li>${item}</li>`).join('');

    // Build technologies tags
    const techHTML = project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('');

    // Set badge class
    let badgeClass = 'fullstack';
    if (project.badge === 'uiux') badgeClass = 'uiux';
    if (project.badge === 'ai') badgeClass = 'ai';

    modalBody.innerHTML = `
        <div class="modal-header">
            <h2>${project.title}</h2>
        </div>
        
        ${mediaHTML}
        
        <div class="modal-description">
            <h3>📋 Project Description</h3>
            <ul>${descriptionHTML}</ul>
        </div>
        
        <div class="modal-technologies">
            <h3>🛠️ Technologies Used</h3>
            <div class="tech-tags">${techHTML}</div>
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close Project Modal
function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal with ESC key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeProjectModal();
    }
});