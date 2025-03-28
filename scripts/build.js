const fs = require('fs-extra');
const path = require('path');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

// Paths
const srcDir = path.join(__dirname, '../src');
const distDir = path.join(__dirname, '../dist');
const demoDir = path.join(__dirname, '../demo');

// Ensure directories exist
fs.ensureDirSync(distDir);
fs.ensureDirSync(demoDir);
fs.ensureDirSync(path.join(demoDir, 'css'));
fs.ensureDirSync(path.join(demoDir, 'js'));
fs.ensureDirSync(path.join(demoDir, 'images'));

// Process CSS
async function processCSS() {
  const cssInput = fs.readFileSync(path.join(srcDir, 'forum-badges.css'), 'utf8');
  
  try {
    // Process with PostCSS (autoprefixer and minification)
    const result = await postcss([autoprefixer, cssnano]).process(cssInput, {
      from: path.join(srcDir, 'forum-badges.css'),
      to: path.join(distDir, 'forum-badges.min.css')
    });
    
    // Write minified CSS
    fs.writeFileSync(path.join(distDir, 'forum-badges.min.css'), result.css);
    
    // Also copy the original CSS
    fs.copyFileSync(
      path.join(srcDir, 'forum-badges.css'),
      path.join(distDir, 'forum-badges.css')
    );
    
    // Copy to demo directory as well
    fs.copyFileSync(
      path.join(distDir, 'forum-badges.min.css'),
      path.join(demoDir, 'css', 'forum-badges.min.css')
    );
    
    console.log('✓ CSS processed successfully');
  } catch (err) {
    console.error('× Error processing CSS:', err);
  }
}

