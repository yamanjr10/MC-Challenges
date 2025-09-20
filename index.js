 // Timer functionality
        function updateTimer() {
            const startDate = new Date('October 5, 2025 00:00:00').getTime();
            const endDate = new Date('October 18, 2025 23:59:59').getTime();
            const now = new Date().getTime();
            
            let targetDate = startDate;
            let timerStatus = "CHALLENGE STARTS IN:";
            
            if (now > endDate) {
                // Challenge has ended, show time until next cycle
                targetDate = new Date('October 5, 2026 00:00:00').getTime();
                timerStatus = "NEXT CHALLENGE STARTS IN:";
            } else if (now >= startDate) {
                // Challenge is ongoing
                targetDate = endDate;
                timerStatus = "CHALLENGE ENDS IN:";
            }
            
            document.querySelector('.timer-title').textContent = timerStatus;
            
            const distance = targetDate - now;
            
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            document.getElementById("days").textContent = days.toString().padStart(2, '0');
            document.getElementById("hours").textContent = hours.toString().padStart(2, '0');
            document.getElementById("minutes").textContent = minutes.toString().padStart(2, '0');
            document.getElementById("seconds").textContent = seconds.toString().padStart(2, '0');
        }
        
        // Update timer every second
        setInterval(updateTimer, 1000);
        updateTimer(); // Initial call
        
        // Modal functionality
        const modal = document.getElementById('registerModal');
        const registerBtn = document.getElementById('registerBtn');
        const closeBtn = document.getElementById('closeModal');
        
        registerBtn.addEventListener('click', () => {
            modal.style.display = 'flex';
        });
        
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
        
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
        
        // Form submission
document.getElementById('registrationForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const submitBtn = this.querySelector('.submit-btn');
  const originalText = submitBtn.textContent;
  
  // Show loading state
  submitBtn.textContent = 'Processing...';
  submitBtn.disabled = true;
  
  const formData = {
    username: document.getElementById('username').value,
    email: document.getElementById('email').value,
    discord: document.getElementById('discord').value,
    experience: document.getElementById('experience').value
  };
  
  try {
    const response = await fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    
    const result = await response.json();
    
    if (response.ok) {
      alert(result.message);
      modal.style.display = 'none';
      this.reset();
    } else {
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Reset button state
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }
});
        
        // Add animation to challenge cards on scroll
        const challengeCards = document.querySelectorAll('.challenge-card');
        const rulesItems = document.querySelectorAll('.rules-list li');
        
        function checkScroll() {
            challengeCards.forEach(card => {
                const position = card.getBoundingClientRect();
                
                // If element is in viewport
                if(position.top < window.innerHeight - 50) {
                    card.style.opacity = 1;
                    card.style.transform = 'translateY(0)';
                }
            });
            
            rulesItems.forEach(item => {
                const position = item.getBoundingClientRect();
                
                // If element is in viewport
                if(position.top < window.innerHeight - 50) {
                    item.style.opacity = 1;
                    item.style.transform = 'translateX(0)';
                }
            });
        }
        
        // Initially set elements to be hidden
        challengeCards.forEach(card => {
            card.style.opacity = 0;
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
        
        rulesItems.forEach(item => {
            item.style.opacity = 0;
            item.style.transform = 'translateX(-20px)';
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
        
        window.addEventListener('load', checkScroll);
        window.addEventListener('scroll', checkScroll);

      // Initialize EmailJS
  (function() {
      emailjs.init("brVj3q_LsNgJwqSbi"); 
  })();

    // Form submission with EmailJS
    // Form submission with EmailJS
  document.getElementById('registrationForm').addEventListener('submit', function(e) {
      e.preventDefault();

      const submitBtn = this.querySelector('.submit-btn');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Processing...';
      submitBtn.disabled = true;

      const formData = {
          username: document.getElementById('username').value,
          aternosName: document.getElementById('aternosName').value,
          email: document.getElementById('email').value,
          discord: document.getElementById('discord').value,
          experience: document.getElementById('experience').value
      };

      // Send email using EmailJS
      emailjs.send('service_kjuwn5e', 'template_ecbyz11', formData)
        .then(function(response) {
            alert('✅ Registration successful! Email sent.');
            document.getElementById('registrationForm').reset();
            document.getElementById('registerModal').style.display = 'none';
        }, function(error) {
            console.error('EmailJS Error:', error);
            alert('❌ Error sending email. Please try again.');
        })
        .finally(function() {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
  });