(function() {
    "use strict";
  
    /**
     *  selector helper function
     */
    const select = (el, all = false) => {
      el = el.trim()
      if (all) {
        return [...document.querySelectorAll(el)]
      } else {
        return document.querySelector(el)
      }
    }
  
    /**
     *  event listener function
     */
    const on = (type, el, listener, all = false) => {
      let selectEl = select(el, all)
      if (selectEl) {
        if (all) {
          selectEl.forEach(e => e.addEventListener(type, listener))
        } else {
          selectEl.addEventListener(type, listener)
        }
      }
    }
  
    /**
     *  on scroll event listener 
     */
    const onscroll = (el, listener) => {
      el.addEventListener('scroll', listener)
    }
  
    /**
     * FAQ Answer Toggle Function
     */
    window.toggleAnswer = function(id) {
      const answer = document.getElementById(`faq-answer${id}`);
      if (answer) {
        const faqItem = answer.parentNode;
        answer.classList.toggle('active');
        faqItem.classList.toggle('open');
      }
    };
  
    /**
     * Navbar links active state on scroll
     */
    let navbarlinks = select('#navbar .scrollto', true)
    const navbarlinksActive = () => {
      let position = window.scrollY + 200
      navbarlinks.forEach(navbarlink => {
        if (!navbarlink.hash) return
        let section = select(navbarlink.hash)
        if (!section) return
        if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
          navbarlink.classList.add('active')
        } else {
          navbarlink.classList.remove('active')
        }
      })
    }
    window.addEventListener('load', navbarlinksActive)
    onscroll(document, navbarlinksActive)
  
    /**
     * Scrolls to an element with header offset
     */
    const scrollto = (el) => {
      let header = select('#header')
      let offset = header ? header.offsetHeight : 0;
  
      if (header && !header.classList.contains('header-scrolled')) {
        offset -= 20
      }
  
      let elementPos = select(el) ? select(el).offsetTop : 0;
      window.scrollTo({
        top: elementPos - offset,
        behavior: 'smooth'
      })
    }
  
    /**
     * Toggle .header-scrolled class to #header when page is scrolled
     */
    let selectHeader = select('#header')
    if (selectHeader) {
      const headerScrolled = () => {
        if (window.scrollY > 100) {
          selectHeader.classList.add('header-scrolled')
        } else {
          selectHeader.classList.remove('header-scrolled')
        }
      }
      window.addEventListener('load', headerScrolled)
      onscroll(document, headerScrolled)
    }
  
    /**
     * Back to top button
     */
    let backtotop = select('.back-to-top')
    if (backtotop) {
      const toggleBacktotop = () => {
        if (window.scrollY > 100) {
          backtotop.classList.add('active')
        } else {
          backtotop.classList.remove('active')
        }
      }
      window.addEventListener('load', toggleBacktotop)
      onscroll(document, toggleBacktotop)
    }
  
    /**
     * Mobile nav toggle
     */
    on('click', '.mobile-nav-toggle', function(e) {
      select('#navbar').classList.toggle('navbar-mobile')
      this.classList.toggle('bi-list')
      this.classList.toggle('bi-x')
    })
  
    /**
     * Mobile nav dropdowns activate
     */
    on('click', '.navbar .dropdown > a', function(e) {
      if (select('#navbar').classList.contains('navbar-mobile')) {
        e.preventDefault()
        this.nextElementSibling.classList.toggle('dropdown-active')
      }
    }, true)
  
    /**
     * Scroll with offset on links with a class name .scrollto
     */
    on('click', '.scrollto', function(e) {
      if (select(this.hash)) {
        e.preventDefault()
        let navbar = select('#navbar')
        if (navbar.classList.contains('navbar-mobile')) {
          navbar.classList.remove('navbar-mobile')
          let navbarToggle = select('.mobile-nav-toggle')
          if (navbarToggle) {
            navbarToggle.classList.toggle('bi-list')
            navbarToggle.classList.toggle('bi-x')
          }
        }
        scrollto(this.hash)
      }
    }, true)
  
    /**
     * Scroll with offset on page load with hash links in the URL
     */
    window.addEventListener('load', () => {
      if (window.location.hash && select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    });
  
    /**
     * Animation on scroll
     */
    window.addEventListener('load', () => {
      AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      })
    });
  
    // Review rotation functionality
    let currentReviewIndex = 1;
    const totalReviews = 4;
    const intervalTime = 5000;
  
    function rotateReviews() {
      for (let i = 1; i <= totalReviews; i++) {
        const review = document.getElementById('review' + i);
        if (review) {
          review.style.display = 'none';
        }
      }
  
      // Show the current review
      const currentReview = document.getElementById('review' + currentReviewIndex);
      if (currentReview) {
        currentReview.style.display = 'block';
      }
  
      // Update to the next review index
      currentReviewIndex = (currentReviewIndex % totalReviews) + 1;
    }
  
    // Initial call to display the first review
    rotateReviews();
  
    // Set interval for review rotation
    setInterval(rotateReviews, intervalTime);
  })();