// Process JavaScript
function processJS() {
  try {
    // For a real project, you might want to use terser or uglify for minification
    // But for simplicity, we'll just copy the JS file
    fs.copyFileSync(
      path.join(srcDir, 'forum-badges.js'),
      path.join(distDir, 'forum-badges.js')
    );
    
    // Create a basic minified version (just removing comments and extra spaces)
    const jsInput = fs.readFileSync(path.join(srcDir, 'forum-badges.js'), 'utf8');
    const minifiedJS = jsInput
      .replace(/\/\*\*[\s\S]*?\*\//g, '') // Remove block comments
      .replace(/\/\/.*$/gm, '') // Remove line comments
      .replace(/^\s*[\r\n]/gm, '') // Remove empty lines
      .replace(/\s{2,}/g, ' ') // Replace multiple spaces with single space
      .trim();
    
    fs.writeFileSync(path.join(distDir, 'forum-badges.min.js'), minifiedJS);
    
    // Copy to demo directory as well
    fs.copyFileSync(
      path.join(distDir, 'forum-badges.min.js'),
      path.join(demoDir, 'js', 'forum-badges.min.js')
    );
    
    console.log('✓ JavaScript processed successfully');
  } catch (err) {
    console.error('× Error processing JavaScript:', err);
  }
}

// Create demo files
function createDemoFiles() {
  try {
    // Create demo index.html
    const demoHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Forum Badges - Beautiful CSS Badges for Forums</title>
  <link rel="stylesheet" href="css/demo.css">
  <link rel="stylesheet" href="css/forum-badges.min.css">
</head>
<body>
  <header>
    <div class="container">
      <h1>Forum Badges</h1>
      <p class="tagline">A collection of 60 beautiful, customizable forum badges/prefixes</p>
    </div>
  </header>
  
  <main class="container">
    <section class="intro">
      <h2>About Forum Badges</h2>
      <p>Forum Badges is a lightweight, customizable CSS library that provides beautiful badges for forum user roles. With 60 different styles, you can easily implement badges for administrators, moderators, VIPs, and many more user types.</p>
      
      <div class="actions">
        <a href="https://github.com/yourusername/forum-badges" class="btn btn-primary">View on GitHub</a>
        <a href="https://www.npmjs.com/package/forum-badges" class="btn btn-secondary">Install via npm</a>
      </div>
    </section>
    
    <section class="usage">
      <h2>Usage</h2>
      <p>Using Forum Badges is simple. Include the CSS file in your project, then add the appropriate classes to your HTML elements:</p>
      
      <pre><code>&lt;link rel="stylesheet" href="path/to/forum-badges.min.css"&gt;

&lt;span class="fb-badge fb-admin"&gt;Administrator&lt;/span&gt;
&lt;span class="fb-badge fb-mod"&gt;Moderator&lt;/span&gt;</code></pre>
    </section>
    
    <section class="badges-showcase">
      <h2>All Badges</h2>
      <p>Here's a showcase of all 60 badge styles included in the library:</p>
      
      <h3>Administrative Roles</h3>
      <div class="badges-group">
        <div class="badge-item">
          <span class="fb-badge fb-admin">Administrator</span>
          <code>.fb-admin</code>
        </div>
        <div class="badge-item">
          <span class="fb-badge fb-mod">Moderator</span>
          <code>.fb-mod</code>
        </div>
        <div class="badge-item">
          <span class="fb-badge fb-super-mod">Super Moderator</span>
          <code>.fb-super-mod</code>
        </div>
        <div class="badge-item">
          <span class="fb-badge fb-dev">Developer</span>
          <code>.fb-dev</code>
        </div>
        <div class="badge-item">
          <span class="fb-badge fb-owner">Owner</span>
          <code>.fb-owner</code>
        </div>
        <div class="badge-item">
          <span class="fb-badge fb-staff">Staff</span>
          <code>.fb-staff</code>
        </div>
      </div>
      
      <h3>Special Status</h3>
      <div class="badges-group">
        <div class="badge-item">
          <span class="fb-badge fb-vip">VIP</span>
          <code>.fb-vip</code>
        </div>
        <div class="badge-item">
          <span class="fb-badge fb-donor">Donor</span>
          <code>.fb-donor</code>
        </div>
        <div class="badge-item">
          <span class="fb-badge fb-premium">Premium</span>
          <code>.fb-premium</code>
        </div>
        <div class="badge-item">
          <span class="fb-badge fb-sponsor">Sponsor</span>
          <code>.fb-sponsor</code>
        </div>
        <div class="badge-item">
          <span class="fb-badge fb-beta">Beta Tester</span>
          <code>.fb-beta</code>
        </div>
        <div class="badge-item">
          <span class="fb-badge fb-partner">Partner</span>
          <code>.fb-partner</code>
        </div>
      </div>
      
      <h3>Achievement Badges</h3>
      <div class="badges-group">
        <div class="badge-item">
          <span class="fb-badge fb-veteran">Veteran</span>
          <code>.fb-veteran</code>
        </div>
        <div class="badge-item">
          <span class="fb-badge fb-expert">Expert</span>
          <code>.fb-expert</code>
        </div>
        <div class="badge-item">
          <span class="fb-badge fb-helper">Helper</span>
          <code>.fb-helper</code>
        </div>
        <div class="badge-item">
          <span class="fb-badge fb-contributor">Contributor</span>
          <code>.fb-contributor</code>
        </div>
        <div class="badge-item">
          <span class="fb-badge fb-trusted">Trusted</span>
          <code>.fb-trusted</code>
        </div>
        <div class="badge-item">
          <span class="fb-badge fb-pioneer">Pioneer</span>
          <code>.fb-pioneer</code>
        </div>
      </div>
      
      <h3>Fun Badges</h3>
      <div class="badges-group">
        <div class="badge-item">
          <span class="fb-badge fb-jester">Jester</span>
          <code>.fb-jester</code>
        </div>
        <div class="badge-item">
          <span class="fb-badge fb-ninja">Ninja</span>
          <code>.fb-ninja</code>
        </div>
        <div class="badge-item">
          <span class="fb-badge fb-wizard">Wizard</span>
          <code>.fb-wizard</code>
        </div>
        <div class="badge-item">
          <span class="fb-badge fb-hero">Hero</span>
          <code>.fb-hero</code>
        </div>
        <div class="badge-item">
          <span class="fb-badge fb-pirate">Pirate</span>
          <code>.fb-pirate</code>
        </div>
        <div class="badge-item">
          <span class="fb-badge fb-robot">Robot</span>
          <code>.fb-robot</code>
        </div>
      </div>
      
      <h3>Community Status</h3>
      <div class="badges-group">
        <div class="badge-item">
          <span class="fb-badge fb-new">New Member</span>
          <code>.fb-new</code>
        </div>
        <div class="badge-item">
          <span class="fb-badge fb-member">Member</span>
          <code>.fb-member</code>
        </div>
        <div class="badge-item">
          <span class="fb-badge fb-regular">Regular</span>
          <code>.fb-regular</code>
        </div>
        <div class="badge-item">
          <span class="fb-badge fb-active">Active</span>
          <code>.fb-active</code>
        </div>
        <div class="badge-item">
          <span class="fb-badge fb-elite">Elite</span>
          <code>.fb-elite</code>
        </div>
        <div class="badge-item">
          <span class="fb-badge fb-legendary">Legendary</span>
          <code>.fb-legendary</code>
        </div>
      </div>
      
      <h3>Special Animated Badges</h3>
      <div class="badges-group">
        <div class="badge-item">
          <span class="fb-badge fb-sparkle">Sparkle</span>
          <code>.fb-sparkle</code>
        </div>
        <div class="badge-item">
          <span class="fb-badge fb-glow">Glow</span>
          <code>.fb-glow</code>
        </div>
        <div class="badge-item">
          <span class="fb-badge fb-pulse">Pulse</span>
          <code>.fb-pulse</code>
        </div>
        <div class="badge-item">
          <span class="fb-badge fb-rainbow">Rainbow</span>
          <code>.fb-rainbow</code>
        </div>
      </div>
      
      <h3>More Themed Badges</h3>
      <div class="badges-group">
        <div class="badge-item">
          <span class="fb-badge fb-hacker">Hacker</span>
          <code>.fb-hacker</code>
        </div>
        <div class="badge-item">
          <span class="fb-badge fb-scientist">Scientist</span>
          <code>.fb-scientist</code>
        </div>
        <div class="badge-item">
          <span class="fb-badge fb-artist">Artist</span>
          <code>.fb-artist</code>
        </div>
        <div class="badge-item">
          <span class="fb-badge fb-musician">Musician</span>
          <code>.fb-musician</code>
        </div>
        <div class="badge-item">
          <span class="fb-badge fb-gamer">Gamer</span>
          <code>.fb-gamer</code>
        </div>
        <div class="badge-item">
          <span class="fb-badge fb-mentor">Mentor</span>
          <code>.fb-mentor</code>
        </div>
      </div>
      
      <div class="badges-group">
        <div class="badge-item">
          <span class="fb-badge fb-innovator">Innovator</span>
          <code>.fb-innovator</code>
        </div>
        <div class="badge-item">
          <span class="fb-badge fb-visionary">Visionary</span>
          <code>.fb-visionary</code>
        </div>
        <div class="badge-item">
          <span class="fb-badge fb-explorer">Explorer</span>
          <code>.fb-explorer</code>
        </div>
        <div class="badge-item">
          <span class="fb-badge fb-guide">Guide</span>
          <code>.fb-guide</code>
        </div>
        <div class="badge-item">
          <span class="fb-badge fb-ambassador">Ambassador</span>
          <code>.fb-ambassador</code>
        </div>
        <div class="badge-item">
          <span class="fb-badge fb-scholar">Scholar</span>
          <code>.fb-scholar</code>
        </div>
      </div>
      
      <div class="badges-group">
        <div class="badge-item">
          <span class="fb-badge fb-champion">Champion</span>
          <code>.fb-champion</code>
        </div>
        <div class="badge-item">
          <span class="fb-badge fb-guru">Guru</span>
          <code>.fb-guru</code>
        </div>
        <div class="badge-item">
          <span class="fb-badge fb-founder">Founder</span>
          <code>.fb-founder</code>
        </div>
        <div class="badge-item">
          <span class="fb-badge fb-manager">Manager</span>
          <code>.fb-manager</code>
        </div>
        <div class="badge-item">
          <span class="fb-badge fb-designer">Designer</span>
          <code>.fb-designer</code>
        </div>
        <div class="badge-item">
          <span class="fb-badge fb-tester">Tester</span>
          <code>.fb-tester</code>
        </div>
      </div>
      
      <div class="badges-group">
        <div class="badge-item">
          <span class="fb-badge fb-supporter">Supporter</span>
          <code>.fb-supporter</code>
        </div>
        <div class="badge-item">
          <span class="fb-badge fb-reviewer">Reviewer</span>
          <code>.fb-reviewer</code>
        </div>
        <div class="badge-item">
          <span class="fb-badge fb-builder">Builder</span>
          <code>.fb-builder</code>
        </div>
        <div class="badge-item">
          <span class="fb-badge fb-architect">Architect</span>
          <code>.fb-architect</code>
        </div>
        <div class="badge-item">
          <span class="fb-badge fb-influencer">Influencer</span>
          <code>.fb-influencer</code>
        </div>
        <div class="badge-item">
          <span class="fb-badge fb-creator">Creator</span>
          <code>.fb-creator</code>
        </div>
      </div>
      
      <div class="badges-group">
        <div class="badge-item">
          <span class="fb-badge fb-strategist">Strategist</span>
          <code>.fb-strategist</code>
        </div>
        <div class="badge-item">
          <span class="fb-badge fb-leader">Leader</span>
          <code>.fb-leader</code>
        </div>
      </div>
    </section>
    
    <section class="customization">
      <h2>Customization</h2>
      <p>Forum Badges can be customized using CSS variables:</p>
      
      <pre><code>:root {
  --fb-admin-color: #ff5555;
  --fb-admin-bg: #333;
  --fb-anim-speed: 3s;
}</code></pre>
      
      <p>Or using the JavaScript API:</p>
      
      <pre><code>// Include the JS file
&lt;script src="path/to/forum-badges.min.js"&gt;&lt;/script&gt;

// Initialize with custom options
ForumBadges.init({
  animationSpeed: '3s',
  colors: {
    'primary': '#4a6cf7',
    'secondary': '#f25f5c'
  },
  enableTooltips: true
});</code></pre>
    </section>
  </main>
  
  <footer>
    <div class="container">
      <p>&copy; 2023 Forum Badges. MIT Licensed.</p>
    </div>
  </footer>
  
  <script src="js/forum-badges.min.js"></script>
  <script>
    // Initialize badges
    ForumBadges.init();
  </script>
</body>
</html>`;
    
    fs.writeFileSync(path.join(demoDir, 'index.html'), demoHtml);
    
    // Create demo CSS
    const demoCSS = `/* Demo styles for Forum Badges */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f8f9fa;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 20px;
}

header {
  background: linear-gradient(135deg, #4a6cf7, #24bdff);
  color: white;
  padding: 60px 0;
  text-align: center;
  margin-bottom: 40px;
}

header h1 {
  font-size: 3rem;
  margin-bottom: 10px;
}

.tagline {
  font-size: 1.2rem;
  opacity: 0.9;
}

section {
  margin-bottom: 50px;
  background: white;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

h2 {
  color: #4a6cf7;
  margin-bottom: 20px;
  font-size: 1.8rem;
}

h3 {
  color: #333;
  margin: 30px 0 15px;
  font-size: 1.4rem;
}

p {
  margin-bottom: 15px;
}

.actions {
  margin: 30px 0;
  display: flex;
  gap: 15px;
}

.btn {
  display: inline-block;
  padding: 12px 25px;
  border-radius: 5px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: #4a6cf7;
  color: white;
}

.btn-primary:hover {
  background-color: #3a5ce4;
  transform: translateY(-2px);
}

.btn-secondary {
  background-color: #f8f9fa;
  color: #4a6cf7;
  border: 1px solid #4a6cf7;
}

.btn-secondary:hover {
  background-color: #eef1f6;
  transform: translateY(-2px);
}

pre {
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 5px;
  overflow-x: auto;
  margin: 20px 0;
  border: 1px solid #e9ecef;
}

code {
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
  font-size: 0.9em;
}

.badges-group {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
}

.badge-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 5px;
  width: calc(33.333% - 14px);
  text-align: center;
}

.badge-item code {
  margin-top: 10px;
  font-size: 0.8em;
  color: #666;
}

footer {
  background-color: #343a40;
  color: white;
  text-align: center;
  padding: 20px 0;
  margin-top: 50px;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .badge-item {
    width: calc(50% - 10px);
  }
  
  header {
    padding: 40px 0;
  }
  
  header h1 {
    font-size: 2.5rem;
  }
}

@media (max-width: 480px) {
  .badge-item {
    width: 100%;
  }
  
  .actions {
    flex-direction: column;
  }
  
  header h1 {
    font-size: 2rem;
  }
  
  .tagline {
    font-size: 1rem;
  }
}`;
    
    fs.writeFileSync(path.join(demoDir, 'css', 'demo.css'), demoCSS);
    
    console.log('✓ Demo files created successfully');
  } catch (err) {
    console.error('× Error creating demo files:', err);
  }
}

// Create a preview image for README
function createPreviewImage() {
  // In a real project, you'd generate an image here
  // For now we'll just create a placeholder file
  fs.writeFileSync(
    path.join(demoDir, 'images', 'preview.png'),
    'This would be a preview image in a real project'
  );
  console.log('✓ Preview image placeholder created');
}

// Run the build process
async function build() {
  console.log('Building Forum Badges...');
  
  await processCSS();
  processJS();
  createDemoFiles();
  createPreviewImage();
  
  console.log('✓ Build completed successfully!');
}

build(); 