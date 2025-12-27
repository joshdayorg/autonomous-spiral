# Spiral System Prompts - Reconstructed

This directory contains reverse-engineered system prompts from Spiral, based on observing Claude's extended thinking ("Pondering...") output.

## Files

| File | Description |
|------|-------------|
| `orchestrator-prompt.md` | The Orchestrator agent - handles interviews and context gathering |
| `writer-prompt.md` | The Writer agent - creates and refines drafts |

## Architecture Overview

```
┌─────────────────┐     transfer_to_writer     ┌─────────────────┐
│   ORCHESTRATOR  │ ─────────────────────────▶ │     WRITER      │
│                 │                            │                 │
│  • Two-Gate     │                            │  • 3 Draft Mode │
│    Assessment   │                            │  • Strategies   │
│  • Interview    │                            │  • Draft Tools  │
│  • Handoff      │                            │  • Refinement   │
└─────────────────┘                            └─────────────────┘
         │                                              │
         │              User Messages                   │
         └──────────────────┬───────────────────────────┘
                            │
                    ┌───────▼───────┐
                    │    Backend    │
                    │               │
                    │ • Session Mgmt│
                    │ • Agent Route │
                    │ • Tool Exec   │
                    └───────────────┘
```

## Key Concepts

### Two-Gate Assessment (Orchestrator)
- **Gate 1:** Material Sufficiency - enough facts/examples to write authentically?
- **Gate 2:** Message Clarity - clear thesis/angle?
- **Threshold:** 60% substance density for handoff

### EXPLORATION MODE (Writer)
- Creates 3 drafts with different angles
- Lets user pick direction before refinement
- Each draft uses same source material, different framing

### Writing Strategies
**Baseline (always apply):**
- `subject-verb` - First 5 words have subject+verb
- `activate-verbs` - Precise, energetic verbs
- `one-idea-per-sentence` - Keep focused
- `present-active-tense` - Active voice

**Situational:**
- `pattern-twist` - For humor
- `play-with-words` - For clever copy

## Using These Prompts

### For Your New App

1. **Adapt the Two-Gate framework** for short-form content:
   - Tweets may need simpler assessment
   - Support requests have different "material" needs

2. **Modify EXPLORATION MODE** based on content type:
   - Tweets: 3 variations
   - Support replies: Maybe just 1 draft
   - Blog posts: 3 angles

3. **Add content-type-specific strategies:**
   - Twitter: Character limits, hook optimization
   - Support: Empathy, problem-solving structure

### Implementation Notes

- The prompts use **extended thinking** (Claude's thinking blocks)
- Tool calls are made via function calling
- Session state is managed server-side
- Drafts are stored as structured documents with nodes

## What's NOT Included

These reconstructions don't include:
- Exact wording of original prompts
- Internal tool schemas
- Error handling instructions
- Edge case handling
- Writing style guide fetching logic
- Workspace/file context injection

## Accuracy Disclaimer

These prompts were reconstructed by observing AI behavior, not from actual source code. They represent our best inference of the prompt architecture and may differ from Spiral's actual implementation.
