# Above and Beyond Features – Number Guessing Game

## Overview
In addition to meeting all the required project specifications, I added several creative enhancements to improve the user experience and visual appeal of the game. These features make the game more engaging and interactive for players.

---

## 1. Confetti Celebration 🎉

### Description
A confetti animation appears on the screen whenever the player correctly guesses the number. This celebratory effect provides positive visual feedback and enhances the sense of achievement after winning a round.

### Where It Is Located
- **Function Name:** `launchConfetti()`
- **File:** `script.js`
- **Trigger:** The function is called inside the `makeGuess()` function when the player guesses the correct number.
- **HTML Element:** `<canvas id="confettiCanvas"></canvas>` in `index.html`

### How It Works
- A `<canvas>` element is used to render the animation.
- Multiple confetti particles are generated with random positions, colors, and speeds.
- The particles fall down the screen using a timed animation loop (`setInterval`).
- The animation automatically stops after a few seconds.

### Why It Improves the Game
- Provides rewarding visual feedback.
- Makes the game more fun and engaging.
- Enhances user satisfaction and replayability.

---

## 2. Light/Dark Mode Toggle 

### Description
A toggle button allows players to switch between light mode and dark mode. This feature improves accessibility and user comfort, especially when playing in different lighting environments.

### Where It Is Located
- **Button ID:** `modeToggle`
- **File:** `index.html`
- **Event Listener:** Added in `script.js` using `addEventListener`.
- **CSS Classes:** `.light` and `.dark` defined in the `<style>` section of `index.html`.

### How It Works
- The `<body>` element starts with the class `light`.
- When the toggle button is clicked, JavaScript switches between the `light` and `dark` classes using `classList.toggle()`.
- Each class applies different background and text colors through CSS.

### Why It Improves the Game
- Enhances accessibility for users sensitive to bright screens.
- Provides a modern and customizable user interface.
- Improves the overall visual design and user experience.

---

## Summary of Enhancements

| Feature | Function/Location | Benefit |
|--------|------------------|---------|
| Confetti Animation | `launchConfetti()` in `script.js` | Celebrates player wins with engaging visuals |
| Light/Dark Mode Toggle | `modeToggle` button and CSS classes | Improves accessibility and user comfort |

---

## Conclusion
These "Above and Beyond" features significantly enhance the usability and enjoyment of the Number Guessing Game. By adding visual feedback through confetti and allowing users to customize the interface with a light/dark mode toggle, the game becomes more interactive, accessible, and engaging.