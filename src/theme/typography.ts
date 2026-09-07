import { font } from "./fonts";

export const typography = {
  /**
   * Large display text.
   *
   * Used sparingly for important numbers
   * and major visual moments.
   */
  display: {
    fontFamily: font("manrope", "semiBold"),
    fontSize: 36,
    lineHeight: 44,
    letterSpacing: -0.8,
  },

  /**
   * Primary page heading.
   */
  h1: {
    fontFamily: font("manrope", "semiBold"),
    fontSize: 30,
    lineHeight: 38,
    letterSpacing: -0.5,
  },

  /**
   * Section heading.
   */
  h2: {
    fontFamily: font("manrope", "semiBold"),
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: -0.3,
  },

  /**
   * Smaller section/card heading.
   */
  h3: {
    fontFamily: font("manrope", "semiBold"),
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: -0.2,
  },

  /**
   * Larger UI title.
   */
  title: {
    fontFamily: font("inter", "semiBold"),
    fontSize: 18,
    lineHeight: 26,
  },

  /**
   * Default body text.
   */
  body: {
    fontFamily: font("inter", "regular"),
    fontSize: 16,
    lineHeight: 24,
  },

  /**
   * Body text with slightly more emphasis.
   */
  bodyMedium: {
    fontFamily: font("inter", "medium"),
    fontSize: 16,
    lineHeight: 24,
  },

  /**
   * Smaller supporting text.
   */
  bodySmall: {
    fontFamily: font("inter", "regular"),
    fontSize: 14,
    lineHeight: 20,
  },

  /**
   * Smaller supporting text with emphasis.
   */
  bodySmallMedium: {
    fontFamily: font("inter", "medium"),
    fontSize: 14,
    lineHeight: 20,
  },

  /**
   * Small metadata / secondary labels.
   */
  caption: {
    fontFamily: font("inter", "regular"),
    fontSize: 12,
    lineHeight: 18,
  },

  /**
   * Caption with emphasis.
   */
  captionMedium: {
    fontFamily: font("inter", "medium"),
    fontSize: 12,
    lineHeight: 18,
  },

  /**
   * Form labels and compact UI labels.
   */
  label: {
    fontFamily: font("inter", "medium"),
    fontSize: 13,
    lineHeight: 18,
  },

  /**
   * Large time / duration values.
   *
   * Example:
   * 4h 32m
   */
  numberLarge: {
    fontFamily: font("manrope", "semiBold"),
    fontSize: 40,
    lineHeight: 48,
    letterSpacing: -1,
  },

  /**
   * Medium time / statistics values.
   */
  numberMedium: {
    fontFamily: font("manrope", "semiBold"),
    fontSize: 28,
    lineHeight: 36,
    letterSpacing: -0.5,
  },
} as const;

export type Typography = keyof typeof typography;
