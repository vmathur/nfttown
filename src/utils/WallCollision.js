export default function WallCollision(characterData,canvas) {
    let buffer=10;
  if (characterData.currentLocation.y + buffer > canvas.height || characterData.currentLocation.y - buffer < 0) {
    characterData.velocity.dy*=-1;
  }
  if (characterData.currentLocation.x + buffer > canvas.width || characterData.currentLocation.x - buffer  < 0) {
    characterData.velocity.dx *= -1;
  }
}