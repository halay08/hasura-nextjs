import { AllowedVariableFont } from '@/modules/core/fonts/fonts';

/**
 * Sanitized Theme Airtable record.
 *
 * A consolidated record has gone through the "sanitizeRecord" function.
 * Only useful or allowed fields are mapped below.
 * Other fields have been filtered out during sanitization and thus aren't part of the shape even though they exist on Airtable.
 * Some fields are filtered out because we don't want them to be shared with the client-side (sensitive information).
 * Some fields are just not useful within this application and are not represented to avoid complicating things.
 */
export type Theme = {
  primaryColor?: string;
  primaryColorVariant1?: string;
  onPrimaryColor?: string;
  secondaryColor?: string;
  secondaryColorVariant1?: string;
  onSecondaryColor?: string;
  backgroundColor?: string;
  onBackgroundColor?: string;
  surfaceColor?: string;
  onSurfaceColor?: string;
  errorColor?: string;
  onErrorColor?: string;
  fonts?: AllowedVariableFont; // XXX Should be renamed to "font", as it contains one font only
};
