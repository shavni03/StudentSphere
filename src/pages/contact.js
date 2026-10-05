import { createIcon } from '../icons.js';
import { renderAdSlot } from '../components/ads/adSlot.js';

export function renderContactPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const defaultSubject = urlParams.get('subject') || '';

  return `
    <div class="container" style="padding-top: 3rem; padding-bottom: 4rem; max-width: 960px;">
      <!-- Breadcrumb -->
      <nav aria-label="Breadcrumb" style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.5rem;">
        <a href="/" data-link style="color: var(--text-muted); text-decoration: none;">Home</a>
        <span>/</span>
        <span style="color: var(--text-primary); font-weight: 600;">Contact Us</span>
      </nav>

      <!-- Header -->
      <div style="margin-bottom: 2.5rem;">
        <div style="display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.35rem 0.85rem; border-radius: var(--radius-full); background: rgba(16, 185, 129, 0.12); border: 1px solid rgba(16, 185, 129, 0.25); color: #10b981; font-size: 0.8rem; font-weight: 700; margin-bottom: 1rem;">
          ${createIcon('send', 16, 'currentColor')} Direct Support & Inquiries
        </div>
        <h1 style="font-size: clamp(2rem, 4vw, 2.5rem); font-weight: 800; letter-spacing: -0.03em; color: var(--text-primary); line-height: 1.2; margin-bottom: 0.75rem;">
          Get in Touch with the StudentSphere Team
        </h1>
        <p style="font-size: 1rem; color: var(--text-secondary); line-height: 1.6; max-width: 720px;">
          Have questions about lecture handouts, reporting an inaccurate PYQ solution, academic partnerships, or requesting content removal? Reach out below.
        </p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 2.5rem;">
        <!-- Left: Contact Form -->
        <div class="card" style="padding: 2rem;">
          <h2 style="font-size: 1.35rem; font-weight: 700; color: var(--text-primary); margin-bottom: 1.25rem;">
            Send us a Message
          </h2>

          <div id="contact-status-banner" style="display: none; margin-bottom: 1.25rem; padding: 0.85rem 1rem; border-radius: var(--radius-md); font-size: 0.875rem;"></div>

          <form id="contact-form" novalidate>
            <div style="margin-bottom: 1.25rem;">
              <label for="contact-name" class="form-label" style="display: block; font-size: 0.875rem; font-weight: 600; color: var(--text-primary); margin-bottom: 0.4rem;">
                Full Name <span style="color: var(--danger);">*</span>
              </label>
              <input 
                type="text" 
                id="contact-name" 
                class="form-input" 
                placeholder="e.g. Rahul Sharma" 
                required 
                style="width: 100%; padding: 0.7rem 0.9rem; border-radius: var(--radius-md); font-size: 0.9rem;"
              />
            </div>

            <div style="margin-bottom: 1.25rem;">
              <label for="contact-email" class="form-label" style="display: block; font-size: 0.875rem; font-weight: 600; color: var(--text-primary); margin-bottom: 0.4rem;">
                Email Address <span style="color: var(--danger);">*</span>
              </label>
              <input 
                type="email" 
                id="contact-email" 
                class="form-input" 
                placeholder="name@university.edu or personal@email.com" 
                required 
                style="width: 100%; padding: 0.7rem 0.9rem; border-radius: var(--radius-md); font-size: 0.9rem;"
              />
            </div>

            <div style="margin-bottom: 1.25rem;">
              <label for="contact-subject" class="form-label" style="display: block; font-size: 0.875rem; font-weight: 600; color: var(--text-primary); margin-bottom: 0.4rem;">
                Subject <span style="color: var(--danger);">*</span>
              </label>
              <select 
                id="contact-subject" 
                class="form-select" 
                required 
                style="width: 100%; padding: 0.7rem 0.9rem; border-radius: var(--radius-md); font-size: 0.9rem;"
              >
                <option value="">Select a subject...</option>
                <option value="General Inquiry" ${defaultSubject === 'General Inquiry' ? 'selected' : ''}>General Inquiry / Feedback</option>
                <option value="Resource Issue" ${defaultSubject === 'Resource Issue' ? 'selected' : ''}>Academic Resource or PYQ Issue</option>
                <option value="DMCA" ${defaultSubject === 'DMCA' ? 'selected' : ''}>Copyright / DMCA Takedown Notice</option>
                <option value="Placement Collaboration" ${defaultSubject === 'Placement Collaboration' ? 'selected' : ''}>Placement / Hiring Company Collaboration</option>
                <option value="Bug Report" ${defaultSubject === 'Bug Report' ? 'selected' : ''}>Bug Report / Website Issue</option>
              </select>
            </div>

            <div style="margin-bottom: 1.5rem;">
              <label for="contact-message" class="form-label" style="display: block; font-size: 0.875rem; font-weight: 600; color: var(--text-primary); margin-bottom: 0.4rem;">
                Message <span style="color: var(--danger);">*</span>
              </label>
              <textarea 
                id="contact-message" 
                class="form-textarea" 
                rows="5" 
                placeholder="Please provide complete context or specific resource links..." 
                required 
                style="width: 100%; padding: 0.7rem 0.9rem; border-radius: var(--radius-md); font-size: 0.9rem; resize: vertical;"
              ></textarea>
            </div>

            <button 
              type="submit" 
              id="contact-submit-btn" 
              class="btn btn-primary" 
              style="width: 100%; padding: 0.8rem; font-size: 0.95rem; font-weight: 700;"
            >
              ${createIcon('send', 18, '#fff')} Submit Inquiry
            </button>
          </form>
        </div>

        <!-- Right: Support Channels & Transparency -->
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
          <div class="card" style="padding: 1.75rem;">
            <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-primary); margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
              ${createIcon('helpCircle', 20, '#6366f1')} Official Contact Information
            </h3>
            <div style="display: flex; flex-direction: column; gap: 1rem; font-size: 0.9rem;">
              <div>
                <strong style="color: var(--text-primary); display: block; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.04em;">Official Email Inquiries</strong>
                <a href="mailto:support@studentsphere.internal" style="color: var(--primary); text-decoration: none; word-break: break-all;">
                  support@studentsphere.internal
                </a>
              </div>
              <div>
                <strong style="color: var(--text-primary); display: block; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.04em;">Copyright & DMCA Agent</strong>
                <a href="mailto:dmca@studentsphere.internal" style="color: var(--primary); text-decoration: none; word-break: break-all;">
                  dmca@studentsphere.internal
                </a>
              </div>
              <div>
                <strong style="color: var(--text-primary); display: block; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.04em;">Operating Hours</strong>
                <span style="color: var(--text-secondary);">Monday – Saturday (09:00 - 18:00 IST)</span>
              </div>
            </div>
          </div>

          <div class="card" style="padding: 1.75rem;">
            <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.5rem;">
              ${createIcon('shieldAlert', 20, '#f59e0b')} Content Removal Requests
            </h3>
            <p style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 0.75rem;">
              If you identify an uploaded PDF or examination paper that violates your copyright, please include the specific URL and evidence of authorization in your subject as <strong>Copyright / DMCA Notice</strong>.
            </p>
            <p style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.6;">
              In accordance with our community guidelines, verified infringement requests are expedited by the moderation team.
            </p>
          </div>

          <div class="card" style="padding: 1.75rem; background: var(--bg-tertiary); border: 1px solid var(--border-medium);">
            <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.5rem;">
              ${createIcon('send', 20, '#38bdf8')} Instant Student Alerts
            </h3>
            <p style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1rem;">
              To receive emergency notifications about semester dates and placement drives, link your Telegram profile.
            </p>
            <a href="/settings/notifications" data-link class="btn btn-outline" style="width: 100%; text-align: center; justify-content: center;">
              Configure Alert Preferences
            </a>
          </div>
        </div>
      </div>

      <!-- Bottom AdSlot -->
      <div style="margin-top: 3rem;">
        ${renderAdSlot('footer')}
      </div>
    </div>
  `;
}

