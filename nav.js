// ── Shared Navigation & Footer ──────────────────────────────────────────────
// Include this script at the bottom of every page:
//   <script src="/nav.js"></script>
// Place <div id="site-nav"></div> at the top of <body>
// Place <div id="site-footer"></div> at the bottom of <body>

(function () {
  const currentPath = window.location.pathname;

  const NAV_HTML = `
<style>
  #site-nav * { box-sizing: border-box; }
  #kl-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
    transition: background 0.3s ease, box-shadow 0.3s ease;
  }
  #kl-nav.scrolled {
    background: rgba(11,12,11,0.95);
    backdrop-filter: blur(20px);
    box-shadow: 0 1px 0 rgba(120,226,5,0.12);
  }
  .kl-nav-inner {
    max-width: 1280px; margin: 0 auto;
    padding: 0 24px;
    height: 72px;
    display: flex; align-items: center; justify-content: space-between;
  }
  .kl-logo img { height: 52px; width: auto; border-radius: 8px; box-shadow: 0 0 0 1px rgba(120,226,5,0.15); filter: brightness(1.15); }
  .kl-logo { text-decoration: none; }

  /* Desktop links */
  .kl-links {
    display: flex; align-items: center; gap: 4px;
    list-style: none; margin: 0; padding: 0;
  }
  .kl-links > li { position: relative; }
  .kl-links > li > a {
    display: flex; align-items: center; gap: 5px;
    font-family: Inter, sans-serif; font-size: 13.5px; font-weight: 500;
    color: rgba(255,255,255,0.75); text-decoration: none;
    padding: 8px 12px; border-radius: 8px;
    transition: color 0.2s ease, background 0.2s ease;
    white-space: nowrap;
  }
  .kl-links > li > a:hover, .kl-links > li > a.active {
    color: #78E205; background: rgba(120,226,5,0.06);
  }
  .kl-links > li > a svg { transition: transform 0.2s ease; }
  .kl-links > li:hover > a svg { transform: rotate(180deg); }

  /* Dropdown */
  .kl-dropdown {
    position: absolute; top: calc(100% + 8px); left: 50%;
    transform: translateX(-50%);
    background: rgba(17,20,18,0.98); backdrop-filter: blur(20px);
    border: 1px solid rgba(120,226,5,0.15); border-radius: 14px;
    padding: 8px; min-width: 210px;
    list-style: none; margin: 0;
    opacity: 0; visibility: hidden; pointer-events: none;
    transform: translateX(-50%) translateY(-6px);
    transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s;
    box-shadow: 0 20px 60px rgba(0,0,0,0.5);
  }
  .kl-links > li:hover .kl-dropdown,
  .kl-links > li:focus-within .kl-dropdown {
    opacity: 1; visibility: visible; pointer-events: auto;
    transform: translateX(-50%) translateY(0);
  }
  .kl-dropdown li a {
    display: block; font-family: Inter, sans-serif;
    font-size: 13px; font-weight: 500;
    color: rgba(255,255,255,0.65); text-decoration: none;
    padding: 9px 14px; border-radius: 8px;
    transition: color 0.15s ease, background 0.15s ease;
    white-space: nowrap;
  }
  .kl-dropdown li a:hover { color: #78E205; background: rgba(120,226,5,0.08); }

  /* CTA */
  .kl-cta { display: flex; align-items: center; gap: 14px; }
  .kl-phone {
    font-family: Inter, sans-serif; font-size: 13.5px; font-weight: 700;
    color: #78E205; text-decoration: none;
    transition: opacity 0.2s ease;
  }
  .kl-phone:hover { opacity: 0.8; }
  .kl-btn {
    font-family: Inter, sans-serif; font-size: 13px; font-weight: 700;
    background: #78E205; color: #1A1F18;
    padding: 10px 20px; border-radius: 8px; text-decoration: none;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    white-space: nowrap;
  }
  .kl-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 24px rgba(120,226,5,0.3); }

  /* Hamburger */
  .kl-hamburger {
    display: none; background: none; border: none; cursor: pointer; padding: 4px;
  }
  .kl-mobile-menu {
    display: none; flex-direction: column;
    background: rgba(17,20,18,0.98); backdrop-filter: blur(20px);
    border-top: 1px solid rgba(120,226,5,0.1);
    max-height: 0; overflow: hidden;
    transition: max-height 0.4s ease;
  }
  .kl-mobile-menu.open { max-height: 100vh; }
  .kl-mobile-links { list-style: none; margin: 0; padding: 16px 24px 8px; }
  .kl-mobile-links li { border-bottom: 1px solid rgba(255,255,255,0.05); }
  .kl-mobile-links li:last-child { border-bottom: none; }
  .kl-mobile-links li a {
    display: block; font-family: Inter, sans-serif; font-size: 15px; font-weight: 600;
    color: rgba(255,255,255,0.85); text-decoration: none; padding: 12px 0;
    transition: color 0.2s ease;
  }
  .kl-mobile-links li a:hover { color: #78E205; }
  .kl-mobile-sub { list-style: none; padding: 0 0 8px 16px; margin: 0; }
  .kl-mobile-sub li a {
    font-size: 13px; font-weight: 400; color: rgba(255,255,255,0.65); padding: 6px 0;
  }
  .kl-mobile-cta { padding: 16px 24px 24px; display: flex; flex-direction: column; gap: 10px; }
  .kl-mobile-cta .kl-btn { text-align: center; padding: 14px; font-size: 15px; }

  @media (max-width: 1024px) {
    .kl-links, .kl-cta { display: none; }
    .kl-hamburger { display: flex; }
    .kl-mobile-menu { display: flex; }
  }
</style>

<nav id="kl-nav">
  <div class="kl-nav-inner">
    <a href="/" class="kl-logo">
      <img src="/BRAND_ASSETS/Gemini_Generated_Image_th5gidth5gidth5g.png" alt="Kool Life Air &amp; Heat" />
    </a>

    <ul class="kl-links">
      <li>
        <a href="/air-conditioning.html">Air Conditioning
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>
        </a>
        <ul class="kl-dropdown">
          <li><a href="/ac-installation.html">AC Installation</a></li>
          <li><a href="/ac-repair.html">AC Repair</a></li>
          <li><a href="/ductless-mini-splits.html">Ductless Mini-Splits</a></li>
          <li><a href="/heat-pumps.html">Heat Pumps</a></li>
          <li><a href="/ductwork-replacement.html">Ductwork Replacement</a></li>
        </ul>
      </li>
      <li>
        <a href="/heating.html">Heating
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>
        </a>
        <ul class="kl-dropdown">
          <li><a href="/heating-installation.html">Heating Installation</a></li>
          <li><a href="/heating-repair.html">Heating Repair &amp; Service</a></li>
          <li><a href="/heat-pumps.html">Heat Pumps</a></li>
        </ul>
      </li>
      <li>
        <a href="/indoor-air-quality.html">Indoor Air Quality
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>
        </a>
        <ul class="kl-dropdown">
          <li><a href="/air-purification.html">Air Purification Systems</a></li>
          <li><a href="/ultraviolet-lights.html">Ultraviolet Lights</a></li>
        </ul>
      </li>
      <li><a href="/commercial.html">Commercial</a></li>
      <li><a href="/maintenance-plan.html">Maintenance Plan</a></li>
      <li>
        <a href="/about.html">About Us
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>
        </a>
        <ul class="kl-dropdown">
          <li><a href="/service-areas.html">Service Areas</a></li>
          <li><a href="/promotions.html">Promotions</a></li>
          <li><a href="/financing.html">Financing</a></li>
          <li><a href="/faq.html">FAQ</a></li>
          <li><a href="/blog.html">Blog</a></li>
        </ul>
      </li>
      <li>
        <a href="/contact.html">Contact Us
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>
        </a>
        <ul class="kl-dropdown">
          <li><a href="/schedule-service.html">Schedule Service</a></li>
          <li><a href="/free-estimates.html">Free Estimates</a></li>
          <li><a href="/careers.html">Careers</a></li>
          <li><a href="/review-us.html">Review Us</a></li>
          <li><a href="/testimonials.html">Client Testimonials</a></li>
        </ul>
      </li>
    </ul>

    <div class="kl-cta">
      <a href="tel:+13212076757" class="kl-phone">321-207-6757</a>
      <a href="/schedule-service.html" class="kl-btn">Schedule Service</a>
    </div>

    <button class="kl-hamburger" id="kl-hamburger" aria-label="Toggle menu">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round">
        <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
      </svg>
    </button>
  </div>

  <!-- Mobile menu -->
  <div class="kl-mobile-menu" id="kl-mobile-menu">
    <ul class="kl-mobile-links">
      <li>
        <a href="/air-conditioning.html">Air Conditioning</a>
        <ul class="kl-mobile-sub">
          <li><a href="/ac-installation.html">AC Installation</a></li>
          <li><a href="/ac-repair.html">AC Repair</a></li>
          <li><a href="/ductless-mini-splits.html">Ductless Mini-Splits</a></li>
          <li><a href="/heat-pumps.html">Heat Pumps</a></li>
          <li><a href="/ductwork-replacement.html">Ductwork Replacement</a></li>
        </ul>
      </li>
      <li>
        <a href="/heating.html">Heating</a>
        <ul class="kl-mobile-sub">
          <li><a href="/heating-installation.html">Heating Installation</a></li>
          <li><a href="/heating-repair.html">Heating Repair &amp; Service</a></li>
          <li><a href="/heat-pumps.html">Heat Pumps</a></li>
        </ul>
      </li>
      <li>
        <a href="/indoor-air-quality.html">Indoor Air Quality</a>
        <ul class="kl-mobile-sub">
          <li><a href="/air-purification.html">Air Purification Systems</a></li>
          <li><a href="/ultraviolet-lights.html">Ultraviolet Lights</a></li>
        </ul>
      </li>
      <li><a href="/commercial.html">Commercial</a></li>
      <li><a href="/maintenance-plan.html">Maintenance Plan</a></li>
      <li>
        <a href="/about.html">About Us</a>
        <ul class="kl-mobile-sub">
          <li><a href="/service-areas.html">Service Areas</a></li>
          <li><a href="/promotions.html">Promotions</a></li>
          <li><a href="/financing.html">Financing</a></li>
          <li><a href="/faq.html">FAQ</a></li>
          <li><a href="/blog.html">Blog</a></li>
        </ul>
      </li>
      <li>
        <a href="/contact.html">Contact Us</a>
        <ul class="kl-mobile-sub">
          <li><a href="/schedule-service.html">Schedule Service</a></li>
          <li><a href="/free-estimates.html">Free Estimates</a></li>
          <li><a href="/careers.html">Careers</a></li>
          <li><a href="/review-us.html">Review Us</a></li>
          <li><a href="/testimonials.html">Client Testimonials</a></li>
        </ul>
      </li>
    </ul>
    <div class="kl-mobile-cta">
      <a href="tel:+13212076757" class="kl-phone" style="font-size:17px;">321-207-6757</a>
      <a href="/schedule-service.html" class="kl-btn">Schedule Service</a>
    </div>
  </div>
</nav>
`;

  const FOOTER_HTML = `
<section style="background:#242B20;border-top:1px solid rgba(120,226,5,0.08);border-bottom:1px solid rgba(120,226,5,0.08);padding:48px 24px;font-family:Inter,sans-serif;">
  <div style="max-width:900px;margin:0 auto;display:flex;align-items:center;justify-content:center;gap:80px;flex-wrap:wrap;">

    <!-- Trane Comfort Specialist: dark red circle -->
    <div style="transition:transform 0.3s ease,filter 0.3s ease;cursor:pointer;" onmouseover="this.style.transform='translateY(-6px) scale(1.08)';this.style.filter='drop-shadow(0 12px 24px rgba(120,226,5,0.25))'" onmouseout="this.style.transform='translateY(0) scale(1)';this.style.filter='none'">
      <div style="width:110px;height:110px;border-radius:50%;background:#b31b1b;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:12px;">
        <div style="font-family:Arial,sans-serif;font-weight:900;font-size:13px;color:#fff;letter-spacing:0.5px;line-height:1.3;">TRANE<br>COMFORT<br>SPECIALIST</div>
      </div>
    </div>

    <!-- Trane logo: orange swirl + TRANE wordmark -->
    <div style="transition:transform 0.3s ease,filter 0.3s ease;cursor:pointer;display:flex;align-items:center;gap:14px;" onmouseover="this.style.transform='translateY(-6px) scale(1.08)';this.style.filter='drop-shadow(0 12px 24px rgba(120,226,5,0.25))'" onmouseout="this.style.transform='translateY(0) scale(1)';this.style.filter='none'">
      <svg width="70" height="70" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
        <circle cx="35" cy="35" r="35" fill="#e8470a"/>
        <!-- swirl lines -->
        <path d="M12 22 Q35 18 58 28" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round"/>
        <path d="M10 31 Q35 25 60 36" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round"/>
        <path d="M10 40 Q35 33 60 44" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round"/>
        <path d="M12 49 Q35 42 58 52" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round"/>
      </svg>
      <div style="font-family:Arial Black,sans-serif;font-weight:900;font-size:42px;color:#e8470a;letter-spacing:2px;line-height:1;">TRANE<sup style="font-size:16px;vertical-align:super;">®</sup></div>
    </div>

    <!-- Angie's List Award: orange rectangle -->
    <div style="transition:transform 0.3s ease,filter 0.3s ease;cursor:pointer;" onmouseover="this.style.transform='translateY(-6px) scale(1.08)';this.style.filter='drop-shadow(0 12px 24px rgba(120,226,5,0.25))'" onmouseout="this.style.transform='translateY(0) scale(1)';this.style.filter='none'">
      <div style="background:#f0a500;border-radius:10px;padding:16px 22px;text-align:center;min-width:130px;">
        <div style="font-family:Arial,sans-serif;font-weight:700;font-size:11px;color:#fff;letter-spacing:0.5px;line-height:1.6;">ANGIE'S LIST<br>AWARD 2020</div>
      </div>
    </div>

  </div>
</section>
<footer style="background:#0A0B0A;border-top:1px solid rgba(255,255,255,0.05);padding:60px 24px 32px;font-family:Inter,sans-serif;">
  <div style="max-width:1280px;margin:0 auto;">
    <div class="kl-footer-grid" style="display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:48px;margin-bottom:48px;flex-wrap:wrap;">
      <div>
        <img src="/BRAND_ASSETS/Gemini_Generated_Image_th5gidth5gidth5g.png" style="height:48px;width:auto;margin-bottom:20px;border-radius:8px;" alt="Kool Life Air &amp; Heat" />
        <p style="font-size:14px;color:rgba(255,255,255,0.35);line-height:1.75;max-width:280px;margin-bottom:24px;">Orlando's trusted HVAC experts since 2014. Keeping families comfortable through every season.</p>
        <div style="display:flex;gap:10px;">
          <a href="#" aria-label="Facebook" style="width:36px;height:36px;border-radius:10px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);display:flex;align-items:center;justify-content:center;text-decoration:none;transition:border-color 0.2s;" onmouseover="this.style.borderColor='rgba(120,226,5,0.4)'" onmouseout="this.style.borderColor='rgba(255,255,255,0.08)'">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="rgba(255,255,255,0.4)"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
          </a>
          <a href="#" aria-label="Instagram" style="width:36px;height:36px;border-radius:10px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);display:flex;align-items:center;justify-content:center;text-decoration:none;transition:border-color 0.2s;" onmouseover="this.style.borderColor='rgba(120,226,5,0.4)'" onmouseout="this.style.borderColor='rgba(255,255,255,0.08)'">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="2" stroke-linecap="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
          </a>
        </div>
      </div>
      <div>
        <div style="font-size:11px;font-weight:700;color:rgba(255,255,255,0.3);letter-spacing:0.1em;margin-bottom:18px;">SERVICES</div>
        <div style="display:flex;flex-direction:column;gap:10px;">
          <a href="/air-conditioning.html" style="font-size:13px;color:rgba(255,255,255,0.65);text-decoration:none;transition:color 0.2s;" onmouseover="this.style.color='#78E205'" onmouseout="this.style.color='rgba(255,255,255,0.65)'">Air Conditioning</a>
          <a href="/heating.html" style="font-size:13px;color:rgba(255,255,255,0.65);text-decoration:none;transition:color 0.2s;" onmouseover="this.style.color='#78E205'" onmouseout="this.style.color='rgba(255,255,255,0.65)'">Heating</a>
          <a href="/indoor-air-quality.html" style="font-size:13px;color:rgba(255,255,255,0.65);text-decoration:none;transition:color 0.2s;" onmouseover="this.style.color='#78E205'" onmouseout="this.style.color='rgba(255,255,255,0.65)'">Indoor Air Quality</a>
          <a href="/commercial.html" style="font-size:13px;color:rgba(255,255,255,0.65);text-decoration:none;transition:color 0.2s;" onmouseover="this.style.color='#78E205'" onmouseout="this.style.color='rgba(255,255,255,0.65)'">Commercial</a>
          <a href="/maintenance-plan.html" style="font-size:13px;color:rgba(255,255,255,0.65);text-decoration:none;transition:color 0.2s;" onmouseover="this.style.color='#78E205'" onmouseout="this.style.color='rgba(255,255,255,0.65)'">Maintenance Plan</a>
        </div>
      </div>
      <div>
        <div style="font-size:11px;font-weight:700;color:rgba(255,255,255,0.3);letter-spacing:0.1em;margin-bottom:18px;">COMPANY</div>
        <div style="display:flex;flex-direction:column;gap:10px;">
          <a href="/about.html" style="font-size:13px;color:rgba(255,255,255,0.65);text-decoration:none;transition:color 0.2s;" onmouseover="this.style.color='#78E205'" onmouseout="this.style.color='rgba(255,255,255,0.65)'">About Us</a>
          <a href="/service-areas.html" style="font-size:13px;color:rgba(255,255,255,0.65);text-decoration:none;transition:color 0.2s;" onmouseover="this.style.color='#78E205'" onmouseout="this.style.color='rgba(255,255,255,0.65)'">Service Areas</a>
          <a href="/promotions.html" style="font-size:13px;color:rgba(255,255,255,0.65);text-decoration:none;transition:color 0.2s;" onmouseover="this.style.color='#78E205'" onmouseout="this.style.color='rgba(255,255,255,0.65)'">Promotions</a>
          <a href="/financing.html" style="font-size:13px;color:rgba(255,255,255,0.65);text-decoration:none;transition:color 0.2s;" onmouseover="this.style.color='#78E205'" onmouseout="this.style.color='rgba(255,255,255,0.65)'">Financing</a>
          <a href="/faq.html" style="font-size:13px;color:rgba(255,255,255,0.65);text-decoration:none;transition:color 0.2s;" onmouseover="this.style.color='#78E205'" onmouseout="this.style.color='rgba(255,255,255,0.65)'">FAQ</a>
          <a href="/blog.html" style="font-size:13px;color:rgba(255,255,255,0.65);text-decoration:none;transition:color 0.2s;" onmouseover="this.style.color='#78E205'" onmouseout="this.style.color='rgba(255,255,255,0.65)'">Blog</a>
        </div>
      </div>
      <div>
        <div style="font-size:11px;font-weight:700;color:rgba(255,255,255,0.3);letter-spacing:0.1em;margin-bottom:18px;">CONTACT</div>
        <div style="display:flex;flex-direction:column;gap:12px;">
          <a href="tel:+13212076757" style="font-size:14px;font-weight:700;color:#78E205;text-decoration:none;">321-207-6757</a>
          <a href="mailto:info@koollifeairandheat.com" style="font-size:13px;color:rgba(255,255,255,0.65);text-decoration:none;transition:color 0.2s;" onmouseover="this.style.color='#78E205'" onmouseout="this.style.color='rgba(255,255,255,0.65)'">info@koollifeairandheat.com</a>
          <span style="font-size:13px;color:rgba(255,255,255,0.4);">Orlando, FL &amp; Surrounding Areas</span>
          <a href="/schedule-service.html" style="display:inline-block;background:#78E205;color:#1A1F18;font-size:13px;font-weight:700;padding:10px 18px;border-radius:8px;text-decoration:none;text-align:center;margin-top:4px;">Schedule Service</a>
        </div>
      </div>
    </div>
    <div style="height:1px;background:linear-gradient(90deg,transparent,rgba(120,226,5,0.25) 30%,rgba(120,226,5,0.25) 70%,transparent);margin-bottom:24px;"></div>
    <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;">
      <p style="font-size:12px;color:rgba(255,255,255,0.2);margin:0;">© 2026 Kool Life Air &amp; Heat. All rights reserved.</p>
      <div style="display:flex;gap:20px;">
        <a href="#" style="font-size:12px;color:rgba(255,255,255,0.2);text-decoration:none;transition:color 0.2s;" onmouseover="this.style.color='rgba(255,255,255,0.65)'" onmouseout="this.style.color='rgba(255,255,255,0.2)'">Privacy Policy</a>
        <a href="#" style="font-size:12px;color:rgba(255,255,255,0.2);text-decoration:none;transition:color 0.2s;" onmouseover="this.style.color='rgba(255,255,255,0.65)'" onmouseout="this.style.color='rgba(255,255,255,0.2)'">Terms of Service</a>
      </div>
    </div>
  </div>
</footer>
`;

  // ── Page Load Animation ──────────────────────────────────────────────────
  const splash = document.createElement('div');
  splash.id = 'kl-splash';
  splash.innerHTML = `
    <style>
      #kl-splash {
        position: fixed; inset: 0; z-index: 99999;
        background: #1A1F18;
        display: flex; flex-direction: column; align-items: center; justify-content: center;
        transition: opacity 0.6s ease, transform 0.6s ease;
      }
      #kl-splash.hide {
        opacity: 0;
        pointer-events: none;
      }
      @keyframes kl-fade-up {
        from { opacity: 0; transform: translateY(24px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes kl-bar-grow {
        from { width: 0; }
        to   { width: 100%; }
      }
      #kl-splash-logo {
        width: 90px; height: 90px; object-fit: contain; border-radius: 16px;
        animation: kl-fade-up 0.5s ease 0.1s both;
      }
      #kl-splash-name {
        font-family: 'Bebas Neue', sans-serif;
        font-size: 36px; letter-spacing: 0.08em; color: #fff;
        margin-top: 18px;
        animation: kl-fade-up 0.5s ease 0.25s both;
      }
      #kl-splash-sub {
        font-family: 'Inter', sans-serif;
        font-size: 13px; color: rgba(255,255,255,0.4); letter-spacing: 0.15em;
        margin-top: 6px; text-transform: uppercase;
        animation: kl-fade-up 0.5s ease 0.35s both;
      }
      #kl-splash-bar-track {
        width: 160px; height: 2px; background: rgba(255,255,255,0.08);
        border-radius: 4px; margin-top: 28px; overflow: hidden;
        animation: kl-fade-up 0.5s ease 0.4s both;
      }
      #kl-splash-bar {
        height: 100%; background: #78E205; border-radius: 4px;
        animation: kl-bar-grow 0.8s ease 0.45s both;
      }
    </style>
    <img id="kl-splash-logo" src="/BRAND_ASSETS/Gemini_Generated_Image_th5gidth5gidth5g.png" alt="Kool Life" />
    <div id="kl-splash-name">KOOL LIFE AIR & HEAT</div>
    <div id="kl-splash-sub">Orlando, FL · Since 2014</div>
    <div id="kl-splash-bar-track"><div id="kl-splash-bar"></div></div>
  `;
  document.body.prepend(splash);

  // Play a refreshing low chime using Web Audio API
  function playChime() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      // G3, C4, E4, G4 — warm low C-major arpeggio
      const notes = [
        { freq: 196.00, delay: 0.00, vol: 0.22, dur: 1.6 }, // G3 - deep bass
        { freq: 261.63, delay: 0.18, vol: 0.18, dur: 1.5 }, // C4
        { freq: 329.63, delay: 0.34, vol: 0.15, dur: 1.4 }, // E4
        { freq: 392.00, delay: 0.50, vol: 0.13, dur: 1.3 }, // G4
      ];
      notes.forEach(({ freq, delay, vol, dur }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        // Add subtle reverb feel with a second sine at half volume
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);
        osc2.connect(gain2); gain2.connect(ctx.destination);
        osc.type = 'sine';
        osc2.type = 'sine';
        osc.frequency.value = freq;
        osc2.frequency.value = freq * 2; // one octave up, soft
        const t = ctx.currentTime + delay;
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(vol, t + 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, t + dur);
        gain2.gain.setValueAtTime(0, t);
        gain2.gain.linearRampToValueAtTime(vol * 0.25, t + 0.06);
        gain2.gain.exponentialRampToValueAtTime(0.001, t + dur * 0.7);
        osc.start(t); osc.stop(t + dur);
        osc2.start(t); osc2.stop(t + dur);
      });
    } catch(e) {}
  }
  setTimeout(playChime, 200);

  setTimeout(() => { splash.classList.add('hide'); }, 1400);
  setTimeout(() => { splash.remove(); }, 2100);

  // Inject mobile stylesheet on every page
  if (!document.getElementById('kl-mobile-css')) {
    const link = document.createElement('link');
    link.id = 'kl-mobile-css';
    link.rel = 'stylesheet';
    link.href = '/mobile.css';
    document.head.appendChild(link);
  }

  // Inject nav
  const navEl = document.getElementById('site-nav');
  if (navEl) navEl.innerHTML = NAV_HTML;

  // Inject footer
  const footerEl = document.getElementById('site-footer');
  if (footerEl) footerEl.innerHTML = FOOTER_HTML;

  // Scroll effect
  const nav = document.getElementById('kl-nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  // Mobile menu toggle
  const hamburger = document.getElementById('kl-hamburger');
  const mobileMenu = document.getElementById('kl-mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });
  }

  // Highlight active nav link (top-level)
  document.querySelectorAll('.kl-links > li > a').forEach(a => {
    if (a.getAttribute('href') === currentPath) a.classList.add('active');
  });

  // Highlight active dropdown subpage link + glow parent
  document.querySelectorAll('.kl-dropdown li a').forEach(a => {
    if (a.getAttribute('href') === currentPath) {
      a.style.color = '#78E205';
      a.style.background = 'rgba(120,226,5,0.12)';
      a.style.fontWeight = '700';
      a.style.borderRadius = '8px';
      // Also light up the parent top-level link
      const parentLi = a.closest('.kl-links > li');
      if (parentLi) {
        const parentLink = parentLi.querySelector(':scope > a');
        if (parentLink) parentLink.classList.add('active');
      }
    }
  });

  // Highlight active mobile subpage link
  document.querySelectorAll('.kl-mobile-sub li a').forEach(a => {
    if (a.getAttribute('href') === currentPath) {
      a.style.color = '#78E205';
      a.style.fontWeight = '700';
    }
  });

  // Touch-friendly dropdowns: tap parent to open, tap again or elsewhere to close
  document.querySelectorAll('.kl-links > li').forEach(li => {
    const toggle = li.querySelector(':scope > a');
    const dropdown = li.querySelector('.kl-dropdown');
    if (!toggle || !dropdown) return;

    toggle.addEventListener('click', function(e) {
      const isOpen = li.classList.contains('kl-touch-open');
      // Close all others
      document.querySelectorAll('.kl-links > li.kl-touch-open').forEach(other => {
        other.classList.remove('kl-touch-open');
      });
      if (!isOpen) {
        e.preventDefault();
        li.classList.add('kl-touch-open');
      }
    });
  });

  // Add CSS for touch-open state
  const touchStyle = document.createElement('style');
  touchStyle.textContent = `.kl-links > li.kl-touch-open .kl-dropdown { opacity:1; visibility:visible; pointer-events:auto; transform:translateX(-50%) translateY(0); }`;
  document.head.appendChild(touchStyle);

  // Close dropdowns when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.kl-links')) {
      document.querySelectorAll('.kl-links > li.kl-touch-open').forEach(li => {
        li.classList.remove('kl-touch-open');
      });
    }
  });

  // Plan card hover + touch glow & lift effects
  const planGlows = [
    { shadow: 'rgba(180,80,0,0.55)',   border: '2px solid rgba(200,100,0,0.8)'   }, // Bronze
    { shadow: 'rgba(192,192,192,0.4)', border: '2px solid rgba(200,200,200,0.7)' }, // Silver
    { shadow: 'rgba(255,215,0,0.5)',   border: '2px solid rgba(255,215,0,0.9)'   }, // Gold
  ];
  document.querySelectorAll('.kl-plans-grid > div').forEach((card, i) => {
    const glow = planGlows[i] || planGlows[2];
    const isGold = i === 2;
    const baseTransform = isGold ? 'translateY(-8px)' : 'translateY(0)';
    card.style.transition = 'transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease';
    card.style.cursor = 'pointer';

    function activate() {
      card.style.transform = isGold ? 'translateY(-16px) scale(1.03)' : 'translateY(-12px) scale(1.03)';
      card.style.boxShadow = `0 32px 72px ${glow.shadow}`;
      card.style.border = glow.border;
    }
    function deactivate() {
      card.style.transform = baseTransform;
      card.style.boxShadow = '';
      card.style.border = '';
    }

    card.addEventListener('mouseenter', activate);
    card.addEventListener('mouseleave', deactivate);
    card.addEventListener('touchstart', activate, { passive: true });
    card.addEventListener('touchend', deactivate, { passive: true });
  });
})();
