# Taste
- Keeps reusable data (e.g. language lists, sample code snippets) in a separate external JS module rather than inline in HTML, so it's easy to update when adding new entries. Confidence: 0.7
- Removes throwaway/scratch files from the repo instead of leaving them as untracked clutter. Confidence: 0.5
- Cares about keyboard accessibility in UI: controls should keep focus after interaction so they can be operated with the keyboard (e.g. arrow keys to change a selection) without re-clicking. Confidence: 0.6
- Dislikes redundant/duplicated UI text — prefers a single obvious display of the current value rather than repeating it in a second element. Confidence: 0.55
- For Monaco language support, do not define custom themes: emit only standard token scopes so highlighting renders correctly under the existing/default themes. Confidence: 0.85
- Expects new language support to be complete and first-class: syntax highlighting plus the full IntelliSense surface (autocomplete, snippets, hover info, go-to-definition, rename, etc.), not tokenization alone. Confidence: 0.65
