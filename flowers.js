// Dynamic flower positioning
function populateFlowers() {
    const container = document.getElementById('flowers-container');
    if (!container) return; // Exit if container doesn't exist
    
    container.innerHTML = ''; // Clear existing flowers
    
    const screenWidth = window.innerWidth;
    const bodyHeight = document.body.scrollHeight;
    
    const spacing = 175; // Distance between flowers along each edge
    
    const baseFlowerImages = [
        'flower-1.png', 'flower-2.png', 'flower-3.png', 'flower-4.png',
        'flower-5.png', 'flower-6.png', 'flower-7.png', 'flower-8.png',
        'flower-9.png', 'flower-10.png', 'flower-11.png'
    ];
    
    // Calculate total flowers needed
    const topFlowers = Math.floor(screenWidth / spacing);
    const rightFlowers = Math.floor(bodyHeight / spacing);
    const bottomFlowers = Math.floor(screenWidth / spacing);
    const leftFlowers = Math.floor(bodyHeight / spacing);
    const totalFlowers = topFlowers + rightFlowers + bottomFlowers + leftFlowers;
    
    // Create shuffled array with even distribution
    const flowerImages = [];
    const repetitions = Math.ceil(totalFlowers / baseFlowerImages.length);
    for (let i = 0; i < repetitions; i++) {
        flowerImages.push(...baseFlowerImages);
    }
    
    // Shuffle the array
    for (let i = flowerImages.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [flowerImages[i], flowerImages[j]] = [flowerImages[j], flowerImages[i]];
    }
    
    let flowerIndex = 0; // Track which flower to use next
    
    function createCornerFlower(corner) {
        const img = document.createElement('img');
        const flowerImage = flowerImages[flowerIndex % flowerImages.length];
        flowerIndex++;
        
        img.src = `flowers/${flowerImage}`;
        img.classList.add('flower', 'flower-dynamic', `from-${corner}`);
        img.alt = '';
        
        const randomDelay = Math.random() * 0.3;
        const size = 220 + Math.random() * 100; // Slightly larger for corners
        const rotation = -30 + Math.random() * 60;
        
        let positionStyles = '';
        
        if (corner === 'top-left') {
            positionStyles = `
                top: ${-80 - Math.random() * 40}px;
                left: ${-80 - Math.random() * 40}px;
                transform: rotate(${rotation}deg);
            `;
        } else if (corner === 'top-right') {
            positionStyles = `
                top: ${-80 - Math.random() * 40}px;
                right: ${-80 - Math.random() * 40}px;
                transform: rotate(${rotation}deg);
            `;
        } else if (corner === 'bottom-left') {
            positionStyles = `
                bottom: ${-80 - Math.random() * 40}px;
                left: ${-80 - Math.random() * 40}px;
                transform: rotate(${rotation}deg);
            `;
        } else if (corner === 'bottom-right') {
            positionStyles = `
                bottom: ${-80 - Math.random() * 40}px;
                right: ${-80 - Math.random() * 40}px;
                transform: rotate(${rotation}deg);
            `;
        }
        
        img.style.cssText = `
            ${positionStyles}
            width: ${size}px;
            opacity: 0.9;
            animation-delay: ${randomDelay}s;
        `;
        
        container.appendChild(img);
    }
    
    function createFlower(edge, position) {
        const img = document.createElement('img');
        // Cycle through flowers evenly
        let flowerImage = flowerImages[flowerIndex % flowerImages.length];
        
        // Avoid flower-9 in the middle of the top edge
        if (edge === 'top') {
            const middleStart = screenWidth * 0.3;
            const middleEnd = screenWidth * 0.7;
            const isInMiddle = position >= middleStart && position <= middleEnd;
            
            // If we're in the middle and got flower-9, skip to next flower
            while (isInMiddle && flowerImage === 'flower-9.png') {
                flowerIndex++;
                flowerImage = flowerImages[flowerIndex % flowerImages.length];
            }
        }
        
        flowerIndex++;
        
        img.src = `flowers/${flowerImage}`;
        img.classList.add('flower', 'flower-dynamic', `from-${edge}`);
        img.alt = '';
        
        // Random delay within a small window
        const randomDelay = Math.random() * 0.3; // 0 to 300ms
        
        const size = 200 + Math.random() * 100; // 200-320px
        const rotation = -30 + Math.random() * 60; // -30 to 30 degrees
        
        let positionStyles = '';
        
        if (edge === 'top') {
            positionStyles = `
                top: ${-150 - Math.random() * 20}px;
                left: ${position}px;
                transform: rotate(${rotation}deg) scaleY(-1);
            `;
        } else if (edge === 'right') {
            positionStyles = `
                top: ${position}px;
                right: ${-50 - Math.random() * 50}px;
                transform: rotate(${rotation}deg);
            `;
        } else if (edge === 'bottom') {
            const bottom = -150 + Math.random() * 100;
            positionStyles = `
                bottom: ${bottom}px;
                left: ${position}px;
                transform: rotate(${rotation}deg);
            `;
        } else if (edge === 'left') {
            positionStyles = `
                top: ${position}px;
                left: ${-50 - Math.random() * 50}px;
                transform: rotate(${rotation}deg);
            `;
        }
        
        img.style.cssText = `
            ${positionStyles}
            width: ${size}px;
            opacity: 0.9;
            animation-delay: ${randomDelay}s;
        `;
        
        container.appendChild(img);
    }
    
    // Add corner flowers first
    createCornerFlower('top-left');
    createCornerFlower('top-right');
    createCornerFlower('bottom-left');
    createCornerFlower('bottom-right');
    
    // Top edge
    for (let i = 0; i < topFlowers; i++) {
        const position = (i + 0.5) * spacing;
        createFlower('top', position);
    }
    
    // Right edge
    for (let i = 0; i < rightFlowers; i++) {
        const position = (i + 0.5) * spacing;
        createFlower('right', position);
    }
    
    // Bottom edge
    for (let i = 0; i < bottomFlowers; i++) {
        const position = (i + 0.5) * spacing;
        createFlower('bottom', position);
    }
    
    // Left edge
    for (let i = 0; i < leftFlowers; i++) {
        const position = (i + 0.5) * spacing;
        createFlower('left', position);
    }
}

// Initial population when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', populateFlowers);
} else {
    populateFlowers();
}

// Repopulate on resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(populateFlowers, 250);
});

