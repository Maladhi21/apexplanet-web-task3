// --- CAROUSEL LOGIC ---
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("carousel-slide");
  let dots = document.getElementsByClassName("dot");
  
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  
  if(slides[slideIndex-1]) {
    slides[slideIndex-1].style.display = "block";  
  }
  if(dots[slideIndex-1]) {
    dots[slideIndex-1].className += " active";
  }
}

// Auto-advance carousel
setInterval(() => {
    plusSlides(1);
}, 5000);

// --- API FETCH LOGIC ---
const fetchJokeBtn = document.getElementById('fetchJokeBtn');
const jokeText = document.getElementById('jokeText');

async function fetchJoke() {
    // Show loading state
    jokeText.innerHTML = '<span style="opacity: 0.5;">Loading joke...</span>';
    fetchJokeBtn.disabled = true;
    
    try {
        // Fetch from Official Joke API
        const response = await fetch('https://official-joke-api.appspot.com/random_joke');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Display the joke (setup and punchline)
        jokeText.innerHTML = `<strong>${data.setup}</strong><br><br><em>${data.punchline}</em>`;
        
    } catch (error) {
        console.error("Could not fetch joke:", error);
        jokeText.innerHTML = '<span style="color: #ef4444;">Oops! Could not fetch a joke right now. Try again!</span>';
    } finally {
        fetchJokeBtn.disabled = false;
    }
}

// Add event listener to the button
fetchJokeBtn.addEventListener('click', fetchJoke);
