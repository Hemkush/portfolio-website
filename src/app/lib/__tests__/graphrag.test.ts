import { describe, it, expect } from 'vitest';
import { assembleContext } from '../graphrag';

describe('assembleContext', () => {
  it('includes all three sections when content is provided', () => {
    const result = assembleContext(
      ['chunk 1', 'chunk 2'],
      'entity context',
      ['community summary']
    );
    expect(result).toContain('chunk 1');
    expect(result).toContain('entity context');
    expect(result).toContain('community summary');
  });

  it('omits entity section when entityPart is empty', () => {
    const result = assembleContext(['chunk'], '', []);
    expect(result).not.toContain('Graph Entity Context');
    expect(result).toContain('chunk');
  });

  it('omits community section when communityParts is empty', () => {
    const result = assembleContext(['chunk'], '', []);
    expect(result).not.toContain('Community Summaries');
  });

  it('returns empty string when all inputs are empty', () => {
    expect(assembleContext([], '', [])).toBe('');
  });

  it('truncates vector chunks that exceed ~1800 token budget', () => {
    // 1800 tokens * 4 chars/token = 7200 chars; use 8000-char chunk to exceed budget
    const bigChunk = 'x'.repeat(8000);
    const result = assembleContext([bigChunk, 'small chunk'], '', []);
    expect(result).not.toContain('small chunk');
  });

  it('includes section headers to separate context types', () => {
    const result = assembleContext(['c'], 'e', ['s']);
    expect(result).toContain('Vector Retrieved Context');
    expect(result).toContain('Graph Entity Context');
    expect(result).toContain('Community Summaries');
  });
});
