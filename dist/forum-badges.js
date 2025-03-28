/**
 * Forum Badges JS Library
 * v1.0.0
 * Utility functions for custom forum badges
 */

(function(global) {
  'use strict';

  /**
   * Main Forum Badges object
   */
  var ForumBadges = {
    // Current version
    version: '1.0.0',

    /**
     * Initialize badges with custom options
     * @param {Object} options - Configuration options
     */
    init: function(options) {
      options = options || {};
      
      // Set custom animation speed if provided
      if (options.animationSpeed) {
        document.documentElement.style.setProperty('--fb-anim-speed', options.animationSpeed);
      }
      
      // Apply custom colors if provided
      if (options.colors) {
        for (var color in options.colors) {
          if (options.colors.hasOwnProperty(color)) {
            document.documentElement.style.setProperty('--fb-' + color, options.colors[color]);
          }
        }
      }
      
      // Initialize tooltip functionality if enabled
      if (options.enableTooltips !== false) {
        this.initTooltips();
      }
      
      return this;
    },

    /**
     * Initialize tooltips for badges
     */
    initTooltips: function() {
      var badges = document.querySelectorAll('.fb-badge');
      
      badges.forEach(function(badge) {
        // Only add tooltip if it has a data-tooltip attribute
        if (badge.getAttribute('data-tooltip')) {
          badge.setAttribute('title', badge.getAttribute('data-tooltip'));
          
          // Add tooltip events
          badge.addEventListener('mouseenter', function() {
            // Could implement custom tooltip UI here
          });
        }
      });
    },

    /**
     * Apply badge to an element
     * @param {Element} element - The element to apply the badge to
     * @param {String} type - Badge type (e.g., 'admin', 'mod')
     * @param {String} text - Text to display in the badge
     * @param {Object} options - Additional options
     */
    applyBadge: function(element, type, text, options) {
      options = options || {};
      
      // Create badge element
      var badge = document.createElement('span');
      badge.className = 'fb-badge fb-' + type;
      badge.textContent = text || this.getDefaultTextForType(type);
      
      // Add tooltip if provided
      if (options.tooltip) {
        badge.setAttribute('data-tooltip', options.tooltip);
        badge.setAttribute('title', options.tooltip);
      }
      
      // Add custom class if provided
      if (options.className) {
        badge.className += ' ' + options.className;
      }
      
      // Clear element and append badge
      if (options.replace) {
        element.innerHTML = '';
      }
      
      element.appendChild(badge);
      return badge;
    },

    /**
     * Get default text for a badge type
     * @param {String} type - Badge type
     * @return {String} Default text
     */
    getDefaultTextForType: function(type) {
      var defaults = {
        'admin': 'Administrator',
        'mod': 'Moderator',
        'super-mod': 'Super Moderator',
        'dev': 'Developer',
        'owner': 'Owner',
        'staff': 'Staff',
        'vip': 'VIP',
        'donor': 'Donor',
        'premium': 'Premium',
        'sponsor': 'Sponsor',
        'beta': 'Beta Tester',
        'partner': 'Partner',
        'veteran': 'Veteran',
        'expert': 'Expert',
        'helper': 'Helper',
        'contributor': 'Contributor',
        'trusted': 'Trusted',
        'pioneer': 'Pioneer',
        'jester': 'Jester',
        'ninja': 'Ninja',
        'wizard': 'Wizard',
        'hero': 'Hero',
        'pirate': 'Pirate',
        'robot': 'Robot',
        'new': 'New Member',
        'member': 'Member',
        'regular': 'Regular',
        'active': 'Active',
        'elite': 'Elite',
        'legendary': 'Legendary',
        'sparkle': 'Sparkle',
        'glow': 'Glow',
        'pulse': 'Pulse',
        'rainbow': 'Rainbow',
        'hacker': 'Hacker',
        'scientist': 'Scientist',
        'artist': 'Artist',
        'musician': 'Musician',
        'gamer': 'Gamer',
        'mentor': 'Mentor',
        'innovator': 'Innovator',
        'visionary': 'Visionary',
        'explorer': 'Explorer',
        'guide': 'Guide',
        'ambassador': 'Ambassador',
        'scholar': 'Scholar',
        'champion': 'Champion',
        'guru': 'Guru',
        'founder': 'Founder',
        'manager': 'Manager',
        'designer': 'Designer',
        'tester': 'Tester',
        'supporter': 'Supporter',
        'reviewer': 'Reviewer',
        'builder': 'Builder',
        'architect': 'Architect',
        'influencer': 'Influencer',
        'creator': 'Creator',
        'strategist': 'Strategist',
        'leader': 'Leader'
      };
      
      return defaults[type] || type.charAt(0).toUpperCase() + type.slice(1);
    },

    /**
     * Get all available badge types
     * @return {Array} List of all badge types
     */
    getAllBadgeTypes: function() {
      return [
        'admin', 'mod', 'super-mod', 'dev', 'owner', 'staff',
        'vip', 'donor', 'premium', 'sponsor', 'beta', 'partner',
        'veteran', 'expert', 'helper', 'contributor', 'trusted', 'pioneer',
        'jester', 'ninja', 'wizard', 'hero', 'pirate', 'robot',
        'new', 'member', 'regular', 'active', 'elite', 'legendary',
        'sparkle', 'glow', 'pulse', 'rainbow', 'hacker', 'scientist',
        'artist', 'musician', 'gamer', 'mentor', 'innovator', 'visionary',
        'explorer', 'guide', 'ambassador', 'scholar', 'champion', 'guru',
        'founder', 'manager', 'designer', 'tester', 'supporter', 'reviewer',
        'builder', 'architect', 'influencer', 'creator', 'strategist', 'leader'
      ];
    }
  };

  // Export to global namespace for browser
  global.ForumBadges = ForumBadges;

  // Export as a module for Node.js
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = ForumBadges;
  }

})(typeof window !== 'undefined' ? window : this); 