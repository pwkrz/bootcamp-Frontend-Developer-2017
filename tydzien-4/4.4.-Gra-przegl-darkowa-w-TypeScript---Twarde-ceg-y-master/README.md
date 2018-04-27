# Browser game in Typescript - Hard bricks

**Assignment**

+ Prepare the working environment and make sure that the TypeScript compiler and TSNode shell are installed and working.
+ Clone [the browser game project](https://github.com/eduweb-pl/typescript-brickbuster0) and run it.
+ Then try to expand the game with a new type of "Hard bricks" that require two hits to bust.
+ You can do this by extending the Brick class (call the created class HardBrick).
+ Modify the HTML code to mark one or more bricks as Hard bricks and make sure that your code recognizes the new brick type.
+ Do not forget to add CSS rules to make the Hard brick stand out.
+ Currently the Brick class does not have any logic related to hit handling. Add an appropriate method and modify it in the HardBrick derived class.
+ Do not forget to modify the logic included in the Game class's run() method. Busting a hard brick should earn more points.

ADDITIONAL CHALLENGES:

+ You can write an algorithm that will dynamically select which bricks are supposed to be harder.