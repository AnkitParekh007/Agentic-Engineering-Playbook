# Visual Quality Checklist

Use this checklist before shipping major docs-site design changes.

## Typography

- body uses the shared sans stack and not a one-off font
- code blocks and inline code use the shared mono stack
- homepage hero wraps cleanly on desktop and mobile
- docs `h1`, `h2`, and `h3` follow the shared heading scale
- paragraph line-height stays readable across long technical sections
- mobile headings do not collide with badges, pills, or buttons

## Spacing

- homepage sections follow a consistent vertical rhythm
- cards use the shared padding scale instead of ad hoc values
- project grids have consistent gaps across desktop, tablet, and mobile
- docs `h2` spacing feels like a major section break
- docs `h3` spacing stays visually connected to the `h2` above it
- command cards, project cards, and demo cards have balanced internal spacing

## Theme

- dark mode keeps premium contrast without becoming neon-heavy
- light mode stays readable and does not feel washed out
- links are clearly visible in both themes
- code blocks are readable in both themes
- sidebar active state is obvious
- TOC active state is obvious
- admonitions remain visually distinct from standard cards

## Components

- project cards have aligned heights and consistent badge treatment
- the runtime visual reads as one system, not disconnected cards
- architecture preview nodes align cleanly
- command cards feel terminal-like and not cramped
- project status cards show status, stack, commands, proof, and next upgrade path
- admonitions and doc blocks share the same design language

## Responsive

- homepage works on desktop, tablet, and mobile widths
- long code blocks scroll horizontally without breaking layout
- tables remain readable or scroll cleanly on smaller screens
- project status cards collapse cleanly on mobile
- hero CTAs stack without awkward wrapping
- learning path connectors still read correctly when stacked

## Launch checks

- run `npm run build` at the repo root
- confirm key docs pages render without broken imports
- check at least one project doc from each major layer
- verify badges, cards, and code blocks in both light and dark themes
- capture one updated screenshot after any substantial visual pass
