import { describe, it, expect } from 'vitest'
import { parseDrafts, hasDrafts } from './parse-drafts'

describe('parseDrafts', () => {
  it('parses a single draft', () => {
    const input = `Draft 1: The Future of AI

This is the content of the draft.
It has multiple lines.`

    const result = parseDrafts(input)
    
    expect(result).toHaveLength(1)
    expect(result[0].title).toBe('The Future of AI')
    expect(result[0].content).toContain('This is the content')
  })

  it('parses multiple drafts', () => {
    const input = `Draft 1: First Title

First content here.

Draft 2: Second Title

Second content here.

Draft 3: Third Title

Third content here.`

    const result = parseDrafts(input)
    
    expect(result).toHaveLength(3)
    expect(result[0].title).toBe('First Title')
    expect(result[1].title).toBe('Second Title')
    expect(result[2].title).toBe('Third Title')
  })

  it('handles markdown bold draft headers', () => {
    const input = `**Draft 1: The Bold Title**

Content goes here.`

    const result = parseDrafts(input)
    
    expect(result).toHaveLength(1)
    expect(result[0].title).toBe('The Bold Title')
  })

  it('extracts strategy when present', () => {
    const input = `Draft 1: "Strategic Draft"

Strategy: "Surprising Data"

The actual content starts here.`

    const result = parseDrafts(input)
    
    expect(result).toHaveLength(1)
    expect(result[0].strategy).toBe('Surprising Data')
  })

  it('calculates word count', () => {
    const input = `Draft 1: "Word Count Test"

One two three four five.`

    const result = parseDrafts(input)
    
    expect(result[0].wordCount).toBeGreaterThan(0)
  })

  it('returns empty array for no drafts', () => {
    const input = 'Just some random text without draft markers.'
    const result = parseDrafts(input)
    expect(result).toHaveLength(0)
  })
})

describe('hasDrafts', () => {
  it('returns true when Draft 1: is present', () => {
    expect(hasDrafts('Draft 1: "Title"\n\nContent')).toBe(true)
  })

  it('returns true for bold draft markers', () => {
    expect(hasDrafts('**Draft 1: Title**')).toBe(true)
  })

  it('returns false when no draft markers', () => {
    expect(hasDrafts('Just regular text')).toBe(false)
  })

  it('returns false for Draft 2 without Draft 1', () => {
    expect(hasDrafts('Draft 2: "Title"')).toBe(false)
  })
})
