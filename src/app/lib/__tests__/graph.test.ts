import { describe, it, expect } from 'vitest';
import { detectCommunities } from '../graph';

describe('detectCommunities', () => {
  it('assigns the same community ID to directly connected nodes', () => {
    const result = detectCommunities(
      ['a', 'b', 'c'],
      [{ sourceId: 'a', targetId: 'b' }]
    );
    expect(result.get('a')).toBe(result.get('b'));
    expect(result.get('c')).not.toBe(result.get('a'));
  });

  it('assigns the same community ID through transitive connections', () => {
    const result = detectCommunities(
      ['a', 'b', 'c'],
      [{ sourceId: 'a', targetId: 'b' }, { sourceId: 'b', targetId: 'c' }]
    );
    expect(result.get('a')).toBe(result.get('b'));
    expect(result.get('b')).toBe(result.get('c'));
  });

  it('assigns different community IDs to isolated nodes', () => {
    const result = detectCommunities(['a', 'b'], []);
    expect(result.get('a')).not.toBe(result.get('b'));
    expect(result.size).toBe(2);
  });

  it('returns an empty map for empty input', () => {
    expect(detectCommunities([], []).size).toBe(0);
  });

  it('handles self-loops without throwing', () => {
    const result = detectCommunities(['a'], [{ sourceId: 'a', targetId: 'a' }]);
    expect(result.size).toBe(1);
  });

  it('ignores edges referencing unknown node IDs', () => {
    const result = detectCommunities(['a', 'b'], [{ sourceId: 'a', targetId: 'z' }]);
    expect(result.get('a')).not.toBe(result.get('b'));
  });
});

import { deduplicateEntities } from '../graph';

describe('deduplicateEntities', () => {
  it('merges entities with the same name (case-insensitive)', () => {
    const { nodes } = deduplicateEntities([
      {
        entities: [{ name: 'Python', type: 'TECHNOLOGY', description: 'programming language' }],
        relationships: [],
      },
      {
        entities: [{ name: 'python', type: 'TECHNOLOGY', description: 'used in ML pipelines' }],
        relationships: [],
      },
    ]);
    expect(nodes.size).toBe(1);
    const node = nodes.get('python')!;
    expect(node.description).toContain('programming language');
    expect(node.description).toContain('used in ML pipelines');
  });

  it('preserves first-seen name capitalisation', () => {
    const { nodes } = deduplicateEntities([
      {
        entities: [{ name: 'LangChain', type: 'TECHNOLOGY', description: 'LLM framework' }],
        relationships: [],
      },
      {
        entities: [{ name: 'langchain', type: 'TECHNOLOGY', description: 'chaining LLMs' }],
        relationships: [],
      },
    ]);
    expect(nodes.get('langchain')!.name).toBe('LangChain');
  });

  it('discards edges whose endpoints are not in the node set', () => {
    const { edges } = deduplicateEntities([
      {
        entities: [{ name: 'Hemant', type: 'PERSON', description: 'AI engineer' }],
        relationships: [
          { source: 'Hemant', relation: 'uses', target: 'UnknownTool', context: 'context' },
        ],
      },
    ]);
    expect(edges).toHaveLength(0);
  });

  it('deduplicates edges with the same source + relation + target', () => {
    const { edges } = deduplicateEntities([
      {
        entities: [
          { name: 'Hemant', type: 'PERSON', description: 'AI engineer' },
          { name: 'Python', type: 'TECHNOLOGY', description: 'language' },
        ],
        relationships: [
          { source: 'Hemant', relation: 'knows', target: 'Python', context: 'context 1' },
          { source: 'Hemant', relation: 'knows', target: 'Python', context: 'context 2' },
        ],
      },
    ]);
    expect(edges).toHaveLength(1);
  });

  it('resolves edge endpoints case-insensitively', () => {
    const { edges } = deduplicateEntities([
      {
        entities: [
          { name: 'Hemant', type: 'PERSON', description: 'engineer' },
          { name: 'Python', type: 'TECHNOLOGY', description: 'language' },
        ],
        relationships: [
          { source: 'hemant', relation: 'knows', target: 'PYTHON', context: 'context' },
        ],
      },
    ]);
    expect(edges).toHaveLength(1);
  });
});
