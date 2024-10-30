<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="public/assets/Logo/logo-big-colour.png" alt="Logo" height=100>
  </a>

  <h3 align="center">E-Cell MJCET</h3>

  <p align="center">
	  This is a official Repo of E-Cell MJCET, fostering innovation and entrepreneurship through events, resources, and mentorship for aspiring entrepreneurs.
    <br />
    <br />
    <a href="https://ecellmjcet.com">View Website</a>
    ·
    <a href="https://github.com/E-Cell-MJCET/FamilyFued/blob/main/.github/ISSUE_TEMPLATE/bug_report.md">Report Bug</a>
    ·
    <a href="https://github.com/E-Cell-MJCET/FamilyFued/blob/main/.github/ISSUE_TEMPLATE/feature_request.md">Request Feature</a>
  </p>
</div>

# Family-Feud by E-Cell MJCET
Project for playing family feud on a projector locally

## Keybindings

Button | Action
 --- | ---
1 | Reveals answer for the 1. position and adds the score for *current selected team*
2 | Reveals answer for the 2. position and adds the score for *current selected team*
3 | Reveals answer for the 3. position and adds the score for *current selected team*
4 | Reveals answer for the 4. position and adds the score for *current selected team*

---

Button | Action
 --- | ---
q | Displays cross for wrong answer.

---

Button | Action
 --- | ---
j | Selects team on the left to be the *current selected team* aka the one that gets the points and accumulates errors
k | Selects team on the right to be the *current selected team* aka the one that gets the points and accumulates errors


---

Button | Action
 --- | ---
s | Starts the game
r | Starts new round
q | Adds one to the mistake count of the *current selected team*, displays the correct amount of crosses and flips the current selected team when mistake count reaches 3

---

Button | Action
 --- | ---
m | Starts theme music from beginning

## [Example round](https://youtu.be/qCEDfP0quNU?t=6m5s)
Timestamp | Button | Reason
--- | --- | ---
5:58 | r | start of new round
6:15 | j | left team was first
6:18 | 4 | the guess was "Astover" and that is under answer 4 (the controller should have the answer sheet at hand to look up correct answers) 
6:22 | k | right team's turn
6:33 | q | wrong answer (not in the answer sheet)
6:40 | j | left team continues quessing
6:54 | q | wrong answer
7:01 | q | wrong answer
7:10 | q | wrong answer
7:31 | 1 | correct answer at box 1 = points steal and no more guesses allowed
7:43 | 2 | reveal 2. place
7:50 | 3 | reveal 3. place
8:05 | r | start of new round




