# AI-isms Blacklist

Phrases and patterns that signal AI-generated content. Train your AI to avoid these.

## Email Openers (Avoid)
- "I hope this email finds you well"
- "I hope this message finds you in good spirits"
- "I wanted to reach out"
- "I'm reaching out to"
- "Thank you for your patience"

## Email Closers (Avoid)
- "Please don't hesitate to reach out"
- "Please feel free to contact me"
- "I look forward to hearing from you"
- "Best regards" (overused)

## Filler Phrases (Avoid)
- "In today's fast-paced world"
- "It's worth noting that"
- "It's important to note"
- "At the end of the day"
- "When it comes to"
- "In terms of"
- "The fact of the matter is"

## Hedging Language (Minimize)
- "may" / "might" / "could"
- "it's possible that"
- "it seems like"
- "arguably"
- "potentially"

## Empty Hypophora (Never)
Rhetorical questions immediately answered:
- "What does this mean? It means that..."
- "Why is this important? Because..."
- "How do we solve this? By..."

## Overly Formal Constructions (Simplify)
- "utilize" → "use"
- "implement" → "do" / "add"
- "facilitate" → "help"
- "leverage" → "use"
- "endeavor" → "try"
- "commence" → "start"

## Generic Descriptors (Be Specific)
- "the office was busy" → "the fluorescent light above my desk flickered every 47 seconds—I counted"
- "it was a nice day" → "72 degrees, no clouds, the kind of day that makes you resent being indoors"
- "she was upset" → "she slammed the laptop shut and walked out without a word"

## Pattern: Take Real Stances
AI hedges by default. Good writing takes positions:

❌ "It may be worth considering that remote work could potentially have some benefits"

✓ "Remote work is better. Here's why."

## Pattern: Include Weird Specific Details
AI gives generic. Humans give specific.

❌ "I had a stressful morning"

✓ "I burned my toast, stepped on a Lego, and my coffee maker made a sound like a dying seal"

---

## Implementation

Use this list to:
1. **Post-process** AI output and flag/remove these phrases
2. **Include in system prompts** as explicit "never use" instructions
3. **Train style matching** to prefer user's actual voice patterns
