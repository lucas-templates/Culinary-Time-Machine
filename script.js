// Era data with images and information
const eras = {
    viking: {
        name: 'Viking Age',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop',
        color: '#4E342E',
        description: 'Experience the hearty feasts of Norse warriors'
    },
    rome: {
        name: 'Ancient Rome',
        image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop',
        color: '#6A1B9A',
        description: 'Dine like a Roman patrician with authentic imperial cuisine'
    },
    victorian: {
        name: 'Victorian England',
        image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&h=600&fit=crop',
        color: '#00695C',
        description: 'Savor the refined elegance of Victorian dining'
    },
    '1920s': {
        name: '1920s America',
        image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop',
        color: '#D32F2F',
        description: 'Taste the flavors of the Roaring Twenties'
    }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeTimeline();
    initializeArtifactUnpacking();
    initializeExploreButton();
});

// Timeline interactions
function initializeTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        item.addEventListener('click', function() {
            const era = this.getAttribute('data-era');
            selectEra(era);
        });

        item.addEventListener('mouseenter', function() {
            const era = this.getAttribute('data-era');
            const eraData = eras[era];
            if (eraData) {
                this.style.color = eraData.color;
            }
        });

        item.addEventListener('mouseleave', function() {
            this.style.color = '';
        });
    });
}

// Select an era and update the hero section
function selectEra(era) {
    const eraData = eras[era];
    if (!eraData) return;

    // Update hero image
    const heroImage = document.getElementById('heroImage');
    heroImage.style.opacity = '0';
    
    setTimeout(() => {
        heroImage.src = eraData.image;
        heroImage.alt = `${eraData.name} feast`;
        heroImage.style.opacity = '1';
    }, 300);

    // Update hero subtitle
    const heroSubtitle = document.querySelector('.hero-subtitle');
    heroSubtitle.textContent = eraData.description + '. Each meal kit is a journey through time, crafted with meticulous research and period-accurate ingredients.';

    // Scroll to hero section
    document.querySelector('.hero').scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Show artifact section
    const artifactSection = document.getElementById('artifactSection');
    artifactSection.style.display = 'block';
    artifactSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Artifact unpacking animation
function initializeArtifactUnpacking() {
    const unpackBtn = document.getElementById('unpackBtn');
    const artifactLid = document.getElementById('artifactLid');
    const artifactItems = document.querySelector('.artifact-items');
    let isUnpacked = false;

    unpackBtn.addEventListener('click', function() {
        if (!isUnpacked) {
            // First unpack
            this.disabled = true;
            this.textContent = 'Unpacking...';

            // Open the lid
            artifactLid.classList.add('open');

            // Show items after lid opens
            setTimeout(() => {
                artifactItems.classList.add('visible');
                
                // Re-enable button and change text
                setTimeout(() => {
                    unpackBtn.disabled = false;
                    unpackBtn.textContent = 'Unpack Again';
                    isUnpacked = true;
                }, 1000);
            }, 800);
        } else {
            // Reset animation
            this.disabled = true;
            this.textContent = 'Unpacking...';
            artifactLid.classList.remove('open');
            artifactItems.classList.remove('visible');
            
            setTimeout(() => {
                artifactLid.classList.add('open');
                setTimeout(() => {
                    artifactItems.classList.add('visible');
                    this.disabled = false;
                    this.textContent = 'Unpack Again';
                }, 800);
            }, 500);
        }
    });
}

// Explore button functionality
function initializeExploreButton() {
    const exploreBtn = document.getElementById('exploreBtn');
    
    exploreBtn.addEventListener('click', function() {
        const timelineSection = document.querySelector('.timeline-section');
        timelineSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
}

// Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Add parallax effect to hero image on scroll
window.addEventListener('scroll', function() {
    const heroImage = document.getElementById('heroImage');
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero');
    const heroRect = heroSection.getBoundingClientRect();
    
    if (heroRect.top < window.innerHeight && heroRect.bottom > 0) {
        const parallaxSpeed = 0.5;
        heroImage.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }
});