export function bindContactEvents(container) {
  const form = container.querySelector('#contact-form');
  const banner = container.querySelector('#contact-status-banner');
  if (!form || !banner) return;

  form.onsubmit = (e) => {
    e.preventDefault();

    const name = container.querySelector('#contact-name').value.trim();
    const email = container.querySelector('#contact-email').value.trim();
    const subject = container.querySelector('#contact-subject').value.trim();
    const message = container.querySelector('#contact-message').value.trim();

    if (!name || !email || !subject || !message) {
      banner.style.display = 'block';
      banner.style.background = 'rgba(239, 68, 68, 0.12)';
      banner.style.border = '1px solid rgba(239, 68, 68, 0.3)';
      banner.style.color = '#ef4444';
      banner.textContent = 'Please fill out all required fields before submitting.';
      return;
    }

    // Backend-ready implementation: Do not fake successful submission.
    // Explicit requirement: If backend is not connected, show:
    // "Contact submission will be available after backend integration."
    banner.style.display = 'block';
    banner.style.background = 'rgba(99, 102, 241, 0.12)';
    banner.style.border = '1px solid rgba(99, 102, 241, 0.3)';
    banner.style.color = 'var(--primary)';
    banner.textContent = 'Contact submission will be available after backend integration.';
  };
}
