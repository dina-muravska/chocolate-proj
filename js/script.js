// Interactive JavaScript for Simply Chocolate Website

document.addEventListener("DOMContentLoaded", function () {
  // Modal functionality
  const modal = document.getElementById("reviewModal");
  const leaveReviewBtn = document.getElementById("leaveReviewBtn");
  const closeModal = document.getElementById("closeModal");
  const reviewForm = document.getElementById("reviewForm");
  const reviewList = document.querySelector(".review-list");

  // Open modal
  leaveReviewBtn.addEventListener("click", function () {
    modal.classList.add("show");
    document.body.style.overflow = "hidden";
  });

  // Close modal functions
  closeModal.addEventListener("click", closeReviewModal);
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeReviewModal();
    }
  });

  // Close modal with Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.classList.contains("show")) {
      closeReviewModal();
    }
  });

  function closeReviewModal() {
    modal.classList.remove("show");
    document.body.style.overflow = "auto";
    reviewForm.reset();
  }

  // Handle form submission
  reviewForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("reviewerName").value.trim();
    const review = document.getElementById("reviewText").value.trim();

    if (name && review) {
      addReviewToList(name, review);
      closeReviewModal();
      showSuccessMessage();
    }
  });

  // Add review to the list dynamically
  function addReviewToList(name, review) {
    const reviewItem = document.createElement("li");
    reviewItem.className = "review-list-item";

    // Generate a random avatar placeholder (you can replace with actual images)
    const avatarLetter = name.charAt(0).toUpperCase();
    const avatarColors = [
      "#fd9222",
      "#f57c00",
      "#e65100",
      "#bf360c",
      "#8d6e63",
    ];
    const randomColor =
      avatarColors[Math.floor(Math.random() * avatarColors.length)];

    reviewItem.innerHTML = `
            <div style="
                width: 80px;
                height: 80px;
                border-radius: 50%;
                background: ${randomColor};
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: bold;
                font-size: 24px;
                position: absolute;
                top: -40px;
                left: 50%;
                transform: translateX(-50%);
                border: 4px solid #ffffff;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            ">${avatarLetter}</div>
            <div class="review-card">
                <h3 class="review-subtitle">${escapeHtml(name)}</h3>
                <p class="review-list-text">${escapeHtml(review)}</p>
            </div>
        `;

    // Insert the new review at the beginning of the list
    reviewList.insertBefore(reviewItem, reviewList.firstChild);

    // Add animation class
    setTimeout(() => {
      reviewItem.style.opacity = "0";
      reviewItem.style.transform = "translateY(20px)";
      reviewItem.style.transition = "all 0.5s ease";

      setTimeout(() => {
        reviewItem.style.opacity = "1";
        reviewItem.style.transform = "translateY(0)";
      }, 100);
    }, 100);
  }

  // Show success message
  function showSuccessMessage() {
    const message = document.createElement("div");
    message.textContent = "Thank you for your review!";
    message.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4caf50;
            color: white;
            padding: 16px 24px;
            border-radius: 10px;
            box-shadow: 0 8px 25px rgba(76, 175, 80, 0.3);
            z-index: 1001;
            font-weight: 600;
            animation: slideInRight 0.3s ease;
        `;

    document.body.appendChild(message);

    setTimeout(() => {
      message.style.animation = "slideOutRight 0.3s ease";
      setTimeout(() => {
        document.body.removeChild(message);
      }, 300);
    }, 3000);
  }

  // Button hover effects and click animations
  const buttons = document.querySelectorAll("button, .hero-btn");

  buttons.forEach((button) => {
    button.addEventListener("mousedown", function () {
      this.style.transform = "scale(0.98)";
    });

    button.addEventListener("mouseup", function () {
      this.style.transform = "";
    });

    button.addEventListener("mouseleave", function () {
      this.style.transform = "";
    });
  });

  // Smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        e.preventDefault();
        const offsetTop = targetElement.offsetTop - 80; // Account for sticky header

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll(
    ".features-item, .taste-list-item, .review-list-item, .made-list-item",
  );
  animateElements.forEach((el) => observer.observe(el));

  // Add CSS for animations
  const style = document.createElement("style");
  style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }

        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }

        .animate-in {
            animation: fadeInUp 0.6s ease-out forwards;
        }

        .review-list-item {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.5s ease;
        }

        .review-list-item.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
  document.head.appendChild(style);

  // Utility function to escape HTML
  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  // Add loading animation for images
  const images = document.querySelectorAll("img");
  images.forEach((img) => {
    if (img.complete) {
      img.classList.add("loaded");
    } else {
      img.addEventListener("load", function () {
        this.classList.add("loaded");
      });
    }
  });
});
