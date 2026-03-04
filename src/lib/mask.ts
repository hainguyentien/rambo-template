/**
 * Apply a mask pattern to a value string.
 * `#` in the pattern represents a character slot; all other characters are literals.
 *
 * @example applyMask('1234567890', '(###) ###-####') → '(123) 456-7890'
 */
export const applyMask = (value: string, pattern: string): string => {
  let result = '';
  let valueIndex = 0;

  for (let i = 0; i < pattern.length && valueIndex < value.length; i++) {
    if (pattern[i] === '#') {
      result += value[valueIndex];
      valueIndex++;
    } else {
      result += pattern[i];
    }
  }

  return result;
};

/**
 * Remove mask literals from a masked value, returning only the raw characters.
 *
 * @example unmask('(123) 456-7890', '(###) ###-####') → '1234567890'
 */
export const unmask = (value: string, pattern: string): string => {
  const literalChars = new Set<string>();
  for (const char of pattern) {
    if (char !== '#') {
      literalChars.add(char);
    }
  }

  let result = '';
  for (const char of value) {
    if (!literalChars.has(char)) {
      result += char;
    }
  }

  return result;
};
