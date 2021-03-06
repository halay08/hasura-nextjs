import { GetAmplitudeInstanceProps } from '@/modules/core/amplitude/types/GetAmplitudeInstanceProps';
import { GenericObject } from '@/modules/core/data/types/GenericObject';
import { createLogger } from '@/modules/core/logging/logger';
import * as Sentry from '@sentry/node';
import { isBrowser } from '@unly/utils';
import { AmplitudeClient, Identify } from 'amplitude-js';

const fileLabel = 'module/core/amplitude/amplitude';
const logger = createLogger({
  fileLabel
});

/**
 * Initializes an existing amplitude instance with base configuration shared by all Amplitude events.
 *
 * @param amplitudeInstance
 * @param options
 */
export const initAmplitudeInstance = (
  amplitudeInstance: AmplitudeClient,
  options: GetAmplitudeInstanceProps
): void => {
  const {
    customerRef,
    iframeReferrer,
    isInIframe,
    lang,
    locale,
    userId,
    userConsent,
    networkSpeed,
    networkConnectionType
  } = options;
  const {
    isUserOptedOutOfAnalytics,
    hasUserGivenAnyCookieConsent
  } = userConsent;

  // See https://help.amplitude.com/hc/en-us/articles/115001361248#settings-configuration-options
  // See all JS SDK options https://github.com/amplitude/Amplitude-JavaScript/blob/master/src/options.js
  amplitudeInstance.init(process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY, null, {
    userId,
    logLevel:
      process.env.NEXT_PUBLIC_APP_STAGE === 'production' ? 'DISABLE' : 'WARN',
    includeGclid: false, // GDPR Enabling this is not GDPR compliant and must not be enabled without explicit user consent - See https://croud.com/blog/news/10-point-gdpr-checklist-digital-advertising/
    includeReferrer: true, // See https://help.amplitude.com/hc/en-us/articles/215131888#track-referrers
    includeUtm: true,
    // @ts-ignore XXX onError should be allowed, see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/42005
    onError: (error): void => {
      Sentry.captureException(error);
      console.error(error); // eslint-disable-line no-console
    },
    sameSiteCookie: 'Strict', // 'Strict' | 'Lax' | 'None' - See https://web.dev/samesite-cookies-explained/
    cookieExpiration: 365 // Expires in 1 year (would fallback to 10 years by default, which isn't GDPR compliant)
  });

  // Disable analytics tracking entirely if the user has opted-out
  if (isUserOptedOutOfAnalytics) {
    amplitudeInstance.setOptOut(true); // If true, then no events will be logged or sent.

    if (process.env.STORYBOOK !== 'true') {
      logger.info('User has opted-out of analytics tracking.'); // eslint-disable-line no-console
    }
  } else {
    // Re-enable tracking (necessary if it was previously disabled!)
    amplitudeInstance.setOptOut(false);

    if (process.env.STORYBOOK !== 'true') {
      logger.info(
        `User has opted-in into analytics tracking. (Thank you! This helps us make our product better, and we don't track any personal/identifiable data.`
      ); // eslint-disable-line no-console
    }
  }

  amplitudeInstance.setVersionName(process.env.NEXT_PUBLIC_APP_VERSION_RELEASE); // e.g: v1.0.0

  /**
   * Initializes the Amplitude user session.
   *
   * We must set all "must-have" properties here (instead of doing it in the "AmplitudeProvider", as userProperties),
   * because "react-amplitude" would send the next "page-displayed" event BEFORE sending the $identify event,
   * which would lead to events not containing the user's session.
   *
   * We're only doing this when detecting a new session, as it won't be executed multiple times for the same session anyway, and it avoids noise.
   *
   * @see https://github.com/amplitude/Amplitude-JavaScript/issues/223 Learn more about "setOnce"
   */
  if (amplitudeInstance.isNewSession()) {
    const visitor: Identify = new amplitudeInstance.Identify();
    visitor.setOnce('customer.ref', customerRef);

    if (lang) {
      // DA Helps figuring out if the initial language (auto-detected) is changed afterwards
      visitor.setOnce('initial_lang', lang);
      visitor.setOnce('lang', lang);
    }

    if (locale) {
      visitor.setOnce('initial_locale', locale);
      visitor.setOnce('locale', locale);
    }

    if (isInIframe) {
      // DA This will help track down the users who discovered our platform because of an iframe
      visitor.setOnce('initial_iframe', isInIframe);
      visitor.setOnce('iframe', isInIframe);
    }

    if (iframeReferrer) {
      visitor.setOnce('initial_iframeReferrer', iframeReferrer);
      visitor.setOnce('iframeReferrer', iframeReferrer);
    }

    visitor.setOnce('initial_networkSpeed', networkSpeed);
    visitor.setOnce('initial_networkConnectionType', networkConnectionType);

    visitor.setOnce('networkSpeed', networkSpeed);
    visitor.setOnce('networkConnectionType', networkConnectionType);

    visitor.set('isUserOptedOutOfAnalytics', isUserOptedOutOfAnalytics);
    visitor.set('hasUserGivenAnyCookieConsent', hasUserGivenAnyCookieConsent);

    amplitudeInstance.identify(visitor); // Send the new identify event to amplitude (updates the user's identity)
  }
};

/**
 * Base properties shared by all events.
 */
export const getDefaultEventProperties = (): GenericObject => {
  const customerRef = process.env.NEXT_PUBLIC_CUSTOMER_REF;

  return {
    app: {
      name: process.env.NEXT_PUBLIC_APP_NAME,
      release: process.env.NEXT_PUBLIC_APP_VERSION_RELEASE,
      stage: process.env.NEXT_PUBLIC_APP_STAGE
    },
    page: {
      url: location.href,
      path: location.pathname,
      origin: location.origin,
      name: null // XXX Will be set by the page (usually through its layout)
    },
    customer: {
      ref: customerRef
    }
  };
};

/**
 * Returns a browser-compatible Amplitude instance.
 *
 * @param props
 */
export const getAmplitudeInstance = (
  props: GetAmplitudeInstanceProps
): AmplitudeClient | null => {
  if (isBrowser()) {
    const amplitude = require('amplitude-js'); // eslint-disable-line @typescript-eslint/no-var-requires
    const amplitudeInstance: AmplitudeClient = amplitude.getInstance();

    initAmplitudeInstance(amplitudeInstance, props);

    return amplitudeInstance;
  } else {
    return null;
  }
};
