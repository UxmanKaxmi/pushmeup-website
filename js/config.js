/* ============================================================
   PushMeUp — site configuration
   ------------------------------------------------------------
   THIS IS THE ONE PLACE TO EDIT where "Join the beta" points.

   Everything here is a PUBLIC, shareable link. Never put secrets,
   API keys, admin URLs, or credentials in this file — it ships to
   the browser and the repository is public.
   ============================================================ */

window.PUSHMEUP_CONFIG = {
  // Beta signup form (public Tally link). Used as the default for
  // every "Join the beta" button, and as the fallback on desktop.
  tallyFormUrl: 'https://tally.so/r/MeyKbk',

  // Store betas — leave as '' until the links are live.
  // When set, visitors on that platform are routed straight to it.
  iosTestFlightUrl: '', // e.g. 'https://testflight.apple.com/join/XXXXXXXX'
  androidBetaUrl: '',   // e.g. 'https://play.google.com/apps/testing/com.pushmeup'
};
